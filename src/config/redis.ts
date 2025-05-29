import dotenv from "dotenv";
dotenv.config();

const RedisConfig = {
  REDIS_HOST: process.env.REDIS_HOST || "localhost",
  REDIS_PORT: process.env.REDIS_PORT || "6379",
  REDIS_USERNAME: process.env.REDIS_USERNAME || "root",
  REDIS_PASSWORD: process.env.REDIS_PASSWORD || "",
  REDIS_RETRY_INTERVAL: Number(process.env.REDIS_RETRY_INTERVAL) || 30000,
};

export default RedisConfig;
