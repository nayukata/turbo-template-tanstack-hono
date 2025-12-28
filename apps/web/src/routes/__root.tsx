import { QueryClientProvider } from "@tanstack/react-query";
import {
	createRootRoute,
	HeadContent,
	Outlet,
	Scripts,
} from "@tanstack/react-router";
import { NuqsAdapter } from "nuqs/adapters/react";
import { Toaster } from "sonner";
import appCss from "~/app.css?url";
import { createQueryClient } from "~/lib/query-client";

const queryClient = createQueryClient();

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
		],
		links: [{ rel: "stylesheet", href: appCss }],
	}),
	component: RootComponent,
});

function RootComponent() {
	return (
		<RootDocument>
			<QueryClientProvider client={queryClient}>
				<NuqsAdapter>
					<Outlet />
				</NuqsAdapter>
			</QueryClientProvider>
		</RootDocument>
	);
}

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="ja">
			<head>
				<HeadContent />
			</head>
			<body>
				{children}
				<Toaster theme="dark" position="bottom-center" />
				<Scripts />
			</body>
		</html>
	);
}
