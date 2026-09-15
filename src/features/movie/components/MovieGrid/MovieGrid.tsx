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
		<div className="grid grid-cols-5 gap-4">
			{movies.map((movie) => (
				<CardMovie key={movie.id} {...movie} />
			))}
		</div>
	);
}
