import { Column, Entity, BeforeInsert, OneToOne } from "typeorm";
import { Model } from "./model";
import { UserEntity } from "./user.entity";

@Entity("wallet")
export class WalletEntity extends Model {
	@Column()
	WalletID: number;

	@Column({
		default: 1000,
	})
	Balance: number;

	@OneToOne(() => UserEntity, (user) => user.wallet)
	user: UserEntity;
}
