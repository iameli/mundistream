FROM node:14

WORKDIR /app
ADD scripts/strip-deps.js scripts/strip-deps.js
ADD package.json package.json
RUN node scripts/strip-deps.js
RUN yarn install --ignore-scripts
ADD dist-server dist-server

CMD node dist-server/mundistream.js
