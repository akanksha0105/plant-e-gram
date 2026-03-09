import { useState, useEffect, useRef, useCallback } from "react";

export function useInfiniteScroll(
	fetchFn,
	{ limit = 10, resetDeps = [] } = {},
) {
	const [items, setItems] = useState([]);
	const [hasMore, setHasMore] = useState(true);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [total, setTotal] = useState(0);

	const pageRef = useRef(1);
	const loadingRef = useRef(false);
	const hasMoreRef = useRef(true);

	const loadPage = useCallback(
		async (pageNum, replace = false) => {
			if (loadingRef.current) return;
			if (!replace && !hasMoreRef.current) return;

			loadingRef.current = true;
			setLoading(true);
			setError(null);

			try {
				const result = await fetchFn(pageNum, limit);

				setItems((prev) => (replace ? result.data : [...prev, ...result.data]));
				setHasMore(result.hasMore);
				setTotal(result.total);
				hasMoreRef.current = result.hasMore;
				pageRef.current = pageNum;
			} catch (err) {
				setError(err?.message ?? "Failed to load");
			} finally {
				loadingRef.current = false;
				setLoading(false);
			}
		},

		[fetchFn, limit],
	);

	
	useEffect(() => {
		pageRef.current = 1;
		hasMoreRef.current = true;
		setItems([]);
		setHasMore(true);
		setError(null);
		loadPage(1, true);
	
	}, [...resetDeps, loadPage]);

	
	const loadMore = useCallback(() => {
		if (!loadingRef.current && hasMoreRef.current) {
			loadPage(pageRef.current + 1);
		}
	}, [loadPage]);

	return { items, hasMore, loading, error, total, loadMore };
}
