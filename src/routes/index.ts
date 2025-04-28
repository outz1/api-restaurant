import { Router } from "express";
import { productsRoutes } from "./products-routes";
import { tablesRoutes } from "./tables-routes";
import { tablesSessionsRoutes } from "./tables-sessions-routes";

// Definição de URLs | Centraliza as rotas
const routes = Router(); // Criando rotas
routes.use("/products", productsRoutes);   // As requisições nessa URL serão direcionadas para products-routes.ts
routes.use("/tables", tablesRoutes);  // As requisições nessa URL serão direcionadas para tables-routes.ts
routes.use("/tables-sessions", tablesSessionsRoutes); // As requisições nessa URL serão direcionadas para tables-sessions-routes.ts

export { routes }; // Exportando rotas
