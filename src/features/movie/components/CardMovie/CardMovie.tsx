import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { getMovieHref } from "../../constant";
import type { Movie } from "../../schema";

interface CardMovieProps extends Movie {}

export function CardMovie({ id, title, poster, releaseYear }: CardMovieProps) {
	return (
		<Link
			href={getMovieHref(id)}
			className="group mx-auto block w-full max-w-sm rounded-xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
		>
			<Card className="relative h-full w-full pt-0 transition-shadow group-hover:shadow-md">
				<img
					src={poster ?? undefined}
					alt={`poster of ${title}`}
					loading="lazy"
					className="relative z-20 aspect-2/3 w-full bg-muted object-cover"
				/>
				<CardHeader className="px-3 space-y-2 sm:px-4">
					<CardTitle className="text-sm font-semibold sm:text-base">
						{title}
					</CardTitle>
					{releaseYear && (
						<Badge className="text-xs" variant={"secondary"}>
							{releaseYear}
						</Badge>
					)}
				</CardHeader>
			</Card>
		</Link>
	);
}
