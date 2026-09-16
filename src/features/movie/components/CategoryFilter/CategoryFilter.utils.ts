import { MOVIE_CATALOG } from "../../movie.constant";
import { getCategoryHref } from "../../movie.utils";
import { ALL_CATEGORIES } from "./CategoryFilter.constant";

export const getFilterHref = (value: unknown) => {
	const catalog = MOVIE_CATALOG.find((item) => item.key === value);
	return catalog ? getCategoryHref(catalog.key) : "/";
};

export const getActiveFilter = (pathname: string) => {
	if (pathname === "/") return ALL_CATEGORIES;

	return (
		MOVIE_CATALOG.find((catalog) => getCategoryHref(catalog.key) === pathname)
			?.key ?? null
	);
};
