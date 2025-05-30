# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /usr/src/app

# Install all dependencies (including dev)
COPY package*.json ./
RUN npm install

# Copy source files
COPY . .

# Build the app
RUN npm run build

# Stage 2: Production image
FROM node:18-alpine

WORKDIR /usr/src/app

# Copy only production dependencies
COPY package*.json ./
RUN npm install --only=production

# Copy built files from the builder stage
COPY --from=builder /usr/src/app/dist ./dist

# Copy any other files your app needs (e.g., .env, public folder)
# COPY --from=builder /usr/src/app/public ./public

# Expose the port
EXPOSE 3000

# Run the app
CMD ["node", "dist/src/main.js"]
