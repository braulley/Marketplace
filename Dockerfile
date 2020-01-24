FROM node:latest

RUN mkdir /usr/modulo3
WORKDIR /usr/modulo3

COPY package.json package-lock.json ./
RUN npm install

COPY . ./

EXPOSE 3000

CMD node index.js