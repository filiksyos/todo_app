# Development stage
FROM node:20-alpine AS dev

# Install system dependencies
RUN apk add --no-cache \
    libc6-compat \
    python3 \
    make \
    g++ \
    git

WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy configuration files first
COPY package.json pnpm-lock.yaml* .npmrc ./

# Install dependencies with specific flags
RUN pnpm install --no-frozen-lockfile --shamefully-hoist

# Copy the rest of the application
COPY . .

# Build the application in development mode
RUN pnpm run build --no-lint

# Expose port 3000
EXPOSE 3000

# Start development server with specific Node.js flags
CMD ["node", "--max-old-space-size=4096", "node_modules/.bin/next", "dev"]

# Production stage
FROM node:20-alpine AS prod

WORKDIR /app

# Install system dependencies
RUN apk add --no-cache \
    libc6-compat \
    python3 \
    make \
    g++

# Install pnpm globally
RUN npm install -g pnpm

# Copy configuration files first
COPY package.json pnpm-lock.yaml* .npmrc ./

# Install dependencies
RUN pnpm install --prod --no-frozen-lockfile --shamefully-hoist

# Copy the rest of the application
COPY . .

# Build the application
RUN pnpm build --no-lint

# Expose port 3000
EXPOSE 3000

# Start production server
CMD ["pnpm", "start"] 