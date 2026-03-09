const ViewAllCard = () => {
	return (
		<div
			className='
			group
			flex-shrink-0
			w-[158px]
			min-h-[185px]
			rounded-[16px]
			bg-fennel
			border-[1.5px] border-dashed border-pistachio
			cursor-pointer
			overflow-hidden
			flex flex-col items-center justify-center
			gap-[10px]
			scroll-snap-align-start
			transition-all duration-200 ease-in-out
			shadow-[0_2px_8px_rgba(0,0,0,0.04)]
			hover:bg-fern
			hover:border-fern
			hover:-translate-y-[5px]
			hover:shadow-[0_14px_30px_rgba(118,142,120,0.25)]
			'>
			<div
				className='
				w-[44px] h-[44px]
				rounded-full
				bg-pistachio/35
				flex items-center justify-center
				transition-all duration-200
				group-hover:bg-white/20
				'>
				<svg
					className='stroke-fern group-hover:stroke-white'
					width='20'
					height='20'
					viewBox='0 0 24 24'
					fill='none'
					strokeWidth='2'
					strokeLinecap='round'>
					<path d='M5 12h14M12 5l7 7-7 7' />
				</svg>
			</div>

			<div className='text-center px-[14px]'>
				<p
					className='
					font-playfair
					text-[0.85rem]
					font-bold
					text-dark
					group-hover:text-white
					mb-[4px]
					'>
					View All
				</p>
			</div>
		</div>
	);
};

export default ViewAllCard;
