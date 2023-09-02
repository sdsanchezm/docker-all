FROM node:14
WORKDIR /usr/src/app
COPY ./appfolder/package*.json ./
RUN npm install
RUN npm install -g nodemon
COPY . .
EXPOSE 3001
CMD ["npx", "nodemon", "index.js"]
