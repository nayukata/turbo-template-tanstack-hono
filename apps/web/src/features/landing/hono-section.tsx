"use client";

import { SplitSection } from "@repo/ui/split-section";

function HonoLogo() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 76 98"
			className="h-24 w-auto"
		>
			<path
				fill="url(#hono-gradient)"
				d="m11 25 7 9s9-18 22-34c17 20 36 48 36 64 0 20-19 34-37 34C17 98 0 81 0 61c0-6 3-24 11-36Z"
			/>
			<path fill="#FF9955" d="M39 21c47 51 14 66 0 66-11 0-51-11 0-66Z" />
			<defs>
				<linearGradient id="hono-gradient" x2="0%" y2="100%">
					<stop stopColor="#FF8844" />
					<stop offset="100%" stopColor="#FF3300" />
				</linearGradient>
			</defs>
		</svg>
	);
}

const features = [
	{
		title: "超軽量",
		description:
			"コアは14KB未満。コールドスタートが速く、エッジ環境で真価を発揮",
	},
	{
		title: "Web標準API",
		description:
			"Fetch API準拠でランタイムを選ばない。Node、Deno、Bun、Cloudflareどこでも動作",
	},
	{
		title: "Express互換",
		description: "馴染みのあるルーティングとミドルウェア。学習コストを最小限に",
	},
];

export function HonoSection() {
	return (
		<SplitSection
			brandSide="right"
			accentColor="oklch(0.72 0.22 40)"
			glowClass="glow-hono"
			logo={<HonoLogo />}
			title="Hono"
			subtitle="Ultrafast Web Framework"
			features={features}
		/>
	);
}
