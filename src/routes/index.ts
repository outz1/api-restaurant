import { Router } from "express";
import { productsRoutes } from "./products-routes";

// Definição de URLs | Centraliza as rotas
const routes = Router(); // Criando rotas
routes.use("/products", productsRoutes);   // As requisições nessa URL serão direcionadas para products-routes.ts

export { routes }; // Exportando rotas
