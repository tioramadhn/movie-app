import { Clapperboard } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { CategoryFilter } from "@/features/movie/components/CategoryFilter/CategoryFilter";
import {
	SearchMovieForm,
	SearchMovieFormFields,
} from "@/features/movie/components/SearchMovieForm/SearchMovieForm";

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

				<CategoryFilter />
			</div>
		</div>
	);
};

export default Header;
