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
import { getCategoryHref, MOVIE_CATALOG } from "../../constant";

const ALL_CATEGORIES = "all";

const getFilterHref = (value: unknown) => {
	const catalog = MOVIE_CATALOG.find((item) => item.key === value);
	return catalog ? getCategoryHref(catalog.key) : "/";
};

const getActiveFilter = (pathname: string) => {
	if (pathname === "/") return ALL_CATEGORIES;

	return (
		MOVIE_CATALOG.find((catalog) => getCategoryHref(catalog.key) === pathname)
			?.key ?? null
	);
};

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
