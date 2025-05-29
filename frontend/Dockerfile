# Use Node.js image to build React
FROM node:22.14.0 AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Use nginx to serve React build
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
