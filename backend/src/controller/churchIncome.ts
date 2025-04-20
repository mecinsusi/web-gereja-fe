import { Request, Response, Router } from "express";
import {
  createChurchIncomeService,
  updateChurchIncomeService,
  patchChurchIncomeService,
  deleteChurchIncomeService,
  getChurchIncomeService,
  getAllFinanceService,
  getAllChurchIncomeService,
} from "../service/churchIncome";

import { body, param, validationResult } from "express-validator";
import { normalize } from "../utils/normalize";
import { DataType } from "../types/dataType";

export const churchIncomeRouter = Router();

churchIncomeRouter.post(
  "/create",
  body("detail").isString().trim(),
  body("funds").isInt(),
  body("incomeTypeName").isString().trim(),
  body("description").isString().trim(),
  body("code").isString().trim(),
  body("date").isISO8601(),
  async (req: Request, res: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const income = await createChurchIncomeService(req.body);
      res.send(
        normalize(
          "Church income created successfully",
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

churchIncomeRouter.put(
  "/update/:id",
  param("id").isNumeric().trim(),
  body("detail").isString().trim(),
  body("funds").isInt(),
  body("incomeTypeName").isString().trim(),
  body("description").isString().trim(),
  body("code").isString().trim(),
  body("date").isISO8601(),
  async (req: Request, res: any) => {
    const errors = validationResult(req);
    console.log(`REQ_BODY_UPDATE_INCOME`, req.body);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = BigInt(req.params.id);
    try {
      const income = await updateChurchIncomeService(id, req.body);
      console.log(`UPDATE_INCOME_CTRL`, income);
      res.send(
        normalize(
          "Church Income updated successfully",
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

churchIncomeRouter.patch(
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
      const inventory = await patchChurchIncomeService(id, req.body);
      res.send(inventory);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      res.status(500).json({ message: "Internal service error" });
    }
  },
);

churchIncomeRouter.delete(
  "/delete/:id",
  param("id").isNumeric().trim(),
  async (req: Request, res: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = BigInt(req.params.id);
    try {
      await deleteChurchIncomeService(id);
      res
        .status(200)
        .json(
          normalize(
            "Church Income deleted successfully",
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

churchIncomeRouter.get("/", async (_req: Request, res: Response) => {
  try {
    const income = await getAllChurchIncomeService();
    res.send(
      normalize("Church Income found successfully.", "OK", DataType.array, {
        income,
      }),
    );
  } catch (error) {
    const message = (error as any)?.message || "Internal server error";
    res.status(400).json(normalize(message, "ERROR", DataType.null, null));
  }
});

churchIncomeRouter.get("/finance", async (req: Request, res: Response) => {
  try {
    const finance = await getAllFinanceService();
    console.log(finance);

    res.send(
      normalize("Finance found successfully.", "OK", DataType.array, {
        finance,
      }),
    );
  } catch (error) {
    const message = (error as any)?.message || "Internal server error";
    res.status(400).json(normalize(message, "ERROR", DataType.null, null));
  }
});

churchIncomeRouter.get(
  "/:id",
  param("id").isNumeric().trim(),
  async (req: Request, res: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = BigInt(req.params.id);
    try {
      const income = await getChurchIncomeService(id);
      if (income) {
        res.send(
          normalize(
            "Church Income Detail found successfully",
            "OK",
            DataType.object,
            income,
          ),
        );
      } else {
        res
          .status(404)
          .json(
            normalize("Church Income not found", "ERROR", DataType.null, null),
          );
      }
    } catch (error) {
      console.log(`ERROR_`, error);
      const message = (error as any)?.message || "Internal server error";
      res.status(500).json(normalize(message, "ERROR", DataType.null, null));
    }
  },
);
