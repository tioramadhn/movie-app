import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export function CardMovie() {
	return (
		<Card className="relative mx-auto w-full max-w-sm pt-0">
			<div className="absolute inset-0 z-30 aspect-video bg-black/35" />
			<img
				src="https://avatar.vercel.sh/shadcn1"
				alt="Event cover"
				className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
			/>
			<CardHeader>
				<CardTitle>Design systems meetup</CardTitle>
				<Badge variant={"secondary"}>2010</Badge>
				<CardDescription>
					A practical talk on component APIs, accessibility, and shipping
					faster.
				</CardDescription>
			</CardHeader>
		</Card>
	);
}
