import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import {
	CategoryMovieList,
	MOVIE_CATALOG,
	MovieSection,
	movieListInfiniteQueryOptions,
} from "@/features/movie";
import { serverMovieFetcher } from "@/features/movie/movie.service";
import { getQueryClient } from "@/lib/query-client";

export const revalidate = 3600;

export const dynamicParams = false;

export function generateStaticParams() {
	return MOVIE_CATALOG.map((catalog) => ({ category: catalog.key }));
}

export default async function CategoryPage({
	params,
}: PageProps<"/category/[category]">) {
	const { category } = await params;
	const catalog = MOVIE_CATALOG.find((item) => item.key === category);

	if (!catalog) {
		notFound();
	}

	const queryClient = getQueryClient();
	queryClient
		.infiniteQuery(
			movieListInfiniteQueryOptions(catalog.key, serverMovieFetcher),
		)
		.catch((error) => {
			console.error(`Failed to prefetch "${catalog.key}" movies`, error);
		});

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<MovieSection title={catalog.title}>
				<CategoryMovieList category={catalog.key} />
			</MovieSection>
		</HydrationBoundary>
	);
}
