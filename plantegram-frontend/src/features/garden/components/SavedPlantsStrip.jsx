import PlantCard from "../../plants/PlantCard";
import ViewAllCard from "./ViewAllCard";

const SavedPlantsStrip = ({ plants, totalCount, newestId }) => {
	return (
		<div className='bg-surface px-10 py-8  rounded-2xl border border-[rgba(180,200,140,0.3)] backdrop-blur-sm mx-auto'>
			{/* Header row */}
			<div className='flex items-center justify-between mb-3 px-0.5'>
				<h3 className='font-rochester text-base font-bold text-textPrimary m-0'>
					Explore the Saved Plants Collection
				</h3>
			</div>

			{/* Scroll track */}
			<div className='flex gap-6 overflow-x-auto pb-1.5 scroll-smooth [scroll-snap-type:x_mandatory] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden'>
				{plants?.map((plant, i) => (
					<div
						key={plant._id}
						className='[animation:fadeSlideUp_0.4s_ease_forwards]'
						style={{ animationDelay: `${i * 50}ms` }}>
						<PlantCard plant={plant} isNew={plant._id === newestId} />
					</div>
				))}
				{/* View All card — always last */}
				{totalCount > 10 && <ViewAllCard total={totalCount} />}
			</div>
		</div>
	);
};

export default SavedPlantsStrip;
