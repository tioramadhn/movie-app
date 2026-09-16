import { SKELETON_COUNT } from "./MovieGridSkeleton.constant";

export function MovieGridSkeleton() {
	return (
		<div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5">
			{Array.from({ length: SKELETON_COUNT }, (_, idx) => (
				<div
					key={`movie-skeleton-${idx}`}
					className="aspect-2/3 w-full animate-pulse rounded-xl bg-muted"
				/>
			))}
		</div>
	);
}
