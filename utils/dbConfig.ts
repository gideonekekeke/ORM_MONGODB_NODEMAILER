import { DataSource } from "typeorm";
import { HistoryEntity } from "../Models/history.entity";
import { ProfileEntity } from "../Models/Profile.entity";
import { UserEntity } from "../Models/user.entity";
import { WalletEntity } from "../Models/wallet.entity";

// connect to mongodb localhost
export const dbConfig = new DataSource({
	type: "mongodb",
	host: "localhost",
	port: 27017,
	database: "ORMDB",
	synchronize: true,
	logging: false,
	entities: [UserEntity, ProfileEntity, WalletEntity, HistoryEntity ],
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
