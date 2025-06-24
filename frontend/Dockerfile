# Stage 1: Use Node.js image to build React
FROM node:22-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm install

# This command copies everything, including your 'nginx' folder, into the build stage
COPY . .

RUN npm run build

# Stage 2: Serve the app from Nginx
FROM nginx:alpine

# Copy the production build from the 'build' stage
COPY --from=build /app/build /usr/share/nginx/html

# Copy the custom Nginx configuration FROM the 'build' stage
COPY --from=build /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 to the outside world
EXPOSE 80

# Start Nginx when the container launches
CMD ["nginx", "-g", "daemon off;"]