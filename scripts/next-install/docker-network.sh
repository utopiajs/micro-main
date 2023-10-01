#!/bin/bash

network_name="utopia-space-network"
container_names=("micro-main-core" "micro-sub-user-center" "micro-main-node-server-prod")

# 检查网络是否存在
if docker network inspect "$network_name" >/dev/null 2>&1; then
    echo "Network $network_name already exists."
else
    # 创建网络
    docker network create "$network_name"
    echo "Network $network_name created."
fi

# 连接容器到网络
for container_name in "${container_names[@]}"; do
    if docker network inspect "$network_name" | grep -q "\"$container_name\""; then
        echo "Container $container_name is already connected to network $network_name."
    else
        docker network connect "$network_name" "$container_name"
        echo "Container $container_name connected to network $network_name."
    fi
done
