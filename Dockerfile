FROM node:20

ENV NODE_ENV=production

WORKDIR /app

# Copy package.json and package-lock.json (if it exists)
COPY ["package.json", "package-lock.json*", "./"]

# Install production dependencies and build tools
RUN npm install --production && npm install typescript tsup --save-dev

# Copy the entire project
COPY . .

# Run the build script to compile TypeScript and bundle with tsup
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Run the production script
CMD ["node", "dist/index.js"]