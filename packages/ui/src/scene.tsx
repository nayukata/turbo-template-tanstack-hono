"use client";

import type { ReactNode } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const sceneVariants = tv({
	base: "relative [transform-style:preserve-3d]",
	variants: {
		perspective: {
			default: "[perspective:var(--perspective-default,1000px)]",
			deep: "[perspective:var(--perspective-deep,2000px)]",
		},
		origin: {
			center: "[perspective-origin:center_center]",
			top: "[perspective-origin:center_top]",
			bottom: "[perspective-origin:center_bottom]",
		},
	},
	defaultVariants: {
		perspective: "default",
		origin: "center",
	},
});

type SceneProps = {
	children: ReactNode;
	className?: string;
} & VariantProps<typeof sceneVariants>;

export function Scene({
	children,
	className,
	perspective,
	origin,
}: SceneProps) {
	return (
		<div className={sceneVariants({ perspective, origin, className })}>
			{children}
		</div>
	);
}
