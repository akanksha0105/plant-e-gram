const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
	emailId: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
		trim: true,
	},
	password: {
		type: String,
		required: true,
	},
	profile: {
		name: String,
		gender: String,
		photoURL: String,
		userBio: String,
		skill: {
			type: String,
			default: "beginner",
		},
	},
	savedPlants: [{ type: mongoose.Schema.Types.ObjectId, ref: "Plant" }],
});

userSchema.methods.getJWT = async function () {
	const user = this;

	const token = await jwt.sign({ _id: user._id }, process.env.JWT_SIGNATURE, {
		expiresIn: "7d",
	});

	return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
	const user = this;
	const passwordHash = user.password;

	const isPasswordValid = await bcrypt.compare(
		passwordInputByUser,
		passwordHash,
	);

	return isPasswordValid;
};

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
