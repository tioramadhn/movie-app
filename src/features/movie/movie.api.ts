import type { MovieFetcher, MoviePage } from "./movie.types";

const requestMoviePage = async (path: string): Promise<MoviePage> => {
	const res = await fetch(path);

	if (!res.ok) {
		throw new Error(`Movie request failed with status ${res.status}`);
	}

	return res.json();
};

export const clientMovieFetcher: MovieFetcher = {
	list: (category, page) =>
		requestMoviePage(`/api/movies/list/${category}?page=${page}`),
	search: (query, page) =>
		requestMoviePage(
			`/api/movies/search?query=${encodeURIComponent(query)}&page=${page}`,
		),
};
