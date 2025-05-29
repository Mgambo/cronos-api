import { Router } from "express";
import { getBalance, getTokenBalance } from "../controllers/balance.controller";
import { xAppKeyAuthMiddleware } from "../middlewares/auth.middlewares";

const balanceRouter = Router();

balanceRouter.use(xAppKeyAuthMiddleware);

balanceRouter.get("/balance/:address", getBalance);
balanceRouter.get("/token-balance/:address/:tokenAddress", getTokenBalance);

export default balanceRouter;
