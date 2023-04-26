import { NextFunction, Request, Response } from "express";
import { UserEntity } from "../Models/user.entity";
import { WalletEntity } from "../Models/wallet.entity";
import { AccountVerification } from "../utils/email";
import { decodeJwt, signJwtUser } from "../utils/jwts";
import { sign } from "jsonwebtoken";
import { ProfileEntity } from "../Models/Profile.entity";
import streamifier from "streamifier";
import cloudinary from "../utils/cloudinary";

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

			const wall = await WalletEntity.create({
				walletID: Math.floor(Math.random() * 10000000) + 2000000,
				Balance: 1000,
			}).save();
			await UserEntity.update(user.id, {
				wallet: wall,
			});
			user.wallet = wall;
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

export const createProfile = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const id = req.params.id;
		const { dateOfBirth, bio, BVN, avatar } = req.body;

		const user = await UserEntity.findOneBy({ id });

		let avatarUrl;

		if (!req?.file?.path) {
			avatarUrl = avatar;
		} else {
			let upload = cloudinary.uploader.upload(req?.file?.path);
			avatarUrl = (await upload).secure_url;
		}

		const createProfile = await ProfileEntity.create({
			dateOfBirth,
			bio,
			BVN,
			avatar: avatarUrl,
		}).save();

		await UserEntity.update(id, {
			profile: createProfile,
		});

		return res.status(200).json({
			message: "Profile updated successful",
		});
	} catch (err) {
		next(err);
	}
};
