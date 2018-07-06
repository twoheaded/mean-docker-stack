FROM keymetrics/pm2:latest-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . ./

run ls

EXPOSE 3000

CMD [ "pm2-runtime", "start", "ecosystem.config.js" ]