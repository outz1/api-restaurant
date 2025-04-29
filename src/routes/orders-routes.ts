import { Router } from "express";
import { OrdersController } from "@/controllers/orders-controller";

const ordersRoutes = Router();

const ordersController = new OrdersController();

ordersRoutes.post("/", ordersController.create); // Define a rota POST para criar os produtos (método create)
ordersRoutes.get("/table-session/:table_session_id", ordersController.index); // Define a rota GET para listar os produtos (método index)
ordersRoutes.get("/table-session/:table_session_id/total", ordersController.show) // Define a rota GET para somar os produtos (método show)

export { ordersRoutes };
