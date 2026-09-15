"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { movieSearchQueryOptions } from "../../query";
import { MovieGrid } from "../MovieGrid/MovieGrid";

export function SearchResults({ query }: { query: string }) {
	const { data: movies } = useSuspenseQuery(movieSearchQueryOptions(query));

	return (
		<MovieGrid
			movies={movies}
			emptyMessage={`No movies found for "${query}".`}
		/>
	);
}
