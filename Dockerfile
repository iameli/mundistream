FROM node:14

WORKDIR /app
ADD package.json package.json
ADD yarn.lock yarn.lock
RUN yarn install --prod --verbose
ADD dist-server dist-server
RUN dist-server/mundistream.js
