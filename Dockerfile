# Use official Node.js LTS version as base image
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if exists)
COPY package*.json ./

# Install all dependencies (including devDependencies)
RUN npm install

# Copy all source files to working directory
COPY . .

# Build the NestJS app (compile TypeScript to JavaScript)
RUN npm run build

# Remove devDependencies to slim down the image
RUN npm prune --production

# Expose the port your app runs on
EXPOSE 3000

# Start the app
CMD ["node", "dist/main.js"]
