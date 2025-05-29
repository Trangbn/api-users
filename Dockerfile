# Use official Node.js LTS version as base image
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Install dependencies (including PostgreSQL client from package.json)
COPY package*.json ./
RUN npm install --production

# Copy source code
COPY . .

# Build the NestJS app (compile TS to JS)
RUN npm run build

# Expose port (default NestJS port)
EXPOSE 3000

# Set environment variables (optional defaults, override on run/deploy)
ENV DB_HOST=localhost
ENV DB_PORT=5432
ENV DB_USER=aaa
ENV DB_PASS=aaa
ENV DB_NAME=aaa

# Start the app
CMD ["node", "dist/main.js"]
