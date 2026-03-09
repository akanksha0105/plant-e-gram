import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../authSlice";

export default function Login() {
	const [formData, setFormData] = useState({
		emailId: "",
		password: "",
	});

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			await dispatch(loginUser(formData)).unwrap();
			navigate("/garden-board", { replace: true });
		} catch (err) {
			console.error("Login failed:", err);
		}
	};

	return (
		<div className='min-h-screen flex justify-center px-4 pt-[20vh]'>
			<div className='w-full max-[395px]:min-w-0 min-[396px]:min-w-[28rem] min-[396px]:max-w-[32rem]'>
				{/* Card */}
				<div className='rounded-2xl  p-8 sm:p-10'>
					<h2 className='text-3xl font-semibold text-center mb-8'>
						Welcome Back
					</h2>

					<form onSubmit={handleLogin} className='space-y-9'>
						<input
							name='emailId'
							type='email'
							placeholder='Email'
							value={formData.emailId}
							onChange={handleChange}
							className='
								w-full
								py-3
								text-lg
								bg-transparent
								border-0
								border-b
								border-gray-300
								focus:border-black
								focus:outline-none
								transition-colors
								duration-300
							'
						/>

						<input
							name='password'
							type='password'
							placeholder='Password'
							value={formData.password}
							onChange={handleChange}
							className='
								peer
								w-full
								py-3
								text-lg
								bg-transparent
								border-0
								border-b
								border-gray-300
								focus:border-black
								focus:outline-none
								transition-colors
								duration-300
							'
						/>

						<button
							type='submit'
							className='w-full py-4 text-base font-semibold uppercase tracking-wide
								transition-all duration-500
								bg-[linear-gradient(to_right,#EC6F66_0%,#F3A183_51%,#EC6F66_100%)]
								bg-[length:200%_auto] bg-left hover:bg-right
								text-white
								rounded-xl
								shadow-md hover:shadow-lg'>
							Log In
						</button>
					</form>
				</div>

				{/* Signup */}
				<div className='mt-3 text-center'>
					<span className='text-base text-gray-600'>
						Don't have an account?
					</span>{" "}
					<Link
						to='/signup'
						className='text-base text-orange-500 font-semibold hover:underline'>
						Sign up
					</Link>
				</div>
			</div>
		</div>
	);
}
