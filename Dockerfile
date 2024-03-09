FROM node:latest

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . .env

COPY . /app

EXPOSE 3000

CMD ["npm", "run", "dev"]