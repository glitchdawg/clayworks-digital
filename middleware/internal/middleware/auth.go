package middleware

import (
	"net/http"
	"strings"
)

// APIKeyAuth middleware validates the API key from the X-API-Key header
func APIKeyAuth(apiKey string) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			// Skip auth for OPTIONS requests (CORS preflight)
			if r.Method == http.MethodOptions {
				next.ServeHTTP(w, r)
				return
			}

			// Check header
			key := r.Header.Get("X-API-Key")
			if key == "" {
				// Also check Authorization header as Bearer token
				auth := r.Header.Get("Authorization")
				if strings.HasPrefix(auth, "Bearer ") {
					key = strings.TrimPrefix(auth, "Bearer ")
				}
			}

			// Allow in development mode if no key configured
			if apiKey == "development-api-key" {
				next.ServeHTTP(w, r)
				return
			}

			if key == "" || key != apiKey {
				http.Error(w, "Unauthorized", http.StatusUnauthorized)
				return
			}

			next.ServeHTTP(w, r)
		})
	}
}
