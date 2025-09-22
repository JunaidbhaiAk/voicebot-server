# Stage 1: Build Stage
FROM node:20 AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install all dependencies (dev + prod)
RUN npm install

# Copy the rest of the project
COPY . .

# Build TypeScript and bundle with tsup
RUN npm run build

# Stage 2: Production Stage
FROM node:20

WORKDIR /app

# Copy only package.json and package-lock.json
COPY package*.json ./

# Install only production dependencies
RUN npm install --production

# Copy built files from the builder stage
COPY --from=builder /app/dist ./dist

# Expose the port
EXPOSE 3000

# Run the production build
CMD ["node", "dist/index.js"]
