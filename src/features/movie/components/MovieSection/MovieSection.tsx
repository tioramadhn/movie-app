import { type ReactNode, Suspense } from "react";
import { MovieGridSkeleton } from "../MovieGridSkeleton/MovieGridSkeleton";
import { MovieListErrorBoundary } from "../MovieListError/MovieListError";

interface MovieSectionProps {
	title: string;
	children: ReactNode;
}

export function MovieSection({ title, children }: MovieSectionProps) {
	return (
		<section className="flex flex-col gap-4 border rounded-2xl p-8">
			<h1 className="font-semibold text-2xl">{title}</h1>
			<MovieListErrorBoundary>
				<Suspense fallback={<MovieGridSkeleton />}>{children}</Suspense>
			</MovieListErrorBoundary>
		</section>
	);
}
