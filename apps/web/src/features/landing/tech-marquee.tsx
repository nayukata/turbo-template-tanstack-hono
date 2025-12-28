import type { ComponentType, SVGProps } from "react";
import {
	BiomeIcon,
	DrizzleIcon,
	HonoIcon,
	MotionIcon,
	PnpmIcon,
	ReactIcon,
	TailwindIcon,
	TanStackIcon,
	TurborepoIcon,
	TursoIcon,
	TypeScriptIcon,
	ValibotIcon,
	ViteIcon,
} from "~/components/icons";

const ROW_1 = [
	{ name: "TanStack", icon: TanStackIcon },
	{ name: "Hono", icon: HonoIcon },
	{ name: "Turso", icon: TursoIcon },
	{ name: "Drizzle", icon: DrizzleIcon },
	{ name: "Valibot", icon: ValibotIcon },
	{ name: "React", icon: ReactIcon },
] as const;

const ROW_2 = [
	{ name: "TypeScript", icon: TypeScriptIcon },
	{ name: "Tailwind CSS", icon: TailwindIcon },
	{ name: "Vite", icon: ViteIcon },
	{ name: "Turborepo", icon: TurborepoIcon },
	{ name: "Motion", icon: MotionIcon },
	{ name: "Biome", icon: BiomeIcon },
	{ name: "pnpm", icon: PnpmIcon },
] as const;

type Technology = {
	name: string;
	icon: ComponentType<SVGProps<SVGSVGElement>>;
};

function TechItem({ tech }: { tech: Technology }) {
	return (
		<div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 backdrop-blur-sm transition-colors hover:border-white/20 hover:bg-white/10">
			<span className="flex h-5 w-5 items-center justify-center [&_svg]:h-full [&_svg]:w-full">
				<tech.icon />
			</span>
			<span className="whitespace-nowrap text-sm font-medium text-muted-foreground">
				{tech.name}
			</span>
		</div>
	);
}

function MarqueeRow({
	items,
	reverse = false,
}: {
	items: readonly Technology[];
	reverse?: boolean;
}) {
	// 2回複製してシームレスなループを作る
	const repeatedItems = [...items, ...items];

	const animationStyle: React.CSSProperties = {
		animation: `marquee 60s linear infinite ${reverse ? "reverse" : ""}`,
	};

	return (
		<div className="flex overflow-hidden py-2">
			<div
				className="flex shrink-0 items-center gap-6 pr-6 motion-reduce:animate-none"
				style={animationStyle}
			>
				{repeatedItems.map((tech, i) => (
					<TechItem key={`${tech.name}-${i}`} tech={tech} />
				))}
			</div>
			<div
				className="flex shrink-0 items-center gap-6 pr-6 motion-reduce:animate-none"
				style={animationStyle}
				aria-hidden="true"
			>
				{repeatedItems.map((tech, i) => (
					<TechItem key={`${tech.name}-${i}`} tech={tech} />
				))}
			</div>
		</div>
	);
}

export function TechMarquee() {
	return (
		<section className="flex justify-center border-y border-white/5 bg-background/50 py-4 backdrop-blur-sm">
			<div className="relative w-[60%] overflow-hidden">
				{/* Fade edges */}
				<div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-linear-to-r from-background to-transparent" />
				<div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-linear-to-l from-background to-transparent" />

				<MarqueeRow items={ROW_1} />
				<MarqueeRow items={ROW_2} reverse />
			</div>
		</section>
	);
}
