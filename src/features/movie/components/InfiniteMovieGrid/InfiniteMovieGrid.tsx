"use client";

import { LoaderCircle } from "lucide-react";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { MovieGrid } from "../MovieGrid";
import { MovieGridSkeleton } from "../MovieGridSkeleton";
import { AUTO_LOAD_ROOT_MARGIN } from "./InfiniteMovieGrid.constant";
import type { InfiniteMovieGridProps } from "./InfiniteMovieGrid.types";
import { getLoadMoreLabel, getUniqueMovies } from "./InfiniteMovieGrid.utils";

export function InfiniteMovieGrid({
	query,
	emptyMessage,
}: InfiniteMovieGridProps) {
	const {
		data,
		hasNextPage,
		isFetching,
		isFetchingNextPage,
		isFetchNextPageError,
		fetchNextPage,
	} = query;
	const loadMoreRef = useRef<HTMLDivElement>(null);
	const movies = getUniqueMovies(data.pages);
	const canAutoLoad = hasNextPage && !isFetching && !isFetchNextPageError;

	useEffect(() => {
		const loadMoreElement = loadMoreRef.current;
		if (!loadMoreElement || !canAutoLoad) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry?.isIntersecting) fetchNextPage({ cancelRefetch: false });
			},
			{ rootMargin: AUTO_LOAD_ROOT_MARGIN },
		);
		observer.observe(loadMoreElement);

		return () => observer.disconnect();
	}, [canAutoLoad, fetchNextPage]);

	if (movies.length === 0) {
		return <MovieGrid movies={movies} emptyMessage={emptyMessage} />;
	}

	return (
		<div className="flex flex-col gap-4">
			<MovieGrid movies={movies} />
			{isFetchingNextPage && <MovieGridSkeleton />}
			<div
				ref={loadMoreRef}
				className="flex flex-col items-center gap-2 pt-4 [overflow-anchor:none]"
			>
				{isFetchNextPageError && (
					<p role="alert" className="text-sm text-destructive">
						Failed to load more movies.
					</p>
				)}
				{hasNextPage ? (
					<Button
						variant="outline"
						onClick={() => fetchNextPage({ cancelRefetch: false })}
						disabled={isFetchingNextPage}
					>
						{isFetchingNextPage && <LoaderCircle className="animate-spin" />}
						{getLoadMoreLabel(isFetchingNextPage, isFetchNextPageError)}
					</Button>
				) : (
					<p className="text-sm text-muted-foreground">
						You have reached the end of the list.
					</p>
				)}
			</div>
		</div>
	);
}
