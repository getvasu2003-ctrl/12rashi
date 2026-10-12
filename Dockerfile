FROM node:20-slim AS builder

WORKDIR /app

# Install dependencies (including devDependencies for build & esbuild)
COPY package*.json .npmrc* ./
RUN npm install --legacy-peer-deps

# Copy source code and build Vite assets + server.js
COPY . .
RUN npm run build

# Production image
FROM node:20-slim AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=8080

COPY package*.json .npmrc* ./
RUN npm install --omit=dev --legacy-peer-deps

# Copy built distribution, public assets, and bundle
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/public ./public

EXPOSE 8080

CMD ["node", "dist/server.js"]
