package services

import (
	"time"

	"github.com/clayworks/middleware/internal/config"
	"github.com/clayworks/middleware/internal/models"
	"github.com/rs/zerolog/log"
)

// AnalyticsService provides an extensible interface for analytics integrations.
// Currently supports basic event logging, with hooks for Google Analytics, Mixpanel, etc.
type AnalyticsService struct {
	googleAnalyticsID string
	providers         []AnalyticsProvider
}

// AnalyticsProvider interface for pluggable analytics backends
type AnalyticsProvider interface {
	Name() string
	Track(event models.AnalyticsEvent) error
	IsEnabled() bool
}

func NewAnalyticsService(cfg *config.Config) *AnalyticsService {
	svc := &AnalyticsService{
		googleAnalyticsID: cfg.GoogleAnalyticsID,
		providers:         make([]AnalyticsProvider, 0),
	}

	// Register providers based on configuration
	if cfg.GoogleAnalyticsID != "" {
		// Google Analytics provider will be added in future integration
		log.Info().Str("ga_id", cfg.GoogleAnalyticsID).Msg("Google Analytics configured")
	}

	// Add console logger for development
	svc.providers = append(svc.providers, &ConsoleProvider{})

	return svc
}

func (s *AnalyticsService) TrackEvent(event models.AnalyticsEvent) error {
	// Enrich event with timestamp
	if event.Timestamp.IsZero() {
		event.Timestamp = time.Now()
	}

	// Send to all enabled providers
	for _, provider := range s.providers {
		if provider.IsEnabled() {
			if err := provider.Track(event); err != nil {
				log.Error().
					Err(err).
					Str("provider", provider.Name()).
					Str("event", event.Name).
					Msg("Failed to track event")
			}
		}
	}

	return nil
}

func (s *AnalyticsService) TrackPageView(path, referrer, userAgent, sessionID string) error {
	return s.TrackEvent(models.AnalyticsEvent{
		Name:      "page_view",
		Category:  "navigation",
		SessionID: sessionID,
		Properties: map[string]interface{}{
			"path":       path,
			"referrer":   referrer,
			"user_agent": userAgent,
		},
	})
}

// ConsoleProvider logs events to console (for development)
type ConsoleProvider struct{}

func (p *ConsoleProvider) Name() string { return "console" }

func (p *ConsoleProvider) IsEnabled() bool { return true }

func (p *ConsoleProvider) Track(event models.AnalyticsEvent) error {
	log.Debug().
		Str("event", event.Name).
		Str("category", event.Category).
		Str("session", event.SessionID).
		Interface("properties", event.Properties).
		Msg("Analytics event")
	return nil
}

// GoogleAnalyticsProvider - placeholder for future implementation
type GoogleAnalyticsProvider struct {
	measurementID string
	apiSecret     string
}

func NewGoogleAnalyticsProvider(measurementID, apiSecret string) *GoogleAnalyticsProvider {
	return &GoogleAnalyticsProvider{
		measurementID: measurementID,
		apiSecret:     apiSecret,
	}
}

func (p *GoogleAnalyticsProvider) Name() string { return "google_analytics" }

func (p *GoogleAnalyticsProvider) IsEnabled() bool {
	return p.measurementID != "" && p.apiSecret != ""
}

func (p *GoogleAnalyticsProvider) Track(event models.AnalyticsEvent) error {
	// TODO: Implement GA4 Measurement Protocol
	// https://developers.google.com/analytics/devguides/collection/protocol/ga4
	return nil
}
