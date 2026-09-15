import { IMAGE_BASE_URL, MOVIE } from "@/config/movie";
import { apiManager } from "@/lib/api";
import { buildPath } from "@/lib/utils";
import type {
	TMDBCreditsResponse,
	TMDBMovie,
	TMDBMovieDetailResponse,
	TMDBMovieListResponse,
} from "@/types/movie";
import type { Movie, MovieDetail } from "./schema";

const toMovie = (
	item: Pick<TMDBMovie, "id" | "title" | "release_date" | "poster_path">,
): Movie => ({
	id: item.id,
	title: item.title,
	releaseYear: item.release_date.slice(0, 4),
	poster: item.poster_path ? `${IMAGE_BASE_URL}${item.poster_path}` : null,
});

const getMovieList = async (path: MOVIE): Promise<Movie[]> => {
	const res = await apiManager.get<TMDBMovieListResponse>(path);
	return res.data.results.map(toMovie);
};

export const getMovieNowPlayingList = () => getMovieList(MOVIE.NOW_PLAYING);

export const getMovieTopRatedList = () => getMovieList(MOVIE.TOP_RATED);

export const getMoviePopularList = () => getMovieList(MOVIE.POPULAR);

export const getMovieUpcomingList = () => getMovieList(MOVIE.UPCOMING);

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

export const getMovieSearch = async (query: string): Promise<Movie[]> => {
	const res = await apiManager.get<TMDBMovieListResponse>(MOVIE.SEARCH, {
		params: {
			query,
		},
	});
	return res.data.results.map(toMovie);
};
