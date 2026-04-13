import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export const validate =
  (schema: {
    body?: ZodSchema;
    params?: ZodSchema;
    query?: ZodSchema;
  }) =>
    (req: Request, res: Response, next: NextFunction) => {
      console.log("hit");
      req.validated = req.validated || {};

      if (schema.body) {
        const result = schema.body.safeParse(req.body);
        if (!result.success) {
          return res.status(400).json({ errors: result.error.flatten() });
        }
        req.validated.body = result.data;
      }

      if (schema.params) {
        const result = schema.params.safeParse(req.params);
        if (!result.success) {
          return res.status(400).json({ errors: result.error.flatten() });
        }
        req.validated.params = result.data;
      }

      if (schema.query) {
        const result = schema.query.safeParse(req.query);
        if (!result.success) {
          return res.status(400).json({ errors: result.error.flatten() });
        }
        req.validated.query = result.data;
      }

      next();
    };