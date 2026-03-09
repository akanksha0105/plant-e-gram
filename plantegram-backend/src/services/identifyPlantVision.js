const OpenAI = require("openai");
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const identifyPlantVision = async (images, model = "gpt-4.1-mini") => {
	try {
		const content = [
			{
				type: "input_text",
				text: `
Identify the plant species from the image.

If identification succeeds, return:
{
  "success": true,
  "commonName": string,
  "scientificName": string,
  "confidence": number between 0 and 1,
  "error": null,
  "reason": null
}

If identification fails, return:
{
  "success": false,
  "commonName": null,
  "scientificName": null,
  "confidence": null,
  "error": "Unable to identify plant",
  "reason": "One short sentence."
}

Return strictly valid JSON only.
`,
			},
		];

		images.forEach((img) => {
			content.push({
				type: "input_image",
				image_url: `data:${img.mimetype};base64,${img.buffer.toString("base64")}`,
			});
		});

		const response = await openai.responses.create({
			model,
			temperature: 0,
			input: [{ role: "user", content }],
			text: {
				format: {
					type: "json_schema",
					name: "plant_identification",
					strict: true,
					schema: {
						type: "object",

						properties: {
							success: { type: "boolean" },
							commonName: { type: ["string", "null"] },
							scientificName: { type: ["string", "null"] },
							confidence: { type: ["number", "null"] },
							error: { type: ["string", "null"] },
							reason: { type: ["string", "null"] },
						},
						required: [
							"success",
							"commonName",
							"scientificName",
							"confidence",
							"error",
							"reason",
						],
						additionalProperties: false,
					},
				},
			},
		});

		let output_parsed = JSON.parse(response?.output_text);

		// console.log(JSON.stringify(response, null, 2));
		if (!output_parsed) {
			return {
				success: false,
				commonName: null,
				scientificName: null,
				confidence: null,
				error: "Parsing failed",
				reason: "Model did not return structured output",
			};
		}

		return output_parsed;
	} catch (err) {
		console.error("Vision error:", err);
		return {
			success: false,
			commonName: null,
			scientificName: null,
			confidence: null,
			error: "AI failure",
			reason: "Vision model crashed",
		};
	}
};

module.exports = identifyPlantVision;
