"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const churchIncome_1 = require("./controller/churchIncome");
const churchIncomeType_1 = require("./controller/churchIncomeType");
const churchSpending_1 = require("./controller/churchSpending");
const churchSpendingType_1 = require("./controller/churchSpendingType");
const farmIncome_1 = require("./controller/farmIncome");
const farmIncomeType_1 = require("./controller/farmIncomeType");
const farmSpending_1 = require("./controller/farmSpending");
const farmSpendingType_1 = require("./controller/farmSpendingType");
const storeIncome_1 = require("./controller/storeIncome");
const storeIncomeType_1 = require("./controller/storeIncomeType");
const storeSpendingType_1 = require("./controller/storeSpendingType");
const storeSpending_1 = require("./controller/storeSpending");
const authentication_1 = require("./controller/authentication");
const authorization_1 = require("./middleware/authorization");
exports.app = (0, express_1.default)();
var cors = require("cors");
exports.app.use(cors());
exports.app.use(express_1.default.json());
exports.app.use(body_parser_1.default.urlencoded({
    extended: true,
}));
//Public Routes
exports.app.use("/api/authentication", authentication_1.authenticationRouter);
exports.app.get("/api/healthz", (_req, res) => {
    res.send("OK");
});
// Handle requests to "/"
exports.app.get("/", (_req, res) => {
    res.send("Welcome to Express Backend!");
});
//Apply the middleware globally
exports.app.use(authorization_1.authorizationMiddleware);
//Protected Routes
exports.app.use("/api/churchincome", churchIncome_1.churchIncomeRouter);
exports.app.use("/api/churchincometype", churchIncomeType_1.churchIncomeTypeRouter);
exports.app.use("/api/churchspending", churchSpending_1.churchSpendingRouter);
exports.app.use("/api/churchspendingtype", churchSpendingType_1.churchSpendingTypeRouter);
exports.app.use("/api/farmincome", farmIncome_1.farmIncomeRouter);
exports.app.use("/api/farmincometype", farmIncomeType_1.farmIncomeTypeRouter);
exports.app.use("/api/farmspending", farmSpending_1.farmSpendingRouter);
exports.app.use("/api/farmspendingtype", farmSpendingType_1.farmSpendingTypeRouter);
exports.app.use("/api/storeincome", storeIncome_1.storeIncomeRouter);
exports.app.use("/api/storeincometype", storeIncomeType_1.storeIncomeTypeRouter);
exports.app.use("/api/storespending", storeSpending_1.storeSpendingRouter);
exports.app.use("/api/storespendingtype", storeSpendingType_1.storeSpendingTypeRouter);
