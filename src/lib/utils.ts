export { cn } from "cn";

type ExtractParams<T extends string> =
	T extends `${string}{${infer Param}}${infer Rest}`
		? Param | ExtractParams<Rest>
		: never;
type BuildPathArgs<T extends string> =
	ExtractParams<T> extends never
		? []
		: [params: Record<ExtractParams<T>, string | number>];

export function buildPath<T extends string>(
	template: T,
	...args: BuildPathArgs<T>
): string {
	const params = args[0] as Record<string, string | number> | undefined;
	if (!params) return template;

	return Object.entries(params).reduce(
		(path, [key, value]) => path.replace(`{${key}}`, String(value)),
		template as string,
	);
}
