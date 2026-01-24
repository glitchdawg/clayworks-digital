# ClayWorks CMS - Strapi Integration

A headless CMS integration for the ClayWorks website with Go middleware API gateway and Docker deployment.

## Architecture

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│   Next.js App   │────▶│   Go Middleware  │────▶│   Strapi CMS    │
│  (Port 3000)    │     │   (Port 8080)    │     │   (Port 1337)   │
└─────────────────┘     └──────────────────┘     └─────────────────┘
                               │                         │
                               ▼                         ▼
                        ┌──────────┐             ┌──────────────┐
                        │  Redis   │             │  PostgreSQL  │
                        │  (6379)  │             │    (5432)    │
                        └──────────┘             └──────────────┘
```

## Quick Start

### 1. Start Services with Docker

```bash
# Copy environment file
cp .env.development .env

# Start all services
docker-compose up -d

# View logs
docker-compose logs -f
```

### 2. Access Strapi Admin

1. Open http://localhost:1337/admin
2. Create your admin account
3. Go to Settings → API Tokens
4. Create a new token with "Full access"
5. Copy the token to `.env` as `STRAPI_API_TOKEN`

### 3. Run Content Migration

```bash
# Install dependencies
cd scripts
npm install

# Set your API token
export STRAPI_API_TOKEN=your-token-here

# Run migration
npm run migrate
```

### 4. Configure Next.js

Add to `clayworks-main/.env.local`:

```env
NEXT_PUBLIC_MIDDLEWARE_URL=http://localhost:8080
STRAPI_API_KEY=development-api-key
PREVIEW_SECRET=your-preview-secret
```

## Services

| Service    | URL                        | Purpose                    |
|------------|----------------------------|----------------------------|
| Strapi     | http://localhost:1337      | CMS Admin Panel            |
| Middleware | http://localhost:8080      | API Gateway                |
| PostgreSQL | localhost:5432             | Database                   |
| Redis      | localhost:6379             | Cache                      |

## API Endpoints

### Middleware API (Port 8080)

```
GET  /api/v1/content/:type          # Get collection
GET  /api/v1/content/:type/:id      # Get single item
GET  /api/v1/pages/:slug            # Get page by slug
GET  /api/v1/preview/:type/:id      # Preview draft content
POST /api/v1/analytics/events       # Track analytics events
GET  /health                        # Health check
GET  /ready                         # Readiness check
```

### Authentication

All protected endpoints require the `X-API-Key` header:

```bash
curl -H "X-API-Key: your-api-key" http://localhost:8080/api/v1/content/locations
```

## User Roles

| Role              | Permissions                                           |
|-------------------|-------------------------------------------------------|
| Super Admin       | Full access to all content and settings               |
| Content Manager   | Create, edit, publish content. No settings access.    |
| Content Editor    | Create and edit content. Cannot publish or delete.    |
| Marketing User    | Edit blogs, testimonials, case studies only.          |
| SEO Specialist    | Edit SEO fields and site settings. Read-only content. |

## Preview Mode

To preview unpublished content:

```
https://your-site.com/api/preview?secret=your-secret&slug=/blogs/my-draft
```

Exit preview mode:

```
https://your-site.com/api/exit-preview?redirect=/
```

## Production Deployment

### 1. Generate Secure Keys

```bash
# Generate random keys
openssl rand -base64 32  # For each key in .env
```

### 2. Update Environment

```env
ENVIRONMENT=production
POSTGRES_PASSWORD=secure-password
APP_KEYS=secure-key1,secure-key2,secure-key3,secure-key4
ADMIN_JWT_SECRET=secure-admin-jwt
API_KEY=secure-api-key
```

### 3. Deploy

```bash
docker-compose -f docker-compose.yml up -d
```

## Content Types

- **Hero Sections** - Page banners with video/image backgrounds
- **Locations** - Workspace locations with amenities
- **Testimonials** - Customer reviews
- **Blog Posts** - Articles with SEO fields
- **Case Studies** - Customer success stories
- **FAQs** - Categorized questions and answers
- **Job Listings** - Career opportunities
- **Team Members** - Leadership profiles
- **Partners** - Partner logos and links
- **Site Settings** - Global configuration

## Analytics Integration

The middleware includes analytics hooks ready for future integration:

```typescript
// Track custom events
fetch('/api/v1/analytics/events', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    events: [{
      name: 'button_click',
      category: 'engagement',
      properties: { button: 'download_guide' }
    }]
  })
});
```

Google Analytics integration can be enabled by setting `GOOGLE_ANALYTICS_ID` in the environment.
