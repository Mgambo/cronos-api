import { Router } from "express";
import { getBalance, getTokenBalance } from "../controllers/balance.controller";
import { Errors } from "../enums/errors";

const balanceRouter = Router();

balanceRouter.get("/balance/:address", getBalance);

balanceRouter.get("/token-balance/:address/:tokenAddress", getTokenBalance);

export default balanceRouter;
