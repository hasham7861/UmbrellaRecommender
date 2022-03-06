FROM node:14
WORKDIR /usr/src/frontend
COPY "package*.json"  "./"
RUN npm install
COPY . .
EXPOSE 3000