# docker-all1
Tracking personal docker related work.

- Create a docker
```
sudo docker run -d --name app -p 3000:3000 --env MONGO_URL=mongodb://db:27017/test platziapp
```

- Inspect the network configuration
```
sudo docker network inspect platzynetw
```


- Create a network connection
```
sudo docker network connect platzinet db
```

- Create a docker, based on the image platzyapp, using the name app, seting the variable MONGO_URL, routing the ports 3000 to 3000. 
```
sudo docker run -d --name app -p 3000:3000 --env MONGO_URL=mongodb://db:27017/test platzyapp
```

- Template of a Dockerfile
```
FROM node:14

COPY ["package.json", "package-lock.json", "/usr/src/"]

WORKDIR /usr/src

RUN npm install

COPY [".", "/usr/src/"]

EXPOSE 3000

CMD ["npx", "nodemon", "index.js"]
```

- Check the list of images
```
docker image ls 
```

- Check the list of running dockers:
```
docker ps -a
```



