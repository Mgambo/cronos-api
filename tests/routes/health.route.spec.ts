import request from "supertest";
import express, { Express } from "express";
import healthRouter from "../../src/routes/health.route";

describe("Health Routes", () => {
  let app: Express;

  beforeEach(() => {
    app = express();
    app.use("/api", healthRouter);
  });

  describe("GET /api/healthz", () => {
    it('should return 200 OK with "OK" message', async () => {
      const response = await request(app).get("/api/healthz");

      expect(response.status).toBe(200);
      expect(response.text).toBe("OK");
    });
  });
});
