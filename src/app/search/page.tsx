import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { MovieGridSkeleton } from "@/features/movie/components/MovieGridSkeleton/MovieGridSkeleton";
import { MovieListErrorBoundary } from "@/features/movie/components/MovieListError/MovieListError";
import { SearchResults } from "@/features/movie/components/SearchResults/SearchResults";
import { movieSearchQueryOptions } from "@/features/movie/query";
import { getQueryClient } from "@/lib/query-client";

export default async function SearchPage({
	searchParams,
}: PageProps<"/search">) {
	const { q } = await searchParams;
	const query = typeof q === "string" ? q.trim() : "";

	if (!query) {
		return (
			<section className="flex flex-col gap-4 border rounded-2xl p-8">
				<h1 className="font-semibold text-2xl">Search movies</h1>
				<p className="text-sm text-muted-foreground">
					Type a movie title in the search bar to find movies.
				</p>
			</section>
		);
	}

	const queryClient = getQueryClient();
	queryClient.query(movieSearchQueryOptions(query)).catch(() => {});

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<section className="flex flex-col gap-4 border rounded-2xl p-8">
				<h1 className="font-semibold text-2xl">{`Results for "${query}"`}</h1>
				<MovieListErrorBoundary key={query}>
					<Suspense fallback={<MovieGridSkeleton />}>
						<SearchResults query={query} />
					</Suspense>
				</MovieListErrorBoundary>
			</section>
		</HydrationBoundary>
	);
}
