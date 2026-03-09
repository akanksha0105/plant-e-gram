import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPlantProfile } from "../plantIdentification/plantSlice";

const PlantProfile = () => {
	const { plantId } = useParams();

	const dispatch = useDispatch();
	const plant = useSelector((state) => state.plant.currentPlant);
	const [imgHovered, setImgHovered] = useState(false);
	useEffect(() => {
		if (!plantId) return;

		if (!plant || String(plant._id) !== String(plantId)) {
			dispatch(getPlantProfile(plantId));
		}
	}, [plantId, plant?._id, dispatch]);

	if (!plant) return <div>Loading...</div>;

	return (
		<>
			<style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Jost:wght@300;400;500;600&display=swap');
        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-jost { font-family: 'Jost', sans-serif; }
      `}</style>

			<div className='font-jost min-h-screen flex items-center justify-center px-8 py-12'>
				<div className='flex items-center max-w-6xl w-full relative'>
					{/* LEFT — Plant Image */}
					<div className='flex-1 flex justify-center items-end relative w-[500px] h-[600px] shrink-0 overflow-hidden'>
						<img
							src={plant.image}
							alt={plant.scientificName}
							onMouseEnter={() => setImgHovered(true)}
							onMouseLeave={() => setImgHovered(false)}
							className='relative z-10 w-full h-full max-w-md object-cover transition-transform duration-700 ease-in-out'
							style={{ transform: imgHovered ? "scale(1.04)" : "scale(1)" }}
						/>
					</div>

					{/* RIGHT — Plant Info */}
					<div className='flex-1 pl-14 py-10'>
						{/* Scientific Name */}
						<h1
							className='font-playfair font-black text-[#1a1a1a] leading-none tracking-tight mb-4'
							style={{ fontSize: "clamp(52px, 6.5vw, 82px)" }}>
							{plant.scientificName.split(" ").map((word, i) => (
								<span key={i} className='block'>
									{word}
								</span>
							))}
						</h1>

						{/* Common Name */}
						<h2 className='font-jost text-[11px] tracking-[4px] uppercase text-gray-500 font-medium mb-6'>
							{plant.commonName}
						</h2>

						{/* Green accent line */}
						<div className='w-12 h-0.5 bg-[#3a7a40] mb-6' />

						{/* Description */}
						<p className='font-jost text-[14.5px] leading-relaxed text-[#4a4a4a] font-light max-w-md mb-10'>
							{plant.description}
						</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default PlantProfile;
