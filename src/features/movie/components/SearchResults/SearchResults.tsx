"use client";

import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { movieSearchInfiniteQueryOptions } from "../../query";
import { InfiniteMovieGrid } from "../InfiniteMovieGrid/InfiniteMovieGrid";

export function SearchResults({ query }: { query: string }) {
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
