import { NextFunction, Request, Response } from "express";
import { prismaCilent } from "../index";
import { compareSync, hashSync } from "bcrypt";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
import { SignupSchema } from "../schema/auth";
import { ErrorCode, HttpException } from "../exceptions/root";
// import { BadRequest } from "../exceptions/Allerror";
import { BadRequestError } from "../utiles/httperrors";
import { HttpRes } from "../utiles/httpres";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  SignupSchema.parse(req.body);
  const { email, password, name } = req.body;
  let user = await prismaCilent.user.findFirst({ where: { email } });
  if (user) {
    throw new BadRequestError("User is already existed");
  }

  user = await prismaCilent.user.create({
    data: {
      name,
      email,
      password: hashSync(password, 10),
    },
  });
  return HttpRes.created(user, "user is created successfully");

  // res.json({ message: "This si working fine", user });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  let user = await prismaCilent.user.findFirst({ where: { email } });
  console.log("this is user", user);
  if (!user) {
    throw Error("first register");
  }

  if (!compareSync(password, user.password)) {
    throw Error("user is not valid");
  }

  const token = jwt.sign(
    {
      userId: user.id,
    },
    JWT_SECRET,
  );

  res.json({ user, token });
};
