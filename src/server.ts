import express from "express";
import dotenv from "dotenv";
import balanceRouter from "./routes/balance.route";
import pinoHttp from "pino-http";
import { initCronos } from "./cronos.client";
import healthRouter from "./routes/health.route";
import { AppConfig } from "./config";
import { logger } from "./logger";

import { init as initRedis } from "./redis.client";

const httpLogger = pinoHttp({ logger });

dotenv.config();

initCronos();
initRedis();

export const app = express();

app.use(httpLogger);

app.use("/api/v1", balanceRouter);
app.use("/", healthRouter);

app.use((_, res) => {
  res.status(404).send("Page not found");
});

app.listen(AppConfig.PORT, () => {
  logger.info(
    `listening on port ${AppConfig.PORT}, env: ${process.env.NODE_ENV}`
  );
});
