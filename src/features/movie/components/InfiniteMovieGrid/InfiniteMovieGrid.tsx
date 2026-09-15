"use client";

import type {
	InfiniteData,
	UseSuspenseInfiniteQueryResult,
} from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import type { Movie, MoviePage } from "../../schema";
import { MovieGrid } from "../MovieGrid/MovieGrid";
import { MovieGridSkeleton } from "../MovieGridSkeleton/MovieGridSkeleton";

const AUTO_LOAD_ROOT_MARGIN = "0px 0px 600px 0px";

interface InfiniteMovieGridProps {
	query: UseSuspenseInfiniteQueryResult<InfiniteData<MoviePage>>;
	emptyMessage?: string;
}

const getUniqueMovies = (pages: MoviePage[]): Movie[] => {
	const seenIds = new Set<number>();

	return pages
		.flatMap((page) => page.movies)
		.filter((movie) => {
			if (seenIds.has(movie.id)) return false;
			seenIds.add(movie.id);
			return true;
		});
};

const getLoadMoreLabel = (isLoading: boolean, hasError: boolean) => {
	if (isLoading) return "Loading more movies...";
	if (hasError) return "Try again";
	return "Load more movies";
};

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
