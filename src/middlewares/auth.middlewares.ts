import { NextFunction, Request, Response } from "express";
import { AppConfig } from "../config";
// import rateLimit from "express-rate-limit";
import { RateLimiterMemory } from "rate-limiter-flexible";

const xAppKeyLimiter = new RateLimiterMemory({
  points: AppConfig.RATE_LIMIT_MAX_REQUEST, // 10 requests
  duration: AppConfig.RATE_LIMIT_DURATION, // Per second
});

export const xAppKeyAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const xAppKey = req.header("x-app-key");

  if (xAppKey !== AppConfig.API_KEY) {
    res.status(401).send("Invalid api key");
  } else {
    try {
      const remaining = await xAppKeyLimiter.consume(xAppKey); // consume 1 point
      res.header({
        "Retry-After": remaining.msBeforeNext / 1000,
        "X-RateLimit-Limit": remaining.remainingPoints,
        "X-RateLimit-Remaining": remaining.remainingPoints,
        "X-RateLimit-Reset": Math.ceil(
          (Date.now() + remaining.msBeforeNext) / 1000
        ),
      });
    } catch (err) {
      res.status(429).send("API key rate limit exceeded");
    }
    next();
  }
};
