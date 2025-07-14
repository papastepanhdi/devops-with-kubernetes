FROM node:alpine

WORKDIR /usr/src/app

COPY package* ./

RUN npm ci

COPY ../1.1-getting-started .

CMD ["npm", "start"]