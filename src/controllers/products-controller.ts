import { NextFunction, Request, Response } from "express";
import { knex } from "@/database/knex";
import { number, z } from "zod";
import { AppError } from "@/utils/AppError";

class ProductController {
  async index(request: Request, response: Response, next: NextFunction) {
    try {
      const { name } = request.query;

      const products = await knex<ProductRepository>("products")
        .select()
        .whereLike("name", `%${name ?? ""}%`) // Usa wherelike para filtrar produtos pelo nome, se fornecido na query string, usa-se % para permitir que o nome seja parte do nome do produto
        .orderBy("name");

      return response.json(products);
    } catch (error) {
      next(error);
    }
  }

  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        name: z.string({ required_error: "Name is required" }).trim().min(3),
        price: z.number({ required_error: "Price is required" }).gt(0),
      });

      const { name, price } = bodySchema.parse(request.body);

      await knex<ProductRepository>("products").insert({ name, price });

      return response.status(201).json();
    } catch (error) {
      next(error);
    }
  }

  async update(request: Request, response: Response, next: NextFunction) {
    try {
      const id = z
        .string()
        .transform((value) => Number(value))
        .refine((value) => !isNaN(value), { message: "ID must be a number" })
        .parse(request.params.id);

      const bodySchema = z.object({
        name: z.string().trim().min(3),
        price: z.number().gt(0),
      });

      const { name, price } = bodySchema.parse(request.body);

      const products = await knex<ProductRepository>("products")
        .select()
        .where({ id })
        .first()

      if (!products) {
        throw new AppError("Product not found", 404);
      }

      await knex<ProductRepository>("products")
        .update({ name, price, updated_at: knex.fn.now() })
        .where({ id });

      return response.status(200).json();
    } catch (error) {
      next(error);
    }
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    try {
      const id = z
        .string()
        .transform((value) => Number(value))
        .refine((value) => !isNaN(value), { message: "ID must be a number" })
        .parse(request.params.id);

      const products = await knex<ProductRepository>("products")
        .select()
        .where({ id })
        .first();
      if (!products) {
        throw new AppError("Product not found", 404);

      }

      await knex<ProductRepository>("products").delete().where({ id });

      return response.json();
    } catch (error) {
      next(error);
    }
  }
}

export { ProductController };
