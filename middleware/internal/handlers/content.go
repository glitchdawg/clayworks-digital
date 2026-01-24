package handlers

import (
	"net/http"

	"github.com/clayworks/middleware/internal/services"
	"github.com/go-chi/chi/v5"
)

type ContentHandler struct {
	strapi *services.StrapiService
}

func NewContentHandler(strapi *services.StrapiService) *ContentHandler {
	return &ContentHandler{strapi: strapi}
}

func (h *ContentHandler) GetCollection(w http.ResponseWriter, r *http.Request) {
	contentType := chi.URLParam(r, "type")
	query := r.URL.Query()

	data, cached, err := h.strapi.GetCollection(contentType, query)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadGateway)
		return
	}

	h.writeResponse(w, data, cached)
}

func (h *ContentHandler) GetSingle(w http.ResponseWriter, r *http.Request) {
	contentType := chi.URLParam(r, "type")
	id := chi.URLParam(r, "id")
	query := r.URL.Query()

	data, cached, err := h.strapi.GetSingle(contentType, id, query)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadGateway)
		return
	}

	h.writeResponse(w, data, cached)
}

func (h *ContentHandler) GetPage(w http.ResponseWriter, r *http.Request) {
	slug := chi.URLParam(r, "slug")

	data, cached, err := h.strapi.GetPageBySlug(slug)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadGateway)
		return
	}

	h.writeResponse(w, data, cached)
}

func (h *ContentHandler) GetPreview(w http.ResponseWriter, r *http.Request) {
	contentType := chi.URLParam(r, "type")
	id := chi.URLParam(r, "id")

	data, err := h.strapi.GetPreview(contentType, id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadGateway)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("X-Cache-Status", "BYPASS")
	w.Header().Set("Cache-Control", "no-store")
	w.Write(data)
}

func (h *ContentHandler) writeResponse(w http.ResponseWriter, data []byte, cached bool) {
	w.Header().Set("Content-Type", "application/json")

	if cached {
		w.Header().Set("X-Cache-Status", "HIT")
	} else {
		w.Header().Set("X-Cache-Status", "MISS")
	}

	w.Write(data)
}
