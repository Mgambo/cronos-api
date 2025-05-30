import { Router } from "express";

const healthRouter = Router();

/**
 * @swagger
 * /healthz:
 *   get:
 *     summary: Health check endpoint
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: API is healthy
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: OK
 */
healthRouter.get("/healthz", (_, res) => {
  res.send("OK");
});

export default healthRouter;
