import type { Movie, MoviePage } from "../../movie.types";

export const getUniqueMovies = (pages: MoviePage[]): Movie[] => {
	const seenIds = new Set<number>();

	return pages
		.flatMap((page) => page.movies)
		.filter((movie) => {
			if (seenIds.has(movie.id)) return false;
			seenIds.add(movie.id);
			return true;
		});
};

export const getLoadMoreLabel = (isLoading: boolean, hasError: boolean) => {
	if (isLoading) return "Loading more movies...";
	if (hasError) return "Try again";
	return "Load more movies";
};
