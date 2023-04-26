import { Column, Entity, BeforeInsert, OneToOne, ManyToOne } from "typeorm";
import { Model } from "./model";
import { UserEntity } from "./user.entity";

@Entity("historys")
export class HistoryEntity extends Model {
	@Column()
	message: string;

	@Column({
		default: 1000,
	})
	@ManyToOne(() => UserEntity, (user) => user.history)
	user: UserEntity;
}
