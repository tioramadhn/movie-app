import type { Movie } from "../../movie.types";

export interface MovieGridProps {
	movies: Movie[];
	emptyMessage?: string;
}
