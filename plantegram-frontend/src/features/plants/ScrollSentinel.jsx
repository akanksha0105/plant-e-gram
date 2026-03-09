import { useEffect, useRef } from "react";

export function ScrollSentinel({ onIntersect, enabled = true }) {
	const sentinelRef = useRef(null);

	useEffect(() => {
		const el = sentinelRef.current;
		if (!el || !enabled) return;

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					onIntersect();
				}
			},
			{
				rootMargin: "0px 0px 200px 0px",
				threshold: 0,
			},
		);

		observer.observe(el);
		return () => observer.disconnect();
	}, [onIntersect, enabled]);

	return <div ref={sentinelRef} aria-hidden='true' style={{ height: 1 }} />;
}
