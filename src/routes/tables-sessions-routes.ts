import { Router } from "express";
import { TablesSessionsController } from "@/controllers/table-sessions-controller";

const tablesSessionsRoutes = Router();
const tablesSessionsController = new TablesSessionsController();

tablesSessionsRoutes.get("/", tablesSessionsController.index); // Define a rota GET para criar uma sessão de mesa (método index)
tablesSessionsRoutes.post("/", tablesSessionsController.create); // Define a rota POST para listar uma sessão de mesa (método create)
tablesSessionsRoutes.patch("/:id", tablesSessionsController.update); // Define a rota PATCH para validar uma sessão de mesa (método update)

export { tablesSessionsRoutes };
