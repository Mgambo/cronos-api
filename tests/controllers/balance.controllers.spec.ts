import { Request, Response, NextFunction } from "express";
import {
  getBalance,
  getTokenBalance,
} from "../../src/controllers/balance.controller";
import * as balanceService from "../../src/services/balance.service";
import { Errors } from "../../src/enums/errors";
import { logger } from "../../src/logger";

// Mock dependencies
jest.mock("../../src/services/balance.service");
jest.mock("../../src/logger");

describe("Balance Controller", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction;

  beforeEach(() => {
    mockRequest = {
      params: {
        address: "0x123",
        tokenAddress: "0x456",
      },
    };
    mockResponse = {
      send: jest.fn(),
    };
    nextFunction = jest.fn();
  });

  describe("getBalance", () => {
    it("should return wallet balance successfully", async () => {
      const mockBalance = {
        data: { balance: "100" },
      };

      (balanceService.getWalletBalance as jest.Mock).mockResolvedValue(
        mockBalance
      );

      await getBalance(
        mockRequest as Request,
        mockResponse as Response,
        nextFunction
      );

      expect(balanceService.getWalletBalance).toHaveBeenCalledWith("0x123");
      expect(mockResponse.send).toHaveBeenCalledWith(mockBalance.data);
      expect(nextFunction).not.toHaveBeenCalled();
    });

    it("should handle invalid address error", async () => {
      const error = new Error('operation="getEnsAddress" error message');
      (balanceService.getWalletBalance as jest.Mock).mockRejectedValue(error);

      await getBalance(
        mockRequest as Request,
        mockResponse as Response,
        nextFunction
      );

      expect(logger.error).toHaveBeenCalledWith(error.message);
      expect(nextFunction).toHaveBeenCalledWith(Errors.INVALID_ADDRESS);
    });

    it("should handle general errors", async () => {
      const error = new Error("General error");
      (balanceService.getWalletBalance as jest.Mock).mockRejectedValue(error);

      await getBalance(
        mockRequest as Request,
        mockResponse as Response,
        nextFunction
      );

      expect(logger.error).toHaveBeenCalledWith(error.message);
      expect(nextFunction).toHaveBeenCalledWith(Errors.INTERNAL_SERVER_ERROR);
    });
  });

  describe("getTokenBalance", () => {
    it("should return token balance successfully", async () => {
      const mockTokenBalance = {
        data: { balance: "200" },
      };

      (balanceService.getTokenBalance as jest.Mock).mockResolvedValue(
        mockTokenBalance
      );

      await getTokenBalance(
        mockRequest as Request,
        mockResponse as Response,
        nextFunction
      );

      expect(balanceService.getTokenBalance).toHaveBeenCalledWith(
        "0x123",
        "0x456"
      );
      expect(mockResponse.send).toHaveBeenCalledWith(mockTokenBalance.data);
      expect(nextFunction).not.toHaveBeenCalled();
    });

    it("should handle invalid address error", async () => {
      const error = new Error('operation="getEnsAddress" error message');
      (balanceService.getTokenBalance as jest.Mock).mockRejectedValue(error);

      await getTokenBalance(
        mockRequest as Request,
        mockResponse as Response,
        nextFunction
      );

      expect(logger.error).toHaveBeenCalledWith(error.message);
      expect(nextFunction).toHaveBeenCalledWith(Errors.INVALID_ADDRESS);
    });

    it("should handle general errors", async () => {
      const error = new Error("General error");
      (balanceService.getTokenBalance as jest.Mock).mockRejectedValue(error);

      await getTokenBalance(
        mockRequest as Request,
        mockResponse as Response,
        nextFunction
      );

      expect(logger.error).toHaveBeenCalledWith(error.message);
      expect(nextFunction).toHaveBeenCalledWith(Errors.INTERNAL_SERVER_ERROR);
    });
  });
});
