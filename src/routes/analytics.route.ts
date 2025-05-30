import { Router } from "express";
import { getAnalytics } from "../controllers/analytics.controller";
import authMiddleware from "../middlewares/auth.middleware";

const analyticsRouter = Router();

analyticsRouter.use(authMiddleware);

/**
 * @swagger
 * /api/v1/analytics:
 *   get:
 *     summary: Analyze API usage statistics
 *     tags: [Analytics]
 *     responses:
 *       200:
 *         description: Successful retrieval of analytics data
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: OK
 */
analyticsRouter.get("/analytics", getAnalytics);

export default analyticsRouter;
