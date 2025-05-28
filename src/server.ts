import express from "express";
import dotenv from "dotenv";
import balanceRouter from "./routes/balance.route";
import pino from "pino";
import pinoHttp from "pino-http";
import { initCronos } from "./middlewares/cronos";
import healthRouter from "./routes/health.route";

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
const port = process.env.PORT || 3000;

app.use("/api/v1", balanceRouter);

app.use("/", healthRouter);

app.use((req, res) => {
  res.status(404).send("Page not found");
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
