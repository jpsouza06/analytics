FROM node:18.18.0-alpine AS builder
RUN mkdir /analytics
WORKDIR /analytics
COPY . .
RUN npm install
RUN npm run build

FROM node:18.16.0-alpine
RUN mkdir -p /analytics
WORKDIR /analytics
COPY --from=builder /analytics/dist .
COPY --from=builder /analytics/prisma/ ./prisma/
COPY --from=builder /analytics/node_modules ./node_modules
COPY ./docker-entrypoint.sh .

ENTRYPOINT ["/bin/sh", "./docker-entrypoint.sh"]



