import {
	BaseEntity,
	ObjectIdColumn,
	CreateDateColumn,
	UpdateDateColumn,
} from "typeorm";

export class Model extends BaseEntity {
	@ObjectIdColumn()
	id: string;

	@CreateDateColumn({ type: "timestamp" })
	createdAt: Date;

	@UpdateDateColumn({ type: "timestamp" })
	updatedAt: Date;
}
