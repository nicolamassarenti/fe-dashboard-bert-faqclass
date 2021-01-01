FROM node:latest as build-stage
WORKDIR /app
COPY package/package*.json ./
RUN npm install
COPY package/ .
RUN npm run build

FROM nginx as production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist /app
EXPOSE 80
COPY container/nginx/nginx.conf /etc/nginx/nginx.conf