import { Token, Wallet } from "@crypto.com/developer-platform-client";

export const getWalletBalance = async (address: string) => {
  const balance = await Wallet.balance(address);
  return balance;
};

export const getTokenBalance = async (
  address: string,
  tokenAddress: string
) => {
  const tokenBalance = await Token.getERC20TokenBalance(address, tokenAddress);
  return tokenBalance;
};
