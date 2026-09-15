import { Suspense } from "react";
import type { MovieCategory } from "../../schema";
import { MovieList } from "../MovieList/MovieList";
import { MovieListErrorBoundary } from "../MovieListError/MovieListError";

const SKELETON_COUNT = 10;

interface MovieSectionProps {
	title: string;
	category: MovieCategory;
}

export function MovieSection({ title, category }: MovieSectionProps) {
	return (
		<section className="flex flex-col gap-4 border rounded-2xl p-8">
			<h1 className="font-semibold text-2xl">{title}</h1>
			<MovieListErrorBoundary>
				<Suspense fallback={<MovieListSkeleton />}>
					<MovieList category={category} />
				</Suspense>
			</MovieListErrorBoundary>
		</section>
	);
}

function MovieListSkeleton() {
	return (
		<div className="grid grid-cols-5 gap-4">
			{Array.from({ length: SKELETON_COUNT }, (_, idx) => (
				<div
					key={`movie-skeleton-${idx}`}
					className="aspect-video w-full animate-pulse rounded-xl bg-muted"
				/>
			))}
		</div>
	);
}
