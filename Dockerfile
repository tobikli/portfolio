# Build stage
FROM node:26.13.0-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install --global npm@12.2.1 && npm ci

# Copy application source and build
COPY . .

# Vite embeds this value at build time; an empty value hides the badge.
ARG VITE_BADGE_TEXT=
ENV VITE_BADGE_TEXT=${VITE_BADGE_TEXT}
RUN npm run build

# Production stage
FROM nginx:1.31.8-alpine AS runner

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy build artifacts from builder
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

# Container healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q --spider http://localhost/health || exit 1

CMD ["nginx", "-g", "daemon off;"]
