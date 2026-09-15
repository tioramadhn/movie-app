import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import {
	getMovieNowPlayingList,
	getMoviePopularList,
	getMovieSearch,
	getMovieTopRatedList,
	getMovieUpcomingList,
} from "./action";
import type { MovieCategory, MoviePage } from "./schema";

const MOVIE_LIST_FETCHER: Record<
	MovieCategory,
	(page: number) => Promise<MoviePage>
> = {
	"now-playing": getMovieNowPlayingList,
	popular: getMoviePopularList,
	"top-rated": getMovieTopRatedList,
	upcoming: getMovieUpcomingList,
};

const getNextPageParam = (lastPage: MoviePage) =>
	lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined;

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
