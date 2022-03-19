docker-compose --profile $1 -f docker-compose.yml up -d
docker logs -f ecommerce-service