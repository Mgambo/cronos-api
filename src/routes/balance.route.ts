import { Router } from "express";
import { getBalance, getTokenBalance } from "../controllers/balance.controller";
import { Errors } from "../enums/errors";

const balanceRouter = Router();

balanceRouter.get("/balance/:address", async (req, res, next) => {
  const { address } = req.params;
  try {
    const balance = await getBalance(address);
    res.send(balance);
  } catch (err) {
    console.error((err as Error).message);
    if (err instanceof Error) {
      if (err.message.includes('operation="getEnsAddress'))
        return next(Errors.INVALID_ADDRESS);
    }
    next(Errors.INTERNAL_SERVER_ERROR);
  }
});

balanceRouter.get(
  "/token-balance/:address/:tokenAddress",
  async (req, res, next) => {
    const { address, tokenAddress } = req.params;
    try {
      const tokenBalance = await getTokenBalance(address, tokenAddress);
      res.send(tokenBalance);
    } catch (err) {
      console.log("ttt:::");
      console.error((err as Error).message);
      if (err instanceof Error) {
        if (err.message.includes('operation="getEnsAddress'))
          return next(Errors.INVALID_ADDRESS);
      }
      next(Errors.INTERNAL_SERVER_ERROR);
    }
  }
);

export default balanceRouter;
