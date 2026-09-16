import type { MovieCatalog } from "./movie.types";

export const MAIN_CAST_LIMIT = 10;

export const SEARCH_QUERY_MAX_LENGTH = 100;

export const SEARCH_QUERY_ALLOWED_PATTERN =
	/^[\p{L}\p{M}\p{N} .,:;'"!?&()/·*#$%+@-]+$/u;

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
