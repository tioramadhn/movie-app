import { NextResponse } from "next/server";
import { z } from "zod";
import { TMDB_MAX_PAGE } from "@/config/movie";
import { searchMovieSchema } from "@/features/movie/movie.schema";
import { serverMovieFetcher } from "@/features/movie/movie.service";

const pageSchema = z.coerce.number().int().min(1).max(TMDB_MAX_PAGE);

export async function GET(request: Request) {
	const searchParams = new URL(request.url).searchParams;
	const search = searchMovieSchema.safeParse({
		query: searchParams.get("query"),
	});

	if (!search.success) {
		return NextResponse.json(
			{ error: search.error.issues[0]?.message ?? "Invalid search query" },
			{ status: 400 },
		);
	}

	const page = pageSchema.safeParse(searchParams.get("page") ?? 1);

	if (!page.success) {
		return NextResponse.json({ error: "Invalid page" }, { status: 400 });
	}

	try {
		const movies = await serverMovieFetcher.search(
			search.data.query,
			page.data,
		);
		return NextResponse.json(movies);
	} catch {
		return NextResponse.json(
			{ error: "Failed to search movies" },
			{ status: 502 },
		);
	}
}
