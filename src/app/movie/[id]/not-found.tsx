import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function MovieNotFound() {
	return (
		<section className="flex flex-col items-start gap-4 border rounded-2xl p-4 sm:p-8">
			<h1 className="text-xl font-semibold sm:text-2xl">Movie not found</h1>
			<p className="text-sm text-muted-foreground">
				The movie you are looking for does not exist or may have been removed.
			</p>
			<Link href="/" className={buttonVariants({ variant: "outline" })}>
				Back to home
			</Link>
		</section>
	);
}
