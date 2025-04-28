import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { knex } from "@/database/knex";
import { AppError } from "@/utils/AppError";

class OrdersController {
  async create(request: Request, response: Response, next: NextFunction) { // POST
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

  async index(request: Request, response: Response, next: NextFunction)  { // GET
    try {

      
      return response.json()
    } catch (error) {
      next(error)
    }
  }
}

export { OrdersController };
