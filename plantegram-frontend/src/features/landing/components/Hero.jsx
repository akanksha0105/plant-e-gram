import HeroImage from "../../../assets/hero_image.jpg";

const Hero = () => {
	return (
		<div>
			<img className='w-screen h-screen object-cover' src={HeroImage} />{" "}
		</div>
	);
};

export default Hero;
