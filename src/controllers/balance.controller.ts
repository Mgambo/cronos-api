import { Token, Wallet } from "@crypto.com/developer-platform-client";
import * as balanceService from "../services/balance.service";
import { Errors } from "../enums/errors";
import { NextFunction, Request, Response } from "express";
import { logger } from "../logger";

/**
 * @description Get CRO wallet balance
 */
export const getBalance = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { address } = req.params;
  try {
    const balance = await balanceService.getWalletBalance(address);
    res.send(balance.data);
  } catch (err) {
    logger.error((err as Error).message);
    if (err instanceof Error) {
      if (err.message.includes('operation="getEnsAddress'))
        return next(Errors.INVALID_ADDRESS);
    }
    next(Errors.INTERNAL_SERVER_ERROR);
  }
};

/**
 * @description Get token balance with specific token address
 */
export const getTokenBalance = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { address, tokenAddress } = req.params;
  try {
    const tokenBalance = await balanceService.getTokenBalance(
      address,
      tokenAddress
    );
    res.send(tokenBalance.data);
  } catch (err) {
    logger.error((err as Error).message);
    if (err instanceof Error) {
      if (err.message.includes('operation="getEnsAddress'))
        return next(Errors.INVALID_ADDRESS);
    }
    next(Errors.INTERNAL_SERVER_ERROR);
  }
};
