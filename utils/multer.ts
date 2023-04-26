import multer, { diskStorage } from "multer";
import path from "path";

const storage = diskStorage({
	destination(req, file, callback) {
		callback(null, "./uploads");
	},

	filename(req, file, callback) {
		const uniqueSuffix = Date.now() + "_" + Math.round(Math.random() * 1e9);

		callback(
			null,
			file.fieldname + "_" + uniqueSuffix + path.extname(file.originalname),
		);
	},
});

const upload = multer({ storage: storage }).single("avatar");

export default upload;
