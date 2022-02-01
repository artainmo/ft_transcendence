FROM node:16
RUN mkdir -p /compose
WORKDIR /compose
COPY ./src/* .

RUN apt-get update && \
  	apt-get install -y python python-dev python-distribute python-pip && \
  	apt-get install curl -y && \
  	curl -sSL https://get.docker.com/ | sh && \
  	pip install docker-compose
 
EXPOSE 5432

CMD ["docker-compose", "up", "build"]
