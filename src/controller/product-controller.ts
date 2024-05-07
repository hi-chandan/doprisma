import { Request, Response } from "express";
import { ProductService, productService } from "../services/product-service";
import { productInput } from "../schema/product-schama";
import { HttpRes } from "../utiles/httpres";
import cloudinary from "cloudinary";
export class ProductController {
  constructor(private productService: ProductService) {}
  async createProduct(req: Request, res: Response) {
    const data = productInput.parse(req.body);
    const userId = req.user.id;
    const file = req.file?.path as string;

    // Upload image to Cloudinary
    const product = await this.productService.create(data, userId, file);

    // Create product with image links

    return HttpRes.ok(product, "Product is created");
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

  async SearchProduct(req: Request, res: Response) {
    const name = req.query.name;
    const description = req.query.description;
    const product = await this.productService.SearchProduct(name, description);

    return HttpRes.ok(product, "all Search product");
  }
}

export const productControl = new ProductController(productService);
