const Card = ({ image, header, description }) => {
	return (
		<li className=' h-full group flex flex-col overflow-hidden rounded-2xl border border-stone-200 bg-card shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md'>
			{/* Image */}
			{image && (
				<div className='aspect-square w-full overflow-hidden bg-stone-100'>
					<img
						src={image}
						alt={header}
						loading='lazy'
						className=' h-full w-full object-cover transition-transform duration-300 group-hover:scale-105'
					/>
				</div>
			)}

			{/* Body */}
			<div className='flex flex-1 flex-col gap-1 p-4'>
				<h2 className='text-base font-semibold leading-snug text-stone-800'>
					{header}
				</h2>
				{description && (
					<p className='text-xs italic text-stone-400'>{description}</p>
				)}
			</div>
		</li>
	);
};

export default Card;
