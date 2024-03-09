FROM node:latest

WORKDIR /app

COPY package.json /app

RUN npm install

RUN npm run dev

COPY . /app

EXPOSE 3000

CMD ["npm", "run", "start"]