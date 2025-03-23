import { Request, Response, Router } from "express";
import {
  createStoreSpendingService,
  updateStoreSpendingService,
  patchStoreSpendingService,
  deleteStoreSpendingService,
  getStoreSpendingService,
  getAllStoreSpendingService
} from "../service/storeSpending";

import { body, param, validationResult } from "express-validator";
import { normalize } from "../utils/normalize";
import { DataType } from "../types/dataType";

export const storeSpendingRouter = Router();

storeSpendingRouter.post(
  "/create",
  body("detail").isString().trim(),
  body("funds").isInt(),
  body("spendingTypeName").isString().trim(),
  body("description").isString().trim(),
  body("code").isString().trim(),
  async (req: Request, res: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const spending = await createStoreSpendingService(req.body);
      res.send(
        normalize(
          "Store spending created successfully",
          "OK",
          DataType.object,
          spending,
        ),
      );
    } catch (error) {
      const message = (error as any)?.message || "Internal server error";
      console.log(error);
      res.status(400).json(normalize(message, "ERROR", DataType.null, null));
    }
  },
);

storeSpendingRouter.put(
  "/update/:id",
  param("id").isNumeric().trim(),
  body("detail").isString().trim(),
  body("funds").isInt(),
  body("spendingTypeName").isString().trim(),
  body("description").isString().trim(),
  body("code").isString().trim(),
  async (req: Request, res: any) => {
    const errors = validationResult(req);
    console.log(`REQ_BODY_UPDATE_SPENDING`, req.body);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = BigInt(req.params.id);
    try {
      const spending = await updateStoreSpendingService(id, req.body);
      console.log(`UPDATE_SPENDING_CTRL`, spending);
      res.send(
        normalize(
          "Store Spending updated successfully",
          "OK",
          DataType.object,
          spending,
        ),
      );
    } catch (error) {
      const message = (error as any)?.message || "Internal server error";
      res.status(400).json(normalize(message, "ERROR", DataType.null, null));
    }
  },
);

storeSpendingRouter.patch(
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
      const inventory = await patchStoreSpendingService(id, req.body);
      res.send(inventory);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      res.status(500).json({ message: "Internal service error" });
    }
  },
);

storeSpendingRouter.delete(
  "/delete/:id",
  param("id").isNumeric().trim(),
  async (req: Request, res: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = BigInt(req.params.id);
    try {
      await deleteStoreSpendingService(id);
      res
        .status(200)
        .json(
          normalize(
            "Store Spending deleted successfully",
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

storeSpendingRouter.get(
  "/:id",
  param("id").isNumeric().trim(),
  async (req: Request, res: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = BigInt(req.params.id);
    try {
      const spending = await getStoreSpendingService(id);
      if (spending) {
        res.send(
          normalize(
            "Store Spending Detail found successfully",
            "OK",
            DataType.object,
            spending
          ),
        );
      } else {
        res
          .status(404)
          .json(normalize("Store Spending not found", "ERROR", DataType.null, null));
      }
    } catch (error) {
      console.log(`ERROR_`, error);
      const message = (error as any)?.message || "Internal server error";
      res.status(500).json(normalize(message, "ERROR", DataType.null, null));
    }
  },
);

storeSpendingRouter.get("/", async (_req: Request, res: Response) => {
  try {
    let spendingTypeId = null;
    const page = _req.query.page ? parseInt(_req.query.page as string, 10) : 1;
    const limit = _req.query.limit
      ? parseInt(_req.query.limit as string, 10)
      : 10;
    const search = _req.query.search ? String(_req.query.search) : undefined;
    // If the value of query is string and except number show all without filter
    if (
      // Query paramater = _req.query.inventoryTypeId (string)
      _req.query.spendingTypeId &&
      // Function to checks if the given value is NaN (Not-a-Number)
      !Number.isNaN(+_req.query.spendingTypeId)
    ) {
      // Change query string to Bigint
      spendingTypeId = BigInt(_req.query.incomeTypeId as string);
    }
    const spending = await getAllStoreSpendingService({
      spendingTypeId,
      page,
      limit,
      search,
    });
    res.send(
      normalize("Store Spending found successfully.", "OK", DataType.array, {
        spending
      }),
    );
  } catch (error) {
    const message = (error as any)?.message || "Internal server error";
    res.status(400).json(normalize(message, "ERROR", DataType.null, null));
  }
});

