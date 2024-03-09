FROM node:latest

WORKDIR /app

COPY package.json /app

COPY .env .

RUN npm install

RUN npm run dev

COPY . /app

EXPOSE 3000

CMD ["npm", "run", "start"]