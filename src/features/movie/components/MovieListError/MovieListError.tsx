"use client";

import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import { catchError, type ErrorInfo } from "next/error";
import { Button } from "@/components/ui/button";

function RetryButton({ onRetry }: { onRetry: () => void }) {
	const { reset: resetQueries } = useQueryErrorResetBoundary();

	return (
		<Button
			variant="outline"
			onClick={() => {
				resetQueries();
				onRetry();
			}}
		>
			Try again
		</Button>
	);
}

function MovieListErrorFallback(_props: object, { reset }: ErrorInfo) {
	return (
		<div className="flex flex-wrap items-center gap-3">
			<p className="text-sm text-muted-foreground">
				Failed to load movies. Please try again later.
			</p>
			<RetryButton onRetry={reset} />
		</div>
	);
}

export const MovieListErrorBoundary = catchError(MovieListErrorFallback);
