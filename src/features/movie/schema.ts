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
	releaseYear: string;
};

export type MovieDetail = Movie & {
	synopsis: string;
	mainCast: string[];
	director: string[];
};
