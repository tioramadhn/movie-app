export default function MovieDetailLoading() {
	return (
		<div
			role="status"
			className="flex flex-col gap-6 border rounded-2xl p-4 sm:p-8 md:flex-row md:gap-10"
		>
			<span className="sr-only">Loading movie details</span>
			<div className="aspect-2/3 w-full max-w-xs self-center animate-pulse rounded-xl bg-muted md:w-72 md:shrink-0 md:self-start" />
			<div className="flex flex-1 flex-col gap-4">
				<div className="h-8 w-2/3 animate-pulse rounded-md bg-muted" />
				<div className="h-6 w-1/3 animate-pulse rounded-md bg-muted" />
				<div className="h-28 w-full animate-pulse rounded-md bg-muted" />
				<div className="h-6 w-1/2 animate-pulse rounded-md bg-muted" />
				<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
					{Array.from({ length: 5 }, (_, idx) => (
						<div
							key={`cast-skeleton-${idx}`}
							className="mx-auto aspect-square w-20 animate-pulse rounded-full bg-muted"
						/>
					))}
				</div>
			</div>
		</div>
	);
}
