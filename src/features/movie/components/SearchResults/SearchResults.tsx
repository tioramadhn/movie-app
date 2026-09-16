"use client";

import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { movieSearchInfiniteQueryOptions } from "../../movie.query";
import { InfiniteMovieGrid } from "../InfiniteMovieGrid";
import type { SearchResultsProps } from "./SearchResults.types";

export function SearchResults({ query }: SearchResultsProps) {
	const searchQuery = useSuspenseInfiniteQuery(
		movieSearchInfiniteQueryOptions(query),
	);

	return (
		<InfiniteMovieGrid
			query={searchQuery}
			emptyMessage={`No movies found for "${query}".`}
		/>
	);
}
