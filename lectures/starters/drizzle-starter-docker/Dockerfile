# Stage 1: Build workerd
FROM ubuntu:latest AS workerd-builder
ARG WORKERD_VERSION=v1.20250917.0
ARG TARGETARCH
WORKDIR /workdir

RUN apt-get update && apt-get install -y curl ca-certificates

# Download the correct workerd binary based on architecture
RUN if [ "${TARGETARCH}" = "amd64" ]; then \
        curl -LO https://github.com/cloudflare/workerd/releases/download/${WORKERD_VERSION}/workerd-linux-64.gz && \
        gunzip workerd-linux-64.gz && mv workerd-linux-64 workerd; \
    elif [ "${TARGETARCH}" = "arm64" ]; then \
        curl -LO https://github.com/cloudflare/workerd/releases/download/${WORKERD_VERSION}/workerd-linux-arm64.gz && \
        gunzip workerd-linux-arm64.gz && mv workerd-linux-arm64 workerd; \
    else \
        echo "Unsupported architecture: ${TARGETARCH}" && exit 1; \
    fi

RUN chmod +x workerd

# Copy required shared libraries
RUN mkdir lib && \
    cp /lib/*-linux-gnu/libdl.so.2 lib/libdl.so.2 2>/dev/null || cp /lib/*/libdl.so.2 lib/libdl.so.2 && \
    cp /lib/*-linux-gnu/librt.so.1 lib/librt.so.1 2>/dev/null || cp /lib/*/librt.so.1 lib/librt.so.1

# Stage 2: Development Node.js application
FROM node:22-slim

# Install system dependencies including curl for health checks
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        ca-certificates \
        libc6 \
        libgcc-s1 \
        libstdc++6 \
        curl && \
    rm -rf /var/lib/apt/lists/*

# Copy workerd and its dependencies from builder stage
COPY --from=workerd-builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/ca-certificates.crt
COPY --from=workerd-builder /workdir/workerd /usr/local/bin/workerd
COPY --from=workerd-builder /workdir/lib/* /lib/

# Set workerd environment
ENV SSL_CERT_FILE=/etc/ssl/certs/ca-certificates.crt

# Set working directory
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package files (these are less likely to change frequently)
COPY package*.json pnpm-lock.yaml* ./

# Install dependencies
RUN pnpm install
RUN pnpm add vite --save-dev || npm install vite --save-dev

# Don't copy source code here - it will be mounted as a volume

# Run as root for development simplicity (Wrangler needs to write config files)
# Note: This is acceptable for development environments

# Expose port
EXPOSE 5173

# Start the application with host binding for Docker
CMD ["pnpm", "run", "dev", "--host", "0.0.0.0"]