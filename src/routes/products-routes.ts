import { ProductController } from "@/controllers/products-controller";
import { Router } from "express";

const productsRoutes = Router();
const productController = new ProductController();

productsRoutes.get("/", productController.index);

export { productsRoutes };
