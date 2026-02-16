const express = require("express");
const authRouter = express.Router();

const { validateSignUpData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");

authRouter.post("/signup", async (req, res) => {
	try {
		console.log("reg", req.body);
		//validate the signup data
		validateSignUpData(req);
		const { name, emailId, password, username } = req.body;

		//encrypt the password
		const passwordHash = await bcrypt.hash(password, 10);

		//save the user
		const user = new User({
			name,
			emailId,
			password: passwordHash,
			username: username,
		});

		const savedUser = await user.save();

		//generate the auth token and send in the response
		const token = await savedUser.getJWT();
		res.cookie("token", token, {
			expires: new Date(Date.now() + 8 * 3600000),
		});

		res.json({ message: "User Added successfully!", data: savedUser });
	} catch (error) {
		res.status(400).send("ERROR : " + error.message);
	}
});
authRouter.post("/login", async (req, res) => {
	try {
		const { emailId, password } = req.body;

		const user = await User.findOne({ emailId: emailId });
		if (!user) {
			throw new Error("Invalid credentials");
		}
		const isPasswordValid = await user.validatePassword(password);

		if (isPasswordValid) {
			const token = await user.getJWT();

			res.cookie("token", token, {
				httpOnly: true, // security (mandatory for JWT cookies)
				secure: false, // MUST be false on localhost
				sameSite: "lax", // REQUIRED for cross-port
				expires: new Date(Date.now() + 8 * 60 * 60 * 1000),
			});

			res.send(user);
		} else {
			throw new Error("Invalid credentials");
		}
	} catch (err) {
		res.status(400).send("ERROR : " + err.message);
	}
});

authRouter.post("/logout", async (req, res) => {
	res.cookie("token", null, {
		expires: new Date(Date.now()),
	});
	res.send("Logout Successful!!");
});

module.exports = authRouter;
