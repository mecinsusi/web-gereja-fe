import express from "express";

import bodyParser from "body-parser";
import { churchIncomeRouter } from "./controller/churchIncome";
import { churchIncomeTypeRouter } from "./controller/churchIncomeType";
import { churchSpendingRouter } from "./controller/churchSpending";
import { churchSpendingTypeRouter } from "./controller/churchSpendingType";
import { farmIncomeRouter } from "./controller/farmIncome";
import { farmIncomeTypeRouter } from "./controller/farmIncomeType";
import { farmSpendingRouter } from "./controller/farmSpending";
import { farmSpendingTypeRouter } from "./controller/farmSpendingType";
import { storeIncomeRouter } from "./controller/storeIncome";
import { storeIncomeTypeRouter } from "./controller/storeIncomeType";
import { storeSpendingTypeRouter } from "./controller/storeSpendingType";
import { storeSpendingRouter } from "./controller/storeSpending";
import { authenticationRouter } from "./controller/authentication";
import { authorizationMiddleware } from "./middleware/authorization";

export const app = express();
var cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

//Public Routes
app.use("/api/authentication", authenticationRouter);
app.get("/api/healthz", (_req, res) => {
  res.send("OK");
});
// ✅ Handle requests to "/"
app.get("/", (_req, res) => {
  res.send("Welcome to Express Backend!");
});

//Apply the middleware globally
/**
app.use(authorizationMiddleware);
*/

//Protected Routes
app.use("/api/churchincome", churchIncomeRouter)
app.use("/api/churchincometype", churchIncomeTypeRouter)
app.use("/api/churchspending", churchSpendingRouter)
app.use("/api/churchspendingtype", churchSpendingTypeRouter)
app.use("/api/farmincome", farmIncomeRouter)
app.use("/api/farmincometype", farmIncomeTypeRouter)
app.use("/api/farmspending", farmSpendingRouter)
app.use("/api/farmspendingtype", farmSpendingTypeRouter)
app.use("/api/storeincome", storeIncomeRouter)
app.use("/api/storeincometype", storeIncomeTypeRouter)
app.use("/api/storespending", storeSpendingRouter)
app.use("/api/storespendingtype", storeSpendingTypeRouter)
