FROM node:14

WORKDIR /app

COPY package.json yarn.lock ./
COPY prisma ./prisma/

RUN yarn install

COPY . .

RUN yarn build