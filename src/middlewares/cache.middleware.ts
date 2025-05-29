import { NextFunction, Request, Response } from "express";
import redisClient from "../redis.client";

/**
 *
 * @description Middleware to cache responses with redis
 * @param ttl seconds
 * @returns void
 */
const cacheMiddleware = (ttl = 60) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const key = `cache:${req.originalUrl}`;

    try {
      // Check cache
      const cachedData = await redisClient.get(key);
      if (cachedData) {
        // return cached data
        const originalJson = res.json;
        res.json = (): Response => {
          return originalJson.call(res, cachedData);
        };
      } else {
        // Override res.json to cache responses
        const originalJson = res.json;
        res.json = (body: any): Response => {
          redisClient
            .set(key, body, ttl)
            .catch((err) => console.error("Caching failed:", err));
          return originalJson.call(res, body);
        };
      }

      next();
    } catch (err) {
      console.error("Cache middleware error:", err);
      next();
    }
  };
};

export default cacheMiddleware;
