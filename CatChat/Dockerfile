FROM node:alpine AS build

WORKDIR /app

COPY package.json ./
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build

# Debugging step
FROM alpine:latest
COPY --from=build /app/build /build
CMD ["sh"]