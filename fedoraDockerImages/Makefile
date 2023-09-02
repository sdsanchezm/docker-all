
random_name = $(shell cat /dev/urandom | LC_CTYPE=C tr -dc 'a-zA-Z0-9' | fold -w 8 | head -n 1)

NAME1 = "jamecho"

randomname:
	@new_name=$(call random_name); \
	echo "random name: $(call random_name) - $$new_name"; \

jam:
	@echo "this is jam $(NAME1)"

ci:
	docker build -t f1 -f Dockerfile.fedora38 .

cc:
	docker run --name f1app1 f1

del:
	docker container rm -f f1app1; \
	docker image rm -f f1

list:
	docker ps -a; \
	docker images

step1:
	unxz fedora-coreos-38.20230806.3.0-qemu.x86_64.qcow2.xz

step2:
	qemu-img convert -O raw fedora-coreos-38.20230806.3.0-qemu.x86_64.qcow2 fedora-coreos-38.20230806.3.0-x86_64.raw

clean:
	docker system prune