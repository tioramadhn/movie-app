import { MOVIE } from "@/config/movie";
import { apiManager } from "@/lib/api";
import { buildPath } from "@/lib/utils";
import type {
	TMDBCreditsResponse,
	TMDBMovieDetailResponse,
	TMDBMovieListResponse,
} from "@/types/movie";
import type { Movie, MovieDetail } from "./schema";

export const getMovieNowPlayingList = async (): Promise<Movie[]> => {
	const res = await apiManager.get<TMDBMovieListResponse>(MOVIE.NOW_PLAYING);
	const movies: Movie[] = res.data.results.map((item) => ({
		title: item.title,
		releaseYear: item.release_date,
		poster: item.poster_path,
	}));
	return movies;
};

export const getMovieTopRatedList = async (): Promise<Movie[]> => {
	const res = await apiManager.get<TMDBMovieListResponse>(MOVIE.TOP_RATED);
	const movies: Movie[] = res.data.results.map((item) => ({
		title: item.title,
		releaseYear: item.release_date,
		poster: item.poster_path,
	}));
	return movies;
};

export const getMoviePopularList = async (): Promise<Movie[]> => {
	const res = await apiManager.get<TMDBMovieListResponse>(MOVIE.POPULAR);
	const movies: Movie[] = res.data.results.map((item) => ({
		title: item.title,
		releaseYear: item.release_date,
		poster: item.poster_path,
	}));
	return movies;
};

export const getMovieUpcomingList = async (): Promise<Movie[]> => {
	const res = await apiManager.get<TMDBMovieListResponse>(MOVIE.UPCOMING);
	const movies: Movie[] = res.data.results.map((item) => ({
		title: item.title,
		releaseYear: item.release_date,
		poster: item.poster_path,
	}));
	return movies;
};

export const getMovieDetails = async (
	movieId: string,
): Promise<MovieDetail> => {
	const { data: detail } = await apiManager.get<TMDBMovieDetailResponse>(
		buildPath(MOVIE.DETAILS, { movie_id: movieId }),
	);
	const { data: credit } = await apiManager.get<TMDBCreditsResponse>(
		buildPath(MOVIE.CREDITS, { movie_id: movieId }),
	);
	return {
		title: detail.title,
		poster: detail.poster_path,
		releaseYear: detail.release_date,
		synopsis: detail.overview,
		director:
			credit.crew
				.filter((item) => item.job === "Director")
				.map((item) => item.name) || [],
		mainCast: credit.cast.map((item) => item.name) || [],
	};
};

export const getMovieSearch = async (query: string): Promise<Movie[]> => {
	const res = await apiManager.get<TMDBMovieListResponse>(MOVIE.SEARCH, {
		params: {
			query,
		},
	});
	const movies: Movie[] = res.data.results.map((item) => ({
		title: item.title,
		releaseYear: item.release_date,
		poster: item.poster_path,
	}));
	return movies;
};
