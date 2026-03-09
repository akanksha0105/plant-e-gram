import { GardenBoardIcon, SavedPlantsIcon } from "./icons";

export const acceptedImageFormats = [
	"image/jpeg",
	"image/png",
	"image/webp",
	"image/gif",
	"image/svg+xml",
];

export const C = {
	fern: "#768E78",
	pistachio: "#C6C09C",
	fennel: "#EBDEC0",
	peony: "#E79897",
	peach: "#FCAC83",
	honey: "#FCC88A",
	bg: "#F5EFE0",
	dark: "#2d3a2e",
	muted: "#7a8c7b",
	white: "#ffffff",
};

export const navigation = [
	{
		label: "Gardenboard",
		to: "/garden-board",
		icon: GardenBoardIcon,
	},
	{
		label: "Saved Plants",
		to: "/saved-plants",
		icon: SavedPlantsIcon,
	},
];
