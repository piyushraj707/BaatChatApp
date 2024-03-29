import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		require: true
	},
	username: {
		type: String,
		require: true
	},
	password: {
		type: String,
		require: true
	},
	signedSecKey: {
		type: String,
		require: true
	},
	salt: {
		type: String,
		require: true
	},
	email: {
		type: String,
		require: true
	}
});

const user = mongoose.model("user", userSchema);
export default user;