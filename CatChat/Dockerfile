# Сначала создаём билд приложения React
FROM node:alpine AS build

WORKDIR /app

COPY package.json package.json
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

# Затем используем Nginx для отдачи статических файлов
FROM nginx:stable-alpine

# Копируем билд в директорию Nginx для статических файлов
COPY --from=build /app/build /usr/share/nginx/html  
COPY ./dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]