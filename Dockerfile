FROM node:latest

MAINTAINER Loth Gabor <lgabster@gmail.com>

RUN mkdir -p /usr/api
WORKDIR /usr/api
COPY . /usr/api

RUN npm install

CMD [ "npm", "run", "node" ]
