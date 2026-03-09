import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateField } from "../../../utils/validation";
import { useDispatch } from "react-redux";
import { registerUser } from "../authSlice";

const Signup = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [formData, setFormData] = useState({
		name: "",
		emailId: "",
		password: "",
		// username: "",
	});

	const [errors, setErrors] = useState({});
	const [touched, setTouched] = useState({});

	// Check if form valid
	const isFormValid =
		!validateField("emailId", formData.emailId) &&
		!validateField("password", formData.password) &&
		!validateField("name", formData.name);

	// Handle change
	const handleChange = (e) => {
		const { name, value } = e.target;

		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));

		// Real-time validation after touched
		if (touched[name]) {
			setErrors((prev) => ({
				...prev,
				[name]: validateField(name, value),
			}));
		}
	};

	// Handle blur
	const handleBlur = (e) => {
		const { name, value } = e.target;

		setTouched((prev) => ({
			...prev,
			[name]: true,
		}));

		setErrors((prev) => ({
			...prev,
			[name]: validateField(name, value),
		}));
	};

	// Handle submit
	const handleRegisteration = async (e) => {
		e.preventDefault();

		if (!isFormValid) return;

		try {
			await dispatch(registerUser(formData)).unwrap();
			navigate("/garden-board");
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className='min-h-screen flex justify-center px-4 pt-[20vh]'>
			<div className='w-full max-[395px]:min-w-0 min-[396px]:min-w-[28rem] min-[396px]:max-w-[32rem]'>
				{/* Card */}
				<div className='rounded-2xl  p-8 sm:p-10'>
					<h2 className='text-3xl font-semibold text-center mb-8'>
						hey, new plant parent
					</h2>

					<form onSubmit={handleRegisteration}>
						{/* Email */}
						<div className='mb-2 relative'>
							<input
								name='emailId'
								type='email'
								placeholder='Email'
								value={formData.emailId}
								onChange={handleChange}
								onBlur={handleBlur}
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

							{/* Green check */}
							{touched.emailId && !errors.emailId && formData.emailId && (
								<span className='absolute right-2 top-2 text-green-600'>✓</span>
							)}
						</div>

						{touched.emailId && errors.emailId && (
							<p className='text-red-500 text-xs mb-2'>{errors.emailId}</p>
						)}

						{/* Password */}
						<div className='mb-2 relative'>
							<input
								name='password'
								type='password'
								placeholder='Password'
								value={formData.password}
								onChange={handleChange}
								onBlur={handleBlur}
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

							{touched.password && !errors.password && formData.password && (
								<span className='absolute right-2 top-2 text-green-600'>✓</span>
							)}
						</div>

						{touched.password && errors.password && (
							<p className='text-red-500 text-xs mb-2'>{errors.password}</p>
						)}

						{/* Name */}
						<div className='mb-2 relative'>
							<input
								name='name'
								type='text'
								placeholder='Full Name'
								value={formData.name}
								onChange={handleChange}
								onBlur={handleBlur}
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

							{touched.name && !errors.name && formData.name && (
								<span className='absolute right-2 top-2 text-green-600'>✓</span>
							)}
						</div>

						{touched.name && errors.name && (
							<p className='text-red-500 text-xs mb-2'>{errors.name}</p>
						)}

						{/* Submit */}
						<button
							type='submit'
							disabled={!isFormValid}
							// 	className={`w-full py-2 rounded-lg text-sm mb-4
							// ${
							// 	isFormValid
							// 		? "bg-blue-500 text-white"
							// 		: "bg-blue-200 text-gray-500 cursor-not-allowed"
							// }`}
							className='w-full mt-6 py-4 text-base font-semibold uppercase tracking-wide
								transition-all duration-500
								bg-[linear-gradient(to_right,#EC6F66_0%,#F3A183_51%,#EC6F66_100%)]
								bg-[length:200%_auto] bg-left hover:bg-right
								text-white
								rounded-xl
								shadow-md hover:shadow-lg'>
							Sign up
						</button>
					</form>

					<button
						onClick={() => navigate("/login")}
						className='w-full mt-6 border border-[#EC6F66] text-[#EC6F66] font-semibold text-sm py-4 rounded-md transition-all duration-300 hover:bg-[#EC6F66] hover:text-white'>
						I already have an account
					</button>
				</div>
			</div>
		</div>
	);
};

export default Signup;
