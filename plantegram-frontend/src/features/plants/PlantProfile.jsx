import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import Monstera from "../../assets/Monstera.png";
import Monstera from "../../assets/hero_image.jpg";
import { getPlantProfile } from "../plantIdentification/plantSlice";

const PlantProfile = () => {
	const { plantId } = useParams();
	console.log("PARAM ID:", plantId);
	const dispatch = useDispatch();
	const plant = useSelector((state) => state.plant.currentPlant);

	useEffect(() => {
		if (!plant || plant._id !== plantId) {
			dispatch(getPlantProfile(plantId));
		}
	}, [plantId]);

	if (!plant) return <div>Loading...</div>;
	const [imgHovered, setImgHovered] = useState(false);
	// const plant = {
	// 	scientificName: "Monstera Deliciosa",
	// 	commonName: "AKA Swiss Cheese Plant",
	// 	description:
	// 		"Originally from the rain forests of Central and South America, where they climb up trees to reach higher light levels, consequently sturdy support is essential as stems can reach a height of 20' or more. They are easy to grow and with proper care, leaves of up to 45cm (18\") across can be achieved!",
	// 	// image:
	// 	// 	"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Monstera_deliciosa_cv_variegata.jpg/800px-Monstera_deliciosa_cv_variegata.jpg",
	// };

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
							// src={plant.image}
							src={Monstera}
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

						{/* Links
						<div className='flex gap-9'>
							{["More Info", "A–Z Index"].map((label) => (
								<button
									key={label}
									className='font-jost text-[11px] tracking-[3px] uppercase font-semibold text-[#1a1a1a] pb-1.5 border-b-2 border-[#3a7a40] hover:text-[#3a7a40] transition-colors'>
									{label}
								</button>
							))}
						</div> */}
					</div>
				</div>
			</div>
		</>
	);
};

export default PlantProfile;

{
	/* TODO:Image carousel */
}
