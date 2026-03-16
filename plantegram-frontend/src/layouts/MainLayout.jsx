import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../shared/components/Sidebar";

const MainLayout = () => {
	const [activeState, setActiveState] = useState(null);

	return (
		<div className='h-screen flex'>
			<Sidebar activeState={activeState} setActiveState={setActiveState} />

			<main className='bg-background flex-1 flex flex-col overflow-hidden py-10 px-10'>
				<div className='flex items-center justify-between mb-3 px-0.5'>
					<h3 className='font-rochester text-xl font-bold text-textPrimary m-0'>
						{activeState}
					</h3>
				</div>
				<Outlet />
			</main>
		</div>
	);
};

export default MainLayout;
