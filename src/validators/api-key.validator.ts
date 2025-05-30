import Joi from "joi";
import { AppConfig } from "../config";

export const apiKeyValidator = Joi.string()
  .required()
  .valid(AppConfig.API_KEY)
  .error(new Error("Missing or Invalid api key"));
