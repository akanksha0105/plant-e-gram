const express = require("express");
const plantRouter = express.Router();
const User = require("../models/user");
const { userAuth } = require("../middlewares/auth");
const upload = require("../middlewares/upload.middleware");
const identifyPlant = require("../services/plant.service");
const Plant = require("../models/Plant");
const sharp = require("sharp");
const mongoose = require("mongoose");
const fetchUnsplashImage = require("../services/unsplash.service");
const identifyPlantVision = require("../services/identifyPlantVision");
const generatePlantDescription = require("../services/generatePlantDescription");
plantRouter.get("/:id", userAuth, async (req, res) => {
	try {
		const { id } = req.params;

		// 1️⃣ Validate MongoDB ObjectId
		if (!mongoose.Types.ObjectId.isValid(id)) {
			return res.status(400).json({ message: "Invalid Plant ID" });
		}

		// 2️⃣ Find plant
		const plant = await Plant.findById(id);

		if (!plant) {
			return res.status(404).json({ message: "Plant not found" });
		}

		res.status(200).json({ success: true, data: plant });
	} catch (err) {
		console.error("Get Plant Error:", err);
		res.status(500).json({ message: "Something went wrong" });
	}
});

plantRouter.post(
	"/identify",
	userAuth,
	upload.array("images", 5),
	async (req, res, next) => {
		console.log("identification", req.body.emailId);
		try {
			// ✅ Validate images
			if (!req.files || req.files.length === 0) {
				return res.status(400).json({
					success: false,
					message: "Images required",
				});
			}

			// ✅ Resize & compress before OpenAI (CRITICAL)
			const processedFiles = await Promise.all(
				req.files.map(async (file) => {
					const resizedBuffer = await sharp(file.buffer)
						.resize(1024) // ideal size for AI vision
						.jpeg({ quality: 80 })
						.toBuffer();

					return {
						buffer: resizedBuffer,
						mimetype: "image/jpeg",
					};
				}),
			);

			let result = await identifyPlantVision(processedFiles, "gpt-4.1-mini");

			console.log("result", result, result?.scientificName);
			const shouldEscalate =
				!result?.success ||
				(result?.success &&
					typeof result.confidence === "number" &&
					result.confidence < 0.65);

			if (shouldEscalate) {
				const strongerResult = await identifyPlantVision(
					processedFiles,
					"gpt-4.1",
				);

				if (strongerResult.success) {
					result = strongerResult;
				} else {
					return res.status(400).json({
						success: false,
						message: strongerResult.reason,
					});
				}
			}

			const unsplashData = await fetchUnsplashImage(
				`${result.scientificName} plant`,
			);

			const description = await generatePlantDescription({
				commonName: result.commonName,
				scientificName: result.scientificName,
			});

			// const user = await User.findOne({ emailId: req.body.emailId });
			const user = req.user;

			const plantDoc = await Plant.create({
				commonName: result.commonName,
				scientificName: result.scientificName,
				image: unsplashData,
				confidence: result.confidence,
				description,
				userIds: [req.user._id],
			});

			await User.findByIdAndUpdate(user._id, {
				$addToSet: { savedPlants: plantDoc._id },
			});

			return res.json({
				success: true,
				data: plantDoc || null,
			});
		} catch (err) {
			next(err);
		}
	},
);
module.exports = plantRouter;
