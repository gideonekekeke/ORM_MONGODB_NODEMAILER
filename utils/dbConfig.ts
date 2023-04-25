import { DataSource } from "typeorm";
import { UserEntity } from "../Models/user.entity";

// connect to mongodb localhost
export const dbConfig = new DataSource({
	type: "mongodb",
	host: "localhost",
	port: 27017,
	database: "ORMDB",
	synchronize: true,
	logging: false,
	entities: [UserEntity],
});

// connect to mongodb atlas

// export const dbConfig = new DataSource({
// type: "mongodb",
// url: "mongodb+srv://testUser:<password>@cluster0-**.mongodb.net/test?retryWrites=true&w=majority",
// useNewUrlParser: true,
// synchronize: true,
// logging: true,
// entities: ["src/entity/."],
// });
