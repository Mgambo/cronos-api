import { Router } from "express";

const healthRouter = Router();

healthRouter.get("/healthz", (_, res) => {
  res.send("OK");
});

export default healthRouter;
