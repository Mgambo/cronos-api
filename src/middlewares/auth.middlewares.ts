import { NextFunction, Request, Response } from "express";
import { AppConfig } from "../config";

export const xAppKeyAuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const xAppKey = req.header("x-app-key");
  if (xAppKey !== AppConfig.API_KEY) {
    res.status(401).send("Invalid api key");
  } else {
    next();
  }
};
