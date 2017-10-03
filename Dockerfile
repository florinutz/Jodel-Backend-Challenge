FROM node:8-alpine

RUN mkdir /src
WORKDIR /src

COPY ./config /src/config

COPY ./app/package.json /src/package.json
RUN npm install
RUN ln -s ./app/test test

COPY ./app/nodemon.json /src/nodemon.json
CMD npm start

EXPOSE 80
