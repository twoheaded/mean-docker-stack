# MEAN Docker Stack App
This is an example of how to deploy MEAN-stack application with Docker Compose and in a Docker Swarm Cluster.

Code base for [this article series](http://mean-dev.info/mean-stack-docker-part-1)

## Application structure

* server: [Express](http://expressjs.com/), [Mongoose](http://mongoosejs.com/)
* client: [Angular](https://angular.io/), [Angular Universal](https://universal.angular.io/)
* database: [MongoDB](https://www.mongodb.com/)
* reverse proxy: [Træfik](https://docs.traefik.io/)

## Docker images

Build:

```sh
docker build -t username/repository:mean-docker-server ./server  
docker build -t username/repository:mean-docker-client ./client 
```

Push to a registry:

```sh
docker push username/repository:mean-docker-server  
docker push username/repository:mean-docker-client  
```

## Run using Docker Compose


Hosts config for reverse proxy:

```
# windows:      c:/windows/system32/drivers/etc/hosts
# ubuntu/mac:   /etc/hosts

127.0.0.1       docker-example.local
127.0.0.1       api.docker-example.local

# Traefik Dashboard
127.0.0.1       traefik.docker-example.local 
```

Create reverse proxy network:

```sh
docker network create traefik-net  
```

Run application:

```sh
docker-compose up -d
```

Enter http://docker-example.local in a browser to see the application running.

Scale:

```sh
docker-compose up --scale server=2 --scale client=3 -d
```

Logs:

```sh
docker-compose logs  
```

Stop and remove containers created by `up`:

```sh
docker-compose down
```

## Run in Docker Swarm mode

### Create machines

#### Windows

[Setup Hyper-V >>](https://docs.docker.com/machine/drivers/hyper-v/)

```sh
docker-machine create -d hyperv --hyperv-virtual-switch "myswitch" vm0
docker-machine create -d hyperv --hyperv-virtual-switch "myswitch" vm1
docker-machine create -d hyperv --hyperv-virtual-switch "myswitch" vm2
```

#### Mac/Linux

```sh
docker-machine create --driver virtualbox vm0
docker-machine create --driver virtualbox vm1
docker-machine create --driver virtualbox vm2
```

### Initialize the swarm

Set environment variables to dictate that docker should run a command against a particular machine:

```sh
docker-machine env vm0
```

Initialize a swarm:

```sh
docker swarm init 
```

Copy pre-configured docker swarm join command 

### Add nodes

Switch to another machine:

```sh
docker-machine env vm1
```

and run pre-configured join command:

```sh
docker swarm join --token SWMTKN-1-52qk72ooyql1zfxb0lezwmj52oipimmgln6zh3skbdokl6pp3c-179u2zzjdffcaqjni4zjst188 192.168.2.40:2377  
```

And the same with `vm2`

### Hosts

```sh
# windows:    c:/windows/system32/drivers/etc/hosts
# ubuntu/mac: /etc/hosts

192.168.2.40       docker-example.local  
192.168.2.40       api.docker-example.local  
192.168.2.40       traefik.docker-example.local  
192.168.2.40       visualizer.docker-example.local 
```

`192.168.2.40` is a manager node IP (`vm0`). Get it with the `docker-machine ls` command.

### Deploy

Create reverse proxy network:

```sh
docker network create -d overlay traefik-net 
```

Run the following command to deploy the app:

```sh
docker stack deploy -c docker-stack.yml meanstack  
```

Enter http://visualizer.docker-example.local in a browser to see the Docker Swarm visualizer. 

Remove the stack:

```sh
docker stack rm meanstack
```

### Mongo Replica Set

Set labels for nodes:

```
docker node update --label-add mongo.replica=0 vm0 
docker node update --label-add mongo.replica=1 vm1 
docker node update --label-add mongo.replica=2 vm2 
```

Deploy:

```sh
docker stack deploy -c docker-stack.mongo-rs.yml meanstack 
```

Initiate a replica set:

```sh
docker exec -it <mongo_container_id> sh

$ mongo

> rs.initiate( {
   _id : "rs0",
   members: [
      { _id: 0, host: "mongo0:27017" },
      { _id: 1, host: "mongo1:27017" },
      { _id: 2, host: "mongo2:27017" }
   ]
})
```

See the http://visualizer.docker-example.local/ page