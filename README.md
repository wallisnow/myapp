# Myapp
An Express Node App 
DB: mysql + redis

# Before your start
## Environment setting
### Disable secure mode
Allow all requests without login
```SECURE_MODE=false```
### Use redis Singleton mode
```DEV_ENVIRONMENT=dev``` In this mode you just need to specify a *REDIS_HOST* and *REDIS_PORT*. and if you want use cluster mode, you need to config at least 3 hosts and ports of your cluster
you can check ```config/conf.js``` for the env keys.

## Docker compose
There is a /docker dir in the project, you can just start the docker by the compose file, but different file for different propose
- ```docker-compose-db.yaml``` this one has a mysql and a singleton redis, you can just use this for testing
- ```cluster/docker-compose-db.yaml``` this one is using redis cluster, you can check ```config/conf.js``` for the configuration need

#Run app
Ensure you set the environment above
```npm start```

#Run test
```npm test```