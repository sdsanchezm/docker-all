# Docker

- This is a personal repo to track the work with docker.
- Education purposes only

### Hello World

- `docker run hello-world`

### Docker run

- docker run creates a container everytime we execute this command
    - `docker run`

### Create a docker
- 
    ```
    sudo docker run -d --name app -p 3000:3000 --env MONGO_URL=mongodb://db:27017/test platzyapp
    ```

### Inspect an image
- 
    ```
    sudo docker inspect <image>
    ```

### docker ps
- all docker names
    ```
    docker ps -a
    ```

### docker rm (remove a container)

- it uses the **name** of the container or the **id** of the container
    ```yaml
    docker rm hello-wolrd
    ```

### remove all stopped containers

- it uses the name of the container or the id of the container
    ```yaml
    docker container prune
    ```
s

### docker names
- This will use the hello-world image and assign the name "hello2" to this image
- no repeated names
    ```
    sudo docker run --name hello2  hello-word
    ```

### Rename a docker
- 
    ```
    docker rename oldNAme newName 
    ```

### Inspect the network configuration
    ```
    sudo docker network inspect platzynetw
    ```

### Run an ubuntu image

- creates a container but not started
    ```yaml
    docker run ubuntu
    ```
- with a name (using the modifier --name)
    ```yaml
    docker run --name ubuntuFirstName ubuntu
    ```

### log into the shell into a container

- `<image>` could be `ubuntu`
    ```yaml
    docker run -it <image>
    ```

### log into a container and detach from it (-dit)
- create a container named ubuntu2, using the image ubuntu, keep it running in the background to log after
    ```yaml
    docker run --name perritos -dit ubuntu
    ```
- log into the shell of the above container
    ```yaml
    docker attach perritos
    ```


## Lifecycle of a container

- the container process, is attached to a process in the image (/bin/bash in some cases) when we `exit` we stop the process, so the container stops as well
- to keep it running, i can specific the command that i want it to run
    - `tail -f /dev/null` is the command (it will get PID 1 in the container)
    - `-d` is the detach
    - in this case, `tail -f /dev/null` will keep running the container
    ```yaml
    docker run --name jamecho -d ubuntu tail -f /dev/null
    ```
- to run a command in a running container (perritos is the name of the container)
    ```yaml
    docker exec -it perritos bash
    ```
    - to verify when logged in into the container `ps -aux`
    - to exit: `exit`
    - the container will keep running, because the main process has not stopped yet
    - to stop it
    - `docker stop <containerName>` or in mac: `docker kill <containerName>`
        - Example:
            - `docker stop perritos`
            - `docker stop <container_id>` or `docker stop <container_name>`
        - or get the pid ion the local Linux system
            - `docker inspect --format '{{.State.Pid}}' perritos`
        - and kill the process using the pid obtained
            - `kill -9 <pid>`

- to run a stopped container
    - `docker start <container_name>`
    - `docker start perritos`
    - check `docker ps -a`
- to log into the previous started container (iamge name: perritosm, command: bash)
    - `docker exec -it perritos bash`
- to exit:
    - `exit`
- to stop it
    - `docker stop <containerName>` or in mac: `docker kill <containerName>`

- to check the output of a command (it the command is `tail -f /dev/null` the terminal might be stucked, recommended using with bash)
    ```yaml
    docker start -ai <container_name>
    ```
- to restart a container
    ```yaml
    docker restart <container_name>
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



- Delete all the non working containers 
```
docker myDocker prune
```

- To get  the main process (PID 1) of the docker, to kill the process after
```
sudo docker inspect --format '{{.State.Pid}}' ubuntu1 
```
