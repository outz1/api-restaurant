import { Router } from "express";
import { TablesSessionsController } from "@/controllers/table-sessions-controller";

const tablesSessionsRoutes = Router();
const tablesSessionsController = new TablesSessionsController();

tablesSessionsRoutes.post("/", tablesSessionsController.create); // Define a rota POST para criar uma sessão de mesa (método create)

export { tablesSessionsRoutes };
