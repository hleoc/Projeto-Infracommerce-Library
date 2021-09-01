FROM node:14-alpine3.11

RUN apk update && apk add bash

WORKDIR /app

ENV NODE_ENV=prod

COPY ./package.json ./
RUN npm install
COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]
