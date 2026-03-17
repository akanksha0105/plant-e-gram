import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import ImageUploader from "../components/ImageUploader";
import savedplantsImage from "../../../assets/totalSavedPlants.png";

import SavedPlantsStrip from "../components/SavedPlantsStrip";
import DoubleCard from "../../../shared/components/DoubleCard";
import { useNavigate } from "react-router-dom";
import { getGardenBoard } from "../gardenBoardSlice";

const GardenBoard = () => {
	const {
		lastIdentifiedPlant,
		savedPlantsSubset,
		totalSavedPlantsCount,
		gardenBoardLoading,
	} = useSelector((state) => state.gardenBoard);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	console.log("data in garden board", lastIdentifiedPlant);
	useEffect(() => {
		dispatch(getGardenBoard());
	}, []);

	if (gardenBoardLoading) return <div>Loading</div>;
	return (
		<div className='flex flex-col gap-8 h-full overflow-auto'>
			<div className='flex lg:flex-row gap-6 items-stretch'>
				<div className='flex-[3]'>
					<ImageUploader />
				</div>
				<div className='flex-[1] flex flex-col gap-4'>
					{lastIdentifiedPlant && (
						<div className='self-start w-full'>
							<DoubleCard
								image={lastIdentifiedPlant?.image}
								header={lastIdentifiedPlant?.scientificName}
								underlyingHeader={"Last Identified Plant"}
								onClick={() => navigate(`/plants/${lastIdentifiedPlant._id}`)}
							/>
						</div>
					)}

					<div className='self-start w-full'>
						<DoubleCard
							image={savedplantsImage}
							underlyingHeader={"Total Saved Plants"}
							description={totalSavedPlantsCount}
						/>
					</div>
				</div>
			</div>

			{totalSavedPlantsCount > 0 && (
				<div className='w-full'>
					<SavedPlantsStrip
						plants={savedPlantsSubset}
						totalCount={totalSavedPlantsCount}
						newestId={lastIdentifiedPlant?._id}
					/>
				</div>
			)}
		</div>
	);
};

export default GardenBoard;
