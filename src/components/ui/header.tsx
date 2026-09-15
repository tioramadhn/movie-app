import { Clapperboard, Funnel, Search } from "lucide-react";
import { MOVIE_CATALOG } from "@/features/movie/constant";
import { Button } from "./button";
import { ButtonGroup } from "./button-group";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "./dropdown-menu";
import { Input } from "./input";

const Header = () => {
	return (
		<div className="font-bold text-2xl border p-4 rounded-2xl flex justify-between">
			<div className="flex gap-2 items-center ">
				<Clapperboard />
				Movie App
			</div>

			<div className="flex gap-2 items-center">
				<ButtonGroup>
					<Input
						id="input-button-group"
						placeholder="Type to search a movie by title..."
					/>
					<Button variant="outline">
						<Search />
					</Button>
				</ButtonGroup>

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
