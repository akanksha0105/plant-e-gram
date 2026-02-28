export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateField = (name, value) => {
	switch (name) {
		case "emailId":
			if (!value) return "Email is required";

			if (!emailRegex.test(value)) {
				return "Please enter a valid email address";
			}
			return "";

		case "password":
			if (!value) return "Password is required";

			const minLength = 8;
			const hasLowercase = /[a-z]/.test(value);
			const hasUppercase = /[A-Z]/.test(value);
			const hasNumber = /[0-9]/.test(value);
			const hasSymbol = /[^A-Za-z0-9]/.test(value);

			if (value.length < minLength)
				return "Password must be at least 8 characters";

			if (!hasLowercase) return "Password must contain a lowercase letter";

			if (!hasUppercase) return "Password must contain an uppercase letter";

			if (!hasNumber) return "Password must contain a number";

			if (!hasSymbol) return "Password must contain a symbol";

			return "";

		case "name":
			if (!value) return "Name is required";

			if (value.length < 3) return "Name must be at least 3 characters";

			return "";

		// case "username":
		// 	if (!value) return "Username is required";

		// 	if (value.length < 3) return "Username must be at least 3 characters";

		// 	return "";

		default:
			return "";
	}
};
