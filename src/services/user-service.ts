import { prisma } from "../config/db-config";
import { PrismaClient } from "@prisma/client";
import {
  BadRequestError,
  ConflictError,
  NotFoundError,
} from "../utiles/httperrors";
import { SignupInput, loginInput } from "../schema/auth";
import bcrypt from "bcrypt";
export class UserService {
  constructor(private userModel: PrismaClient["user"]) {}

  async create(data: SignupInput) {
    const { email, password } = data;
    // find user using phone and email
    let user = await this.userModel.findUnique({ where: { email } });

    // if user account already exit
    if (user) throw new BadRequestError("User already exits.", 1002);

    const hashpassword = await bcrypt.hash(password, 10);

    data.password = hashpassword;
    // now create new user
    return await this.userModel.create({ data });
  }

  async login(data: loginInput) {
    const { email, password } = data;
    // find user email in database

    const user = await this.userModel.findUnique({ where: { email } });

    if (!user) {
      throw new NotFoundError("User is not exist", 404);
    }

    const Match = await bcrypt.compare(password, user.password);
    if (!Match) {
      throw new ConflictError("user is invalid");
    }

    return user;
  }
  async update(data: any, userId: any) {
    const { name, email } = data;
    const { id } = userId;
    const existingUser = await this.userModel.findUnique({
      where: {
        id: id,
      },
    });
    if (!existingUser) {
      return new BadRequestError("product not found");
    }

    const updatedUser = await this.userModel.update({
      where: {
        id: id,
      },
      data: {
        name: name || existingUser.name, // Use existing name if not provided
        email: email || existingUser.email, // Use existing email if not provided
      },
    });

    if (!updatedUser) {
      throw new BadRequestError("product not updated");
    }

    return updatedUser;
  }

  async updateDefaultShippingAddress(body: any, userId: string) {
    const updatedDefaultShipping = await this.userModel.update({
      where: {
        id: userId,
      },
      data: {
        defaultShippingAddress: body.id,
      },
    });

    return updatedDefaultShipping;
  }
}

export const userService = new UserService(prisma.user as any);
