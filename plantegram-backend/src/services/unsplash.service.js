const axios = require("axios");

const fetchUnsplashImage = async (query) => {
	try {
		const response = await axios.get("https://api.unsplash.com/search/photos", {
			headers: {
				Authorization: `Client-ID ${process.env.UNSPLASH_API_KEY}`,
			},
			params: {
				query,
				per_page: 1,
				orientation: "landscape",
			},
			timeout: 10000,
		});

		console.log("Unsplash response : ", response);
		if (!response.data.results.length) {
			return null;
		}

		return response.data.results[0].urls.regular;
	} catch (error) {
		console.error(
			"Third Party API Error:",
			error.response?.data || error.message,
		);

		throw new Error("External service failed");
	}
};

module.exports = fetchUnsplashImage;
