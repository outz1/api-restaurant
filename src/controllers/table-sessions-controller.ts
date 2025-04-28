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
    try {
      const sessions = await knex<TableSessionsRepository>(
        "table_sessions"
      ).orderBy("closed_at");

      return response.json(sessions);
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

      const session = await knex<TableSessionsRepository>("table_sessions")
        .where({ id })
        .first();

      if (!session) {
        throw new AppError("Session Table not found", 404);
      }

      if (session.closed_at) {
        throw new AppError("This table is already closed");
      }

      await knex<TableSessionsRepository>("table_sessions")
        .update({ closed_at: knex.fn.now() })
        .where({ id });

      return response.json();
    } catch (error) {
      next(error);
    }
  }
}

export { TablesSessionsController };
