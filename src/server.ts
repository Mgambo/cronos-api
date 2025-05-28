import express from "express";
import dotenv from "dotenv";
import balanceRouter from "./routes/balance.route";
import pino from "pino";
import pinoHttp from "pino-http";

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

const app = express();
app.use(httpLogger);
const port = process.env.PORT || 3000;

app.use("/api/v1", balanceRouter);

app.use("/healthz", (_, res) => {
  res.send("OK");
});

app.use((req, res) => {
  res.status(404).send("Page not found");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
