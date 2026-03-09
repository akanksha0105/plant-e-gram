export const GardenBoardIcon = (
	<svg
		viewBox='0 0 24 24'
		fill='none'
		stroke='currentColor'
		strokeWidth='1.5'
		className='w-5 h-5'>
		<rect x='3' y='3' width='7' height='7' rx='1' />
		<rect x='14' y='3' width='7' height='7' rx='1' />
		<rect x='3' y='14' width='7' height='7' rx='1' />
		<rect x='14' y='14' width='7' height='7' rx='1' />
	</svg>
);

export const SavedPlantsIcon = (
	<svg
		viewBox='0 0 24 24'
		fill='none'
		stroke='currentColor'
		strokeWidth='1.5'
		className='w-5 h-5'>
		{/* Pot */}
		<path d='M7 21h10M8 17l-1 4h10l-1-4' />
		<rect x='7' y='13' width='10' height='4' rx='1' />
		{/* Stem */}
		<line x1='12' y1='13' x2='12' y2='8' />
		{/* Left leaf */}
		<path d='M12 10 C12 10 9 9 8 6 C10 6 12 8 12 10Z' />
		{/* Right leaf */}
		<path d='M12 8 C12 8 15 7 16 4 C14 4 12 6 12 8Z' />
	</svg>
);

export const PlantGreenLogo = ({
	color = "currentColor",
	className = "",
	...props
}) => {
	return (
		<svg
			// Using 1em makes the icon match the surrounding text size
			width='1.2em'
			height='1.2em'
			viewBox='0 0 100 100'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			className={`inline-block shrink-0 ${className}`}
			{...props}>
			<g
				stroke={color}
				strokeWidth='5'
				strokeLinecap='round'
				strokeLinejoin='round'>
				{/* Simplified Middle Leaf */}
				<path d='M50 85 V30 M50 30 C40 35 35 45 35 55 S45 70 50 70 S65 65 65 55 S60 35 50 30' />

				{/* Simplified Left Leaf */}
				<path d='M50 70 C35 70 20 60 20 45 C20 45 40 40 50 65' />

				{/* Simplified Right Leaf */}
				<path d='M50 70 C65 70 80 60 80 45 C80 45 60 40 50 65' />

				{/* Base Swirls */}
				<path d='M50 85 C35 85 25 75 15 78 M50 85 C65 85 75 75 85 78' />
			</g>
		</svg>
	);
};
