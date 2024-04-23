FROM node:lts-bullseye as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

##step 2
FROM nginx:alpine
ADD ./config/default.conf /etc/nginx/config.d/default.conf
COPY --from=build /app/dist /var/wwww/app
EXPOSE 80
CMD [ "nginx","-g","daemon offf;" ]

