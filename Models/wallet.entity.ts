import { Column, Entity, BeforeInsert, OneToOne } from "typeorm";
import { Model } from "./model";
import { UserEntity } from "./user.entity";

@Entity("wallets")
export class WalletEntity extends Model {
	@Column()
	walletID: number;

	@Column({
		default : 1000
	})
	Balance: number;

	@OneToOne(() => UserEntity, (userData) => userData.wallet)
	 user: UserEntity;
}
