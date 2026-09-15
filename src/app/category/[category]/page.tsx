import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { MovieSection } from "@/features/movie/components/MovieSection/MovieSection";
import { MOVIE_CATALOG } from "@/features/movie/constant";
import { movieListQueryOptions } from "@/features/movie/query";
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
	queryClient.query(movieListQueryOptions(catalog.key)).catch(() => {});

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<MovieSection title={catalog.title} category={catalog.key} />
		</HydrationBoundary>
	);
}
