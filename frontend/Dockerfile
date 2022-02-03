FROM node:16

WORKDIR /usr/app

COPY package.json .
RUN npm install --quiet
RUN npm install i dotenv

COPY . .

EXPOSE 3000

CMD npm start
