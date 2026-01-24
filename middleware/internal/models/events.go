package models

import "time"

// AnalyticsEvent represents a tracked analytics event
type AnalyticsEvent struct {
	Name       string                 `json:"name"`
	Category   string                 `json:"category,omitempty"`
	Label      string                 `json:"label,omitempty"`
	Value      float64                `json:"value,omitempty"`
	SessionID  string                 `json:"session_id,omitempty"`
	UserID     string                 `json:"user_id,omitempty"`
	Timestamp  time.Time              `json:"timestamp,omitempty"`
	Properties map[string]interface{} `json:"properties,omitempty"`
}

// AnalyticsEventBatch represents multiple events to be processed
type AnalyticsEventBatch struct {
	Events []AnalyticsEvent `json:"events"`
}

// PageViewEvent is a specialized event for page views
type PageViewEvent struct {
	Path      string `json:"path"`
	Referrer  string `json:"referrer,omitempty"`
	UserAgent string `json:"user_agent,omitempty"`
	SessionID string `json:"session_id,omitempty"`
}
