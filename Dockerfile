ARG SERVICE_DOMAIN
ARG SERVICE_NAME

FROM ${SERVICE_DOMAIN}/${SERVICE_NAME}:base as builder
WORKDIR /var/service
COPY src src
COPY node_modules node_modules
COPY schema.prisma schema.prisma
COPY package.json package.json
COPY package-lock.json package-lock.json
COPY nest-cli.json nest-cli.json
COPY tsconfig.build.json tsconfig.build.json
COPY tsconfig.json tsconfig.json
RUN npm install
RUN npm run prisma:generate
RUN npm run build

ARG DATABASE_URL

FROM ${SERVICE_DOMAIN}/${SERVICE_NAME}:base
WORKDIR /var/service
COPY --from=builder /var/service/dist dist
COPY --from=builder /var/service/schema.prisma schema.prisma
COPY --from=builder /var/service/node_modules node_modules
COPY --from=builder /var/service/package.json package.json

CMD ["node", "dist/main"]
