import { useNavigate } from "react-router-dom";

const PlantCard = ({ plant }) => {
	const navigate = useNavigate();

	return (
		<li
			onClick={() => navigate(`/plants/${plant._id}`)}
			className='group hover:cursor-pointer flex w-40 sm:w-44 md:w-48 shrink-0 flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm'>
			{plant.image ? (
				<div className='aspect-square w-full overflow-hidden bg-stone-100'>
					<img
						src={plant.image}
						alt={plant.scientificName}
						loading='lazy'
						className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-105'
					/>
				</div>
			) : (
				<div className='flex aspect-square w-full items-center justify-center bg-green-50 text-5xl'>
					🌿
				</div>
			)}

			<div className='flex flex-1 flex-col gap-1 p-4'>
				<h2 className='text-base font-semibold leading-snug text-stone-800'>
					{plant.commonName}
				</h2>
				{plant.scientificName && (
					<p className='text-xs italic text-stone-400'>
						{plant.scientificName}
					</p>
				)}
			</div>
		</li>
	);
};

export default PlantCard;
