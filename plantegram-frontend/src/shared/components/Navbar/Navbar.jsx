// Navbar.jsx
import { useCallback } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../../features/auth/authSlice";
import NavLogo from "./Navlogo";
import { navigation } from "../../../utils/constants";
import { PlantGreenLogo } from "../../../utils/icons";

const DesktopNavLinks = ({ links }) => (
	<div className='hidden lg:flex lg:gap-x-12'>
		{links.map((item) => (
			<Link
				key={item.label}
				to={item.to}
				className='text-sm/6 font-semibold text-gray-900 hover:text-gray-600 transition-colors duration-150'>
				{item.label}
			</Link>
		))}
	</div>
);

const AuthButton = ({ isAuthenticated, onLogout }) => (
	<div className='hidden lg:flex lg:flex-1 lg:justify-end'>
		{isAuthenticated ? (
			<button
				type='button'
				onClick={onLogout}
				className='text-sm/6 font-semibold text-gray-900 hover:text-gray-600 transition-colors duration-150'>
				Log out <span aria-hidden='true'>&rarr;</span>
			</button>
		) : (
			<Link
				to='/login'
				className='text-sm/6 font-semibold text-gray-900 hover:text-gray-600 transition-colors duration-150'>
				Log in <span aria-hidden='true'>&rarr;</span>
			</Link>
		)}
	</div>
);

const MobileMenu = ({ isOpen, onClose, links, isAuthenticated, onLogout }) => {
	const handleLogout = () => {
		onLogout();
		onClose();
	};

	return (
		<Dialog open={isOpen} onClose={onClose} className='lg:hidden'>
			{/* Backdrop */}
			<div className='fixed inset-0 z-40 bg-black/20' aria-hidden='true' />

			<DialogPanel className='fixed inset-y-0 right-0 z-50 w-full overflow-y-auto  p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10'>
				{/* Header */}
				<div className='flex items-center justify-between'>
					<Link to='/' className='-m-1.5 p-1.5' onClick={onClose}>
						<span className='sr-only'>Plantegram</span>
						<PlantGreenLogo color='' />
					</Link>
					<button
						type='button'
						onClick={onClose}
						className='-m-2.5 rounded-md p-2.5 text-gray-700 hover:bg-gray-100 transition-colors duration-150'>
						<span className='sr-only'>Close menu</span>
						<XMarkIcon aria-hidden='true' className='size-6' />
					</button>
				</div>

				{/* Body */}
				<div className='mt-6 flow-root'>
					<div className='-my-6 divide-y divide-gray-500/10'>
						{/* Nav links — only shown when authenticated */}
						{isAuthenticated && (
							<div className='space-y-2 py-6'>
								{links.map((item) => (
									<Link
										key={item.label}
										to={item.to}
										onClick={onClose}
										className='-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 transition-colors duration-150'>
										{item.label}
									</Link>
								))}
							</div>
						)}

						{/* Auth action */}
						<div className='py-6'>
							{isAuthenticated ? (
								<button
									type='button'
									onClick={handleLogout}
									className='-mx-3 block bg-transparent w-full rounded-lg px-3 py-2.5 text-left text-base/7 font-semibold text-black hover:primaryHover transition-colors duration-150'>
									Log out
								</button>
							) : (
								<Link
									to='/login'
									onClick={onClose}
									className='-mx-3 bg-transparent block rounded-lg px-3 py-2.5 text-base/7 font-semibold  text-black hover:primaryHover transition-colors duration-150'>
									Log in
								</Link>
							)}
						</div>
					</div>
				</div>
			</DialogPanel>
		</Dialog>
	);
};


const Navbar = () => {
	const { isAuthenticated } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogout = useCallback(() => {
		dispatch(logoutUser());
		navigate("/login");
	}, [dispatch, navigate]);

	return (
		<header className='fixed top-0 left-0 w-full z-50 bg-transparent'>
			<nav
				aria-label='Main navigation'
				className='flex items-center justify-between p-6 lg:px-8'>
				<PlantGreenLogo />

				{/* Hidden checkbox — drives the mobile menu open/close */}
				<input
					type='checkbox'
					id='mobile-menu-toggle'
					className='peer hidden'
				/>

				{/* Hamburger — visible only on mobile */}
				<label
					htmlFor='mobile-menu-toggle'
					className='lg:hidden -m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors duration-150'
					aria-label='Open main menu'>
					<Bars3Icon className='size-6' aria-hidden='true' />
				</label>

				{/* Desktop nav */}
				{isAuthenticated && <DesktopNavLinks links={navigation} />}
				<AuthButton isAuthenticated={isAuthenticated} onLogout={handleLogout} />

				{/* Mobile menu — toggled purely via CSS peer */}
				<div
					className='
          peer-checked:translate-x-0 translate-x-full
          fixed inset-y-0 right-0 z-50 w-full sm:max-w-sm
          bg-white p-6 overflow-y-auto
          transition-transform duration-300 ease-in-out
          sm:ring-1 sm:ring-gray-900/10
        '>
					<div className='flex items-center justify-between'>
						<NavLogo />
						{/* X button — unchecks the checkbox */}
						<label
							htmlFor='mobile-menu-toggle'
							className='-m-2.5 rounded-md p-2.5 text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors duration-150'
							aria-label='Close menu'>
							<XMarkIcon className='size-6' aria-hidden='true' />
						</label>
					</div>

					<div className='mt-6 flow-root'>
						<div className='-my-6 divide-y divide-gray-500/10'>
							{isAuthenticated && (
								<div className='space-y-2 py-6'>
									{navigation.map((item) => (
										<Link
											key={item.label}
											to={item.to}
											className='-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50'>
											{item.label}
										</Link>
									))}
								</div>
							)}
							<div className='py-6'>
								{isAuthenticated ? (
									<button
										type='button'
										onClick={handleLogout}
										className='-mx-3 block w-full text-left rounded-lg px-3 py-2.5 text-base/7 font-semibold text-black hover:bg-primaryHover'>
										Log out
									</button>
								) : (
									<Link
										to='/login'
										className='-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-black hover:bg-primaryHover'>
										Log in
									</Link>
								)}
							</div>
						</div>
					</div>
				</div>
			</nav>
		</header>
	);
};

export default Navbar;
