import type { MovieCatalog, MovieCategory } from "./schema";

export const getCategoryHref = (category: MovieCategory) =>
	`/category/${category}`;

export const MOVIE_CATALOG: MovieCatalog[] = [
	{
		key: "now-playing",
		title: "Now Playing",
	},
	{
		key: "popular",
		title: "Popular",
	},
	{
		key: "top-rated",
		title: "Top Rated",
	},
	{
		key: "upcoming",
		title: "Upcoming",
	},
];
