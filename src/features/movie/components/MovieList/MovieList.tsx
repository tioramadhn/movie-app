"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { movieListQueryOptions } from "../../query";
import type { MovieCategory } from "../../schema";
import { MovieGrid } from "../MovieGrid/MovieGrid";

export function MovieList({ category }: { category: MovieCategory }) {
	const { data } = useSuspenseQuery(movieListQueryOptions(category));

	return <MovieGrid movies={data.movies} />;
}
