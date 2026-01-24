package services

import (
	"fmt"
	"io"
	"net/http"
	"net/url"
	"time"

	"github.com/clayworks/middleware/internal/config"
	"github.com/rs/zerolog/log"
)

type StrapiService struct {
	baseURL    string
	token      string
	httpClient *http.Client
	cache      *CacheService
}

func NewStrapiService(cfg *config.Config, cache *CacheService) *StrapiService {
	return &StrapiService{
		baseURL: cfg.StrapiURL,
		token:   cfg.StrapiToken,
		httpClient: &http.Client{
			Timeout: 10 * time.Second,
		},
		cache: cache,
	}
}

func (s *StrapiService) GetCollection(contentType string, query url.Values) ([]byte, bool, error) {
	cacheKey := fmt.Sprintf("collection:%s:%s", contentType, query.Encode())

	// Check cache first
	if cached, found := s.cache.Get(cacheKey); found {
		log.Debug().Str("type", contentType).Msg("Cache hit")
		return cached, true, nil
	}

	// Fetch from Strapi
	endpoint := fmt.Sprintf("%s/api/%s", s.baseURL, contentType)
	if len(query) > 0 {
		endpoint = fmt.Sprintf("%s?%s", endpoint, query.Encode())
	}

	data, err := s.fetch(endpoint, false)
	if err != nil {
		return nil, false, err
	}

	// Cache the response
	s.cache.SetRaw(cacheKey, data)

	return data, false, nil
}

func (s *StrapiService) GetSingle(contentType string, id string, query url.Values) ([]byte, bool, error) {
	cacheKey := fmt.Sprintf("single:%s:%s:%s", contentType, id, query.Encode())

	// Check cache first
	if cached, found := s.cache.Get(cacheKey); found {
		log.Debug().Str("type", contentType).Str("id", id).Msg("Cache hit")
		return cached, true, nil
	}

	// Fetch from Strapi
	endpoint := fmt.Sprintf("%s/api/%s/%s", s.baseURL, contentType, id)
	if len(query) > 0 {
		endpoint = fmt.Sprintf("%s?%s", endpoint, query.Encode())
	}

	data, err := s.fetch(endpoint, false)
	if err != nil {
		return nil, false, err
	}

	// Cache the response
	s.cache.SetRaw(cacheKey, data)

	return data, false, nil
}

func (s *StrapiService) GetPreview(contentType string, id string) ([]byte, error) {
	// Previews are never cached
	endpoint := fmt.Sprintf("%s/api/%s/%s?publicationState=preview", s.baseURL, contentType, id)
	return s.fetch(endpoint, true)
}

func (s *StrapiService) GetPageBySlug(slug string) ([]byte, bool, error) {
	cacheKey := fmt.Sprintf("page:%s", slug)

	// Check cache first
	if cached, found := s.cache.Get(cacheKey); found {
		log.Debug().Str("slug", slug).Msg("Cache hit")
		return cached, true, nil
	}

	// Fetch from Strapi using filters
	endpoint := fmt.Sprintf("%s/api/pages?filters[slug][$eq]=%s&populate=*", s.baseURL, url.QueryEscape(slug))

	data, err := s.fetch(endpoint, false)
	if err != nil {
		return nil, false, err
	}

	// Cache the response
	s.cache.SetRaw(cacheKey, data)

	return data, false, nil
}

func (s *StrapiService) fetch(endpoint string, isPreview bool) ([]byte, error) {
	req, err := http.NewRequest("GET", endpoint, nil)
	if err != nil {
		return nil, err
	}

	req.Header.Set("Content-Type", "application/json")
	if s.token != "" {
		req.Header.Set("Authorization", "Bearer "+s.token)
	}

	log.Debug().Str("endpoint", endpoint).Msg("Fetching from Strapi")

	resp, err := s.httpClient.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		body, _ := io.ReadAll(resp.Body)
		return nil, fmt.Errorf("strapi returned status %d: %s", resp.StatusCode, string(body))
	}

	return io.ReadAll(resp.Body)
}

func (s *StrapiService) IsHealthy() bool {
	resp, err := s.httpClient.Get(s.baseURL + "/_health")
	if err != nil {
		return false
	}
	defer resp.Body.Close()
	return resp.StatusCode == http.StatusOK || resp.StatusCode == http.StatusNoContent
}

// InvalidateCache clears cache for a content type (for webhook integration)
func (s *StrapiService) InvalidateCache(contentType string) error {
	return s.cache.DeletePattern(fmt.Sprintf("*:%s:*", contentType))
}
