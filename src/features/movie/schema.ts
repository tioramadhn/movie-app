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

export type MovieCastMember = {
	creditId: string;
	name: string;
	character: string;
	profile: string | null;
};

export type MovieDetail = Movie & {
	synopsis: string;
	tagline: string | null;
	genres: string[];
	runtime: number | null;
	rating: number;
	mainCast: MovieCastMember[];
	director: string[];
};

export const movieIdSchema = z.coerce.number().int().positive();

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
