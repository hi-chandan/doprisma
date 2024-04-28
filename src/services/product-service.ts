import { PrismaClient } from "@prisma/client";
import { prisma } from "../config/db-config";
import { BadRequestError } from "../utiles/httperrors";
import { ProductInput } from "../schema/project-schema";

export class ProductService {
  constructor(private productModel: PrismaClient["product"]) {}

  async create(data: ProductInput) {
    const product = await this.productModel.create({ data });

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
}

export const productService = new ProductService(prisma.product);
