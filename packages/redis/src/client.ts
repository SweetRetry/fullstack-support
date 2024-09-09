import Redis from "ioredis";

const RedisClient = new Redis();

RedisClient.on("error", (err) => console.error("Redis Client Error", err));

export default RedisClient;
