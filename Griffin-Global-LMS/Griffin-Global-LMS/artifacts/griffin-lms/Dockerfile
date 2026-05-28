FROM node:24-alpine AS builder
WORKDIR /app
RUN npm install -g pnpm@10
COPY package.json pnpm-workspace.yaml ./
COPY tsconfig.base.json tsconfig.json ./
COPY lib/ ./lib/
COPY artifacts/griffin-lms/package.json ./artifacts/griffin-lms/package.json
RUN pnpm install --frozen-lockfile
COPY artifacts/griffin-lms/ ./artifacts/griffin-lms/
ENV BASE_PATH=/ PORT=3000 NODE_ENV=production
RUN pnpm --filter @griffin-lms/web run build

FROM nginx:alpine
COPY --from=builder /app/artifacts/griffin-lms/dist /usr/share/nginx/html
COPY artifacts/griffin-lms/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
