FROM node:19.4.0

WORKDIR /app

COPY package.json .

RUN npm i

COPY . .

ENTRYPOINT ["npm", "run", "dev"]