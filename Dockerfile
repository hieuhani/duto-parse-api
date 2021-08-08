FROM node:14-alpine

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --production
COPY ./cloud ./cloud
COPY ./src ./src

ENV NODE_ENV production
EXPOSE 1337
CMD [ "node", "src/server.js" ]
