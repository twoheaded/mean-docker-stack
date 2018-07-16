FROM node:alpine AS build

WORKDIR /app

COPY package*.json ./

ENV NPM_CONFIG_LOGLEVEL warn
RUN npm install

COPY . ./

ARG STAGE=production

RUN $(npm bin)/ng build --configuration=$STAGE && \
    $(npm bin)/ng run client:ssr:$STAGE && \
    npm run webpack:server



FROM keymetrics/pm2:latest-alpine AS release

WORKDIR /app

COPY --from=build /app/dist ./dist
COPY --from=build /app/ecosystem.config.js ./

EXPOSE 4000

CMD [ "pm2-runtime", "start", "ecosystem.config.js" ]
