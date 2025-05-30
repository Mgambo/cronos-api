import { Token, Wallet } from "@crypto.com/developer-platform-client";
import {
  getWalletBalance,
  getTokenBalance,
} from "../../src/services/balance.service";

// Mock dependencies
jest.mock("@crypto.com/developer-platform-client");

describe("Balance Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getWalletBalance", () => {
    it("should return wallet balance successfully", async () => {
      const mockBalance = {
        data: {
          balance: "1000000000000000000",
          decimals: 18,
        },
      };

      (Wallet.balance as jest.Mock).mockResolvedValue(mockBalance);

      const address = "0x123456789";
      const result = await getWalletBalance(address);

      expect(Wallet.balance).toHaveBeenCalledWith(address);
      expect(result).toEqual(mockBalance);
    });

    it("should throw error when wallet balance request fails", async () => {
      const error = new Error("Failed to fetch balance");
      (Wallet.balance as jest.Mock).mockRejectedValue(error);

      const address = "0x123456789";
      await expect(getWalletBalance(address)).rejects.toThrow(error);
    });
  });

  describe("getTokenBalance", () => {
    it("should return token balance successfully", async () => {
      const mockTokenBalance = {
        data: {
          balance: "500000000000000000",
          decimals: 18,
        },
      };

      (Token.getERC20TokenBalance as jest.Mock).mockResolvedValue(
        mockTokenBalance
      );

      const address = "0x123456789";
      const tokenAddress = "0x987654321";
      const result = await getTokenBalance(address, tokenAddress);

      expect(Token.getERC20TokenBalance).toHaveBeenCalledWith(
        address,
        tokenAddress
      );
      expect(result).toEqual(mockTokenBalance);
    });

    it("should throw error when token balance request fails", async () => {
      const error = new Error("Failed to fetch token balance");
      (Token.getERC20TokenBalance as jest.Mock).mockRejectedValue(error);

      const address = "0x123456789";
      const tokenAddress = "0x987654321";
      await expect(getTokenBalance(address, tokenAddress)).rejects.toThrow(
        error
      );
    });
  });
});
