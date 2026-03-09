const OpenAI = require("openai");
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const generatePlantDescription = async ({ commonName, scientificName }) => {
	try {
		const response = await openai.responses.create({
			model: "gpt-4.1-mini",
			temperature: 0.6,
			input: `
Write a 3–5 sentence natural, warm plant description.

Common Name: ${commonName}
Scientific Name: ${scientificName}

Include:
- Native region
- Distinctive features
- One interesting fact

Do not use bullet points.
Keep it human and storytelling in tone.
`,
		});

		return response.output_text;
	} catch (err) {
		console.error("Description error:", err);
		return "A beautiful plant known for its distinctive foliage.";
	}
};

module.exports = generatePlantDescription;
