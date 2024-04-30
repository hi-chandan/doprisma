import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";

export class TokenService {
  async generate(userId: string) {
    const token = jwt.sign(userId, JWT_SECRET);
    return token;
  }
}

export const tokenService = new TokenService();
