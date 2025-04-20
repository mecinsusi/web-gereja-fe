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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("./configuration/db"));
const dotenv_1 = __importDefault(require("dotenv"));
const router_1 = require("./router");
// Load environment variables
dotenv_1.default.config();
// Fix BigInt to JSON serialization
// @ts-ignore
BigInt.prototype.toJSON = function () {
    return Number(this);
};
const port = process.env.PORT || 5000;
router_1.app.listen(port, () => {
    console.log(`🚀 Server is running on port ${port}`);
});
// Graceful shutdown for Prisma
process.on("SIGINT", () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Shutting down gracefully...");
    yield db_1.default.$disconnect();
    process.exit(0);
}));
process.on("SIGTERM", () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Process terminated.");
    yield db_1.default.$disconnect();
    process.exit(0);
}));
