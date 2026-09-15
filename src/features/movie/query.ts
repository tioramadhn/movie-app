import { queryOptions } from "@tanstack/react-query";
import {
	getMovieNowPlayingList,
	getMoviePopularList,
	getMovieSearch,
	getMovieTopRatedList,
	getMovieUpcomingList,
} from "./action";
import type { Movie, MovieCategory } from "./schema";

const MOVIE_LIST_FETCHER: Record<MovieCategory, () => Promise<Movie[]>> = {
	"now-playing": getMovieNowPlayingList,
	popular: getMoviePopularList,
	"top-rated": getMovieTopRatedList,
	upcoming: getMovieUpcomingList,
};

export const movieListQueryOptions = (category: MovieCategory) =>
	queryOptions({
		queryKey: ["movies", "list", category],
		queryFn: MOVIE_LIST_FETCHER[category],
	});

export const movieSearchQueryOptions = (query: string) =>
	queryOptions({
		queryKey: ["movies", "search", query],
		queryFn: () => getMovieSearch(query),
	});
