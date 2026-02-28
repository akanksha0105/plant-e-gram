const express = require("express");
const authRouter = express.Router();

const { validateSignUpData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");

authRouter.post("/signup", async (req, res) => {
	try {
		console.log("req in signup", req.body);
		//validate the signup data
		validateSignUpData(req);
		const { name, emailId, password } = req.body;

		const userExists = await User.findOne({ emailId: emailId });

		if (userExists) {
			return res.status(409).json({
				success: false,
				message: "User already exists",
			});
		}

		//encrypt the password
		const passwordHash = await bcrypt.hash(password, 10);

		//save the user
		const user = new User({
			emailId,
			password: passwordHash,
			profile: {
				name: name,
			},
		});

		const savedUser = await user.save();

		//generate the auth token and send in the response
		const token = await savedUser.getJWT();
		res.cookie("token", token, {
			expires: new Date(Date.now() + 8 * 3600000),
		});

		res.json({
			message: "User Added successfully!",
			data: {
				user: {
					profile: savedUser?.profile,
					myPlants: savedUser?.mypLants,
				},
			},
		});
	} catch (err) {
		res.status(400).json({
			success: false,
			error: err.message,
		});
	}
});
authRouter.post("/login", async (req, res) => {
	try {
		const { emailId, password } = req.body;

		// Validate request body
		if (!emailId || !password) {
			return res.status(400).json({
				success: false,
				message: "Email and password are required",
			});
		}

		// Find user by email
		const savedUser = await User.findOne({ emailId });
		if (!savedUser) {
			// Generic error to prevent enumeration
			return res.status(401).json({
				success: false,
				message: "Invalid email or password",
			});
		}

		// Validate password
		const isPasswordValid = await savedUser.validatePassword(password);
		if (!isPasswordValid) {
			return res.status(401).json({
				success: false,
				message: "Invalid email or password",
			});
		}

		// Generate JWT
		const token = await savedUser.getJWT();

		// Set cookie options
		const cookieOptions = {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production", // enable HTTPS only in production
			sameSite: "lax",
			expires: new Date(Date.now() + 8 * 60 * 60 * 1000), // 8 hours
		};

		res.cookie("token", token, cookieOptions);

		res.status(200).json({
			success: true,
			message: "Login successful",
			data: {
				user: {
					profile: savedUser?.profile,
					myPlants: savedUser?.mypLants,
				},
			},
		});
	} catch (err) {
		console.error("Login error:", err);
		res.status(500).json({
			success: false,
			message: "Something went wrong. Please try again later.",
		});
	}
});

authRouter.post("/logout", async (req, res) => {
	res.cookie("token", null, {
		expires: new Date(Date.now()),
	});
	res.send("Logout Successful!!");
});

module.exports = authRouter;
