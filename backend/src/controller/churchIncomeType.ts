import { Request, Response, Router } from "express";
import {
  createChurchIncomeTypeService,
  updateChurchIncomeTypeService,
  deleteChurchIncomeTypeService,
  getChurchIncomeTypeService,
  getAllChurchIncomeTypeService,
} from "../service/churchIncomeType";

import { body, param, validationResult } from "express-validator";
import { normalize } from "../utils/normalize";
import { DataType } from "../types/dataType";

export const churchIncomeTypeRouter = Router();

churchIncomeTypeRouter.post(
  "/create",
  body("incomeTypeName").isString().trim(),
  body("description").isString().trim(),
  body("code").isString().trim(),
  async (req: Request, res: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const incomeType = await createChurchIncomeTypeService(req.body);
      res.send(
        normalize(
          "Church incomeType created successfully",
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

churchIncomeTypeRouter.put(
  "/update/:id",
  param("id").isNumeric().trim(),
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
      const incomeType = await updateChurchIncomeTypeService(id, req.body);
      console.log(`UPDATE_INCOME_CTRL`, incomeType);
      res.send(
        normalize(
          "Church IncomeType updated successfully",
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

churchIncomeTypeRouter.delete(
  "/delete/:id",
  param("id").isNumeric().trim(),
  async (req: Request, res: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = BigInt(req.params.id);
    try {
      await deleteChurchIncomeTypeService(id);
      res
        .status(200)
        .json(
          normalize(
            "Church IncomeType deleted successfully",
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

churchIncomeTypeRouter.get(
  "/:id",
  param("id").isNumeric().trim(),
  async (req: Request, res: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = BigInt(req.params.id);
    try {
      const incomeType = await getChurchIncomeTypeService(id);
      if (incomeType) {
        res.send(
          normalize(
            "Church IncomeType Detail found successfully",
            "OK",
            DataType.object,
            incomeType,
          ),
        );
      } else {
        res
          .status(404)
          .json(
            normalize(
              "Church IncomeType not found",
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

churchIncomeTypeRouter.get("/", async (_req: Request, res: Response) => {
  try {
    const incomeType = await getAllChurchIncomeTypeService();
    res.send(
      normalize(
        "Church IncomeType found successfully.",
        "OK",
        DataType.object,
        {
          incomeType,
        },
      ),
    );
  } catch (error) {
    const message = (error as any)?.message || "Internal server error";
    res.status(400).json(normalize(message, "ERROR", DataType.null, null));
  }
});
