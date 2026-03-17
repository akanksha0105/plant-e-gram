import HeroImage from "../../../assets/heroImage.png";

const Hero = () => {
	return (
		<div className='relative w-screen h-screen'>
			<img className='w-full h-full object-cover' src={HeroImage} alt='Hero' />

			<div className='absolute inset-0 flex items-center justify-center'>
				<h1 className='text-textHeading font-montserrat text-6xl font-semibold tracking-wide'>
					PLANTEGRAM
				</h1>
			</div>
		</div>
	);
};

export default Hero;
