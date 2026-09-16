import { CardMovie } from "../CardMovie";
import { DEFAULT_EMPTY_MESSAGE } from "./MovieGrid.constant";
import type { MovieGridProps } from "./MovieGrid.types";

export function MovieGrid({
	movies,
	emptyMessage = DEFAULT_EMPTY_MESSAGE,
}: MovieGridProps) {
	if (movies.length === 0) {
		return <p className="text-sm text-muted-foreground">{emptyMessage}</p>;
	}

	return (
		<div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5">
			{movies.map((movie) => (
				<CardMovie key={movie.id} {...movie} />
			))}
		</div>
	);
}
