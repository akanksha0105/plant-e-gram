export const MAX_FILE_SIZE = 10 * 1024 * 1024;

export const validateImageFile = (file) => {
	if (!file) return "No file selected";

	if (!file.type.startsWith("image/")) {
		return "Only image files are allowed";
	}

	if (file.size > MAX_FILE_SIZE) {
		return "File must be smaller than 10MB";
	}

	return "";
};
