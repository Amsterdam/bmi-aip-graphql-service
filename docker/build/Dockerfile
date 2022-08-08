ARG SERVICE_DOMAIN
ARG SERVICE_NAME

FROM ${SERVICE_DOMAIN}/${SERVICE_NAME}:base

RUN apt-get update && apt-get install -y openssh-client git curl wget unzip

RUN npm install -g @nestjs/cli
