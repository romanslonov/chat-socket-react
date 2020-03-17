FROM node:13

WORKDIR /app

COPY server/package.json .

RUN npm install

COPY server .

EXPOSE 3000

RUN npm install -g nodemon

CMD ["node", "server.js"]
