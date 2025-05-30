# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /usr/src/app

# Install all dependencies (including dev)
COPY package*.json ./
RUN apk add --no-cache python3 make g++ \
    && npm install \
    && apk del python3 make g++

# Copy source files
COPY . .

# Build the app
RUN npm run build

# Stage 2: Production image
FROM node:18-alpine

WORKDIR /usr/src/app

# Install build tools temporarily for bcrypt native compilation
RUN apk add --no-cache python3 make g++

# Copy only production dependencies and build
COPY package*.json ./
RUN npm install --only=production

# Remove build tools to reduce image size
RUN apk del python3 make g++

# Copy built files from the builder stage
COPY --from=builder /usr/src/app/dist ./dist

# Expose the port
EXPOSE 3000

# Run the app
CMD ["node", "dist/src/main.js"]
