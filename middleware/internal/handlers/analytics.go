package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/clayworks/middleware/internal/models"
	"github.com/clayworks/middleware/internal/services"
)

type AnalyticsHandler struct {
	analytics *services.AnalyticsService
}

func NewAnalyticsHandler(analytics *services.AnalyticsService) *AnalyticsHandler {
	return &AnalyticsHandler{analytics: analytics}
}

type IngestResponse struct {
	Success bool   `json:"success"`
	Count   int    `json:"count"`
	Message string `json:"message,omitempty"`
}

func (h *AnalyticsHandler) IngestEvents(w http.ResponseWriter, r *http.Request) {
	var batch models.AnalyticsEventBatch

	if err := json.NewDecoder(r.Body).Decode(&batch); err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(IngestResponse{
			Success: false,
			Message: "Invalid request body",
		})
		return
	}

	// Process each event
	for _, event := range batch.Events {
		h.analytics.TrackEvent(event)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(IngestResponse{
		Success: true,
		Count:   len(batch.Events),
	})
}
