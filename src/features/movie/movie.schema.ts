import { z } from "zod";
import {
	SEARCH_QUERY_ALLOWED_PATTERN,
	SEARCH_QUERY_MAX_LENGTH,
} from "./movie.constant";

export const movieIdSchema = z.coerce.number().int().positive();

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
