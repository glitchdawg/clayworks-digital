# Strapi Production Dockerfile
# Single-stage build for Strapi v5 compatibility

FROM node:20-slim

# Install dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    python3 \
    libvips-dev \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /opt/app

# Create non-root user
RUN groupadd --system --gid 1001 strapi && \
    useradd --system --uid 1001 --gid strapi strapi && \
    mkdir -p /home/strapi && \
    chown -R strapi:strapi /home/strapi

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm config set fetch-retry-maxtimeout 600000 -g && npm ci

# Copy source files
COPY . .

# Build admin panel
ENV NODE_ENV=production
RUN npm run build

# Set ownership
RUN chown -R strapi:strapi /opt/app

USER strapi

EXPOSE 1337

CMD ["npm", "run", "start"]
