"use client";

import { SplitSection } from "@repo/ui/split-section";
import { TanStackIcon } from "~/components/icons";

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
			logo={<TanStackIcon className="h-24 w-24" />}
			title="TanStack Start"
			subtitle="Modern React Framework"
			features={features}
		/>
	);
}
