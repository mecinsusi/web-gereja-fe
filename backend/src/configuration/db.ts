// db connections
// connect to prisma / drizzle

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({});

prisma.$use(async (params: any, next) => {
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
      } else {
        params.args["data"] = { deleted: true };
      }
    }
  }
  return next(params);
});

export default prisma;
