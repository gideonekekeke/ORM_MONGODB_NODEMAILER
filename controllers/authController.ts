import { NextFunction, Request, Response } from "express";
import { UserEntity } from "../Models/user.entity";

export const RegisterUser = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { name, email, password } = req.body;
		const user = await UserEntity.create({
			name,
			email,
            password
		}).save();

		return res.status(200).json({
			message: "successfull",
			data: user,
		});
	} catch (err) {
		next(err);
	}
};
