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
				className="relative z-20 aspect-auto w-full object-cover"
			/>
			<CardHeader className="px-4 space-y-2">
				<CardTitle className="font-semibold">{title}</CardTitle>
				{releaseYear && (
					<Badge className="text-xs" variant={"secondary"}>
						{releaseYear}
					</Badge>
				)}
			</CardHeader>
		</Card>
	);
}
