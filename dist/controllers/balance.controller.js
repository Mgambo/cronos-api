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
exports.getTokenBalance = exports.getBalance = void 0;
const developer_platform_client_1 = require("@crypto.com/developer-platform-client");
const getBalance = (address) => __awaiter(void 0, void 0, void 0, function* () {
    const balance = yield developer_platform_client_1.Wallet.balance(address);
    return balance;
});
exports.getBalance = getBalance;
const getTokenBalance = (address, tokenAddress) => __awaiter(void 0, void 0, void 0, function* () {
    const tokenBalance = yield developer_platform_client_1.Token.getERC20TokenBalance(address, tokenAddress);
    return tokenBalance;
});
exports.getTokenBalance = getTokenBalance;
