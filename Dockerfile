FROM node:8-alpine

RUN npm install -g nodemon

RUN mkdir /src
WORKDIR /src

COPY ./app/package.json /src/package.json
RUN npm install
COPY ./app/nodemon.json /src/nodemon.json

CMD npm start

EXPOSE 80
