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

### list of dockers
- 
    ```yaml
    docker container ls
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

### remove all stopped containers (prune)

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

## expose a container to a network

- To create an `nginx` container that I can see from the port 8080 (in host local/machine), mapped to the 80 in the container:
    ```yaml
    docker run -d --name nginx3 -p 8080:80 nginx
    ```
    - here the logic is: <local_port>:<container_port>
- Entering in local machine: `http://localhost:8080` will take me to nginx in local/host machine



## Mongo db in docker (Bid Mounts)

- `docker run -d --name db1 mongo`
- `docker exec -it db1 bash`


- if exit the container, data will be lost, so to bind folders/directories in docker:
    - Linux:
        ```yaml
        docker run -d --name db4 -v /home/ss/progs/folderDocker1:/data/db mongo
        ```
    - Windows
        ```yaml
        docker run -d --name db4 -v /home/ss/progs/folderDocker1:/data/db mongo
        ```
    - Enter the terminal
        ```yaml
        docker exec -it db4 bash
        ```
        - in the mondodb database (its name is mongosh)
            - `# mongosh`
            - `# show dbs`
            - `# use kkdb`
            - `# db.users.insert({"name":"tiche"})`
            - `# db.users.insert({"name":"amparo"})`
            - `# db.users.insert({"name":"jara"})`
            - `# db.users.find()`
        

## Volumes in docker

- List all volumes
    ```yaml
    docker volume ls
    ```
- create a volume
    ```yaml
    docker volume create dbdata5
    ```
- create a container
    ```yaml
    docker run -d --name db5 --mount src=dbdata5,dst=/data/db mongo
    ```
    - enter to bash into the container
        ```yaml
        docker exec -it db5 bash
        ```
        - into the mongodb container
            - `# mongosh`
            - `# show dbs`
            - `# use kkdb`
            - `# db.users.insert({"name":"tiche"})`
            - `# db.users.insert({"name":"amparo"})`
            - `# db.users.insert({"name":"jara"})`
            - `# db.users.find()`
        - data will be persistent, the data is in a volume administered by docker and not in a file, so its not accessible from the host filesystem
- inspect the container
    ```yaml
    docker inspect db5
    ```

## Files and containers

- Create a container
    ```yaml
    docker run -d --name testingcopy1 ubuntu tail -f /dev/null
    ```
- enter to bash into the container
    ```yaml
    docker exec -it testingcopy1 bash
    ```

- copy a file INTO the container
    ```yaml
    docker cp b.txt testingcopy1:/test1/b.txt
    ```
    - or changing the name
    ```yaml
    docker cp b.txt testingcopy1:/test1/x.txt
    ```

- copy a folder into the container
    ```yaml
    docker cp .\test2x\ testingcopy1:/test2x
    ```

- copy a folder FROM the container (the container doesn't need to be running)
    ```yaml
    docker cp testingcopy1:/test1 test1x
    ```
    - or chaning the name of the folder
    ```yaml
    docker cp testingcopy1:/test1 destinationFolder1
    ```


## Images

- review the actual images and their tags and so on
    - `docker image ls`
- tags is the version of the image (no tag, means latest)
- tags make faster the image sharing
- pull an image
    - `docker pull ubuntu:20.04`

## building and publishing images

- Everything in the Dockerfile is executed in build time
    ```yaml
    FROM ubuntu:latest
    RUN touch /usr/src/hello-here.txt
    ```
- Build an image (ubuntu is the base **image**, and hello is the **tag**)
    - `docker build -t ubuntu:hello .`
- create the container
    - `docker ps -a`
    ```
    CONTAINER ID   IMAGE          COMMAND                  CREATED              STATUS                         PORTS       NAMES
    d8373ceae116   ubuntu:hello   "/bin/bash"              About a minute ago   Exited (0) 40 seconds ago                  heuristic_blackburn
    31ede0f835af   ubuntu         "tail -f /dev/null"      45 minutes ago       Up 45 minutes                              copy1
    ```
    - `docker image ls`
    ```
    REPOSITORY          TAG       IMAGE ID       CREATED         SIZE
    ubuntu              hello     d9d6b2a5004d   7 minutes ago   77.8MB
    ```
    - a docker image is a set of **layers**, when building an images is 1 layer, some or all the other are layers are immutable (is like git, every push is a change of the code)

    - run the container
        - `docker run -it ubuntu:hello`

    - docker login (log into docker hub)
        - `docker login`

    - change the tag (to get the container ready to publish the image to our repo)
        - `docker tag ubuntu:hello sdsanchezm/ubuntu:hello`
        - `docker image ls`
            ```yaml
            REPOSITORY          TAG       IMAGE ID       CREATED          SIZE
            ubuntu              hello     d9d6b2a5004d   25 minutes ago   77.8MB
            sdsanchezm/ubuntu   hello     d9d6b2a5004d   25 minutes ago   77.8MB
            ```

    - docker push
        - `docker push sdsanchezm/ubuntu:<image>`
        - `docker push sdsanchezm/ubuntu:hello`

    - to pull an image
        - `docker pull sdsanchezm/ubuntu:hello`

    - check credentials:
        - `cat ~/.docker/config.json`






$ docker run -it ubuntu:platzi (corro el contenedor con la nueva imagen)
$ docker login (me logueo en docker hub)
$ docker tag ubuntu:platzi miusuario/ubuntu:platzy (cambio el tag para poder subirla a mi docker hub)
$ docker push miusuario/ubuntu:platzi (publico la imagen a mi docker hub)




## misc 

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
