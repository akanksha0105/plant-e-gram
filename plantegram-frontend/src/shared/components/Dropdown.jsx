import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const Dropdown = ({ dropdownTitle, dropdownOptions, dropdownImage }) => {
	const [open, setOpen] = useState(false);
	const ref = useRef(null);

	useEffect(() => {
		function handleClickOutside(e) {
			if (ref.current && !ref.current.contains(e.target)) {
				setOpen(false);
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<div className='relative inline-block' ref={ref}>
			<button
				onClick={() => setOpen((prev) => !prev)}
				className='bg-transparent flex items-center gap-2.5 rounded-lg px-2 py-1.5'>
				{/* <img
					src={dropdownImage}
					alt={dropdownTitle}
					className='w-9 h-9 rounded-full object-cover'
				/> */}
				<span className='text-sm font-medium text-gray-900'>
					{dropdownTitle}
				</span>
				<svg
					className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
						open ? "rotate-180" : "rotate-0"
					}`}
					fill='none'
					viewBox='0 0 16 16'
					stroke='currentColor'
					strokeWidth={1.5}
					strokeLinecap='round'
					strokeLinejoin='round'>
					<path d='M4 6l4 4 4-4' />
				</svg>
			</button>

			{open && (
				<div className='absolute right-0 mt-1.5 w-44 bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden z-50 divide-y divide-gray-100'>
					{dropdownOptions.map((option, index) =>
						option.to ? (
							<Link
								key={index}
								to={option.to}
								className='block px-4 py-2 text-sm hover:bg-gray-50 transition'>
								{option.label}
							</Link>
						) : (
							<button
								key={index}
								onClick={option.onClick}
								className='block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition'>
								{option.label}
							</button>
						),
					)}
				</div>
			)}
		</div>
	);
};

export default Dropdown;
