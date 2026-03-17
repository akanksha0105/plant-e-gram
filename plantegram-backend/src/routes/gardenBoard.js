const express = require("express");
const gardenBoardRouter = express.Router();
const User = require("../models/user");
const { userAuth } = require("../middlewares/auth");

gardenBoardRouter.get("/", userAuth, async (req, res) => {
	try {
		const userId = req.user._id;

		const result = await User.aggregate([
			{ $match: { _id: userId } },
			{
				$lookup: {
					from: "plants",
					localField: "lastIdentifiedPlant",
					foreignField: "_id",
					as: "lastIdentifiedPlant",
				},
			},
			{
				$addFields: {
					lastIdentifiedPlant: {
						$ifNull: [{ $arrayElemAt: ["$lastIdentifiedPlant", 0] }, null],
					},
				},
			},
			{
				$lookup: {
					from: "plants",
					localField: "savedPlants",
					foreignField: "_id",
					pipeline: [
						{ $sort: { identifiedAt: -1 } },
						{ $limit: 10 },
						{ $project: { commonName: 1, scientificName: 1, image: 1 } },
					],
					as: "savedPlantsSubset",
				},
			},
			{
				$project: {
					lastIdentifiedPlant: 1,
					savedPlantsSubset: 1,
					totalSavedPlantsCount: { $size: "$savedPlants" },
				},
			},
		]);

		if (!result.length) {
			return res.status(404).json({
				success: false,
				error: "User not found",
			});
		}

		return res.status(200).json({
			success: true,
			data: result[0],
		});
	} catch (err) {
		console.error("GardenBoard error:", err);

		return res.status(500).json({
			success: false,
			error: "Internal server error",
		});
	}
});

module.exports = gardenBoardRouter;
