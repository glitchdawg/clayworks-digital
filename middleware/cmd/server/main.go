package main

import (
	"context"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/clayworks/middleware/internal/config"
	"github.com/clayworks/middleware/internal/handlers"
	"github.com/clayworks/middleware/internal/middleware"
	"github.com/clayworks/middleware/internal/services"
	"github.com/go-chi/chi/v5"
	chiMiddleware "github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	"github.com/go-chi/httprate"
	"github.com/rs/zerolog"
	"github.com/rs/zerolog/log"
)

func main() {
	// Initialize configuration
	cfg := config.Load()

	// Setup structured logging
	zerolog.TimeFieldFormat = zerolog.TimeFormatUnix
	if cfg.Environment == "development" {
		log.Logger = log.Output(zerolog.ConsoleWriter{Out: os.Stderr})
	}

	log.Info().
		Str("environment", cfg.Environment).
		Str("port", cfg.Port).
		Msg("Starting ClayWorks API Gateway")

	// Initialize services
	cacheService := services.NewCacheService(cfg)
	strapiService := services.NewStrapiService(cfg, cacheService)
	analyticsService := services.NewAnalyticsService(cfg)

	// Initialize handlers
	contentHandler := handlers.NewContentHandler(strapiService)
	analyticsHandler := handlers.NewAnalyticsHandler(analyticsService)
	healthHandler := handlers.NewHealthHandler(cacheService, strapiService)

	// Setup router
	r := chi.NewRouter()

	// Global middleware
	r.Use(chiMiddleware.RequestID)
	r.Use(chiMiddleware.RealIP)
	r.Use(middleware.Logger)
	r.Use(chiMiddleware.Recoverer)
	r.Use(chiMiddleware.Timeout(30 * time.Second))

	// CORS
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:   cfg.AllowedOrigins,
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-API-Key"},
		ExposedHeaders:   []string{"X-Request-ID", "X-Cache-Status"},
		AllowCredentials: true,
		MaxAge:           300,
	}))

	// Rate limiting
	r.Use(httprate.LimitByIP(cfg.RateLimitRequests, cfg.RateLimitWindow))

	// API key authentication for protected routes
	r.Group(func(r chi.Router) {
		r.Use(middleware.APIKeyAuth(cfg.APIKey))

		// Content API (proxied to Strapi)
		r.Route("/api/v1/content", func(r chi.Router) {
			r.Get("/{type}", contentHandler.GetCollection)
			r.Get("/{type}/{id}", contentHandler.GetSingle)
		})

		// Page API
		r.Get("/api/v1/pages/{slug}", contentHandler.GetPage)

		// Preview API
		r.Get("/api/v1/preview/{type}/{id}", contentHandler.GetPreview)
	})

	// Analytics (separate rate limit)
	r.Group(func(r chi.Router) {
		r.Use(httprate.LimitByIP(100, time.Minute))
		r.Post("/api/v1/analytics/events", analyticsHandler.IngestEvents)
	})

	// Health checks (no auth)
	r.Get("/health", healthHandler.Health)
	r.Get("/ready", healthHandler.Ready)

	// Start server
	server := &http.Server{
		Addr:         ":" + cfg.Port,
		Handler:      r,
		ReadTimeout:  15 * time.Second,
		WriteTimeout: 15 * time.Second,
		IdleTimeout:  60 * time.Second,
	}

	// Graceful shutdown
	go func() {
		if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatal().Err(err).Msg("Server failed to start")
		}
	}()

	log.Info().Str("port", cfg.Port).Msg("Server started")

	// Wait for interrupt signal
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit

	log.Info().Msg("Shutting down server...")

	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	if err := server.Shutdown(ctx); err != nil {
		log.Fatal().Err(err).Msg("Server forced to shutdown")
	}

	// Close services
	cacheService.Close()

	log.Info().Msg("Server exited")
}
