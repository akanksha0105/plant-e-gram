/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	darkMode: "class",
	theme: {
		extend: {
			colors: {
				background: "var(--color-bg)",
				surface: "var(--color-surface)",
				card: "var(--color-card)",
				border: "var(--color-border)",
				primary: "var(--color-primary)",
				primaryHover: "var(--color-primary-hover)",
				accent: "var(--color-accent)",
				textHeading: "var(--color-text-heading)",
				textSubheading: "var(--color-text-subheading)",
				textPrimary: "var(--color-text-primary)",
				textSecondary: "var(--color-text-secondary)",
				textMuted: "var(--color-text-muted)",
			},
			fontFamily: {
				rochester: ['"Rochester"', "cursive"],
				playfair: ['"Playfair Display"', "serif"],
				montserrat: ["Montserrat", "sans-serif"],
			},
			keyframes: {
				fadeSlideUp: {
					"0%": { opacity: "0", transform: "translateY(12px)" },
					"100%": { opacity: "1", transform: "translateY(0)" },
				},
			},
			animation: {
				fadeSlideUp: "fadeSlideUp 0.4s ease forwards",
			},
		},
	},
	plugins: [],
};
