import { MOVIE } from "@/config/movie";
import { apiManager } from "@/lib/api";
import { buildPath } from "@/lib/utils";
import type {
	TMDBCreditsResponse,
	TMDBMovieDetailResponse,
	TMDBMovieListResponse,
} from "@/types/movie";
import type { MovieDetail, MoviePage } from "./movie.types";
import { toMainCast, toMovie, toMoviePage } from "./movie.utils";

const getMovieList = async (path: MOVIE, page = 1): Promise<MoviePage> => {
	const res = await apiManager.get<TMDBMovieListResponse>(path, {
		params: { page },
	});
	return toMoviePage(res.data);
};

export const getMovieNowPlayingList = (page = 1) =>
	getMovieList(MOVIE.NOW_PLAYING, page);

export const getMovieTopRatedList = (page = 1) =>
	getMovieList(MOVIE.TOP_RATED, page);

export const getMoviePopularList = (page = 1) =>
	getMovieList(MOVIE.POPULAR, page);

export const getMovieUpcomingList = (page = 1) =>
	getMovieList(MOVIE.UPCOMING, page);

export const getMovieDetails = async (
	movieId: number,
): Promise<MovieDetail> => {
	const [{ data: detail }, { data: credit }] = await Promise.all([
		apiManager.get<TMDBMovieDetailResponse>(
			buildPath(MOVIE.DETAILS, { movie_id: movieId }),
		),
		apiManager.get<TMDBCreditsResponse>(
			buildPath(MOVIE.CREDITS, { movie_id: movieId }),
		),
	]);
	return {
		...toMovie(detail),
		synopsis: detail.overview,
		tagline: detail.tagline || null,
		genres: detail.genres.map((genre) => genre.name),
		runtime: detail.runtime || null,
		rating: detail.vote_average,
		director: [
			...new Set(
				credit.crew
					.filter((item) => item.job === "Director")
					.map((item) => item.name),
			),
		],
		mainCast: toMainCast(credit.cast),
	};
};

export const getMovieSearch = async (
	query: string,
	page = 1,
): Promise<MoviePage> => {
	const res = await apiManager.get<TMDBMovieListResponse>(MOVIE.SEARCH, {
		params: {
			query,
			page,
		},
	});
	return toMoviePage(res.data);
};
