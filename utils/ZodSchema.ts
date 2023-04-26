import { object, string } from "zod";

export const RegisterHandler = object({
	body: object({
		name: string({
			required_error: "Name is required",
		}),

		email: string({
			required_error: "email is required",
		}).email(),

		password: string({
			required_error: "password is required",
		}).min(8, "Password must be atleast 8 characters"),

		confirmPassword: string({
			required_error: "confirmPassword is required",
		}),
	}).refine((data) => data.password === data.confirmPassword, {
		path: ["confirmPassword"],
	}),
});

export const LoginHandler = object({
	body: object({
		email: string({
			required_error: "email is required",
		}).email("must be a valid email address"),

		password: string({
			required_error: "password is required",
		}).min(8, "Password must be atleast 8 characters"),
	}),
});
