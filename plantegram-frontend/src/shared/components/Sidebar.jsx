import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { navigation } from "../../utils/constants";
import { PlantGreenLogo } from "../../utils/icons";

const Sidebar = () => {
	const [collapsed, setCollapsed] = useState(false);
	const sidebarRef = useRef(null);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
				setCollapsed(true); // close sidebar
			}
		};

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);
	return (
		<div className='flex bg-surface h-screen border-4 border-yellow-500  font-mono text-sm overflow-hidden'>
			{/* Sidebar */}
			<aside
				ref={sidebarRef}
				onMouseEnter={() => setCollapsed(false)}
				onMouseLeave={() => setCollapsed(true)}
				className={`
    group relative flex flex-col 
    transition-all duration-300 ease-in-out
    ${collapsed ? "w-16" : "w-60"}
  `}>
				{/* Top accent line */}
				<div className='h-px w-full' />
				{/* Logo */}
				<NavLink
					to='/'
					className='flex items-center gap-3 px-4 py-5 border-b border-textMuted'>
					<PlantGreenLogo
						color='#6E8F80'
						className={`transition-all duration-300 ${collapsed ? "scale-110" : "scale-100"}`}
						size='32px'
					/>
					<span
						className={`
              text-primary font-rochester tracking-widest  text-lg
              transition-all duration-200 whitespace-nowrap overflow-hidden
              ${collapsed ? "opacity-0 w-0" : "opacity-100 w-auto"}
            `}>
						Plantegram
					</span>
				</NavLink>
				{/* Nav */}
				<nav className='flex-1 px-2 py-4 space-y-1.5 overflow-y-auto'>
					{navigation?.map(({ label, icon, to }) => (
						<NavLink key={label} to={to} title={collapsed ? label : undefined}>
							{(
								{ isActive }, // ✅ move ALL logic here, drop className prop
							) => (
								<span
									className={`
      group relative w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
      transition-all duration-150 text-left
      ${
				isActive
					? "bg-primary text-textPrimary font-medium"
					: "text-textSecondary hover:bg-card hover:text-textPrimary"
			}
    `}>
									{isActive && (
										<span className='absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-primary rounded-r-full' />
									)}

									<span className='flex-shrink-0'>{icon}</span>

									<span
										className={`
        flex-1 whitespace-nowrap overflow-hidden transition-all duration-200 font-medium tracking-wide text-xs
        ${collapsed ? "opacity-0 w-0" : "opacity-100"}
      `}>
										{label}
									</span>

									{collapsed && (
										<span className='pointer-events-none absolute left-full ml-3 px-2.5 py-1.5 text-xs rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-50 border'>
											{label}
										</span>
									)}
								</span>
							)}
						</NavLink>
					))}
				</nav>

				{/* TODO: Add user's avatar */}
				{/* User profile */}
				{/* <div className='border-t border-neutral-800 px-3 py-3'>
					<div className='flex items-center gap-3'>
						<div className='relative flex-shrink-0'>
							<div className='w-8 h-8 rounded-full bg-gradient-to-br from-amber-300 to-amber-600 flex items-center justify-center text-neutral-900 font-bold text-xs'>
								Avatar
							</div>
							<span className='absolute bottom-0 right-0 w-2 h-2 bg-emerald-400 rounded-full border-2 border-neutral-900' />
						</div>
						<div
							className={`
                flex-1 min-w-0 overflow-hidden transition-all duration-200
                ${collapsed ? "opacity-0 w-0" : "opacity-100"}
              `}>
							<p className='text-neutral-100 text-xs font-semibold truncate tracking-wide'>
								Alex Jordan
							</p>
							<p className='text-neutral-500 text-xs truncate'>admin</p>
						</div>
					</div>
				</div> */}
			</aside>
		</div>
	);
};

export default Sidebar;
