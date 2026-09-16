import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import { clientMovieFetcher } from "./movie.api";
import type { MovieCategory, MovieFetcher } from "./movie.types";
import { getNextPageParam } from "./movie.utils";

export const movieListQueryOptions = (
	category: MovieCategory,
	fetcher: MovieFetcher = clientMovieFetcher,
) =>
	queryOptions({
		queryKey: ["movies", "list", category],
		queryFn: () => fetcher.list(category, 1),
	});

export const movieListInfiniteQueryOptions = (
	category: MovieCategory,
	fetcher: MovieFetcher = clientMovieFetcher,
) =>
	infiniteQueryOptions({
		queryKey: ["movies", "list", category, "infinite"],
		queryFn: ({ pageParam }) => fetcher.list(category, pageParam),
		initialPageParam: 1,
		getNextPageParam,
	});

export const movieSearchInfiniteQueryOptions = (
	query: string,
	fetcher: MovieFetcher = clientMovieFetcher,
) =>
	infiniteQueryOptions({
		queryKey: ["movies", "search", query],
		queryFn: ({ pageParam }) => fetcher.search(query, pageParam),
		initialPageParam: 1,
		getNextPageParam,
	});
