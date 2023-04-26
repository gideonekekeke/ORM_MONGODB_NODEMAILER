import {
	Column,
	Entity,
	BeforeInsert,
	OneToOne,
	JoinColumn,
	OneToMany,
} from "typeorm";
import { Model } from "./model";
import bcrypt from "bcrypt";
import { ProfileEntity } from "./Profile.entity";
import { WalletEntity } from "./wallet.entity";
import { HistoryEntity } from "./history.entity";

@Entity("user")
export class UserEntity extends Model {
	@Column()
	name: string;

	@Column({
		unique: true,
	})
	email: string;

	@Column()
	password: string;

	@Column({
		default: false,
	})
	verified: boolean;

	@OneToOne(() => ProfileEntity, (profile) => profile.user, {
		nullable: true,
       
	})
	profile: ProfileEntity;
	//
	@OneToOne(() => WalletEntity, (wallet) => wallet.user, {
		nullable : true
	})
	wallet: WalletEntity;
	//
	@OneToMany(() => HistoryEntity, (history) => history.user, {
		nullable: true,
		eager: true,
	})
	history: HistoryEntity[];

	@BeforeInsert()
	async hashPassword() {
		this.password = await bcrypt.hash(this.password, 12);
	}

	static async ComparePassword(
		candidatePassword: string,
		hashedPassword: string,
	) {
		return await bcrypt.compare(candidatePassword, hashedPassword);
	}

	toJson() {
		return { ...this, password: undefined, verified: undefined };
	}
}
