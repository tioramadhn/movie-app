import { isAxiosError } from "axios";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import { getMovieDetails } from "@/features/movie/action";
import { MovieDetailView } from "@/features/movie/components/MovieDetailView/MovieDetailView";
import { movieIdSchema } from "@/features/movie/schema";

export const revalidate = 3600;

export function generateStaticParams() {
	return [];
}

const getMovieDetailsOrNotFound = cache(async (id: string) => {
	const result = movieIdSchema.safeParse(id);

	if (!result.success) {
		notFound();
	}

	try {
		return await getMovieDetails(result.data);
	} catch (error) {
		if (isAxiosError(error) && error.response?.status === 404) {
			notFound();
		}
		throw error;
	}
});

export async function generateMetadata({
	params,
}: PageProps<"/movie/[id]">): Promise<Metadata> {
	const { id } = await params;
	const movie = await getMovieDetailsOrNotFound(id);
	const title = movie.releaseYear
		? `${movie.title} (${movie.releaseYear}) | Movie App`
		: `${movie.title} | Movie App`;

	return {
		title,
		description: movie.synopsis || undefined,
	};
}

export default async function MoviePage({ params }: PageProps<"/movie/[id]">) {
	const { id } = await params;
	const movie = await getMovieDetailsOrNotFound(id);

	return <MovieDetailView movie={movie} />;
}
