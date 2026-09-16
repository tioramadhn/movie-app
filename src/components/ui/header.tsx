import { Clapperboard } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import {
	CategoryFilter,
	SearchMovieForm,
	SearchMovieFormFields,
} from "@/features/movie";

const Header = () => {
	return (
		<div className="font-bold text-xl border p-4 rounded-2xl flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:text-2xl">
			<Link href="/" className="flex gap-2 items-center">
				<Clapperboard />
				Movie App
			</Link>

			<div className="flex gap-2 items-center w-full sm:w-auto">
				<Suspense fallback={<SearchMovieFormFields defaultQuery="" />}>
					<SearchMovieForm />
				</Suspense>

				<CategoryFilter />
			</div>
		</div>
	);
};

export default Header;
