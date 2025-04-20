import { Request, Response, Router } from "express";
import {
  createChurchSpendingTypeService,
  updateChurchSpendingTypeService,
  deleteChurchSpendingTypeService,
  getChurchSpendingTypeService,
  getAllChurchSpendingTypeService,
} from "../service/churchSpendingType";

import { body, param, validationResult } from "express-validator";
import { normalize } from "../utils/normalize";
import { DataType } from "../types/dataType";

export const churchSpendingTypeRouter = Router();

churchSpendingTypeRouter.post(
  "/create",
  body("spendingTypeName").isString().trim(),
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
            spendingType,
          ),
        );
      } else {
        res
          .status(404)
          .json(
            normalize(
              "Church SpendingType not found",
              "ERROR",
              DataType.null,
              null,
            ),
          );
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
    const spendingType = await getAllChurchSpendingTypeService();
    res.send(
      normalize(
        "Church SpendingType found successfully.",
        "OK",
        DataType.array,
        {
          spendingType,
        },
      ),
    );
  } catch (error) {
    const message = (error as any)?.message || "Internal server error";
    res.status(400).json(normalize(message, "ERROR", DataType.null, null));
  }
});
