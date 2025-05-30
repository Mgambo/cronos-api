import request from "supertest";
import express, { Express } from "express";
import analyticsRouter from "../../src/routes/analytics.route";
import { analyticsService } from "../../src/services/analytics.service";

// Mock dependencies
jest.mock("../../src/middlewares/auth.middleware", () =>
  jest.fn((req, res, next) => next())
);

describe("Analytics Routes", () => {
  let app: Express;

  beforeEach(() => {
    app = express();
    app.use(analyticsRouter);
  });

  describe("GET /analytics", () => {
    it("should return 200 when requesting without API key", async () => {
      const response = await request(app)
        .get("/analytics")
        .expect("Content-Type", /json/)
        .expect(200);

      expect(response.body).toBeDefined();
    });

    it("should return stats for specific API key", async () => {
      const mockApiKey = "test-api-key";
      const mockStats = {
        totalRequests: 1,
        lastUsed: new Date(),
        endpoints: new Map([["/test", 1]]),
        apiKey: mockApiKey,
      };

      jest.spyOn(analyticsService, "getUsageStats").mockReturnValue(mockStats);

      const response = await request(app)
        .get("/analytics")
        .set("x-app-key", mockApiKey)
        .expect("Content-Type", /json/)
        .expect(200);

      expect(response.body).toBeDefined();
      expect(analyticsService.getUsageStats).toHaveBeenCalledWith(mockApiKey);
    });

    it("should return 404 when API key has no stats", async () => {
      const mockApiKey = "non-existent-key";

      jest.spyOn(analyticsService, "getUsageStats").mockReturnValue(undefined);

      await request(app)
        .get("/analytics")
        .set("x-app-key", mockApiKey)
        .expect(404);
    });
  });
});
