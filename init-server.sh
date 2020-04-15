#!/usr/bin/env bash
set -e

echo ""
echo "Creating database..."
docker-compose -f compose-server.yml exec mariadb mysql -uroot -proot -e "CREATE DATABASE squad CHARACTER SET utf8 COLLATE utf8_general_ci"
echo ""
echo "Database created"

exit 0