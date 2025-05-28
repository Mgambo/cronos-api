import { Router } from "express";
import {
  getBalanceController,
  getTokenBalanceController,
} from "../controllers/balance.controller";

const balanceRouter = Router();

balanceRouter.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  res.send(getBalanceController(address));
});

balanceRouter.get("/token-balance/:address/:tokenAddress", (req, res) => {
  const { address, tokenAddress } = req.params;
  res.send(getTokenBalanceController(address, tokenAddress));
});

export default balanceRouter;
