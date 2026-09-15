const SKELETON_COUNT = 10;

export function MovieGridSkeleton() {
	return (
		<div className="grid grid-cols-5 gap-4">
			{Array.from({ length: SKELETON_COUNT }, (_, idx) => (
				<div
					key={`movie-skeleton-${idx}`}
					className="aspect-video w-full animate-pulse rounded-xl bg-muted"
				/>
			))}
		</div>
	);
}
