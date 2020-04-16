FROM node:13

WORKDIR /app

COPY server/ /app/

RUN npm i --no-cache

EXPOSE 3000

RUN npm install -g typescript
RUN npm install -g ts-node
RUN npm install -g nodemon

CMD ["npm", "start"]