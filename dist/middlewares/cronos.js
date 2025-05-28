"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initCronos = void 0;
const developer_platform_client_1 = require("@crypto.com/developer-platform-client");
const config_1 = require("../config");
const initCronos = () => {
    developer_platform_client_1.Client.init({
        chain: process.env.NODE_ENV === "production"
            ? developer_platform_client_1.CronosEvm.Mainnet
            : developer_platform_client_1.CronosEvm.Testnet,
        apiKey: config_1.CRONOS.API_KEY, // Explorer API,
        provider: "https://evm-t3.cronos.org",
    });
    console.info(`Initialized Cronos with apiKey: ${developer_platform_client_1.Client.getApiKey()} and chainId: ${developer_platform_client_1.Client.getChainId()}`);
};
exports.initCronos = initCronos;
