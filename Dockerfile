FROM node:20

ENV NODE_ENV=production

WORKDIR /app

# Copy package.json and package-lock.json
COPY ["package.json", "package-lock.json*", "./"]

# Install all dependencies (dev + prod)
RUN npm install

# Copy the rest of the project
COPY . .

# Build TypeScript code
RUN npm run build

# Remove dev dependencies to slim down image
RUN npm prune --production

# Expose port
EXPOSE 3000

# Run production
CMD ["node", "dist/index.js"]
