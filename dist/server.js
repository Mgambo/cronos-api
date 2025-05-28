"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const balance_route_1 = __importDefault(require("./routes/balance.route"));
const pino_1 = __importDefault(require("pino"));
const pino_http_1 = __importDefault(require("pino-http"));
const cronos_1 = require("./middlewares/cronos");
const health_route_1 = __importDefault(require("./routes/health.route"));
const logger = (0, pino_1.default)({
    transport: {
        target: "pino-pretty",
        options: {
            colorize: true,
        },
    },
});
const httpLogger = (0, pino_http_1.default)({ logger });
dotenv_1.default.config();
(0, cronos_1.initCronos)();
const app = (0, express_1.default)();
app.use(httpLogger);
const port = process.env.PORT || 3000;
app.use("/api/v1", balance_route_1.default);
app.use("/", health_route_1.default);
app.use((req, res) => {
    res.status(404).send("Page not found");
});
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
