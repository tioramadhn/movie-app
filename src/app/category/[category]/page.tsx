import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { CategoryMovieList } from "@/features/movie/components/CategoryMovieList/CategoryMovieList";
import { MovieSection } from "@/features/movie/components/MovieSection/MovieSection";
import { MOVIE_CATALOG } from "@/features/movie/constant";
import { movieListInfiniteQueryOptions } from "@/features/movie/query";
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
		.infiniteQuery(movieListInfiniteQueryOptions(catalog.key))
		.catch(() => {});

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<MovieSection title={catalog.title}>
				<CategoryMovieList category={catalog.key} />
			</MovieSection>
		</HydrationBoundary>
	);
}
