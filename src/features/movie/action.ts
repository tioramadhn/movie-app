import { IMAGE_BASE_URL, MOVIE, TMDB_MAX_PAGE } from "@/config/movie";
import { apiManager } from "@/lib/api";
import { buildPath } from "@/lib/utils";
import type {
	TMDBCreditsResponse,
	TMDBMovie,
	TMDBMovieDetailResponse,
	TMDBMovieListResponse,
} from "@/types/movie";
import type { Movie, MovieDetail, MoviePage } from "./schema";

const toMovie = (
	item: Pick<TMDBMovie, "id" | "title" | "release_date" | "poster_path">,
): Movie => ({
	id: item.id,
	title: item.title,
	releaseYear: item.release_date?.slice(0, 4) || null,
	poster: item.poster_path ? `${IMAGE_BASE_URL}${item.poster_path}` : null,
});

const toMoviePage = (data: TMDBMovieListResponse): MoviePage => ({
	movies: data.results.map(toMovie),
	page: data.page,
	totalPages: Math.min(data.total_pages, TMDB_MAX_PAGE),
});

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
	movieId: string,
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
		director: credit.crew
			.filter((item) => item.job === "Director")
			.map((item) => item.name),
		mainCast: credit.cast.map((item) => item.name),
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
