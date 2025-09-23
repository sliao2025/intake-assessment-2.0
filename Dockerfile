# ---- Build stage ----
    FROM node:20-alpine AS builder
    WORKDIR /app
    
    COPY package.json package-lock.json* yarn.lock* pnpm-lock.yaml* ./
    RUN \
      if [ -f pnpm-lock.yaml ]; then npm i -g pnpm && pnpm i --frozen-lockfile; \
      elif [ -f yarn.lock ]; then yarn --frozen-lockfile; \
      else npm ci; fi
    
    COPY . .
    ENV NODE_ENV=production
    RUN npm run build
    
    # ---- Runtime stage ----
    FROM node:20-alpine AS runner
    WORKDIR /app
    ENV NODE_ENV=production
    ENV PORT=8080
    
    COPY --from=builder /app/package.json ./
    COPY --from=builder /app/node_modules ./node_modules
    COPY --from=builder /app/.next ./.next
    COPY --from=builder /app/public ./public
    COPY --from=builder /app/prisma ./prisma
    
    EXPOSE 8080
    CMD ["npm", "run", "start", "--", "-p", "8080"]