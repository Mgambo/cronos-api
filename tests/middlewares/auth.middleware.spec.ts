import { Request, Response, NextFunction } from "express";
import { RateLimiterMemory } from "rate-limiter-flexible";
import authMiddleware from "../../src/middlewares/auth.middleware";
import { apiKeyValidator } from "../../src/validators/api-key.validator";

// Mock dependencies
jest.mock("rate-limiter-flexible");
jest.mock("../../src/validators/api-key.validator");

describe("Auth Middleware", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction;

  beforeEach(() => {
    mockRequest = {
      header: jest.fn().mockReturnValue("test-api-key"),
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
      header: jest.fn().mockReturnThis(),
    };
    nextFunction = jest.fn();

    // Reset all mocks
    jest.clearAllMocks();
  });

  it("should return 401 when API key validation fails", async () => {
    const mockError = new Error("Invalid API key");
    (apiKeyValidator.validate as jest.Mock).mockReturnValue({
      error: mockError,
      value: null,
    });

    await authMiddleware(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );

    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.send).toHaveBeenCalledWith(mockError.message);
    expect(nextFunction).not.toHaveBeenCalled();
  });

  it("should set rate limit headers and call next when validation passes", async () => {
    const mockRemaining = {
      msBeforeNext: 1000,
      remainingPoints: 9,
    };

    (apiKeyValidator.validate as jest.Mock).mockReturnValue({
      error: null,
      value: "valid-key",
    });

    (RateLimiterMemory.prototype.consume as jest.Mock).mockResolvedValue(
      mockRemaining
    );

    await authMiddleware(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );

    expect(mockResponse.header).toHaveBeenCalledWith({
      "Retry-After": mockRemaining.msBeforeNext / 1000,
      "X-RateLimit-Limit": mockRemaining.remainingPoints,
      "X-RateLimit-Remaining": mockRemaining.remainingPoints,
      "X-RateLimit-Reset": expect.any(Number),
    });
    expect(nextFunction).toHaveBeenCalled();
  });

  it("should return 429 when rate limit is exceeded", async () => {
    (apiKeyValidator.validate as jest.Mock).mockReturnValue({
      error: null,
      value: "valid-key",
    });

    (RateLimiterMemory.prototype.consume as jest.Mock).mockRejectedValue(
      new Error("Rate limit exceeded")
    );

    await authMiddleware(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );

    expect(mockResponse.status).toHaveBeenCalledWith(429);
    expect(mockResponse.send).toHaveBeenCalledWith(
      "API key rate limit exceeded"
    );
    expect(nextFunction).toHaveBeenCalled();
  });
});
