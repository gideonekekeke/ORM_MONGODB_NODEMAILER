import nodemailer from "nodemailer";
import { google } from "googleapis";
import path from "path";
import ejs from "ejs";
import dotenv from "dotenv";
dotenv.config();

const GOOGLE_SECRET = process.env.GOOGLE_SECRET;

const GOOGLE_ID = process.env.GOOGLE_ID;

const GOOGLE_REDIRECT = process.env.GOOGLE_REDIRECT;

const GOOGLE_REFRESHTOKEN = process.env.GOOGLE_REFRESHTOKEN;

const oAuth = new google.auth.OAuth2(GOOGLE_ID, GOOGLE_SECRET, GOOGLE_REDIRECT);

const url = "http://localhost:1448";
const frontEndUrl = "http://localhost:3000";

oAuth.setCredentials({ refresh_token: GOOGLE_REFRESHTOKEN });

export const AccountVerification = async (
	token: any,
	email: any,
	name: any,
) => {
	try {
		const accessToken = await oAuth.getAccessToken();

		const transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				type: "OAuth2",
				user: process.env.USER_EMAIL,
				refreshToken: GOOGLE_REFRESHTOKEN,
				clientId: GOOGLE_ID,
				clientSecret: GOOGLE_SECRET,
				accessToken: accessToken,
			},
		});

		const buildFile = path.join(__dirname, "../views/AccountVerification.ejs");

		const data = await ejs.renderFile(buildFile, {
			token: token,
			name: name,
			url: url,
		});

		const mailOptions = {
			from: "Annonymous<shotkode123@gmail.com>",
			to: email,
			subject: "Account Verification",
			html: data,
		};

		transporter.sendMail(mailOptions);
	} catch (err) {
		return err;
	}
};

export const ForgotPasswordVerification = async (
	token: any,
	email: any,
	name: any,
) => {
	try {
		const accessToken = await oAuth.getAccessToken();

		const transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				type: "OAuth2",
				user: "shotkode123@gmail.com",
				refreshToken: GOOGLE_REFRESHTOKEN,
				clientId: GOOGLE_ID,
				clientSecret: GOOGLE_SECRET,
				accessToken: accessToken,
			},
		});

		const buildFile = path.join(__dirname, "../views/forgotPassword.ejs");

		const data = await ejs.renderFile(buildFile, {
			token: token,
			name: name,
			frontEndUrl: frontEndUrl,
		});

		const mailOptions = {
			from: "Annonymous<shotkode123@gmail.com>",
			to: email,
			subject: "forgotPassword Verification",
			html: data,
		};

		transporter.sendMail(mailOptions);
	} catch (err) {
		return err;
	}
};
