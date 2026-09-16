"use client";

import { Clapperboard } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function HomeLink() {
	const pathname = usePathname();

	const scrollToTop = () => {
		const isAlreadyHome = pathname === "/";

		window.scrollTo({
			top: 0,
			behavior: isAlreadyHome ? "smooth" : "instant",
		});
	};

	return (
		<Link href="/" onClick={scrollToTop} className="flex gap-2 items-center">
			<Clapperboard />
			Movie App
		</Link>
	);
}
