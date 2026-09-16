import { NextResponse } from "next/server";
import { z } from "zod";
import { TMDB_MAX_PAGE } from "@/config/movie";
import { MOVIE_CATALOG } from "@/features/movie/movie.constant";
import { serverMovieFetcher } from "@/features/movie/movie.service";

const pageSchema = z.coerce.number().int().min(1).max(TMDB_MAX_PAGE);

export async function GET(
	request: Request,
	{ params }: { params: Promise<{ category: string }> },
) {
	const { category } = await params;
	const catalog = MOVIE_CATALOG.find((item) => item.key === category);

	if (!catalog) {
		return NextResponse.json({ error: "Unknown category" }, { status: 404 });
	}

	const pageParam = new URL(request.url).searchParams.get("page") ?? 1;
	const page = pageSchema.safeParse(pageParam);

	if (!page.success) {
		return NextResponse.json({ error: "Invalid page" }, { status: 400 });
	}

	try {
		const movies = await serverMovieFetcher.list(catalog.key, page.data);
		return NextResponse.json(movies);
	} catch {
		return NextResponse.json(
			{ error: "Failed to load movies" },
			{ status: 502 },
		);
	}
}
