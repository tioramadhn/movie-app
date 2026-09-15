"use client";

import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { movieListInfiniteQueryOptions } from "../../query";
import type { MovieCategory } from "../../schema";
import { InfiniteMovieGrid } from "../InfiniteMovieGrid/InfiniteMovieGrid";

export function CategoryMovieList({ category }: { category: MovieCategory }) {
	const query = useSuspenseInfiniteQuery(
		movieListInfiniteQueryOptions(category),
	);

	return <InfiniteMovieGrid query={query} />;
}
