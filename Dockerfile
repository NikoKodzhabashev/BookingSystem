FROM node:14 AS builder

WORKDIR /app

COPY package.json yarn.lock ./
COPY prisma ./prisma/

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

FROM node:14 AS runner

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json /app/yarn.lock ./
COPY --from=builder /app/dist ./dist

EXPOSE 3000
CMD [ "yarn", "start:prod" ]
