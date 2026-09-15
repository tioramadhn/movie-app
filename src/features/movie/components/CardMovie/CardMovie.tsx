import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import type { Movie } from "../../schema";

interface CardMovieProps extends Movie {}

export function CardMovie({ title, poster, releaseYear }: CardMovieProps) {
	return (
		<Card className="relative mx-auto w-full max-w-sm pt-0">
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
	);
}
