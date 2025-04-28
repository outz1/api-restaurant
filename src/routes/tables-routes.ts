import { Router } from "express";
import { TableController } from "@/controllers/tables-controller";

const tablesRoutes = Router()
const productController = new TableController()

tablesRoutes.get("/", productController.index) // Define a rota GET para listar os produtos (método index)

export { tablesRoutes}