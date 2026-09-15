import { CardMovie } from "@/features/movie/components/CardMovie/CardMovie";
import { MOVIE_CATALOG } from "@/features/movie/constant";

export default function Home() {
	return (
		<div className="space-y-6">
			{MOVIE_CATALOG.map((item, index) => (
				<div
					key={`movie-catalog-${index}`}
					className="flex flex-col gap-4 border rounded-2xl p-8"
				>
					<h1 className="font-semibold text-2xl">{item.title}</h1>
					<div className="grid grid-cols-5 gap-4">
						{[...new Array(10)].map((_item, idx) => (
							<CardMovie key={idx} />
						))}
					</div>
				</div>
			))}
		</div>
	);
}
