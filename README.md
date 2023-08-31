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
- could be an image or a container
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


## docker Images

- review the actual images and their tags and so on
    - `docker image ls`
- tags is the version of the image (no tag, means latest) (tags are managed by `-t`)
- tags make faster the image sharing
- pull an image
    - `docker pull ubuntu:20.04`
- remove an image
    - `docker image rm <name>`

## building and publishing docker images

- check docker images
    - `docker image ls`
    
- Everything in the Dockerfile is executed in build time (to create an image, a Dockerfile must be created)
    ```
    FROM ubuntu:latest
    RUN touch /usr/src/hello-here.txt
    ```
- Building an image from a file
    - `docker build -t db2 -f Dockerfile.db2 .`
    - Example **Dockerfile.db2**:
        ```
        FROM mongo
        RUN touch /opt/a.txt
        ```
        - create a container:
            - `docker run -d --name <imageName> -p <port host>:<port in container> <imageName>`
            - `docker run -d --name test1 -p 3000:3000 apptest1`
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

## Layers of an image

- view layers (each layer is like a change made)
    - `docker history ubuntu`

- Another tool is dive
    - dive https://github.com/wagoodman/dive
    - view layers are useful to optimize 
        - example: if an installation is required, and then no longer needed and removed, then in only 1 line (layer) can be performed


## building an environment for a nodejs app

- create/build a regular **image**, based on a Docker File, like the one in the section [template-of-a-dockerfile](#template-of-a-dockerfile)
    - `docker build -t nodeapp1 .`
    - `-t` is for Tag

- create the container and when is stopped it's deleted (using the --rm), is created in port 3000
    - `docker run --rm -p 3000:3000 platziapp`

- when running the app
- docker knows automatically that if an image was created and no changes were made, then it will be automatic/fast (IF is the same image, because of cache, is the docker cache)
    - this is one of the biggest advantages of docker, it allows to be used in development because it does not need to rebuild the entire thing, just changes depending on the structure of the Dockerfile (and their layers)
- to work with node container, we can use nodemon to reload automatically, linking with bind mounts in docker to achieve a live usable dev container

    - Rebuild the image, one more time
        - `docker build -t nodeapp1 .`

    - then create the container one more time
        - `docker run --rm -p 3000:3000 -v C:\progs\AA_PROJECTS_ALL\docker-all\nodeAppInDocker:/usr/src nodeapp1`

        - in Windows, might need to dockerfile like this (last line):
            - `CMD ["npx", "nodemon", "-L", "index.js"]`
            - or this
            - `CMD ["npx", "nodemon", "--legacy-watch", "index.js"]`


## Docker networks

- show networks
    - `docker network ls`

    - `bridge` is a default bridge
    - `host` is a representation or a real netwrok of a container
    - `none` if a container does not need any network or connection

- to create a network
    - `docker network create --attachable nodenet1`
    - validate
        - `docker network ls`
    - inspect
        - `docker network inspect nodenet1`

- create a container
    - `docker run -d --name db10 mongo`

- connect the new container to network created
    - `docker network connect nodenet1 db10`

- validate if the container was connected to the network (` "Containers": {`)
    - `docker network inspect nodenet1`

- Create the node app container (db10 can be used as name, because is in the same network)
    - `docker run -d --name app10 -p 3000:3000 --env MONGO_URL=mongodb://db10:27017/test nodeapp5`

- Connect the new container to the network (`docker network connect <network> <container>`)
    - `docker network connect nodenet1 app10`

- Inspect and validate that 2 containers are connected to the same network:
    - `docker network inspect nodenet1`



## Docker compose

- Docker compose work with services and not with containers

- `docker-compose -f docker-compose.test.yml up`
- `docker compose -f dcompose0.yml up` // Specifies a file
- `docker compose up` // uses the standard Dockerfile
- `docker compose up -d` // keep it running it in detach 
- `docker compose down` // stops and remove
- `docker compose build` //build
- `docker compose stop` // stops do not remove

- Example 1:
    - Create the mongo image
        - `docker run -d --name db1 mongo`
    - create the nodeapp1 image
        - `docker build -t nodeapp1 .`
        - Dokerfile in this case: **./docker-compose1/Dockerfile**
    - use the yml file
        - `docker compose -f dcompose0.yml up`

- Example 2:
    - use the yml file
        - `docker compose -f compose1.yml up`
        - `docker compose -f compose1.yml down`

### docker compose commands

- `docker compose up` // uses the standard Dockerfile
- `docker compose up -d` // keep it running it in detach 
- `docker compose down` // stops and remove
- `docker compose build` //build
- `docker compose stop` // stops do not remove
- `docker compose exec app1 bash` // app1 is the name of the service
- `docker compose ps` // check services
- `docker compose logs -f app1` // follow up logs
- `docker compose logs app1` // logs only from app1
- `docker compose logs` // all logs
- `docker network inspect docker_default` // check networks







## Docker Fedora (with local images)

- Folder in this repo: `./fedoraDockerImages/README.md`


# MISC

### Quick recap
- Building an image from a file
    - `docker build -t imageapp2 -f Dockerfile.app2 .`
    - Example **Dockerfile.app2**:
        ```
        FROM node
        RUN mkdir -p /opt/app
        WORKDIR /opt/app
        COPY ./appfolder/package.json .
        RUN npm install --quiet
        COPY ./appfolder/. .
        RUN npm install nodemon -g --quiet
        EXPOSE 8000
        CMD npx nodemon index.js
        ```
- create a container from the previous image named imageapp2, and container name: test2:
    - `docker run -d --name <imageName> -p <port host>:<port in container> <imageName>`
    - `docker run -d --name test2 -p 3000:3000 imageapp2`
    - If the image is turned off:
        - `docker start test2`
    - then log into it
        - `docker exec -it test2 bash`
    - `docker start -ai <container_name>`
    

### Create a docker, based on the image platzyapp, using the name app, seting the variable MONGO_URL, routing the ports 3000 to 3000. 
- 
    ```yaml
    sudo docker run -d --name app -p 3000:3000 --env MONGO_URL=mongodb://db:27017/test platzyapp
    ```

### Fedora dockerhub nodejs tags

- `docker pull fedora/nodejs`
- [https://hub.docker.com/r/fedora/nodejs]

### Docker compose references

- [https://docs.docker.com/compose/compose-file/build/]


### Template of a Dockerfile (Examples)
- 
    ```yaml
        FROM node:14

        COPY ["package.json", "package-lock.json", "/usr/src/"]

        WORKDIR /usr/src

        RUN npm install

        COPY [".", "/usr/src/"]

        EXPOSE 3000

        CMD ["npx", "nodemon", "index.js"]
    ```

- 
    ```yaml
        FROM node:current
        WORKDIR /usr/app/server
        COPY ["package.json", "package-lock.json", "."]
        RUN npm install
        COPY[".", "."]
        RUN npm run build
        COPY [".env", "./build"]
        EXPOSE 3500
        CMD node src/index.js
    ```


### Dockerfile instructions


|Dockerfile Instruction |	Description |
| ---- | ---- |
| FROM	| specify base image to start from |
| RUN	| to run commands during the image build process |
| ENV	| Sets environment variables within the image. If only need to define build-time variables then utilize ARG instruction |
| COPY	| to copy a file or folder from the host system into the docker image |
| EXPOSE | to specify the port in the docker image to listen to at runtime |
| ADD | advanced form of COPY instruction, CSan copy files from the host system into the docker image. also can use it to copy files from a URL into a destination in the docker image a tarball from the host system and automatically have it extracted into a destination in the docker image |
| WORKDIR	| used to set the current working directory |
| VOLUME | It is used to create or mount the volume to the Docker container |
| USER | Sets the user name and UID when running the container. Can use this instruction to set a non-root user of the container |
| LABEL	| Specify metadata information of Docker image |
| ARG	| Defines build-time variables using key-value pairs. However, these ARG variables will not be accessible when the container is running. To maintain a variable within a running container use ENV instruction instead. |
| CMD	| Executes a command in a running container. Only one CMD instruction is allowed. If multiple are present, only the last one takes effect |
| ENTRYPOINT	| Specifies the commands that will execute when the Docker container starts. If don’t specify any ENTRYPOINT, it defaults to “/bin/sh -c”. |




