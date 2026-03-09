import { Outlet } from "react-router-dom";
import login_image from "../../../assets/auth_background.png";

const AuthLayout = () => {
	return (
		<div className='relative min-h-screen w-full flex items-center justify-center'>
			{/* Background Image */}
			<img
				src={login_image}
				alt='Background'
				className='absolute inset-0 w-full h-full object-cover'
			/>

			{/* Optional Dark Overlay */}
			<div className='absolute inset-0'></div>

			{/* Login Content */}
			<div className='relative z-10 w-full max-w-sm p-6'>
				<Outlet />
			</div>
		</div>
	);
};

export default AuthLayout;
