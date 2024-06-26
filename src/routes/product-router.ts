import { Router } from "express";
import { productControl } from "../controller/product-controller";
import { wrapper } from "../utiles/wrapper";
import { getaccess } from "../middleware/user-auth";
import { adminMiddleware } from "../middleware/admin";
import upload from "../config/multer";

const productRouter: Router = Router();

productRouter.post(
  "/create",
  wrapper(getaccess),
  wrapper(adminMiddleware),
  upload.single("file"),
  wrapper(productControl.createProduct.bind(productControl)),
);
productRouter.get(
  "/products",
  wrapper(getaccess),
  wrapper(productControl.getAllProduct.bind(productControl)),
);
productRouter.put(
  "/product/:id",
  wrapper(getaccess),
  wrapper(adminMiddleware),
  wrapper(productControl.updateProduct.bind(productControl)),
);
productRouter.delete(
  "/product/:id",
  wrapper(getaccess),
  wrapper(adminMiddleware),
  wrapper(productControl.deleteProduct.bind(productControl)),
);
productRouter.get(
  "/product/:id",
  wrapper(getaccess),
  wrapper(adminMiddleware),
  wrapper(productControl.getProductById.bind(productControl)),
);
productRouter.get(
  "/search",
  wrapper(productControl.SearchProduct.bind(productControl)),
);
export default productRouter;
