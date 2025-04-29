import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { knex } from "@/database/knex";
import { AppError } from "@/utils/AppError";
import { notDeepEqual } from "assert";

class OrdersController {
  async create(request: Request, response: Response, next: NextFunction) {
    // POST
    try {
      const bodySchema = z.object({
        table_session_id: z.number(),
        product_id: z.number(),
        quantity: z.number(),
      });

      const { table_session_id, product_id, quantity } = bodySchema.parse(
        request.body
      );

      const session = await knex<TableSessionsRepository>("table_sessions")
        .where({ id: table_session_id })
        .first();

      if (!session) {
        throw new AppError("sessions table not found", 404);
      }

      if (session.closed_at) {
        throw new AppError("sessions table already close", 400);
      }

      const product = await knex<ProductRepository>("products")
        .where({ id: product_id })
        .first();

      if (!product) {
        throw new AppError("Product not found", 404);
      }

      await knex<OrderRepository>("orders").insert({
        table_session_id,
        product_id,
        quantity,
        price: product.price,
      });

      return response.status(201).json();
    } catch (error) {
      next(error);
    }
  }

  async index(request: Request, response: Response, next: NextFunction) {
    // GET
    try {
      const { table_session_id } = request.params;

      const orders = await knex("orders")
        .select(
          "orders.id",
          "orders.table_session_id",
          "orders.product_id",
          "products.name",
          "orders.price",
          "orders.quantity",
          knex.raw("(orders.price * orders.quantity) as total_R$"), // calculo do qntd * valor
          "orders.created_at",
          "orders.updated_at"
        ) // tabela + coluna
        .join("products", "products.id", "orders.product_id") // conectando com a tabela products
        .where({ table_session_id })
        .orderBy("orders.created_at", "desc");

      return response.json(orders);
    } catch (error) {
      next(error);
    }
  }

  async show(request: Request, response: Response, next: NextFunction) {
    try {
      const { table_session_id } = request.params;

      const order = await knex("orders")
        .select(knex.raw("COALESCE(SUM(orders.price * orders.quantity), 0) AS total_R$"))
        .select(knex.raw("COALESCE(SUM(orders.quantity), 0) AS total_quantity"))
        .where({ table_session_id })
        .first();

        // arredondar casa decimal
        order.total_R$ = Number(Number(order.total_R$).toFixed(2))
      return response.json(order);
    } catch (error) {
      next(error);
    }
  }
}

export { OrdersController };
