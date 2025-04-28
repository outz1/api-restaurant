import { Router } from "express";
import { OrdersController } from "@/controllers/orders-controller";

const ordersRoutes = Router();

const ordersController = new OrdersController();

ordersRoutes.post("/", ordersController.create); // Define a rota POST para criar os produtos (método create)
ordersRoutes.get("/table-session/:id", ordersController.index); // Define a rota GET para listar os produtos (método index)

export { ordersRoutes };
