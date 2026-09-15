import { Suspense } from "react";
import type { MovieCategory } from "../../schema";
import { MovieGridSkeleton } from "../MovieGridSkeleton/MovieGridSkeleton";
import { MovieList } from "../MovieList/MovieList";
import { MovieListErrorBoundary } from "../MovieListError/MovieListError";

interface MovieSectionProps {
	title: string;
	category: MovieCategory;
}

export function MovieSection({ title, category }: MovieSectionProps) {
	return (
		<section className="flex flex-col gap-4 border rounded-2xl p-8">
			<h1 className="font-semibold text-2xl">{title}</h1>
			<MovieListErrorBoundary>
				<Suspense fallback={<MovieGridSkeleton />}>
					<MovieList category={category} />
				</Suspense>
			</MovieListErrorBoundary>
		</section>
	);
}
