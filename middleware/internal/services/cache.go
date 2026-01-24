package services

import (
	"context"
	"encoding/json"
	"time"

	"github.com/clayworks/middleware/internal/config"
	"github.com/redis/go-redis/v9"
	"github.com/rs/zerolog/log"
)

type CacheService struct {
	client *redis.Client
	ttl    time.Duration
	ctx    context.Context
}

func NewCacheService(cfg *config.Config) *CacheService {
	client := redis.NewClient(&redis.Options{
		Addr:     cfg.RedisURL,
		Password: cfg.RedisPassword,
		DB:       0,
	})

	ctx := context.Background()

	// Test connection
	_, err := client.Ping(ctx).Result()
	if err != nil {
		log.Warn().Err(err).Msg("Redis connection failed, caching disabled")
		return &CacheService{client: nil, ttl: cfg.CacheTTL, ctx: ctx}
	}

	log.Info().Str("addr", cfg.RedisURL).Msg("Redis connected")

	return &CacheService{
		client: client,
		ttl:    cfg.CacheTTL,
		ctx:    ctx,
	}
}

func (s *CacheService) Get(key string) ([]byte, bool) {
	if s.client == nil {
		return nil, false
	}

	val, err := s.client.Get(s.ctx, key).Bytes()
	if err != nil {
		return nil, false
	}

	return val, true
}

func (s *CacheService) Set(key string, value interface{}) error {
	if s.client == nil {
		return nil
	}

	data, err := json.Marshal(value)
	if err != nil {
		return err
	}

	return s.client.Set(s.ctx, key, data, s.ttl).Err()
}

func (s *CacheService) SetRaw(key string, data []byte) error {
	if s.client == nil {
		return nil
	}

	return s.client.Set(s.ctx, key, data, s.ttl).Err()
}

func (s *CacheService) Delete(key string) error {
	if s.client == nil {
		return nil
	}

	return s.client.Del(s.ctx, key).Err()
}

func (s *CacheService) DeletePattern(pattern string) error {
	if s.client == nil {
		return nil
	}

	keys, err := s.client.Keys(s.ctx, pattern).Result()
	if err != nil {
		return err
	}

	if len(keys) > 0 {
		return s.client.Del(s.ctx, keys...).Err()
	}

	return nil
}

func (s *CacheService) IsConnected() bool {
	if s.client == nil {
		return false
	}

	_, err := s.client.Ping(s.ctx).Result()
	return err == nil
}

func (s *CacheService) Close() {
	if s.client != nil {
		s.client.Close()
	}
}
