import { Request, Response } from "express";
import { ProductService, productService } from "../services/product-service";
import { productInput } from "../schema/project-schema";
import { HttpRes } from "../utiles/httpres";
import { clearScreenDown } from "readline";
export class ProductController {
  constructor(private productService: ProductService) {}
  async createProduct(req: Request, res: Response) {
    const body = productInput.parse(req.body);

    const product = await productService.create(body);

    return HttpRes.ok(product, "product is created");
  }

  async getAllProduct(req: Request, res: Response) {
    const products = await productService.allProduct();

    return HttpRes.ok(products, "all Product");
  }
  async updateProduct(req: Request, res: Response) {
    const body = req.body;
    const productId = req.params.id;
    const updateProduct = await this.productService.updateProduct(
      body,
      productId,
    );

    return HttpRes.ok(updateProduct, "product update successfully");
  }
  async deleteProduct(req: Request, res: Response) {
    const productId = req.params.id;

    const deleteProduct = await this.productService.deleteProduct(productId);

    return HttpRes.ok(deleteProduct, "product is deleted successfully");
  }
  async getProductById(req: Request, res: Response) {
    const productId = req.params.id;
    const ProductById = await this.productService.getProductById(productId);

    return HttpRes.ok(ProductById, "product detail");
  }
}

export const productControl = new ProductController(productService);
