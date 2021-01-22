# environment
- redis
- docker-compose

# start up
`docker-compose up -d`

# init cluster

if you use separate network, you cand do:
`docker inspect --f='{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' node-80`
so that getting the container ip

if you use host network(in current compose file) then you don't need to do it, but you need check your host IP and ensure all ports for cluster avaliable

for example, my 6382 was occupied, so I shift to 6386 for one node.

Then, you can do the cluster initialization:
```
docker exec -it  node-80 redis-cli -p 6380 --cluster create {node-80 ip}:6380  {node-81 ip}:6381  {node-82 ip}:6382  {node-83 ip}:6383  {node-84 ip}:6384  {node-85 ip}:6385 --cluster-replicas 1
```

Example output of cluster initialization
```
]$ docker exec -it  node-80 redis-cli -p 6380 --cluster create 172.20.0.5:6380  172.20.0.6:6381   172.20.0.3:6382   172.20.0.7:6383   172.20.0.2:6384   172.20.0.4:6385 --cluster-replicas 1
>>> Performing hash slots allocation on 6 nodes...
Master[0] -> Slots 0 - 5460
Master[1] -> Slots 5461 - 10922
Master[2] -> Slots 10923 - 16383
Adding replica 172.20.0.2:6384 to 172.20.0.5:6380
Adding replica 172.20.0.4:6385 to 172.20.0.6:6381
Adding replica 172.20.0.7:6383 to 172.20.0.3:6382
M: 7c4a2ea4ba9db0da303b10c0d6ab7769b3ba8520 172.20.0.5:6380
   slots:[0-5460] (5461 slots) master
M: b53ed8660c07dad30b7db9b7a3023371ba38d68d 172.20.0.6:6381
   slots:[5461-10922] (5462 slots) master
M: 3fbfc55535729b865c74f723d493bc91cb45cb0e 172.20.0.3:6382
   slots:[10923-16383] (5461 slots) master
S: be5ecff75d42da27a6d7ad5e410f22f5a472d709 172.20.0.7:6383
   replicates 3fbfc55535729b865c74f723d493bc91cb45cb0e
S: acbfdf1eb172a0f86876ad9ede1b96f2428f109d 172.20.0.2:6384
   replicates 7c4a2ea4ba9db0da303b10c0d6ab7769b3ba8520
S: 4209c5b926e354b127a809abb59fb4981ed1abbb 172.20.0.4:6385
   replicates b53ed8660c07dad30b7db9b7a3023371ba38d68d
Can I set the above configuration? (type 'yes' to accept): yes
>>> Nodes configuration updated
>>> Assign a different config epoch to each node
>>> Sending CLUSTER MEET messages to join the cluster
Waiting for the cluster to join
......
>>> Performing Cluster Check (using node 172.20.0.5:6380)
M: 7c4a2ea4ba9db0da303b10c0d6ab7769b3ba8520 172.20.0.5:6380
   slots:[0-5460] (5461 slots) master
   1 additional replica(s)
S: acbfdf1eb172a0f86876ad9ede1b96f2428f109d 172.20.0.2:6384
   slots: (0 slots) slave
   replicates 7c4a2ea4ba9db0da303b10c0d6ab7769b3ba8520
M: 3fbfc55535729b865c74f723d493bc91cb45cb0e 172.20.0.3:6382
   slots:[10923-16383] (5461 slots) master
   1 additional replica(s)
M: b53ed8660c07dad30b7db9b7a3023371ba38d68d 172.20.0.6:6381
   slots:[5461-10922] (5462 slots) master
   1 additional replica(s)
S: 4209c5b926e354b127a809abb59fb4981ed1abbb 172.20.0.4:6385
   slots: (0 slots) slave
   replicates b53ed8660c07dad30b7db9b7a3023371ba38d68d
S: be5ecff75d42da27a6d7ad5e410f22f5a472d709 172.20.0.7:6383
   slots: (0 slots) slave
   replicates 3fbfc55535729b865c74f723d493bc91cb45cb0e
[OK] All nodes agree about slots configuration.
>>> Check for open slots...
>>> Check slots coverage...
[OK] All 16384 slots covered.
```

# ref: [docker-compose搭建redis集群及可用性实践](https://juejin.im/post/5d4afaaf518825403769dd44)