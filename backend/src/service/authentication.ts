import { login } from "../repository/authentication";
import { sign } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

// return user with jwt token
export const loginService = async (email: string, password: string) => {
  const user = await login(email, password);
  const token = sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    JWT_SECRET as string,
    {
      expiresIn: "24h",
    },
  );
  return { user, token };
};
