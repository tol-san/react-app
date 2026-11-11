# Multi-stage build for React SPA with Vite and Bun

# ================================
# Stage 1: Build Stage
# ================================
FROM oven/bun:1-alpine AS builder

WORKDIR /app

# Copy package definitions and lockfile first for Docker layer caching
COPY package.json bun.lock* ./

# Install dependencies cleanly
RUN bun install --frozen-lockfile

# Copy all source files
COPY . .

# Compile TypeScript and build production bundle into /app/dist
RUN bun run build

# ================================
# Stage 2: Production Web Server
# ================================
FROM nginx:alpine AS runner

# Remove default nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy built application from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom optimized Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Healthcheck for container runtimes and load balancers
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1/healthz || exit 1

# Start Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
