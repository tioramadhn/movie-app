import {
	IMAGE_BASE_URL,
	PROFILE_IMAGE_BASE_URL,
	TMDB_MAX_PAGE,
} from "@/config/movie";
import type {
	TMDBCreditsResponse,
	TMDBMovie,
	TMDBMovieListResponse,
} from "@/types/movie";
import { MAIN_CAST_LIMIT } from "./movie.constant";
import type {
	Movie,
	MovieCastMember,
	MovieCategory,
	MoviePage,
} from "./movie.types";

export const getCategoryHref = (category: MovieCategory) =>
	`/category/${category}`;

export const getMovieHref = (id: number) => `/movie/${id}`;

export const toMovie = (
	item: Pick<TMDBMovie, "id" | "title" | "release_date" | "poster_path">,
): Movie => ({
	id: item.id,
	title: item.title,
	releaseYear: item.release_date?.slice(0, 4) || null,
	poster: item.poster_path ? `${IMAGE_BASE_URL}${item.poster_path}` : null,
});

export const toMoviePage = (data: TMDBMovieListResponse): MoviePage => ({
	movies: data.results.map(toMovie),
	page: data.page,
	totalPages: Math.min(data.total_pages, TMDB_MAX_PAGE),
});

export const toMainCast = (
	cast: TMDBCreditsResponse["cast"],
): MovieCastMember[] =>
	[...cast]
		.sort((a, b) => a.order - b.order)
		.slice(0, MAIN_CAST_LIMIT)
		.map((member) => ({
			creditId: member.credit_id,
			name: member.name,
			character: member.character,
			profile: member.profile_path
				? `${PROFILE_IMAGE_BASE_URL}${member.profile_path}`
				: null,
		}));

export const getNextPageParam = (lastPage: MoviePage) =>
	lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined;
