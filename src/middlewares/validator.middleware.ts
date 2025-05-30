import { StatusCodes } from "http-status-codes";
import Joi from "joi";

export const validateParams = (schema: Joi.ObjectSchema) => {
  return (req: any, res: any, next: any) => {
    const { error } = schema.validate(req.params);
    if (error) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: error.details[0].message });
    }
    next();
  };
};
