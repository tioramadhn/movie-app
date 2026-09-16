"use client";

import { Funnel } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MOVIE_CATALOG } from "../../movie.constant";
import { ALL_CATEGORIES } from "./CategoryFilter.constant";
import { getActiveFilter, getFilterHref } from "./CategoryFilter.utils";

export function CategoryFilter() {
	const pathname = usePathname();
	const router = useRouter();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				render={
					<Button variant="outline" aria-label="Filter movies by category">
						<Funnel />
					</Button>
				}
			/>
			<DropdownMenuContent align="end" className="min-w-48">
				<DropdownMenuGroup>
					<DropdownMenuLabel>Category</DropdownMenuLabel>
					<DropdownMenuRadioGroup
						value={getActiveFilter(pathname)}
						onValueChange={(value) => router.push(getFilterHref(value))}
					>
						<DropdownMenuRadioItem value={ALL_CATEGORIES} closeOnClick>
							All categories
						</DropdownMenuRadioItem>
						<DropdownMenuSeparator />
						{MOVIE_CATALOG.map((catalog) => (
							<DropdownMenuRadioItem
								key={catalog.key}
								value={catalog.key}
								closeOnClick
							>
								{catalog.title}
							</DropdownMenuRadioItem>
						))}
					</DropdownMenuRadioGroup>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
