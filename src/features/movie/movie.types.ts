import type { z } from "zod";
import type { searchMovieSchema } from "./movie.schema";

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

export type SearchMovieFormValues = z.infer<typeof searchMovieSchema>;
