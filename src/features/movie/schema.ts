export interface MovieCatalog {
	title: string;
	handler: () => Promise<Movie[]>;
}

export type Movie = {
	poster: string | null;
	title: string;
	releaseYear: string;
};

export type MovieDetail = Movie & {
	synopsis: string;
	mainCast: string[];
	director: string[];
};
