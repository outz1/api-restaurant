import { ProductController } from "@/controllers/products-controller";
import { Router } from "express";

const productsRoutes = Router();
const productController = new ProductController();

productsRoutes.get("/", productController.index); // Define a rota GET para listar os produtos (método index)
productsRoutes.post("/", productController.create); // Define a rota POST para criar um produto (método create)
productsRoutes.put("/:id", productController.update); // Define a rota PUT para atualizar um produto (método update)
productsRoutes.delete("/:id", productController.remove); // Define a rota DELETE para remover um produto (método remove)

export { productsRoutes };
