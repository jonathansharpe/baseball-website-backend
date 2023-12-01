FROM node:latest
WORKDIR /app
COPY package*.json .
RUN npm install
COPY certs /app/certs
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
