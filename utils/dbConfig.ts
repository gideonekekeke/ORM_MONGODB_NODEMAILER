import { DataSource } from "typeorm";

export const dbConfig = new DataSource({
	type: "mongodb",
	host: "localhost",
	port: 27017,
	database: "test",
	synchronize: true,
	logging: false,
	entities: [],
});
