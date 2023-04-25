import express, { Application, NextFunction, Request, Response } from "express";
import morgan from "morgan";
import AppError from "./utils/appError";

export const middleware = (app: Application) => {
	app
		.use(express.json())
		.use(morgan("dev"))

		// UNHANDLED ROUTE

		.all("*", (req: Request, res: Response, next: NextFunction) => {
			next(new AppError(404, `Route ${req.originalUrl} not found`));
		})

		.use((error: AppError, req: Request, res: Response, next: NextFunction) => {
			error.status = error.status || "error";
			error.statusCode = error.statusCode || 500;

			res.status(error.statusCode).json({
				status: error.status,
				message: error.message,
			});
		});
};
