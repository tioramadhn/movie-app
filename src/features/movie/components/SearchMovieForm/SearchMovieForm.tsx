"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useId } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Input } from "@/components/ui/input";
import { type SearchMovieFormValues, searchMovieSchema } from "../../schema";

export function SearchMovieForm() {
	const searchParams = useSearchParams();
	const query = searchParams.get("q") ?? "";

	return <SearchMovieFormFields key={query} defaultQuery={query} />;
}

export function SearchMovieFormFields({
	defaultQuery,
}: {
	defaultQuery: string;
}) {
	const router = useRouter();
	const errorId = useId();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SearchMovieFormValues>({
		resolver: zodResolver(searchMovieSchema),
		defaultValues: { query: defaultQuery },
	});

	const onSubmit = ({ query }: SearchMovieFormValues) => {
		router.push(`/search?q=${encodeURIComponent(query)}`);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} noValidate className="relative">
			<ButtonGroup>
				<Input
					type="search"
					placeholder="Type to search a movie by title..."
					{...register("query")}
				/>
				<Button type="submit" variant="outline" aria-label="Search">
					<Search />
				</Button>
			</ButtonGroup>
			{errors.query && (
				<p
					id={errorId}
					role="alert"
					className="absolute top-full left-0 mt-1 text-xs font-normal text-destructive"
				>
					{errors.query.message}
				</p>
			)}
		</form>
	);
}
