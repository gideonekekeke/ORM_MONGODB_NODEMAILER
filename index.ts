import express from "express";
import { middleware } from "./middleware";
import { dbConfig } from "./utils/dbConfig";
import dotenv from "dotenv";
dotenv.config();
const port = 1448;

const app = express();
middleware(app);

dbConfig
	.initialize()
	.then(() => {
		console.log("mongodb database is connected");
	})
	.catch((err) => {
		console.log("an error occured with the database", err);
	});

const server = app.listen(port, () => {
	console.log(`listening on port ${port}`);
});

process.on("uncaughtException", () => {
	process.exit(1);
});

process.on("unhandledRejection", () => {
	server.close(() => {
		process.exit(1);
	});
});
