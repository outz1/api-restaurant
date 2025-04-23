import { Router } from "express";
import { productsRoutes } from "./products-routes";

const routes = Router(); // Criando rotas
routes.use("/products", productsRoutes);

export { routes }; // Exportando rotas
