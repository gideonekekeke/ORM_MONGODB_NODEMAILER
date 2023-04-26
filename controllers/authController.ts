import { NextFunction, Request, Response } from "express";
import { UserEntity } from "../Models/user.entity";
import { WalletEntity } from "../Models/wallet.entity";
import { AccountVerification } from "../utils/email";
import { decodeJwt, signJwtUser } from "../utils/jwts";
import { sign } from "jsonwebtoken";

export const RegisterUser = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { name, email, password } = req.body;

		const token = signJwtUser(
			{
				name,
				email,
				password,
			},
			process.env.Private_Key,
			{
				expiresIn: "30m",
			},
		);

		AccountVerification(token, email, name)
			.then((result) => {
				return res.status(200).json({
					message: `an account verification messsage has been sent to ${email}, please go and confirm`,
				});
			})
			.catch((err) => {
				return res.status(404).json(err);
			});

		// return res.status(200).json({
		// message: "successfull",
		// });
	} catch (err) {
		next(err);
	}
};

export const VerifyUser = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const token = req.params.tokenID;

		if (token) {
			const { name, email, password }: any = decodeJwt(token);

			const user = new UserEntity();
			user.name = name;
			user.email = email;
			user.password = password;
			user.verified = true;

			user.save();

			return res.status(200).json({
				message: "Verification success, go and Login.",
			});
		} else {
			return res.status(404).json({
				message: "token not valid",
			});
		}
	} catch (err) {
		next(err);
	}
};

export const LoginUser = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { email, password } = req.body;

		const user = await UserEntity.findOneBy({ email });
		console.log(user);

		if (!user || !(await UserEntity.ComparePassword(password, user.password))) {
			return res.json({
				message: "email or password is incorrect",
			});
		}

		const wall = await WalletEntity.create({
			walletID: Math.floor(Math.random() * 10000000) + 2000000,
		}).save();

		await UserEntity.update(user.id, {
			wallet: wall,
		});

		user.wallet = wall;
		user.save();
		const token = signJwtUser(
			{
				user: user.id,
			},
			process.env.Private_Key,
			{
				expiresIn: "1y",
			},
		);

		return res.status(200).json({
			message: "Successfull",
			token,
		});
	} catch (err) {
		next(err);
	}
};



