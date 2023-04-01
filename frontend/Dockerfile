FROM node:16.19.0 as frontend

WORKDIR /app

COPY package.json .

RUN npm i

COPY . .

RUN npm run build

FROM nginx:alpine

COPY nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf
COPY --from=frontend /app/dist /usr/share/nginx/html/
