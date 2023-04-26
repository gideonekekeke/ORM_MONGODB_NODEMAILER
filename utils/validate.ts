import { NextFunction, Request, Response } from "express";
import { ZodError, AnyZodObject } from "zod";

export const validate =
	(schema: AnyZodObject) =>
	(req: Request, res: Response, next: NextFunction) => {
		try {
			schema.parse({
				params: req.params,
				query: req.query,
				body: req.body,
			});

			next();
		} catch (err) {
			if (err instanceof ZodError) {
				return res.status(400).json({
					status: "fail",
					errors: err.errors[0].message,
				});
			}
		}
	};
