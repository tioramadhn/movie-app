export const API_BASE_URL = "https://api.themoviedb.org/3";
export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export enum MOVIE {
	NOW_PLAYING = "/movie/now_playing",
	POPULAR = "/movie/popular",
	TOP_RATED = "/movie/top_rated",
	UPCOMING = "/movie/upcoming",
	DETAILS = "/movie/{movie_id}",
	SEARCH = "/search/movie",
	CREDITS = "/movie/{movie_id}/credits",
}
