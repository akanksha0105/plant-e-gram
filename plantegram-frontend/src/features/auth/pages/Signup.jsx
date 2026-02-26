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
		username: "",
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
			navigate("/garden");
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className='bg-white border border-gray-300 p-10'>
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
						className='w-full px-3 py-2.5 bg-gray-50 border border-gray-300 rounded-sm text-xs'
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
						className='w-full px-3 py-2.5 bg-gray-50 border border-gray-300 rounded-sm text-xs'
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
						className='w-full px-3 py-2.5 bg-gray-50 border border-gray-300 rounded-sm text-xs'
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
					className={`w-full py-2 rounded-lg text-sm mb-4
						${
							isFormValid
								? "bg-blue-500 text-white"
								: "bg-blue-200 text-gray-500 cursor-not-allowed"
						}`}>
					Sign up
				</button>
			</form>

			<button
				onClick={() => navigate("/login")}
				className='w-full text-blue-900 font-semibold text-sm'>
				I already have an account
			</button>
		</div>
	);
};

export default Signup;
