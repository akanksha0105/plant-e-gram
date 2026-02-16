const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	username: {
		type: String,
		required: true,
		unique: true,
	},

	emailId: {
		type: String,
		lowercase: true,
		required: true,
		unique: true,
		trim: true,
	},
	password: {
		type: String,
		required: true,
	},
	gender: {
		type: String,
		validate(value) {
			if (!["male", "female", "others"].includes(value))
				throw new Error("Gender data is not valid");
		},
	},
	photoURL: {
		type: String,
	},

	userBio: {
		type: String,
	},

	skill: {
		type: String,
		default: "beginner",
	},
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
