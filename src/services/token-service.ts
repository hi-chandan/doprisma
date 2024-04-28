import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";

export class TokenService {
  async generate(userId: string, res: any) {
    const token = await jwt.sign(userId, JWT_SECRET);

    return res.cookie("token", token, {
      secure: true,
      httpOnly: true,
    });
  }
}

export const tokenService = new TokenService();
