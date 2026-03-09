const express = require("express");
const userRouter = express.Router();

const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");
const User = require("../models/user");
const Plant = require("../models/plant");
const SAVED_PLANTS_DISPLAY_LIMIT = 10;

userRouter.get("/me", userAuth, async (req, res) => {
	try {
		const user = await User.findById(req.user._id)
			.select("-password")
			.populate({
				path: "savedPlants",
				select:
					"commonName scientificName description image confidence identifiedAt createdAt",
				options: { strictPopulate: false },
			})
			.lean();

		if (!user) {
			return res.status(404).json({
				success: false,
				error: "User not found",
			});
		}

		const allSavedPlants = user.savedPlants || [];
		const savedPlants = allSavedPlants.slice(0, SAVED_PLANTS_DISPLAY_LIMIT);
		const lastIdentifiedPlant = savedPlants[0] || null;
		const totalSavedCount = allSavedPlants.length;

		return res.status(200).json({
			success: true,
			data: {
				user: {
					_id: user._id,
					emailId: user.emailId,
					profile: user.profile,
				},
				savedPlantsSubset: savedPlants,
				lastIdentifiedPlant,
				totalSavedCount,
			},
		});
	} catch (err) {
		console.error("[GET /me]", err);
		return res.status(500).json({
			success: false,
			error: "Internal server error",
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

userRouter.get("/saved-plants", userAuth, async (req, res) => {
	try {
		const page = Number(req.query.page) || 1;
		const limit = Number(req.query.limit) || 10;
		const skip = (page - 1) * limit;

		// Get user document
		const user = await User.findById(req.user.id).select("savedPlants");
		if (!user) {
			return res
				.status(404)
				.json({ success: false, message: "User not found" });
		}

		const total = user.savedPlants.length; // total saved plants

		// Paginate savedPlants IDs
		const paginatedPlantIds = user.savedPlants
			.sort((a, b) => b.createdAt - a.createdAt) // newest first
			.slice(skip, skip + limit);

		// Fetch actual plant documents
		const plants = await Plant.find({ _id: { $in: paginatedPlantIds } }).sort({
			createdAt: -1,
		}); // optional sort again

		// Send response
		return res.status(200).json({
			success: true,
			savedPlants: {
				plants,
				page,
				hasMore: page * limit < total,
				total,
			},
		});
	} catch (err) {
		console.error("Error fetching saved plants", err);
		return res.status(500).json({ success: false, message: "Server error" });
	}
});
module.exports = userRouter;
