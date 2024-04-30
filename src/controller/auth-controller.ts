import { Request, Response, NextFunction } from "express";
import { loginInput, signupInput, updateInput } from "../schema/auth";
import { HttpRes } from "../utiles/httpres";
import { userService, UserService } from "../services/user-service";
import { TokenService, tokenService } from "../services/token-service";
import { AddressService, addressService } from "../services/address-service";

export class AuthController {
  constructor(
    private userService: UserService,
    private tokenService: TokenService,
    private addressService: AddressService, // private tokenService: TokenService,
  ) {}

  async signup(req: Request, res: Response) {
    const body = signupInput.parse(req.body);

    const user = await this.userService.create(body);

    const token = await this.tokenService.generate(user.id);

    return res.cookie("token", token, {
      secure: true,
      httpOnly: true,
    });
    return HttpRes.created(user, "user is created successfully");

    // return res.status(httpRes.status).send(httpRes);
  }

  async login(req: Request, res: Response) {
    const body = loginInput.parse(req.body);

    const user = await this.userService.login(body);

    const token = await this.tokenService.generate(user.id);
    res.cookie("token", token, {
      secure: true,
      httpOnly: true,
    });
    return HttpRes.created(user, "user login successfully");
  }

  async me(req: Request, res: Response) {
    const user = req.user;
    return HttpRes.ok(user, "Your details");
  }

  async update(req: Request, res: Response) {
    const body = req.body;
    const id = req.user;
    const user = await this.userService.update(body, id);

    return HttpRes.ok(user, "user update successfully");
  }
  async updateUser(req: Request, res: Response) {
    const body = req.body;
    const userId = req.user.id;
    const validAddress = await this.addressService.checkAddress(body, userId);

    const updateDefaultShippingAddress =
      await this.userService.updateDefaultShippingAddress(validAddress, userId);

    return HttpRes.ok(updateDefaultShippingAddress, "Address of user");
  }
}

export const authController = new AuthController(
  userService,
  tokenService,
  addressService,
);
