# Documentation

## Source

- Source:
    - [https://www.fedoraproject.org/cloud/download/]


- Fedora cloud image name:
    - `Fedora-Cloud-Base-38-1.6.x86_64.raw.xz`


- Dockerfile `Dockerfile.fedora38` 
    ```
    FROM scratch
    LABEL tester="tester <davs@live.no>"
    ENV DISTTAG=f38container FGC=f38 FBR=f38
    ADD Fedora-Cloud-Base-38-1.6.x86_64.raw.xz / 
    CMD ["/bin/bash"]
    ```

- Dockerfile source:
    - [https://github.com/fedora-cloud/docker-brew-fedora/blob/6c75c452982317bf623c9633012b05aea9f696b6/x86_64/Dockerfile]


- Command:
    - `docker build -t f38 -f Dockerfile.fedora38 .`

# from main README.md

## Docker Fedora (with local images)

- Folder in this repo: `./fedoraDockerImages/README.md`

### Process in terminal (from local fedora linux image)

- get the .xyz image from [https://fedoraproject.org/cloud/download/](Fedora Cloud) (ussually the "Fedora Cloud 38 Raw raw.xz")
- install the tools:
    - `dnf install qemu-utils libguestfs-tools`
 -Extract the xz
    - `unxz Fedora-Cloud-Base-38-1.6.x86_64.raw.xz`
- Generate the tar.gz
    - `virt-tar-out -a Fedora-Cloud-Base-38-1.6.x86_64.raw / - | gzip > f38.tar.gz`
- create the docker image with the tag
    - `docker import f38.tar.gz f38x:latest`
- crete the container
    - `docker run -it --name app1 f38x /bin/bash`
- create the app
    - `docker start app1`
- Execute the container
    - `docker exec -it app1 /bin/bash`

#### from a Dockerfile

- `docker build -t k2 -f Dockerfile.fedora38 .`
- Dockerfile.fedora38:
    - 
        ```
        FROM f38x
        LABEL tester="tester <davs@live.no>"
        ENV DISTTAG=f38container FGC=f38 FBR=f38
        RUN dnf install iputils -y
        ENTRYPOINT [ "/bin/ping", "-c", "3"]
        CMD ["localhost"]
        ```
- `docker run --name app11 k2 google.com`