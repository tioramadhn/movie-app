import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { type ReactNode, Suspense } from "react";
import { buttonVariants } from "@/components/ui/button";
import { MovieGridSkeleton } from "../MovieGridSkeleton/MovieGridSkeleton";
import { MovieListErrorBoundary } from "../MovieListError/MovieListError";

interface MovieSectionProps {
	title: string;
	children: ReactNode;
	loadMoreHref?: string;
}

export function MovieSection({
	title,
	children,
	loadMoreHref,
}: MovieSectionProps) {
	return (
		<section className="flex flex-col gap-4 border rounded-2xl p-8">
			<div className="flex justify-between items-center">
				<h1 className="font-semibold text-2xl">{title}</h1>
				{loadMoreHref && (
					<div className="flex justify-center pt-4">
						<Link
							href={loadMoreHref}
							className={buttonVariants({ variant: "outline" })}
						>
							<span className="flex items-center gap-2">
								Load more <ChevronRight />
							</span>
						</Link>
					</div>
				)}
			</div>
			<MovieListErrorBoundary>
				<Suspense fallback={<MovieGridSkeleton />}>{children}</Suspense>
			</MovieListErrorBoundary>
		</section>
	);
}
