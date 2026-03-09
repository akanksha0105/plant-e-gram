const DoubleCard = ({
	image,
	header,
	description,
	underlyingHeader,
	accentColor = "#fcd5b5",
	onClick,
}) => {
	return (
		<li className='relative list-none pb-8'>
			{/* Back card */}
			<div
				className='absolute bottom-0 left-2 right-2 top-2 rounded-2xl'
				style={{ backgroundColor: accentColor }}>
				{underlyingHeader && (
					<p className='absolute bottom-2 left-0 right-0 text-center text-xs font-semibold tracking-widest uppercase text-stone-400'>
						{underlyingHeader}
					</p>
				)}
			</div>

			{/* Front card */}
			<div
				onClick={onClick}
				className={`relative z-10 group flex flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md
          ${onClick ? "cursor-pointer" : ""}`}>
				{image && (
					<div className='h-48 w-full overflow-hidden bg-stone-100'>
						<img
							src={image}
							alt={header}
							loading='lazy'
							className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-105'
						/>
					</div>
				)}
				<div className='flex flex-col gap-1 p-4'>
					<h2 className='text-base font-semibold leading-snug text-stone-800'>
						{header}
					</h2>
					{description && (
						<p className='text-xs italic text-stone-400'>{description}</p>
					)}
				</div>
			</div>
		</li>
	);
};
export default DoubleCard;
