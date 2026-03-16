// Navbar.jsx
import { useCallback } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../../features/auth/authSlice";
import { navigation } from "../../../utils/constants";
import { PlantGreenLogo } from "../../../utils/icons";
import AuthAction from "./AuthAction";

const Brand = ({ logoHeight = 50 }) => (
	<div className='flex items-center gap-2'>
		<PlantGreenLogo width={60} height={logoHeight} className='text-primary' />
	</div>
);

const NavLinks = ({ links, className = "", itemClassName = "" }) =>
	links.map((item) => (
		<Link key={item.label} to={item.to} className={itemClassName || className}>
			{item.label.toUpperCase()}
		</Link>
	));

const Navbar = () => {
	const { isAuthenticated } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogout = useCallback(() => {
		dispatch(logoutUser());
		navigate("/login");
	}, [dispatch, navigate]);

	const desktopLinkClass =
		"bg-transparent text-sm font-semibold font-serif text-black px-4 py-2 border border-transparent rounded-md transition-all duration-150 hover:border-black hover:text-black";

	const mobileLinkClass =
		"-mx-3 block rounded-lg px-3 py-2 font-serif text-base font-semibold text-black border border-transparent hover:border-black hover:text-black";

	return (
		<header className='fixed top-0 left-0 w-full z-50 bg-transparent'>
			<nav
				aria-label='Main navigation'
				className='flex items-center justify-between p-6 lg:px-8'>
				{/* Brand */}
				<Link to='/'>
					<Brand logoHeight={50} />
				</Link>

				{/* Mobile toggle */}
				<input
					type='checkbox'
					id='mobile-menu-toggle'
					className='peer hidden'
				/>
				<label
					htmlFor='mobile-menu-toggle'
					className='lg:hidden -m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors duration-150'
					aria-label='Open main menu'>
					<Bars3Icon className='size-6' aria-hidden='true' />
				</label>

				{/* Desktop links */}
				<div className='hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-8'>
					{isAuthenticated && (
						<NavLinks links={navigation} itemClassName={desktopLinkClass} />
					)}

					<AuthAction
						isAuthenticated={isAuthenticated}
						onLogout={handleLogout}
						className={desktopLinkClass}
					/>
				</div>

				{/* Mobile menu panel */}
				<div className='peer-checked:translate-x-0 translate-x-full fixed inset-y-0 right-0 z-50 w-full sm:max-w-sm bg-white p-6 overflow-y-auto transition-transform duration-300 ease-in-out sm:ring-1 sm:ring-gray-900/10'>
					<div className='flex items-center justify-between'>
						<Brand logoHeight={45} />
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
									<NavLinks
										links={navigation}
										itemClassName={mobileLinkClass}
									/>
								</div>
							)}
							<div className='py-6'>
								<AuthAction
									isAuthenticated={isAuthenticated}
									onLogout={handleLogout}
									className={mobileLinkClass}
									buttonClassName='-mx-3 block w-full text-left rounded-lg px-3 py-2.5 text-base/7 font-semibold font-playfair text-black hover:bg-primaryHover'
								/>
							</div>
						</div>
					</div>
				</div>
			</nav>
		</header>
	);
};

export default Navbar;
