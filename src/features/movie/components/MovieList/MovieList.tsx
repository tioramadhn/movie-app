"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { movieListQueryOptions } from "../../query";
import type { MovieCategory } from "../../schema";
import { CardMovie } from "../CardMovie/CardMovie";

export function MovieList({ category }: { category: MovieCategory }) {
	const { data: movies } = useSuspenseQuery(movieListQueryOptions(category));

	if (movies.length === 0) {
		return <p className="text-sm text-muted-foreground">No movies found.</p>;
	}

	return (
		<div className="grid grid-cols-5 gap-4">
			{movies.map((movie) => (
				<CardMovie key={movie.id} {...movie} />
			))}
		</div>
	);
}
