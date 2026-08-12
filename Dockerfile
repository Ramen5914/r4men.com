# Build stage
FROM oven/bun:1 AS builder

WORKDIR /app

# Install dependencies first for better layer caching
COPY package.json bun.lockb* ./
RUN bun install --frozen-lockfile

# Build the Next.js app
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN bun run build


# Runtime stage
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Next standalone output needs these artifacts
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

CMD ["node", ".next/standalone/server.js"]
