import { Outlet } from "react-router-dom";

const AuthLayout = () => {
	return (
		<div>
			<div className='min-h-screen w-full flex items-center justify-center bg-gray-50'>
				{" "}
				<div className='min-h-screen bg-gray-50 flex items-center justify-center p-4'>
					<div className='w-full max-w-sm'>
						{/* Logo */}
						<div className='text-center mb-8'>
							<h1
								className='text-5xl font-serif italic'
								style={{ fontFamily: "Billabong, cursive" }}>
								plant-e-gram
							</h1>
							<Outlet />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AuthLayout;
