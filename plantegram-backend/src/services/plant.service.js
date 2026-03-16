const OpenAI = require("openai");

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

// export const identifyPlant = async (images, model) => {
// 	const content = [
// 		{
// 			type: "input_text",
// 			text: `

// 			First analyze the image carefully before identifying the plant.

// Focus on:
// - Leaf shape and structure
// - Leaf color and patterns
// - Plant size and growth habit
// - Stem or trunk characteristics
// - Flowers or fruits if visible
// - Indoor vs outdoor setting

// Identify the most likely plant species based on visible features.

// If uncertain, choose the closest likely plant and lower the confidence score.

// If the image does not contain a plant or cannot be identified, return:

// {
//   "error": "Unable to identify plant",
//   "reason": "One short sentence."
// }
// 			You are a plant expert and a skilled storyteller writing short, natural descriptions for a plant identification app.

// Write a clear, engaging, and human-sounding plant description using the data provided.

// Guidelines:
// - Write 3–5 sentences (60–120 words total).
// - Keep the tone natural, warm, and slightly storytelling in style.
// - The description should feel like it was written by a knowledgeable plant lover.
// - Do NOT use bullet points or lists.
// - Do NOT repeat phrases or sentence patterns.
// - Avoid rigid or formula-like writing.
// - Vary sentence openings so descriptions do not sound identical.
// - Mention the native region naturally.
// - Describe the plant’s distinctive features in a vivid but concise way.
// - Include one useful or interesting fact if available.
// - If folklore or cultural belief is provided, include it naturally in one sentence.
// - If folklore is NOT provided, do NOT invent folklore or symbolism.
// - If a symbolic phrase or nickname is provided, include it naturally.
// - Confidence must be a number between 0 and 1.
// -Do not guess rare plants unless strong visual evidence is present.
// -Prefer common houseplants and garden plants when uncertain.

// Return ONLY this exact JSON structure:

// {
//   "commonName": "{commonName}",
//   "scientificName": "{scientificName}",
//   "confidence": number,
//   "description": "Plant description text"
// }

// Plant Data:
// Common Name: {commonName - STRING}
// Scientific Name: {scientificName - STRING}
// Native Region: {nativeRegion - STRING}
// Adjective Description: {adjectiveDescription - STRING}
// Distinctive Features: {distinctiveFeatures - STRING}
// Unique Fact: {uniqueFact or "None"}
// Folklore: {folklore or "None"}
// Symbolic Phrase: {symbolicPhrase or "None"}

// Description Writing Pattern:

// {NativeRegion}
// and {Folklore (optional)},
// the {CommonName} is a {AdjectiveDescription}
// known for its {DistinctiveFeatures}.
// {UniqueFact (optional)}.
// {SymbolicNickname (optional)}.

// Write only the JSON response.
// Do not include explanations or extra text.

// Example with folklore:
// Native to West Africa and believed to ward off evil spirits and bad energy, the Snake Plant is a hardy indoor plant known for its upright, sword-shaped leaves with green and yellow patterns. It releases oxygen at night, making it a great plant for bedrooms. Often called "the plant that refuses to die," it symbolizes good luck that refuses to leave.

// Example Without Folklore:
// Native to South America, the Monstera is a tropical plant known for its large split leaves. It grows quickly in warm indoor environments. Its dramatic foliage makes it a favorite decorative plant.

// `,
// 		},
// 	];

// 	images.forEach((img) => {
// 		content.push({
// 			type: "input_image",
// 			image_url: `data:${img.mimetype};base64,${img.buffer.toString("base64")}`,
// 		});
// 	});

// 	const response = await openai.responses.create({
// 		model: model,
// 		temperature: 0.7,

// 		input: [
// 			{
// 				role: "user",
// 				content: content,
// 			},
// 		],

// 		text: {
// 			format: {
// 				type: "json_schema",
// 				name: "plant_identification",
// 				schema: {
// 					type: "object",
// 					properties: {
// 						success: { type: "boolean" },
// 						commonName: { type: ["string", "null"] },
// 						scientificName: { type: ["string", "null"] },
// 						confidence: { type: ["number", "null"] },
// 						description: { type: ["string", "null"] },
// 						error: { type: ["string", "null"] },
// 						reason: { type: ["string", "null"] },
// 					},
// 					required: [
// 						"success",
// 						"commonName",
// 						"scientificName",
// 						"confidence",
// 						"description",
// 						"error",
// 						"reason",
// 					],
// 					additionalProperties: false,
// 				},
// 			},
// 		},
// 	});

// 	if (!response.output_parsed) {
// 		return {
// 			error: "Parsing failed",
// 			reason: "Model did not return structured output",
// 		};
// 	}
// 	return response.output_parsed;
// };

const isPlantImage = async (processedFiles) => {
	const imageContents = processedFiles.map((file) => ({
		type: "image_url",
		image_url: {
			url: `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
			detail: "low", // cheapest tier — enough for yes/no
		},
	}));

	const response = await openai.chat.completions.create({
		model: "gpt-4.1-mini",
		max_tokens: 5,
		messages: [
			{
				role: "user",
				content: [
					...imageContents,
					{
						type: "text",
						text: 'Do these images contain a plant? Reply with only "yes" or "no".',
					},
				],
			},
		],
	});

	const answer = response.choices[0].message.content.trim().toLowerCase();
	return answer === "yes";
};

module.exports = isPlantImage;
