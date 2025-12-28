"use client";

import { SplitSection } from "@repo/ui/split-section";

function TanStackLogo() {
	return (
		<svg
			viewBox="0 0 633 633"
			className="h-24 w-24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M316.5 0C142.028 0 0 142.028 0 316.5C0 490.972 142.028 633 316.5 633C490.972 633 633 490.972 633 316.5C633 142.028 490.972 0 316.5 0Z"
				fill="currentColor"
				fillOpacity="0.1"
			/>
			<path
				d="M316.5 60C175.393 60 60 175.393 60 316.5C60 457.607 175.393 573 316.5 573C457.607 573 573 457.607 573 316.5C573 175.393 457.607 60 316.5 60Z"
				fill="currentColor"
				fillOpacity="0.1"
			/>
			<text
				x="316.5"
				y="380"
				textAnchor="middle"
				fill="currentColor"
				fontSize="260"
				fontWeight="900"
				fontFamily="system-ui, sans-serif"
			>
				TS
			</text>
		</svg>
	);
}

const features = [
	{
		title: "型安全なルーティング",
		description:
			"パスパラメータ、検索クエリまで完全に型付け。リンク切れをコンパイル時に検出",
	},
	{
		title: "フルスタック対応",
		description:
			"サーバー関数でバックエンド処理を直接記述。APIレイヤーの境界を意識しない開発",
	},
	{
		title: "最速のHMR",
		description: "Viteベースで変更を瞬時に反映。待ち時間ゼロの開発サイクル",
	},
];

export function TanStackSection() {
	return (
		<SplitSection
			brandSide="left"
			accentColor="oklch(0.7 0.28 25)"
			glowClass="glow-tanstack"
			logo={<TanStackLogo />}
			title="TanStack Start"
			subtitle="Modern React Framework"
			features={features}
		/>
	);
}
