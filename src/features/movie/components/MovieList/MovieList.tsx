"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { movieListQueryOptions } from "../../movie.query";
import { MovieGrid } from "../MovieGrid";
import type { MovieListProps } from "./MovieList.types";

export function MovieList({ category }: MovieListProps) {
	const { data } = useSuspenseQuery(movieListQueryOptions(category));

	return <MovieGrid movies={data.movies} />;
}
