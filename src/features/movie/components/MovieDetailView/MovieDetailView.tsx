import { Clock, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { MovieDetail } from "../../schema";

const formatRuntime = (minutes: number) => {
	const hours = Math.floor(minutes / 60);
	const remainingMinutes = minutes % 60;
	return hours > 0 ? `${hours}h ${remainingMinutes}m` : `${remainingMinutes}m`;
};

export function MovieDetailView({ movie }: { movie: MovieDetail }) {
	return (
		<article className="flex flex-col gap-6 border rounded-2xl p-4 sm:p-8 md:flex-row md:gap-10">
			<img
				src={movie.poster ?? undefined}
				alt={`poster of ${movie.title}`}
				fetchPriority="high"
				className="aspect-2/3 w-full max-w-xs self-center rounded-xl bg-muted object-cover md:w-72 md:shrink-0 md:self-start"
			/>

			<div className="flex min-w-0 flex-1 flex-col gap-6">
				<header className="flex flex-col gap-3">
					<h1 className="text-2xl font-bold sm:text-3xl">{movie.title}</h1>
					{movie.tagline && (
						<p className="italic text-muted-foreground">{movie.tagline}</p>
					)}
					<div className="flex flex-wrap items-center gap-2">
						{movie.releaseYear && (
							<Badge variant="secondary">{movie.releaseYear}</Badge>
						)}
						{movie.runtime !== null && (
							<Badge variant="outline">
								<Clock />
								{formatRuntime(movie.runtime)}
							</Badge>
						)}
						{movie.rating > 0 && (
							<Badge variant="outline">
								<Star />
								{movie.rating.toFixed(1)}
							</Badge>
						)}
						{movie.genres.map((genre) => (
							<Badge key={genre} variant="outline">
								{genre}
							</Badge>
						))}
					</div>
				</header>

				<section className="flex flex-col gap-2">
					<h2 className="text-lg font-semibold">Synopsis</h2>
					<p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
						{movie.synopsis || "No synopsis available."}
					</p>
				</section>

				<section className="flex flex-col gap-2">
					<h2 className="text-lg font-semibold">Director</h2>
					<p className="text-sm sm:text-base">
						{movie.director.length > 0 ? movie.director.join(", ") : "Unknown"}
					</p>
				</section>

				<section className="flex flex-col gap-3">
					<h2 className="text-lg font-semibold">Main Cast</h2>
					{movie.mainCast.length > 0 ? (
						<ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
							{movie.mainCast.map((member) => (
								<li
									key={member.creditId}
									className="flex flex-col items-center gap-2 text-center"
								>
									<img
										src={member.profile ?? undefined}
										alt=""
										loading="lazy"
										className="aspect-square w-20 rounded-full bg-muted object-cover"
									/>
									<div className="flex flex-col">
										<span className="text-sm font-medium">{member.name}</span>
										{member.character && (
											<span className="text-xs text-muted-foreground">
												{member.character}
											</span>
										)}
									</div>
								</li>
							))}
						</ul>
					) : (
						<p className="text-sm text-muted-foreground">
							No cast information available.
						</p>
					)}
				</section>
			</div>
		</article>
	);
}
