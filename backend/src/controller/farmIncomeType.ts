import { Request, Response, Router } from "express";
import {
  createFarmIncomeTypeService,
  updateFarmIncomeTypeService,
  deleteFarmIncomeTypeService,
  getFarmIncomeTypeService,
  getAllFarmIncomeTypeService
} from "../service/farmIncomeType";

import { body, param, validationResult } from "express-validator";
import { normalize } from "../utils/normalize";
import { DataType } from "../types/dataType";

export const farmIncomeTypeRouter = Router();

farmIncomeTypeRouter.post(
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
      const incomeType = await createFarmIncomeTypeService(req.body);
      res.send(
        normalize(
          "Farm incomeType created successfully",
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

farmIncomeTypeRouter.put(
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
      const incomeType = await updateFarmIncomeTypeService(id, req.body);
      console.log(`UPDATE_INCOME_CTRL`, incomeType);
      res.send(
        normalize(
          "Farm IncomeType updated successfully",
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


farmIncomeTypeRouter.delete(
  "/delete/:id",
  param("id").isNumeric().trim(),
  async (req: Request, res: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = BigInt(req.params.id);
    try {
      await deleteFarmIncomeTypeService(id);
      res
        .status(200)
        .json(
          normalize(
            "Farm IncomeType deleted successfully",
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

farmIncomeTypeRouter.get(
  "/:id",
  param("id").isNumeric().trim(),
  async (req: Request, res: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = BigInt(req.params.id);
    try {
      const incomeType = await getFarmIncomeTypeService(id);
      if (incomeType) {
        res.send(
          normalize(
            "Farm IncomeType Detail found successfully",
            "OK",
            DataType.object,
            incomeType
          ),
        );
      } else {
        res
          .status(404)
          .json(normalize("Farm IncomeType not found", "ERROR", DataType.null, null));
      }
    } catch (error) {
      console.log(`ERROR_`, error);
      const message = (error as any)?.message || "Internal server error";
      res.status(500).json(normalize(message, "ERROR", DataType.null, null));
    }
  },
);

farmIncomeTypeRouter.get("/", async (_req: Request, res: Response) => {
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
    const incomeType = await getAllFarmIncomeTypeService({
      page,
      limit,
      search,
    });
    res.send(
      normalize("Farm IncomeType found successfully.", "OK", DataType.array, {
        incomeType
      }),
    );
  } catch (error) {
    const message = (error as any)?.message || "Internal server error";
    res.status(400).json(normalize(message, "ERROR", DataType.null, null));
  }
});

