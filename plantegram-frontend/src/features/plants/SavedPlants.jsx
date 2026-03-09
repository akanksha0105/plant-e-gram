import { useCallback } from "react";
import { useInfiniteScroll } from "./useInfiniteScroll";
import { ScrollSentinel } from "./ScrollSentinel";

import { getSavedPlants } from "./savedPlantsSlice";
import { useDispatch } from "react-redux";
import PlantCard from "./PlantCard";

const SavedPlantsPage = () => {
	const dispatch = useDispatch();

	const stableFetch = useCallback(
		async (page, limit) => {
			const result = await dispatch(getSavedPlants({ page, limit })).unwrap();

			return result;
		},
		[dispatch],
	);
	const {
		items: plants,
		hasMore,
		loading,
		error,
		total,
		loadMore,
	} = useInfiniteScroll(stableFetch, {
		limit: 10,
	});

	return (
		<div className='min-h-screen bg-stone-50 px-4 py-10 sm:px-8'>
			{error && (
				<div
					className='mb-6 flex items-center justify-between rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-red-700'
					role='alert'>
					<p className='text-sm font-medium'>Something went wrong: {error}</p>
					<button
						onClick={loadMore}
						className='ml-4 rounded-lg bg-red-100 px-3 py-1.5 text-sm font-semibold text-red-700 transition hover:bg-red-200'>
						Retry
					</button>
				</div>
			)}

			{/* Empty State */}
			{!loading && !error && plants?.length === 0 && (
				<div className='flex flex-col items-center justify-center py-24 text-center'>
					<span className='mb-4 text-5xl'>🌱</span>
					<p className='text-lg font-medium text-stone-500'>
						You haven't saved any plants yet.
					</p>
					<p className='mt-1 text-sm text-stone-400'>
						Start exploring and save plants you love!
					</p>
				</div>
			)}

			{/* Plant Grid */}
			<ul
				className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
				aria-label='Saved plants'>
				{plants.map((plant) => (
					<PlantCard key={plant._id} plant={plant} />
				))}
			</ul>

			<ScrollSentinel onIntersect={loadMore} enabled={hasMore && !loading} />

			{loading && (
				<div
					className='mt-10 flex items-center justify-center gap-3 text-stone-500'
					aria-live='polite'
					aria-label='Loading more plants'>
					<span className='inline-block h-5 w-5 animate-spin rounded-full border-2 border-stone-300 border-t-green-600' />
					<span className='text-sm font-medium'>Loading...</span>
				</div>
			)}

			{!hasMore && plants.length > 0 && (
				<p className='mt-12 text-center text-sm text-stone-400'>
					You've seen all your saved plants 🌿
				</p>
			)}
		</div>
	);
};

export default SavedPlantsPage;
