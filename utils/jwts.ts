import { sign, verify, SignOptions, decode } from "jsonwebtoken";

export const signJwtUser = (
	payload: Object,
	keyName: string,
	options: SignOptions,
) => {
	return sign(payload, keyName, {
		...(options && options),
	});
};

export const verifyJwt = (token: string, keyName: string) => {
	const decodeverify = verify(token, keyName);

	return decodeverify;
};

export const decodeJwt = (token: string) => {
	const decoded = decode(token);

	return decoded;
};
