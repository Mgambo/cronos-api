import Joi from "joi";
import { isAddress } from "viem";

export const getBalanceSchema = Joi.object({
  address: Joi.string()
    .custom((value: string, helpers) => {
      if (!isAddress(value)) return helpers.error("address");
      return value;
    })
    .messages({
      address: "Invalid address",
    }),
});

export const getTokenBalanceSchema = Joi.object({
  address: Joi.string()
    .custom((value: string, helpers) => {
      if (!isAddress(value)) return helpers.error("address");
      return value;
    })
    .messages({
      address: "Invalid address",
    }),
  tokenAddress: Joi.string()
    .custom((value: string, helpers) => {
      if (!isAddress(value)) return helpers.error("tokenAddress");
      return value;
    })
    .messages({
      tokenAddress: "Invalid token address",
    }),
});
