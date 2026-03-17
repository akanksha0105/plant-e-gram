import { useState, useRef, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { navigation } from "../../utils/constants";
import { PlantGreenLogo } from "../../utils/icons";

const Sidebar = ({ setActiveState }) => {
	const [collapsed, setCollapsed] = useState(false);
	const sidebarRef = useRef(null);
	const location = useLocation(); // ← track current route

	// Sync activeState to parent whenever route changes
	useEffect(() => {
		const match = navigation.find(({ to }) => to === location.pathname);

		if (match) {
			setActiveState(match.label);
		} else {
			setActiveState(null);
		}
	}, [location.pathname]);

	useEffect(() => {
		const handleClickOutside = (e) => {
			if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
				setCollapsed(true);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<div className='flex h-screen bg-surface font-mono text-sm overflow-hidden'>
			<aside
				ref={sidebarRef}
				onMouseEnter={() => setCollapsed(false)}
				onMouseLeave={() => setCollapsed(true)}
				className={`relative flex flex-col transition-all duration-300 ease-in-out ${
					collapsed ? "w-16" : "w-60"
				}`}>
				<Link
					to='/'
					className='flex items-center gap-3 px-4 py-5 border-b border-textMuted'>
					<PlantGreenLogo color='#6E8F80' size='32px' />
					<span
						className={`text-primary font-rochester text-lg tracking-widest whitespace-nowrap overflow-hidden transition-all duration-200 ${
							collapsed ? "opacity-0 w-0" : "opacity-100"
						}`}>
						Plantegram
					</span>
				</Link>

				<nav className='flex-1 px-2 py-4 space-y-2 overflow-y-auto'>
					{navigation.map(({ label, icon, to }) => (
						<NavLink key={label} to={to} end>
							{({ isActive }) => (
								<div
									className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 ${
										isActive
											? "bg-primary text-textPrimary font-medium"
											: "text-textSecondary hover:bg-card hover:text-textPrimary"
									}`}>
									<span className='flex-shrink-0'>{icon}</span>
									<span
										className={`flex-1 whitespace-nowrap overflow-hidden text-xs font-medium tracking-wide transition-all duration-200 ${
											collapsed ? "opacity-0 w-0" : "opacity-100"
										}`}>
										{label}
									</span>
									{collapsed && (
										<span className='pointer-events-none absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2.5 py-1.5 text-xs rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-150 border bg-surface shadow-md z-50'>
											{label}
										</span>
									)}
								</div>
							)}
						</NavLink>
					))}
				</nav>
			</aside>
		</div>
	);
};

export default Sidebar;
