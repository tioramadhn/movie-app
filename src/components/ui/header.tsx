import { Clapperboard, Funnel } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import {
	SearchMovieForm,
	SearchMovieFormFields,
} from "@/features/movie/components/SearchMovieForm/SearchMovieForm";
import { MOVIE_CATALOG } from "@/features/movie/constant";
import { Button } from "./button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "./dropdown-menu";

const Header = () => {
	return (
		<div className="font-bold text-2xl border p-4 rounded-2xl flex justify-between">
			<Link href="/" className="flex gap-2 items-center">
				<Clapperboard />
				Movie App
			</Link>

			<div className="flex gap-2 items-center">
				<Suspense fallback={<SearchMovieFormFields defaultQuery="" />}>
					<SearchMovieForm />
				</Suspense>

				<DropdownMenu>
					<DropdownMenuTrigger
						render={
							<Button variant="outline">
								<Funnel />
							</Button>
						}
					/>
					<DropdownMenuContent>
						{MOVIE_CATALOG.map((item, idx) => (
							<DropdownMenuItem key={`filter-${idx}`}>
								{item.title}
							</DropdownMenuItem>
						))}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</div>
	);
};

export default Header;
