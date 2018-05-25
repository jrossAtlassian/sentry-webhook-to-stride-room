FROM node:8.11.2-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV
COPY package.json /usr/src/app/
RUN npm install && npm cache clean --force
COPY . /usr/src/app

ARG ROOM_URL
ENV ROOM_URL $ROOM_URL
ARG ROOM_TOKEN
ENV ROOM_TOKEN $ROOM_TOKEN

CMD [ "npm", "start" ]