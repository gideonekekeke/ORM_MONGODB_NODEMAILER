import { Column, Entity, BeforeInsert, OneToOne } from "typeorm";
import { Model } from "./model";
import { UserEntity } from "./user.entity";

@Entity("profile")
export class ProfileEntity extends Model {
	@Column({
		default:
			"https://static.vecteezy.com/system/resources/previews/009/734/564/original/default-avatar-profile-icon-of-social-media-user-vector.jpg",
	})
	avtar: string;

	@Column({
		nullable: true,
	})
	bio: string;

	@Column({
		nullable: true,
	})
	dateOfBirth: string;

	@Column({
		nullable: true,
	})
	BVN: number;

	@OneToOne(() => UserEntity, (user) => user.profile)
	user: UserEntity;
}
