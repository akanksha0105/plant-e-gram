const mongoose = require("mongoose");

const plantSchema = new mongoose.Schema(
	{
		commonName: {
			type: String,
			required: true,
			trim: true,
		},

		scientificName: {
			type: String,
			required: true,
			trim: true,
		},
		image: {
			type: String,
			required: false,
		},

		confidence: {
			type: Number,
			required: true,
		},

		description: {
			type: String,
			default: "",
		},

		userIds: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		],

		identifiedAt: {
			type: Date,
			default: Date.now,
		},
	},
	{
		timestamps: true,
	},
);

module.exports = mongoose.models.Plant || mongoose.model("Plant", plantSchema);
