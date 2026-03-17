import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../shared/components/Sidebar";
import Dropdown from "../shared/components/Dropdown";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
const MainLayout = () => {
	const [activeState, setActiveState] = useState(null);
	const { profile } = useSelector((state) => state.user);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogout = () => {
		dispatch(logoutUser());
		navigate("/login");
	};
	return (
		<div className='h-screen flex'>
			<Sidebar activeState={activeState} setActiveState={setActiveState} />

			<main className='bg-background flex-1 flex flex-col overflow-hidden py-10 px-10'>
				<div className='flex items-center justify-between mb-3 px-0.5'>
					<h3 className='font-rochester text-xl font-bold text-textPrimary m-0'>
						{activeState}
					</h3>
					<Dropdown
						dropdownTitle={profile?.name}
						dropdownImage={profile?.photoURL}
						dropdownOptions={[
							{
								label: "Your Profile",
								to: "/profile",
							},
							{
								label: "Log out",
								onClick: handleLogout,
							},
						]}
					/>
				</div>
				<Outlet />
			</main>
		</div>
	);
};

export default MainLayout;
