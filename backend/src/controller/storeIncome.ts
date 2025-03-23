import { Request, Response, Router } from "express";
import {
  createStoreIncomeService,
  updateIncomeService,
  patchStoreIncomeService,
  deleteStoreIncomeService,
  getStoreIncomeService,
  getAllStoreIncomeService
} from "../service/storeIncome";

import { body, param, validationResult } from "express-validator";
import { normalize } from "../utils/normalize";
import { DataType } from "../types/dataType";

export const storeIncomeRouter = Router();

storeIncomeRouter.post(
  "/create",
  body("detail").isString().trim(),
  body("funds").isInt(),
  body("incomeTypeName").isString().trim(),
  body("description").isString().trim(),
  body("code").isString().trim(),
  async (req: Request, res: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const income = await createStoreIncomeService(req.body);
      res.send(
        normalize(
          "Store income created successfully",
          "OK",
          DataType.object,
          income,
        ),
      );
    } catch (error) {
      const message = (error as any)?.message || "Internal server error";
      console.log(error);
      res.status(400).json(normalize(message, "ERROR", DataType.null, null));
    }
  },
);

storeIncomeRouter.put(
  "/update/:id",
  param("id").isNumeric().trim(),
  body("detail").isString().trim(),
  body("funds").isInt(),
  body("incomeTypeName").isString().trim(),
  body("description").isString().trim(),
  body("code").isString().trim(),
  async (req: Request, res: any) => {
    const errors = validationResult(req);
    console.log(`REQ_BODY_UPDATE_INCOME`, req.body);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = BigInt(req.params.id);
    try {
      const income = await updateIncomeService(id, req.body);
      console.log(`UPDATE_INCOME_CTRL`, income);
      res.send(
        normalize(
          "Store Income updated successfully",
          "OK",
          DataType.object,
          income,
        ),
      );
    } catch (error) {
      const message = (error as any)?.message || "Internal server error";
      res.status(400).json(normalize(message, "ERROR", DataType.null, null));
    }
  },
);

storeIncomeRouter.patch(
  "/:id",
  param("id").isNumeric().trim(),
  body("op").isIn(["add", "remove", "replace"]),
  body("path").isString().trim(),
  body("value").optional().isString().trim(),
  async (req: Request, res: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = BigInt(req.params.id);
    try {
      const inventory = await patchStoreIncomeService(id, req.body);
      res.send(inventory);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      res.status(500).json({ message: "Internal service error" });
    }
  },
);

storeIncomeRouter.delete(
  "/delete/:id",
  param("id").isNumeric().trim(),
  async (req: Request, res: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = BigInt(req.params.id);
    try {
      await deleteStoreIncomeService(id);
      res
        .status(200)
        .json(
          normalize(
            "Store Income deleted successfully",
            "OK",
            DataType.null,
            null,
          ),
        );
    } catch (error) {
      const message = (error as any)?.message || "Internal server error";
      res.status(400).json(normalize(message, "ERROR", DataType.null, null));
    }
  },
);

storeIncomeRouter.get(
  "/:id",
  param("id").isNumeric().trim(),
  async (req: Request, res: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = BigInt(req.params.id);
    try {
      const income = await getStoreIncomeService(id);
      if (income) {
        res.send(
          normalize(
            "Store Income Detail found successfully",
            "OK",
            DataType.object,
            income
          ),
        );
      } else {
        res
          .status(404)
          .json(normalize("Store Income not found", "ERROR", DataType.null, null));
      }
    } catch (error) {
      console.log(`ERROR_`, error);
      const message = (error as any)?.message || "Internal server error";
      res.status(500).json(normalize(message, "ERROR", DataType.null, null));
    }
  },
);

storeIncomeRouter.get("/", async (_req: Request, res: Response) => {
  try {
    let incomeTypeId = null;
    const page = _req.query.page ? parseInt(_req.query.page as string, 10) : 1;
    const limit = _req.query.limit
      ? parseInt(_req.query.limit as string, 10)
      : 10;
    const search = _req.query.search ? String(_req.query.search) : undefined;
    // If the value of query is string and except number show all without filter
    if (
      // Query paramater = _req.query.inventoryTypeId (string)
      _req.query.incomeTypeId &&
      // Function to checks if the given value is NaN (Not-a-Number)
      !Number.isNaN(+_req.query.incomeTypeId)
    ) {
      // Change query string to Bigint
      incomeTypeId = BigInt(_req.query.incomeTypeId as string);
    }
    const income = await getAllStoreIncomeService({
      incomeTypeId,
      page,
      limit,
      search,
    });
    res.send(
      normalize("Store Income found successfully.", "OK", DataType.array, {
        income
      }),
    );
  } catch (error) {
    const message = (error as any)?.message || "Internal server error";
    res.status(400).json(normalize(message, "ERROR", DataType.null, null));
  }
});

