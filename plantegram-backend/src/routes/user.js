const express = require("express");
const userRouter = express.Router();

const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");

userRouter.get("/me", userAuth, async (req, res) => {
	try {
		console.log("me here ", req);
		res.json({
			success: true,
			data: { user: req.user },
		});
	} catch (err) {
		res.status(400).json({
			success: false,
			error: err.message,
		});
	}
});
userRouter.get("/profile/view", userAuth, async (req, res) => {
	try {
		const user = req.user;

		res.json({
			success: true,
			user: req.user,
		});
	} catch (err) {
		res.status(400).json({
			success: false,
			error: err.message,
		});
	}
});

userRouter.patch("/profile/edit", userAuth, async (req, res) => {
	try {
		if (!validateEditProfileData(req)) {
			throw new Error("Invalid Edit Request");
		}

		const loggedInUser = req.user;

		Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

		await loggedInUser.save();

		res.json({
			success: true,

			data: loggedInUser,
		});
	} catch (err) {
		res.status(400).json({
			success: false,
			error: err.message,
		});
	}
});

module.exports = userRouter;
