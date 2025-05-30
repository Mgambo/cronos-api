import { Router } from "express";
import { getBalance, getTokenBalance } from "../controllers/balance.controller";
import AuthMiddleware from "../middlewares/auth.middleware";
import cacheMiddleware from "../middlewares/cache.middleware";
import {
  getBalanceValidator,
  getTokenBalanceValidator,
} from "../validators/balance.validator";
import { validateParams } from "../middlewares/validator.middleware";

const balanceRouter = Router();

balanceRouter.use(cacheMiddleware(60));
balanceRouter.use(AuthMiddleware);

balanceRouter.get(
  "/balance/:address",
  validateParams(getBalanceValidator),
  getBalance
);
balanceRouter.get(
  "/token-balance/:address/:tokenAddress",
  validateParams(getTokenBalanceValidator),
  getTokenBalance
);

export default balanceRouter;
