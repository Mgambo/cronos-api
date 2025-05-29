import express from "express";
import dotenv from "dotenv";
import balanceRouter from "./routes/balance.route";
import pino from "pino";
import pinoHttp from "pino-http";
import { initCronos } from "./cronos.client";
import healthRouter from "./routes/health.route";
import { AppConfig } from "./config";

const logger = pino({
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
    },
  },
});

const httpLogger = pinoHttp({ logger });

dotenv.config();

initCronos();

const app = express();

app.use(httpLogger);

app.use("/api/v1", balanceRouter);
app.use("/", healthRouter);

app.use((req, res) => {
  res.status(404).send("Page not found");
});

app.listen(AppConfig.PORT, () => {
  console.log(
    `listening on port ${AppConfig.PORT}, env: ${process.env.NODE_ENV}`
  );
});
