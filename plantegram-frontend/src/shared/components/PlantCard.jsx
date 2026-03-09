import { useNavigate } from "react-router-dom";

const PlantCard = ({ plant }) => {
	const navigate = useNavigate();
	return (
		<div
			onClick={() => navigate(`/plants/${plant._id}`)}
			className='card w-full max-w-[500px] hover:cursor-pointer bg-white rounded-[16px] font-[Poppins] z-[5]'>
			<img
				className='block w-full max-w-[500px] aspect-[4/3] object-cover object-center rounded-t-[16px] contrast-[70%] transition-all duration-[600ms] ease-[cubic-bezier(0.43,0.41,0.22,0.91)] hover:contrast-100'
				src={plant?.image}
				alt={plant?.scientificName}
			/>

			<div className='card-content flex flex-col px-[15px] py-[20px]'>
				<p className='text-base font-semibold text-blue-800 mb-[10px]'>
					{plant?.scientificName}
				</p>
			</div>
		</div>
	);
};

export default PlantCard;
