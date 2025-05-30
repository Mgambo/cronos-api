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

/**
 * @swagger
 * /api/v1/balance/{address}:
 *   get:
 *     summary: Get wallet balance
 *     tags: [Balance]
 *     parameters:
 *       - in: path
 *         name: address
 *         required: true
 *         schema:
 *           type: string
 *         description: Wallet address
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 balance:
 *                   type: string
 *       401:
 *         description: Unauthorized
 *       429:
 *         description: Rate limit exceeded
 */
balanceRouter.get(
  "/balance/:address",
  validateParams(getBalanceValidator),
  getBalance
);

/**
 * @swagger
 * /api/v1/token-balance/{address}/{tokenAddress}:
 *   get:
 *     summary: Get token balance
 *     tags: [Balance]
 *     parameters:
 *       - in: path
 *         name: address
 *         required: true
 *         schema:
 *           type: string
 *         description: Wallet address
 *       - in: path
 *         name: tokenAddress
 *         required: true
 *         schema:
 *           type: string
 *         description: Token contract address
 *       - in: header
 *         name: x-app-key
 *         required: true
 *         schema:
 *           type: string
 *         description: API key for authentication
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 balance:
 *                   type: string
 *       401:
 *         description: Unauthorized
 *       429:
 *         description: Rate limit exceeded
 */
balanceRouter.get(
  "/token-balance/:address/:tokenAddress",
  validateParams(getTokenBalanceValidator),
  getTokenBalance
);

export default balanceRouter;
