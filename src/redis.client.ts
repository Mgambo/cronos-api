import Redis from "ioredis";
import { RedisConfig } from "./config";
import { logger } from "./logger";

export let redis: Redis;

export const init = () => {
  redis = new Redis({
    host: RedisConfig.REDIS_HOST,
    port: Number(RedisConfig.REDIS_PORT),
    password: RedisConfig.REDIS_PASSWORD,
    connectTimeout: 10000,
    maxRetriesPerRequest: 3,
  });

  logger.info("redis initialized");

  redis.on("connect", () => {
    logger.info("connected to redis");
  });
};

export const get = async (key: string) => {
  try {
    const data = await redis.get(key);
    return data ? JSON.parse(data) : null;
  } catch (err) {
    console.error("Cache get error:", err);
    return null;
  }
};

export const set = async (key: string, value: number, ttl = 3600) => {
  try {
    await redis.set(key, JSON.stringify(value), "EX", ttl);
  } catch (err) {
    console.error("Cache set error:", err);
  }
};

export default { init, get, set };
