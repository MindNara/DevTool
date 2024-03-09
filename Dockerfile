FROM node:latest

WORKDIR /app

COPY package.json /app

COPY .env .

RUN npm install

COPY . /app

EXPOSE 3000

CMD ["npm", "run", "dev"]