import { Address, PrismaClient } from "@prisma/client";
import { prisma } from "../config/db-config";
import { addresstype } from "../schema/address";
import { BadRequestError } from "../utiles/httperrors";

export class AddressService {
  constructor(private addressModel: PrismaClient["address"]) {}
  async create(data: any, id: string) {
    const address = await this.addressModel.create({
      data: { ...data, userId: id },
    });

    if (!address) {
      throw new BadRequestError("address is not save");
    }

    return address;
  }

  async singleUpdate(body: any, id: string) {
    const existing = await this.addressModel.findUnique({ where: { id: id } });

    if (!existing) {
      throw new BadRequestError("Address is not existed");
    }

    const singleUpdate = this.addressModel.update({
      where: { id: id },
      data: {
        lineone: body.lineone || existing?.lineone,
        city: body.city || existing?.city,
        country: body.country || existing?.country,
        pincode: body.pincode || existing?.pincode,
      },
    });

    return singleUpdate;
  }

  async delete(id: string) {
    const existing = await this.addressModel.findMany({
      where: { userId: id },
    });

    if (!existing.length) {
      throw new BadRequestError("Address is not saved");
    }

    const deleteAddress = await this.addressModel.deleteMany({
      where: { userId: id },
    });

    if (!deleteAddress) {
      throw new BadRequestError("delete Address Successfull");
    }

    return deleteAddress;
  }

  async list(userId: string) {
    const existing = await this.addressModel.findMany({
      where: { userId: userId },
    });

    if (!existing.length) {
      throw new BadRequestError("Address is not saved");
    }
    const AddressList = await this.addressModel.findMany({
      where: { userId: userId },
    });

    if (!AddressList) {
      throw new BadRequestError("Don't have Address");
    }
    return AddressList;
  }
  // check address id === user defaultShippingAddress
  async checkAddress(body: any, id: string) {
    const shippingAddress = await this.addressModel.findFirstOrThrow({
      where: { id: body.defaultShippingAddress },
    });

    if (!shippingAddress) {
      throw new BadRequestError("Address not found");
    }

    if (shippingAddress.userId != id) {
      throw new BadRequestError("Address not belong to user");
    }
    return shippingAddress;
  }
}

export const addressService = new AddressService(prisma.address as any);
