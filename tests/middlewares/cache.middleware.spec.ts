import request from "supertest";
import express from "express";
import cacheMiddleware from "../../src/middlewares/cache.middleware";
import redisClient from "../../src/redis.client";

jest.mock("../../src/redis.client");

describe("cache.middleware", () => {
  const app = express();
  let mockRedisClientGet: jest.SpyInstance;
  let mockRedisClientSet: jest.SpyInstance;

  beforeAll(() => {
    mockRedisClientGet = jest.spyOn(redisClient, "get");
    mockRedisClientSet = jest.spyOn(redisClient, "set");
  });
  afterEach(() => {
    // restore the spy created with spyOn
    jest.clearAllMocks();
  });

  it("should get undefined and set response to cache", async () => {
    const cacheMiddlewareInstance = cacheMiddleware(60);
    app.use(cacheMiddlewareInstance);
    app.get("/test", (req, res) => {
      res.json({ balance: 100 });
    });

    mockRedisClientGet.mockResolvedValue(undefined);
    const response = await request(app).get("/test");

    console.log(response.body);

    expect(response.body).toBeTruthy();
    expect(mockRedisClientSet).toHaveBeenCalledTimes(1);
  });

  it("should get cache response", async () => {
    const cacheMiddlewareInstance = cacheMiddleware(60);
    mockRedisClientGet.mockResolvedValue({
      balance: 100,
    });

    app.use(cacheMiddlewareInstance);
    app.get("/test", (req, res) => {
      res.json({ balance: 10 });
    });

    const response = await request(app).get("/test");

    expect(response.body).toStrictEqual({ balance: 100 });
    expect(mockRedisClientGet).toHaveBeenCalledTimes(1);
  });

  it("should response error", async () => {
    const cacheMiddlewareInstance = cacheMiddleware(60);
    mockRedisClientGet.mockRejectedValue(new Error("something wrong"));

    app.use(cacheMiddlewareInstance);
    app.get("/test", (req, res) => {
      res.json({ message: "Hello World!" });
    });

    const response = await request(app).get("/test");

    expect(response.status).toBe(500);
    expect(response.body).toStrictEqual({ error: "internal server error" });
    expect(mockRedisClientGet).toHaveBeenCalledTimes(1);
  });
});
