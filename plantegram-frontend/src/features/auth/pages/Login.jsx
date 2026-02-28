import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import api from "../../../app/axiosInstance";
import { useDispatch } from "react-redux";
import { loginUser } from "../authSlice";

export default function Login() {
	const [formData, setFormData] = useState({
		emailId: "",
		password: "",
	});

	const dispatch = useDispatch();
	const navigate = useNavigate();

	// Handle change
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
			const result = await dispatch(loginUser(formData)).unwrap();
			console.log("Success:", result);
			navigate("/garden", { replace: true });
		} catch (err) {
			console.log("Login failed:", err);
		}
	};

	return (
		<div className='w-full max-w-sm'>
			{/* Logo */}

			{/* Login Form Card */}
			<div className='bg-white border border-gray-300 p-10'>
				<form onSubmit={handleLogin}>
					<input
						name='emailId'
						type='email'
						placeholder='email '
						value={formData?.emailId}
						onChange={handleChange}
						className='w-full px-3 py-2.5 mb-2 bg-gray-50 border border-gray-300 rounded-sm text-xs focus:outline-none focus:border-gray-400'
					/>

					{/* Password Input */}
					<input
						name='password'
						type='password'
						placeholder='Password'
						value={formData?.password}
						onChange={handleChange}
						className='w-full px-3 py-2.5 mb-4 bg-gray-50 border border-gray-300 rounded-sm text-xs focus:outline-none focus:border-gray-400'
					/>

					{/* Login Button */}
					<button
						type='submit'
						className='w-full bg-blue-400 text-white font-semibold py-2 rounded-lg text-sm mb-4 hover:bg-blue-500 transition-colors'>
						Log In
					</button>
				</form>
			</div>

			{/* Sign Up Link */}
			<div className='bg-white border border-gray-300 p-5 mt-3 text-center'>
				<span className='text-sm'>Don't have an account? </span>
				<Link
					to='/signup'
					className='text-sm text-blue-500 font-semibold hover:underline'>
					Sign up
				</Link>
			</div>
		</div>
	);
}
