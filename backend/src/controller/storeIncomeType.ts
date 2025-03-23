import { Request, Response, Router } from "express";
import {
  createStoreIncomeTypeService,
  updateStoreIncomeTypeService,
  deleteStoreIncomeTypeService,
  getStoreIncomeTypeService,
  getAllStoreIncomeTypeService
} from "../service/storeIncomeType";

import { body, param, validationResult } from "express-validator";
import { normalize } from "../utils/normalize";
import { DataType } from "../types/dataType";

export const storeIncomeTypeRouter = Router();

storeIncomeTypeRouter.post(
  "/create",
  body("detail").isString().trim(),
  body("funds").isInt(),
  body("incomeTypeTypeName").isString().trim(),
  body("description").isString().trim(),
  body("code").isString().trim(),
  async (req: Request, res: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const incomeType = await createStoreIncomeTypeService(req.body);
      res.send(
        normalize(
          "Store incomeType created successfully",
          "OK",
          DataType.object,
          incomeType,
        ),
      );
    } catch (error) {
      const message = (error as any)?.message || "Internal server error";
      console.log(error);
      res.status(400).json(normalize(message, "ERROR", DataType.null, null));
    }
  },
);

storeIncomeTypeRouter.put(
  "/update/:id",
  param("id").isNumeric().trim(),
  body("detail").isString().trim(),
  body("funds").isInt(),
  body("incomeTypeTypeName").isString().trim(),
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
      const incomeType = await updateStoreIncomeTypeService(id, req.body);
      console.log(`UPDATE_INCOME_CTRL`, incomeType);
      res.send(
        normalize(
          "Store IncomeType updated successfully",
          "OK",
          DataType.object,
          incomeType,
        ),
      );
    } catch (error) {
      const message = (error as any)?.message || "Internal server error";
      res.status(400).json(normalize(message, "ERROR", DataType.null, null));
    }
  },
);


storeIncomeTypeRouter.delete(
  "/delete/:id",
  param("id").isNumeric().trim(),
  async (req: Request, res: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = BigInt(req.params.id);
    try {
      await deleteStoreIncomeTypeService(id);
      res
        .status(200)
        .json(
          normalize(
            "Store IncomeType deleted successfully",
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

storeIncomeTypeRouter.get(
  "/:id",
  param("id").isNumeric().trim(),
  async (req: Request, res: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = BigInt(req.params.id);
    try {
      const incomeType = await getStoreIncomeTypeService(id);
      if (incomeType) {
        res.send(
          normalize(
            "Store IncomeType Detail found successfully",
            "OK",
            DataType.object,
            incomeType
          ),
        );
      } else {
        res
          .status(404)
          .json(normalize("Store IncomeType not found", "ERROR", DataType.null, null));
      }
    } catch (error) {
      console.log(`ERROR_`, error);
      const message = (error as any)?.message || "Internal server error";
      res.status(500).json(normalize(message, "ERROR", DataType.null, null));
    }
  },
);

storeIncomeTypeRouter.get("/", async (_req: Request, res: Response) => {
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
    const incomeType = await getAllStoreIncomeTypeService({
      page,
      limit,
      search,
    });
    res.send(
      normalize("Store IncomeType found successfully.", "OK", DataType.array, {
        incomeType
      }),
    );
  } catch (error) {
    const message = (error as any)?.message || "Internal server error";
    res.status(400).json(normalize(message, "ERROR", DataType.null, null));
  }
});

