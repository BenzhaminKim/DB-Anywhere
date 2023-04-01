FROM node:19-alpine3.16 as frontend

WORKDIR /app

COPY package.json .

RUN npm i

COPY . .

RUN npm run build

FROM nginx:alpine

COPY nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf
COPY --from=frontend /app/dist /usr/share/nginx/html/
