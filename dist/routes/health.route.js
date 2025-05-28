"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const healthRouter = (0, express_1.Router)();
healthRouter.get("/healthz", (_, res) => {
    res.send("OK");
});
exports.default = healthRouter;
