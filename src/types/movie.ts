export interface TMDBMovieListResponse {
	dates: TMDBDateRange;
	page: number;
	results: TMDBMovie[];
	total_pages: number;
	total_results: number;
}

interface TMDBDateRange {
	maximum: string;
	minimum: string;
}

export interface TMDBMovie {
	adult: boolean;
	backdrop_path: string | null;
	genre_ids: number[];
	id: number;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string | null;
	release_date: string;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
}

export interface TMDBMovieDetailResponse {
	adult: boolean;
	backdrop_path: string | null;
	belongs_to_collection: TMDBCollection | null;
	budget: number;
	genres: TMDBGenre[];
	homepage: string;
	id: number;
	imdb_id: string | null;
	origin_country: string[];
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string | null;
	production_companies: TMDBProductionCompany[];
	production_countries: TMDBProductionCountry[];
	release_date: string;
	revenue: number;
	runtime: number | null;
	spoken_languages: TMDBSpokenLanguage[];
	status: TMDBMovieStatus;
	tagline: string;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
}

interface TMDBCollection {
	id: number;
	name: string;
	poster_path: string | null;
	backdrop_path: string | null;
}

interface TMDBGenre {
	id: number;
	name: string;
}

interface TMDBProductionCompany {
	id: number;
	logo_path: string | null;
	name: string;
	origin_country: string;
}

interface TMDBProductionCountry {
	iso_3166_1: string;
	name: string;
}

interface TMDBSpokenLanguage {
	english_name: string;
	iso_639_1: string;
	name: string;
}

type TMDBMovieStatus =
	| "Rumored"
	| "Planned"
	| "In Production"
	| "Post Production"
	| "Released"
	| "Canceled";

export interface TMDBCreditsResponse {
	id: number;
	cast: TMDBCastMember[];
	crew: TMDBCrewMember[];
}

interface TMDBCastMember {
	adult: boolean;
	gender: number;
	id: number;
	known_for_department: string;
	name: string;
	original_name: string;
	popularity: number;
	profile_path: string | null;
	cast_id: number;
	character: string;
	credit_id: string;
	order: number;
}

interface TMDBCrewMember {
	adult: boolean;
	gender: number;
	id: number;
	known_for_department: string;
	name: string;
	original_name: string;
	popularity: number;
	profile_path: string | null;
	credit_id: string;
	department: string;
	job: string;
}
