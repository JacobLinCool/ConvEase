FROM jacoblincool/playwright:chromium-light-server as chromium

RUN apk add --no-cache font-noto-cjk

FROM node:lts as builder

WORKDIR /app

RUN apt-get update && apt-get install -y \
  build-essential \
  python3 \
  && rm -rf /var/lib/apt/lists/*
RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build
RUN npm pkg delete scripts.prepare
RUN pnpm prune --production

FROM node:lts as bot

WORKDIR /app

COPY --from=builder /app/package.json /app/pnpm-lock.yaml ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

CMD ["node", "dist/index.js"]
