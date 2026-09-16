import type { ReactNode } from "react";

export interface MovieSectionProps {
	title: string;
	children: ReactNode;
	loadMoreHref?: string;
}
