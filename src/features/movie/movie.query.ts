import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import {
	getMovieNowPlayingList,
	getMoviePopularList,
	getMovieSearch,
	getMovieTopRatedList,
	getMovieUpcomingList,
} from "./movie.service";
import type { MovieCategory, MoviePage } from "./movie.types";
import { getNextPageParam } from "./movie.utils";

export const MOVIE_LIST_FETCHER: Record<
	MovieCategory,
	(page: number) => Promise<MoviePage>
> = {
	"now-playing": getMovieNowPlayingList,
	popular: getMoviePopularList,
	"top-rated": getMovieTopRatedList,
	upcoming: getMovieUpcomingList,
};

export const movieListQueryOptions = (category: MovieCategory) =>
	queryOptions({
		queryKey: ["movies", "list", category],
		queryFn: () => MOVIE_LIST_FETCHER[category](1),
	});

export const movieListInfiniteQueryOptions = (category: MovieCategory) =>
	infiniteQueryOptions({
		queryKey: ["movies", "list", category, "infinite"],
		queryFn: ({ pageParam }) => MOVIE_LIST_FETCHER[category](pageParam),
		initialPageParam: 1,
		getNextPageParam,
	});

export const movieSearchInfiniteQueryOptions = (query: string) =>
	infiniteQueryOptions({
		queryKey: ["movies", "search", query],
		queryFn: ({ pageParam }) => getMovieSearch(query, pageParam),
		initialPageParam: 1,
		getNextPageParam,
	});
