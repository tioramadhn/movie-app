"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Input } from "@/components/ui/input";

interface SearchMovieFormValues {
	query: string;
}

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
	const { register, handleSubmit } = useForm<SearchMovieFormValues>({
		defaultValues: { query: defaultQuery },
	});

	const onSubmit = ({ query }: SearchMovieFormValues) => {
		router.push(`/search?q=${encodeURIComponent(query.trim())}`);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<ButtonGroup>
				<Input
					type="search"
					placeholder="Type to search a movie by title..."
					{...register("query", {
						validate: (value) => value.trim().length > 0,
					})}
				/>
				<Button type="submit" variant="outline" aria-label="Search">
					<Search />
				</Button>
			</ButtonGroup>
		</form>
	);
}
