#!/bin/bash

echo "get localhost tun0 ip ..."
tun0_ip=$(ifconfig | grep -A 6 tun0 | grep -Eo 'inet (addr:)?([0-9]*\.){3}[0-9]*' | grep -Eo '([0-9]*\.){3}[0-9]*')
one_redis_node=$(docker ps -f name=node-80 --format '{{ .Names }}' | head -1)

if [ -z "$one_redis_node" ]; then
  echo "redis node cannot be find, please check it manually with 'docker ps -a' !"
  exit 1
fi

if [ -z "$tun0_ip" ]; then
  echo "local tun0 ip cannot be found!"
  exit 1
fi

echo "starting init cluster..."

declare -a ports=("6380" "6381" "6383" "6384" "6385" "6386")

for p in "${ports[@]}"; do
  tmp+="$tun0_ip:$p  "
done

echo "Init cluster for: $tmp"
echo docker exec -it node-80 redis-cli -p 6380 --cluster create "$tmp" --cluster-replicas 1 --cluster-yes
