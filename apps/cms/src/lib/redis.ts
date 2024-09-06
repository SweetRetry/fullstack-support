// lib/redis.js
import { createClient } from "redis";

const RedisClient = createClient({
  url: "redis://localhost:6379",
});

RedisClient.on("error", (err) => console.error("Redis Client Error", err));

(async () => {
  await RedisClient.connect();
})();

export default RedisClient;
