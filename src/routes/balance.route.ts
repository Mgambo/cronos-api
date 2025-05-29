import { Router } from "express";
import { getBalance, getTokenBalance } from "../controllers/balance.controller";
import xAppKeyAuthMiddleware from "../middlewares/auth.middleware";
import cacheMiddleware from "../middlewares/cache.middleware";
import {
  getBalanceSchema,
  getTokenBalanceSchema,
} from "../validators/balance.validator";
import { validateParams } from "../middlewares/validator.middleware";

const balanceRouter = Router();

balanceRouter.use(cacheMiddleware(60));
balanceRouter.use(xAppKeyAuthMiddleware);

balanceRouter.get(
  "/balance/:address",
  validateParams(getBalanceSchema),
  getBalance
);
balanceRouter.get(
  "/token-balance/:address/:tokenAddress",
  validateParams(getTokenBalanceSchema),
  getTokenBalance
);

export default balanceRouter;
