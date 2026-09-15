import type { Movie } from "../../schema";
import { CardMovie } from "../CardMovie/CardMovie";

interface MovieGridProps {
	movies: Movie[];
	emptyMessage?: string;
}

export function MovieGrid({
	movies,
	emptyMessage = "No movies found.",
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
