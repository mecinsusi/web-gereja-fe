import { Request, Response, Router } from "express";

import { body, validationResult } from "express-validator";
import { normalize } from "../utils/normalize";
import { DataType } from "../types/dataType";
import { loginService } from "../service/authentication";

export const authenticationRouter = Router();

authenticationRouter.post(
  "/login",
  body("email").isString().trim(),
  body("password").isString().trim(),
  async (req: Request, res: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { user, token } = await loginService(
        req.body.email,
        req.body.password,
      );
      res.send(
        normalize(
          "User login successfully",
          "OK",
          DataType.object,
          user,
          token,
        ),
      );
    } catch (error) {
      const message = (error as any)?.message || "Internal server error";
      res.status(400).json(normalize(message, "ERROR", DataType.null, null));
    }
  },
);
