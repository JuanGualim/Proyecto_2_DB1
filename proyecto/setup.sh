#!/bin/bash
# Script de setup limpio para Proyecto 3
echo "=== Limpiando contenedores y volúmenes viejos ==="
docker compose down -v --remove-orphans 2>/dev/null || true
docker rm -f tienda_db tienda_backend tienda_frontend 2>/dev/null || true
docker volume rm $(docker volume ls -q | grep -E 'proyecto|tienda|db_data') 2>/dev/null || true

echo "=== Limpiando caché de imágenes viejas ==="
docker rmi proyecto-backend proyecto-frontend 2>/dev/null || true

echo "=== Levantando proyecto desde cero ==="
docker compose up --build --force-recreate
