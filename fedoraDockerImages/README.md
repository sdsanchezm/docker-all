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

- 