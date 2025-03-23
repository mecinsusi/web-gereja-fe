import { Request, Response, Router } from "express";
import {
  createChurchSpendingTypeService,
  updateChurchSpendingTypeService,
  deleteChurchSpendingTypeService,
  getChurchSpendingTypeService,
  getAllChurchSpendingTypeService
} from "../service/churchSpendingType";

import { body, param, validationResult } from "express-validator";
import { normalize } from "../utils/normalize";
import { DataType } from "../types/dataType";

export const churchSpendingTypeRouter = Router();

churchSpendingTypeRouter.post(
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
      const spendingType = await createChurchSpendingTypeService(req.body);
      res.send(
        normalize(
          "Church spendingType created successfully",
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

churchSpendingTypeRouter.put(
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
      const spendingType = await updateChurchSpendingTypeService(id, req.body);
      console.log(`UPDATE_INCOME_CTRL`, spendingType);
      res.send(
        normalize(
          "Church SpendingType updated successfully",
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


churchSpendingTypeRouter.delete(
  "/delete/:id",
  param("id").isNumeric().trim(),
  async (req: Request, res: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = BigInt(req.params.id);
    try {
      await deleteChurchSpendingTypeService(id);
      res
        .status(200)
        .json(
          normalize(
            "Church SpendingType deleted successfully",
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

churchSpendingTypeRouter.get(
  "/:id",
  param("id").isNumeric().trim(),
  async (req: Request, res: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = BigInt(req.params.id);
    try {
      const spendingType = await getChurchSpendingTypeService(id);
      if (spendingType) {
        res.send(
          normalize(
            "Church SpendingType Detail found successfully",
            "OK",
            DataType.object,
            spendingType
          ),
        );
      } else {
        res
          .status(404)
          .json(normalize("Church SpendingType not found", "ERROR", DataType.null, null));
      }
    } catch (error) {
      console.log(`ERROR_`, error);
      const message = (error as any)?.message || "Internal server error";
      res.status(500).json(normalize(message, "ERROR", DataType.null, null));
    }
  },
);

churchSpendingTypeRouter.get("/", async (_req: Request, res: Response) => {
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
    const spendingType = await getAllChurchSpendingTypeService({
      page,
      limit,
      search,
    });
    res.send(
      normalize("Church SpendingType found successfully.", "OK", DataType.array, {
        spendingType
      }),
    );
  } catch (error) {
    const message = (error as any)?.message || "Internal server error";
    res.status(400).json(normalize(message, "ERROR", DataType.null, null));
  }
});

