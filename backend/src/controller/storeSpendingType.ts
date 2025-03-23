import { Request, Response, Router } from "express";
import {
  createStoreSpendingTypeService,
  updateStoreSpendingTypeService,
  deleteStoreSpendingTypeService,
  getStoreSpendingTypeService,
  getAllStoreSpendingTypeService
} from "../service/storeSpendingType";

import { body, param, validationResult } from "express-validator";
import { normalize } from "../utils/normalize";
import { DataType } from "../types/dataType";

export const storeSpendingTypeRouter = Router();

storeSpendingTypeRouter.post(
  "/create",
  body("detail").isString().trim(),
  body("funds").isInt(),
  body("spendingTypeTypeName").isString().trim(),
  body("description").isString().trim(),
  body("code").isString().trim(),
  async (req: Request, res: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const spendingType = await createStoreSpendingTypeService(req.body);
      res.send(
        normalize(
          "Store spendingType created successfully",
          "OK",
          DataType.object,
          spendingType,
        ),
      );
    } catch (error) {
      const message = (error as any)?.message || "Internal server error";
      console.log(error);
      res.status(400).json(normalize(message, "ERROR", DataType.null, null));
    }
  },
);

storeSpendingTypeRouter.put(
  "/update/:id",
  param("id").isNumeric().trim(),
  body("detail").isString().trim(),
  body("funds").isInt(),
  body("spendingTypeTypeName").isString().trim(),
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
      const spendingType = await updateStoreSpendingTypeService(id, req.body);
      console.log(`UPDATE_INCOME_CTRL`, spendingType);
      res.send(
        normalize(
          "Store SpendingType updated successfully",
          "OK",
          DataType.object,
          spendingType,
        ),
      );
    } catch (error) {
      const message = (error as any)?.message || "Internal server error";
      res.status(400).json(normalize(message, "ERROR", DataType.null, null));
    }
  },
);


storeSpendingTypeRouter.delete(
  "/delete/:id",
  param("id").isNumeric().trim(),
  async (req: Request, res: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = BigInt(req.params.id);
    try {
      await deleteStoreSpendingTypeService(id);
      res
        .status(200)
        .json(
          normalize(
            "Store SpendingType deleted successfully",
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

storeSpendingTypeRouter.get(
  "/:id",
  param("id").isNumeric().trim(),
  async (req: Request, res: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = BigInt(req.params.id);
    try {
      const spendingType = await getStoreSpendingTypeService(id);
      if (spendingType) {
        res.send(
          normalize(
            "Store SpendingType Detail found successfully",
            "OK",
            DataType.object,
            spendingType
          ),
        );
      } else {
        res
          .status(404)
          .json(normalize("Store SpendingType not found", "ERROR", DataType.null, null));
      }
    } catch (error) {
      console.log(`ERROR_`, error);
      const message = (error as any)?.message || "Internal server error";
      res.status(500).json(normalize(message, "ERROR", DataType.null, null));
    }
  },
);

storeSpendingTypeRouter.get("/", async (_req: Request, res: Response) => {
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
      spendingTypeId = BigInt(_req.query.spendingType as string);
    }
    const spendingType = await getAllStoreSpendingTypeService({
      page,
      limit,
      search,
    });
    res.send(
      normalize("Store SpendingType found successfully.", "OK", DataType.array, {
        spendingType
      }),
    );
  } catch (error) {
    const message = (error as any)?.message || "Internal server error";
    res.status(400).json(normalize(message, "ERROR", DataType.null, null));
  }
});

