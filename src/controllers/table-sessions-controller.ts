import { Request, Response, NextFunction } from "express";
import { AppError } from "@/utils/AppError";
import { knex } from "@/database/knex";
import { z } from "zod";

class TablesSessionsController {
  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        table_id: z.number(),
      });

      const { table_id } = bodySchema.parse(request.body);

      const sessions = await knex<TableSessionsRepository>("table_sessions")
        .where({ table_id })
        .orderBy("opened_at", "desc")
        .first();

      if (sessions && !sessions.closed_at) {
        throw new AppError("This table is already open");
      }

      await knex<TableSessionsRepository>("table_sessions").insert({
        table_id,
        opened_at: knex.fn.now(),
      });

      return response.status(201).json();
    } catch (error) {
      next(error);
    }
  }

  async index(request: Request, response: Response, next: NextFunction) {

  }
}

export { TablesSessionsController };
