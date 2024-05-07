import { PrismaClient } from "@prisma/client";
import { prisma } from "../config/db-config";
import { BadRequestError } from "../utiles/httperrors";
import { ProductInput } from "../schema/product-schama";
import cloudinary from "cloudinary";
export class ProductService {
  constructor(private productModel: PrismaClient["product"]) {}

  async create(data: ProductInput, userId: string, file: any) {
    const result = await cloudinary.v2.uploader.upload(file, {
      folder: "check/product",
    });

    const product = await this.productModel.create({
      data: {
        ...data,
        image: {
          publicId: result.public_id,
          url: result.secure_url,
          id: userId,
        },
      },
    });

    if (!product) {
      return new BadRequestError("product not Created");
    }
    return product;
  }

  async allProduct() {
    const products = await this.productModel.findMany();
    return products;
  }

  async updateProduct(body: any, productId: any) {
    const existingProduct = await this.productModel.findUnique({
      where: { id: productId },
    });

    if (!existingProduct) {
      console.log("This if working");
      throw new BadRequestError("product not exist");
    }

    const updatedProduct = await this.productModel.update({
      where: {
        id: productId,
      },
      data: {
        name: body.name || existingProduct.name, // Use existing name if not provided
        description: body.description || existingProduct.description, // Use existing email if not provided
        price: body.price || existingProduct.price,
        tags: body.tags || existingProduct.tags,
      },
    });

    if (!updatedProduct) {
      throw new BadRequestError("product not exist");
    }

    return updatedProduct;
  }

  async deleteProduct(productId: any) {
    const product = await this.productModel.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new BadRequestError("product is not exist");
    }

    const publicId = product.image[0].publicId;
    const imagedelete = await cloudinary.v2.uploader.destroy(publicId);

    if (!imagedelete) {
      throw new BadRequestError("Cloudinary image is not deleted");
    }

    const deleteProduct = await this.productModel.delete({
      where: { id: productId },
    });

    if (!deleteProduct) {
      throw new BadRequestError("product not deleted");
    }

    return deleteProduct;
  }

  async getProductById(productId: any) {
    const product = await this.productModel.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new BadRequestError("product is not exist");
    }

    const singleProduct = await this.productModel.findFirstOrThrow({
      where: { id: productId },
    });

    if (!singleProduct) {
      throw new BadRequestError("product is not exist");
    }

    return singleProduct;
  }

  async SearchProduct(name: any, description: any) {
    const serachproduct = await this.productModel.findMany({
      where: {
        description: {
          contains: description,
          mode: "insensitive",
          // Partial match on the description field
        },
        name: {
          contains: name,
          mode: "insensitive",
        },
      },
    });
    const count = serachproduct.length;

    const allDetail = {
      serachproduct,
      count,
    };

    return allDetail;
  }
}

export const productService = new ProductService(prisma.product as any);
