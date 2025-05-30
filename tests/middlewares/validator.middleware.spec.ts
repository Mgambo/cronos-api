import request from "supertest";
import express from "express";
import Joi from "joi";
import { validateParams } from "../../src/middlewares/validator.middleware";

const app = express();

describe("validator.middleware", () => {
  it("should return 400 error if params are invalid", async () => {
    const schema = Joi.object({
      id: Joi.string().required(),
    });
    const middleware = validateParams(schema);
    app.get("/test", middleware, (req, res) => {
      res.send("Hello World!");
    });
    const response = await request(app).get("/test");
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('"id" is required');
  });

  it("should call next function if params are valid", async () => {
    const schema = Joi.object({
      id: Joi.string().required(),
    });
    const middleware = validateParams(schema);
    let nextCalled = false;
    app.get("/test/:id", middleware, (req, res) => {
      nextCalled = true;
      res.send("Hello World!");
    });
    await request(app).get("/test/123");
    expect(nextCalled).toBe(true);
  });
});
