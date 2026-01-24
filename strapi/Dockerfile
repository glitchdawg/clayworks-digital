# Strapi Production Dockerfile
# Multi-stage build for optimized production image

# ==============================================================================
# Builder Stage
# ==============================================================================
FROM node:20-slim AS builder

# Install build dependencies for native modules
RUN apt-get update && apt-get install -y \
    build-essential \
    python3 \
    libvips-dev \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /opt/app

# Copy package files
COPY package.json package-lock.json ./

# Install ALL dependencies (including dev for building)
RUN npm config set fetch-retry-maxtimeout 600000 -g && npm ci

# Copy source files
COPY . .

# Build admin panel
ENV NODE_ENV=production
RUN npm run build

# Note: Don't prune - Strapi v5 needs @strapi/admin in node_modules to serve admin panel

# ==============================================================================
# Runner Stage
# ==============================================================================
FROM node:20-slim AS runner

# Install only runtime dependencies
RUN apt-get update && apt-get install -y \
    libvips-dev \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /opt/app

# Create non-root user
RUN groupadd --system --gid 1001 strapi && \
    useradd --system --uid 1001 --gid strapi strapi

# Copy built artifacts and production modules from builder
COPY --from=builder /opt/app/node_modules ./node_modules
COPY --from=builder /opt/app/dist ./dist
COPY --from=builder /opt/app/public ./public
COPY --from=builder /opt/app/config ./config
COPY --from=builder /opt/app/src ./src
COPY --from=builder /opt/app/package.json ./package.json
COPY --from=builder /opt/app/favicon.png ./favicon.png

# Create home directory for strapi user and ensure correct permissions
RUN mkdir -p /home/strapi && \
    mkdir -p public/uploads && \
    chown -R strapi:strapi /opt/app /home/strapi

USER strapi

EXPOSE 1337

HEALTHCHECK --interval=30s --timeout=10s --start-period=90s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:1337/_health || exit 1

CMD ["npm", "run", "start"]
