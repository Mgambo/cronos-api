import Redis from "ioredis";
import { init, get, set, redis } from "../src/redis.client";
import { logger } from "../src/logger";

// Mock dependencies
jest.mock("ioredis");
jest.mock("../src/logger");

describe("Redis Client", () => {
  let mockRedis: jest.Mocked<Redis>;

  beforeEach(() => {
    jest.clearAllMocks();
    mockRedis = new Redis() as jest.Mocked<Redis>;
    (Redis as unknown as jest.Mock).mockImplementation(() => mockRedis);
  });

  describe("init", () => {
    it("should initialize redis client with correct config", () => {
      init();

      expect(Redis).toHaveBeenCalledWith({
        host: expect.any(String),
        port: expect.any(Number),
        password: expect.any(String),
        connectTimeout: 10000,
        maxRetriesPerRequest: 3,
      });
      expect(logger.info).toHaveBeenCalledWith("redis initialized");
    });

    // it("should log when connection is established", () => {
    //   init();

    //   // Simulate 'connect' event
    //   mockRedis.emit("connect");

    //   expect(logger.info).toHaveBeenCalledWith("connected to redis");
    // });
  });

  describe("get", () => {
    it("should retrieve and parse cached data successfully", async () => {
      const mockData = { foo: "bar" };
      mockRedis.get.mockResolvedValue(JSON.stringify(mockData));

      const result = await get("test-key");

      expect(mockRedis.get).toHaveBeenCalledWith("test-key");
      expect(result).toEqual(mockData);
    });

    it("should return null when key does not exist", async () => {
      mockRedis.get.mockResolvedValue(null);

      const result = await get("non-existent-key");

      expect(result).toBeNull();
    });

    it("should handle errors and return null", async () => {
      const consoleSpy = jest.spyOn(console, "error").mockImplementation();
      mockRedis.get.mockRejectedValue(new Error("Redis error"));

      const result = await get("test-key");

      expect(consoleSpy).toHaveBeenCalledWith(
        "Cache get error:",
        expect.any(Error)
      );
      expect(result).toBeNull();
      consoleSpy.mockRestore();
    });
  });

  describe("set", () => {
    it("should set cache data with default TTL", async () => {
      await set("test-key", 123);

      expect(mockRedis.set).toHaveBeenCalledWith(
        "test-key",
        JSON.stringify(123),
        "EX",
        3600
      );
    });

    it("should set cache data with custom TTL", async () => {
      await set("test-key", 123, 7200);

      expect(mockRedis.set).toHaveBeenCalledWith(
        "test-key",
        JSON.stringify(123),
        "EX",
        7200
      );
    });

    it("should handle errors when setting cache", async () => {
      const consoleSpy = jest.spyOn(console, "error").mockImplementation();
      mockRedis.set.mockRejectedValue(new Error("Redis error"));

      await set("test-key", 123);

      expect(consoleSpy).toHaveBeenCalledWith(
        "Cache set error:",
        expect.any(Error)
      );
      consoleSpy.mockRestore();
    });
  });
});
