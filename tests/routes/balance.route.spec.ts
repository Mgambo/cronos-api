import request from "supertest";
import express, { Express } from "express";
import balanceRouter from "../../src/routes/balance.route";
import {
  getBalance,
  getTokenBalance,
} from "../../src/controllers/balance.controller";

// Mock dependencies
jest.mock("../../src/middlewares/auth.middleware", () =>
  jest.fn((req, res, next) => next())
);
jest.mock("../../src/middlewares/cache.middleware", () =>
  jest.fn(() => (req, res, next) => next())
);
jest.mock("../../src/controllers/balance.controller", () => ({
  getBalance: jest.fn((req, res) => res.status(200).json({ balance: "1000" })),
  getTokenBalance: jest.fn((req, res) =>
    res.status(200).json({ balance: "2000" })
  ),
}));

describe("Balance Routes", () => {
  let app: Express;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use("/api", balanceRouter);

    // Clear all mocks
    jest.clearAllMocks();
  });

  describe("GET /api/balance/:address", () => {
    it("should validate address parameter", async () => {
      const response = await request(app)
        .get("/api/balance/invalid-address")
        .set("x-app-key", "test-key");

      expect(response.status).toBe(400);
    });

    it("should return balance for valid address", async () => {
      const validAddress = "0x1234567890123456789012345678901234567890";
      const response = await request(app)
        .get(`/api/balance/${validAddress}`)
        .set("x-app-key", "test-key");

      expect(response.status).toBe(200);
      expect(getBalance).toHaveBeenCalled();
    });
  });

  describe("GET /api/token-balance/:address/:tokenAddress", () => {
    it("should validate address and token address parameters", async () => {
      const response = await request(app)
        .get("/api/token-balance/invalid-address/invalid-token")
        .set("x-app-key", "test-key");

      expect(response.status).toBe(400);
    });

    it("should return token balance for valid addresses", async () => {
      const validAddress = "0x1234567890123456789012345678901234567890";
      const validTokenAddress = "0x0987654321098765432109876543210987654321";

      const response = await request(app)
        .get(`/api/token-balance/${validAddress}/${validTokenAddress}`)
        .set("x-app-key", "test-key");

      expect(response.status).toBe(200);
      expect(getTokenBalance).toHaveBeenCalled();
    });
  });
});
