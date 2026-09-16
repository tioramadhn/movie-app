"use client";

import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { movieListInfiniteQueryOptions } from "../../movie.query";
import { InfiniteMovieGrid } from "../InfiniteMovieGrid";
import type { CategoryMovieListProps } from "./CategoryMovieList.types";

export function CategoryMovieList({ category }: CategoryMovieListProps) {
	const query = useSuspenseInfiniteQuery(
		movieListInfiniteQueryOptions(category),
	);

	return <InfiniteMovieGrid query={query} />;
}
