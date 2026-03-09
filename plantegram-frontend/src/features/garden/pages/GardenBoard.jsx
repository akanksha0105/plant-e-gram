import { useSelector } from "react-redux";

import ImageUploader from "../components/ImageUploader";
import savedplantsImage from "../../../assets/totalSavedPlants.png";

import SavedPlantsStrip from "../components/SavedPlantsStrip";
import DoubleCard from "../../../shared/components/DoubleCard";
import { useNavigate } from "react-router-dom";

const GardenBoard = () => {
	const { savedPlantsSubset, totalSavedCount } = useSelector(
		(state) => state.savedPlants,
	);
	const lastIdentifiedPlant = useSelector(
		(state) => state.plant.lastIdentifiedPlant,
	);
	const navigate = useNavigate();
	return (
		<div className='flex flex-col gap-8 h-full overflow-auto'>
			<div className='flex lg:flex-row gap-6 items-stretch'>
				<div className='flex-[3]'>
					<ImageUploader />
				</div>
				<div className='flex-[1] flex flex-col gap-4'>
					<div className='self-start w-full'>
						<DoubleCard
							image={lastIdentifiedPlant?.image}
							header={lastIdentifiedPlant?.scientificName}
							underlyingHeader={"Last Identified Plant"}
							onClick={() => navigate(`/plants/${lastIdentifiedPlant._id}`)}
						/>
					</div>
					<div className='self-start w-full'>
						<DoubleCard
							image={savedplantsImage}
							underlyingHeader={"Total Saved Plants"}
							description={totalSavedCount}
						/>
					</div>
				</div>
			</div>

			<div className='w-full'>
				<SavedPlantsStrip
					plants={savedPlantsSubset}
					totalCount={totalSavedCount}
					newestId={lastIdentifiedPlant?._id}
				/>
			</div>
		</div>
	);
};

export default GardenBoard;
