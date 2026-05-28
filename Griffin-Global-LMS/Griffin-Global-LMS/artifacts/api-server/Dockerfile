FROM node:24-alpine AS builder
WORKDIR /app
RUN npm install -g pnpm@10
COPY package.json pnpm-workspace.yaml ./
COPY tsconfig.base.json tsconfig.json ./
COPY lib/ ./lib/
COPY artifacts/api-server/package.json ./artifacts/api-server/package.json
RUN pnpm install --frozen-lockfile
COPY artifacts/api-server/ ./artifacts/api-server/
RUN pnpm --filter @griffin-lms/api run build

FROM node:24-alpine
WORKDIR /app
RUN npm install -g pnpm@10
COPY package.json pnpm-workspace.yaml ./
COPY lib/ ./lib/
COPY artifacts/api-server/package.json ./artifacts/api-server/package.json
RUN pnpm install --frozen-lockfile --prod
COPY --from=builder /app/artifacts/api-server/dist ./artifacts/api-server/dist
ENV NODE_ENV=production PORT=5000
EXPOSE 5000
CMD ["node", "--enable-source-maps", "./artifacts/api-server/dist/index.mjs"]
