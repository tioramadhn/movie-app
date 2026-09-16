import type {
	InfiniteData,
	UseSuspenseInfiniteQueryResult,
} from "@tanstack/react-query";
import type { MoviePage } from "../../movie.types";

export interface InfiniteMovieGridProps {
	query: UseSuspenseInfiniteQueryResult<InfiniteData<MoviePage>>;
	emptyMessage?: string;
}
