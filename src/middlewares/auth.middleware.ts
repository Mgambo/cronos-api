import { NextFunction, Request, Response } from "express";
import { AppConfig } from "../config";
import { RateLimiterMemory } from "rate-limiter-flexible";
import { apiKeyValidator } from "../validators/api-key.validator";
import { StatusCodes } from "http-status-codes";

const xAppKeyLimiter = new RateLimiterMemory({
  points: AppConfig.RATE_LIMIT_MAX_REQUEST, // 10 requests
  duration: AppConfig.RATE_LIMIT_DURATION, // Per second
});

/**
 * @description Middleware to check api key
 */
const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const xAppKey = req.header("x-app-key");
  const { error, value } = apiKeyValidator.validate(xAppKey);

  if (error) {
    res.status(StatusCodes.UNAUTHORIZED).send(error.message);
  } else {
    try {
      const remaining = await xAppKeyLimiter.consume(value); // consume 1 point
      console.log("error::", remaining);
      res.header({
        "Retry-After": remaining.msBeforeNext / 1000,
        "X-RateLimit-Limit": remaining.remainingPoints,
        "X-RateLimit-Remaining": remaining.remainingPoints,
        "X-RateLimit-Reset": Math.ceil(
          (Date.now() + remaining.msBeforeNext) / 1000
        ),
      });
    } catch (err) {
      res.status(StatusCodes.TOO_MANY_REQUESTS).send("Rate limit exceeded");
    }
    next();
  }
};

export default authMiddleware;
