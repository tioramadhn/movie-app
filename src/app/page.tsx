import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { MovieSection } from "@/features/movie/components/MovieSection/MovieSection";
import { MOVIE_CATALOG } from "@/features/movie/constant";
import { movieListQueryOptions } from "@/features/movie/query";
import { getQueryClient } from "@/lib/query-client";

export const revalidate = 3600;

export default function Home() {
	const queryClient = getQueryClient();

	for (const catalog of MOVIE_CATALOG) {
		queryClient.query(movieListQueryOptions(catalog.key)).catch(() => {});
	}

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<div className="space-y-6">
				{MOVIE_CATALOG.map((catalog) => (
					<MovieSection
						key={catalog.key}
						title={catalog.title}
						category={catalog.key}
					/>
				))}
			</div>
		</HydrationBoundary>
	);
}
