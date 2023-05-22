FROM node:18-alpine AS base

FROM base AS builder

RUN apk add --no-cache libc6-compat
RUN apk update

WORKDIR /app
RUN pnpm global add turbo
COPY . .
RUN turbo prune --scope=api --docker

FROM base AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app

COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm.lock ./pnpm.lock
RUN pnpm install

COPY --from=builder /app/out/full/ .

# RUN npx prisma generate

COPY turbo.json turbo.json

RUN pnpm turbo run build --filter=api...

FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 expressjs
RUN adduser --system --uid 1001 expressjs
USER expressjs
COPY --from=installer /app .

WORKDIR /app/apps/api
EXPOSE 3000
CMD ["pnpm", "dev"]