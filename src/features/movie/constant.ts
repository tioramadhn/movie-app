import {
	getMovieNowPlayingList,
	getMoviePopularList,
	getMovieTopRatedList,
	getMovieUpcomingList,
} from "./action";
import type { MovieCatalog } from "./schema";

export const MOVIE_CATALOG: MovieCatalog[] = [
	{
		title: "Now Playing",
		handler: getMovieNowPlayingList,
	},
	{
		title: "Popular",
		handler: getMoviePopularList,
	},
	{
		title: "Top Rated",
		handler: getMovieTopRatedList,
	},
	{
		title: "Upcoming",
		handler: getMovieUpcomingList,
	},
];
