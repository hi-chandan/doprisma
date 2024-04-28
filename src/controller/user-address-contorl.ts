import { Request, Response } from "express";
import { AddressService, addressService } from "../services/address-service";
import { HttpRes } from "../utiles/httpres";

export class Addresscontol {
  constructor(private addressService: AddressService) {}
  async addAddress(req: Request, res: Response) {
    const body = req.body;
    const userId = req.user.id;

    const address = await this.addressService.create(body, userId);

    return HttpRes.ok(address, "address is save ");
  }

  async singleUpdate(req: Request, res: Response) {
    const id = req.params.id;
    const body = req.body;
    const singleUpdate = await this.addressService.singleUpdate(body, id);

    return HttpRes.ok(singleUpdate, "update is successfully");
  }

  async deleteAddress(req: Request, res: Response) {
    const userId = req.user.id;

    const deleteAddress = await this.addressService.delete(userId);

    return HttpRes.ok(deleteAddress, "all address is deleted");
  }
  async listAddress(req: Request, res: Response) {
    const userId = req.user.id;

    const addressList = await this.addressService.list(userId);

    return HttpRes.ok(addressList, " All Address");
  }
}

export const addresscontrol = new Addresscontol(addressService);
