import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { MovieGridSkeleton } from "@/features/movie/components/MovieGridSkeleton/MovieGridSkeleton";
import { MovieListErrorBoundary } from "@/features/movie/components/MovieListError/MovieListError";
import { SearchResults } from "@/features/movie/components/SearchResults/SearchResults";
import { movieSearchQueryOptions } from "@/features/movie/query";
import { searchMovieSchema } from "@/features/movie/schema";
import { getQueryClient } from "@/lib/query-client";

function SearchMessage({ title, message }: { title: string; message: string }) {
	return (
		<section className="flex flex-col gap-4 border rounded-2xl p-8">
			<h1 className="font-semibold text-2xl">{title}</h1>
			<p className="text-sm text-muted-foreground">{message}</p>
		</section>
	);
}

export default async function SearchPage({
	searchParams,
}: PageProps<"/search">) {
	const { q } = await searchParams;

	if (q === undefined) {
		return (
			<SearchMessage
				title="Search movies"
				message="Type a movie title in the search bar to find movies."
			/>
		);
	}

	const result = searchMovieSchema.safeParse({ query: q });

	if (!result.success) {
		return (
			<SearchMessage
				title="Invalid search"
				message={result.error.issues[0]?.message ?? "Invalid search query."}
			/>
		);
	}

	const { query } = result.data;
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
