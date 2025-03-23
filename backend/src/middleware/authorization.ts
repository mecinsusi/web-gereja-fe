import { Response, Request, NextFunction } from "express";
import { verify } from "jsonwebtoken";

//Middleware to check authorization
//Autorization adalah proses pemberian izin yang telah teridentifikasi melakukan sesuatu
export const authorizationMiddleware = (
  req: Request | any,
  res: any,
  next: NextFunction,
) => {
  //Skip authorization for this route
  const publicRoute = ["/api/authentication", "api/healthz"];

  if (publicRoute.includes(req.path)) {
    return next;
  }

  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
  try {
    const secret = process.env.JWT_SECRET || "secret_secret_secret";
    const decoded = verify(token, secret);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
};
