"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const balance_controller_1 = require("../controllers/balance.controller");
const errors_1 = require("../enums/errors");
const balanceRouter = (0, express_1.Router)();
balanceRouter.get("/balance/:address", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { address } = req.params;
    try {
        const balance = yield (0, balance_controller_1.getBalance)(address);
        res.send(balance);
    }
    catch (err) {
        console.error(err.message);
        if (err instanceof Error) {
            if (err.message.includes('operation="getEnsAddress'))
                return next(errors_1.Errors.INVALID_ADDRESS);
        }
        next(errors_1.Errors.INTERNAL_SERVER_ERROR);
    }
}));
balanceRouter.get("/token-balance/:address/:tokenAddress", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { address, tokenAddress } = req.params;
    try {
        const tokenBalance = yield (0, balance_controller_1.getTokenBalance)(address, tokenAddress);
        res.send(tokenBalance);
    }
    catch (err) {
        console.log("ttt:::");
        console.error(err.message);
        if (err instanceof Error) {
            if (err.message.includes('operation="getEnsAddress'))
                return next(errors_1.Errors.INVALID_ADDRESS);
        }
        next(errors_1.Errors.INTERNAL_SERVER_ERROR);
    }
}));
exports.default = balanceRouter;
