"use strict";
// db connections
// connect to prisma / drizzle
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
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient({});
prisma.$use((params, next) => __awaiter(void 0, void 0, void 0, function* () {
    const softDeleteList = ["ChurchIncome", "User", "ChurchIncomeType", "ChurchSpending", "ChurchSpendingType", "StoreIncome", "StoreIncomeType", "StoreSpending", "StoreSpendingType", "FarmIncome", "FarmIncomeType", "FarmSpending", "FarmSpendingType"];
    // Check incoming query type
    if (softDeleteList.includes(params.model)) {
        if (params.action == "delete") {
            // Delete queries
            // Change action to an update
            params.action = "update";
            params.args["data"] = { deleted: true };
        }
        if (params.action == "deleteMany") {
            // Delete many queries
            params.action = "updateMany";
            if (params.args.data != undefined) {
                params.args.data["deleted"] = true;
            }
            else {
                params.args["data"] = { deleted: true };
            }
        }
    }
    return next(params);
}));
exports.default = prisma;
