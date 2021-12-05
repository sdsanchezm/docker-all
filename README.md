# Docker

- This is a personal repo to track the work with docker.
- Education purposes only

Tracking personal docker related work.

- Create a docker
```
sudo docker run -d --name app -p 3000:3000 --env MONGO_URL=mongodb://db:27017/test platzyapp
```

- Inspect the network configuration
```
sudo docker network inspect platzynetw
```


- Create a network connection
```
sudo docker network connect platzynet db
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

- Check the configuration of a docker
```
sudo docker inspect db
```

- Create a Volume
```
sudo docker volume create dbdata
```

- Run the Docker using the volume created
```
sudo docker run -d --name db --mount src=dbdata,dst=/data/db mongo
```

- Create a bind mount
```
sudo docker run -d --name db -v /home/ss/progs/PL-Docker/folderDocker1:/data/db mongo
```

- Enter into a docker and execute bash
```
sudo docker exec -it db bash 
```

- Delete a docker
```
docker rm myDocker
```

- Rename a docker
```
docker rename oldNAme newName 
```

- Delete all the non working containers 
```
docker myDocker prune
```

- To get  the main process (PID 1) of the docker, to kill the process after
```
sudo docker inspect --format '{{.State.Pid}}' ubuntu1 
```
