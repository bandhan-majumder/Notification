```
docker run -p 9092:9092 apache/kafka:3.7.1
docker exec -it <container_id> /bin/bash
cd /opt/kafka/bin
./kafka-topics.sh --bootstrap-server localhost:9092 --create --topic todoNotifications --partitions 1 --replication-factor 1
cp .env.sample .env
npm install
npm run dev
```