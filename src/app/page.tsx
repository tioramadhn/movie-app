import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import {
	getCategoryHref,
	MOVIE_CATALOG,
	MovieList,
	MovieSection,
	movieListQueryOptions,
} from "@/features/movie";
import { serverMovieFetcher } from "@/features/movie/movie.service";
import { getQueryClient } from "@/lib/query-client";

export const revalidate = 3600;

export default function Home() {
	const queryClient = getQueryClient();

	for (const catalog of MOVIE_CATALOG) {
		queryClient
			.query(movieListQueryOptions(catalog.key, serverMovieFetcher))
			.catch(() => {});
	}

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<div className="space-y-6">
				{MOVIE_CATALOG.map((catalog) => (
					<MovieSection
						key={catalog.key}
						title={catalog.title}
						loadMoreHref={getCategoryHref(catalog.key)}
					>
						<MovieList category={catalog.key} />
					</MovieSection>
				))}
			</div>
		</HydrationBoundary>
	);
}
