package config

import (
	"os"
	"strconv"
	"strings"
	"time"

	"github.com/joho/godotenv"
)

type Config struct {
	// Server
	Environment string
	Port        string

	// Strapi
	StrapiURL   string
	StrapiToken string

	// Redis
	RedisURL      string
	RedisPassword string
	CacheTTL      time.Duration

	// API Key
	APIKey string

	// Rate Limiting
	RateLimitRequests int
	RateLimitWindow   time.Duration

	// CORS
	AllowedOrigins []string

	// Analytics (for future Google Analytics integration)
	GoogleAnalyticsID string
}

func Load() *Config {
	// Load .env file if it exists
	_ = godotenv.Load()

	return &Config{
		Environment: getEnv("ENVIRONMENT", "development"),
		Port:        getEnv("PORT", "8080"),

		StrapiURL:   getEnv("STRAPI_URL", "http://localhost:1337"),
		StrapiToken: getEnv("STRAPI_API_TOKEN", ""),

		RedisURL:      getEnv("REDIS_URL", "localhost:6379"),
		RedisPassword: getEnv("REDIS_PASSWORD", ""),
		CacheTTL:      getDuration("CACHE_TTL", 5*time.Minute),

		APIKey: getEnv("API_KEY", "development-api-key"),

		RateLimitRequests: getInt("RATE_LIMIT_REQUESTS", 100),
		RateLimitWindow:   getDuration("RATE_LIMIT_WINDOW", time.Minute),

		AllowedOrigins: getSlice("ALLOWED_ORIGINS", []string{
			"http://localhost:3000",
			"http://localhost:8080",
		}),

		GoogleAnalyticsID: getEnv("GOOGLE_ANALYTICS_ID", ""),
	}
}

func getEnv(key, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return defaultValue
}

func getInt(key string, defaultValue int) int {
	if value := os.Getenv(key); value != "" {
		if i, err := strconv.Atoi(value); err == nil {
			return i
		}
	}
	return defaultValue
}

func getDuration(key string, defaultValue time.Duration) time.Duration {
	if value := os.Getenv(key); value != "" {
		if d, err := time.ParseDuration(value); err == nil {
			return d
		}
	}
	return defaultValue
}

func getSlice(key string, defaultValue []string) []string {
	if value := os.Getenv(key); value != "" {
		return strings.Split(value, ",")
	}
	return defaultValue
}
