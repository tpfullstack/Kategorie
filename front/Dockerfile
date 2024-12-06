FROM node:21.7.3-alpine

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm install -g @angular/cli

RUN npm install --legacy-peer-deps

ENTRYPOINT ["ng", "serve"]
