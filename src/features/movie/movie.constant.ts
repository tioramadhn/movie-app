import {
	getMovieNowPlayingList,
	getMoviePopularList,
	getMovieTopRatedList,
	getMovieUpcomingList,
} from "./movie.service";
import type { MovieCatalog, MovieCategory, MoviePage } from "./movie.types";

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

export const MOVIE_LIST_FETCHER: Record<
	MovieCategory,
	(page: number) => Promise<MoviePage>
> = {
	"now-playing": getMovieNowPlayingList,
	popular: getMoviePopularList,
	"top-rated": getMovieTopRatedList,
	upcoming: getMovieUpcomingList,
};
