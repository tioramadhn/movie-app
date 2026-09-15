import { z } from "zod";

export type MovieCategory =
	| "now-playing"
	| "popular"
	| "top-rated"
	| "upcoming";

export interface MovieCatalog {
	key: MovieCategory;
	title: string;
}

export type Movie = {
	id: number;
	poster: string | null;
	title: string;
	releaseYear: string | null;
};

export type MoviePage = {
	movies: Movie[];
	page: number;
	totalPages: number;
};

export type MovieDetail = Movie & {
	synopsis: string;
	mainCast: string[];
	director: string[];
};

export const SEARCH_QUERY_MAX_LENGTH = 100;

const SEARCH_QUERY_ALLOWED_PATTERN =
	/^[\p{L}\p{M}\p{N} .,:;'"!?&()/·*#$%+@-]+$/u;

export const searchMovieSchema = z.object({
	query: z
		.string({ error: "Please enter a movie title." })
		.trim()
		.min(1, "Please enter a movie title.")
		.max(
			SEARCH_QUERY_MAX_LENGTH,
			`Movie title must be at most ${SEARCH_QUERY_MAX_LENGTH} characters.`,
		)
		.regex(
			SEARCH_QUERY_ALLOWED_PATTERN,
			"Movie title contains characters that are not allowed.",
		),
});

export type SearchMovieFormValues = z.infer<typeof searchMovieSchema>;
