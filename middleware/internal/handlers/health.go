package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/clayworks/middleware/internal/services"
)

type HealthHandler struct {
	cache  *services.CacheService
	strapi *services.StrapiService
}

func NewHealthHandler(cache *services.CacheService, strapi *services.StrapiService) *HealthHandler {
	return &HealthHandler{
		cache:  cache,
		strapi: strapi,
	}
}

type HealthResponse struct {
	Status  string            `json:"status"`
	Version string            `json:"version"`
	Checks  map[string]string `json:"checks"`
}

func (h *HealthHandler) Health(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(HealthResponse{
		Status:  "ok",
		Version: "1.0.0",
	})
}

func (h *HealthHandler) Ready(w http.ResponseWriter, r *http.Request) {
	checks := make(map[string]string)

	// Check Redis
	if h.cache.IsConnected() {
		checks["redis"] = "ok"
	} else {
		checks["redis"] = "unavailable"
	}

	// Check Strapi
	if h.strapi.IsHealthy() {
		checks["strapi"] = "ok"
	} else {
		checks["strapi"] = "unavailable"
	}

	status := "ok"
	statusCode := http.StatusOK

	// Strapi is required, Redis is optional
	if checks["strapi"] != "ok" {
		status = "degraded"
		statusCode = http.StatusServiceUnavailable
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(statusCode)
	json.NewEncoder(w).Encode(HealthResponse{
		Status:  status,
		Version: "1.0.0",
		Checks:  checks,
	})
}
