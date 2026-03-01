const OpenAI = require("openai");

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

const identifyPlant = async (images, model) => {
	const content = [
		{
			type: "text",
			text: `
			
			First analyze the image carefully before identifying the plant.

Focus on:
- Leaf shape and structure
- Leaf color and patterns
- Plant size and growth habit
- Stem or trunk characteristics
- Flowers or fruits if visible
- Indoor vs outdoor setting

Identify the most likely plant species based on visible features.

If uncertain, choose the closest likely plant and lower the confidence score.

If the image does not contain a plant or cannot be identified, return:

{
  "error": "Unable to identify plant",
  "reason": "One short sentence."
}
			You are a plant expert and a skilled storyteller writing short, natural descriptions for a plant identification app.

Write a clear, engaging, and human-sounding plant description using the data provided.

Guidelines:
- Write 3–5 sentences (60–120 words total).
- Keep the tone natural, warm, and slightly storytelling in style.
- The description should feel like it was written by a knowledgeable plant lover.
- Do NOT use bullet points or lists.
- Do NOT repeat phrases or sentence patterns.
- Avoid rigid or formula-like writing.
- Vary sentence openings so descriptions do not sound identical.
- Mention the native region naturally.
- Describe the plant’s distinctive features in a vivid but concise way.
- Include one useful or interesting fact if available.
- If folklore or cultural belief is provided, include it naturally in one sentence.
- If folklore is NOT provided, do NOT invent folklore or symbolism.
- If a symbolic phrase or nickname is provided, include it naturally.
- Confidence must be a number between 0 and 1.
-Do not guess rare plants unless strong visual evidence is present.
-Prefer common houseplants and garden plants when uncertain.

Return ONLY this exact JSON structure:

{
  "commonName": "{commonName}",
  "scientificName": "{scientificName}",
  "confidence": number,
  "description": "Plant description text"
}

Plant Data:
Common Name: {commonName - STRING}
Scientific Name: {scientificName - STRING}
Native Region: {nativeRegion - STRING}
Adjective Description: {adjectiveDescription - STRING}
Distinctive Features: {distinctiveFeatures - STRING}
Unique Fact: {uniqueFact or "None"}
Folklore: {folklore or "None"}
Symbolic Phrase: {symbolicPhrase or "None"}


Description Writing Pattern:

{NativeRegion}
and {Folklore (optional)},
the {CommonName} is a {AdjectiveDescription}
known for its {DistinctiveFeatures}.
{UniqueFact (optional)}.
{SymbolicNickname (optional)}.


Write only the JSON response.
Do not include explanations or extra text.


Example with folklore:
Native to West Africa and believed to ward off evil spirits and bad energy, the Snake Plant is a hardy indoor plant known for its upright, sword-shaped leaves with green and yellow patterns. It releases oxygen at night, making it a great plant for bedrooms. Often called "the plant that refuses to die," it symbolizes good luck that refuses to leave.

Example Without Folklore:
Native to South America, the Monstera is a tropical plant known for its large split leaves. It grows quickly in warm indoor environments. Its dramatic foliage makes it a favorite decorative plant.

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
		model: model,
		temperature: 0.7,

		input: [
			{
				role: "user",
				content,
			},
		],

		response_format: {
			type: "json_schema",
			json_schema: {
				name: "plant_identification",
				schema: {
					type: "object",
					properties: {
						commonName: { type: "string" },
						scientificName: { type: "string" },
						confidence: { type: "number" },
						description: { type: "string" },
						error: { type: "string" },
						reason: { type: "string" },
					},
					additionalProperties: false,
				},
			},
		},
	});

	return response.output[0].content[0].json;
};

module.exports = identifyPlant;
