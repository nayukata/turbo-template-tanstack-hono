"use client";

import type { CSSProperties, ReactNode } from "react";
import { tv } from "tailwind-variants";

const layerVariants = tv({
	base: "absolute inset-0 [transform-style:preserve-3d] [backface-visibility:hidden]",
});

type LayerProps = {
	children: ReactNode;
	className?: string;
	/** Depth factor: 0 = foreground (no movement), 1 = background (max movement) */
	depth?: number;
	/** Z-translation in pixels (calculated from depth if not provided) */
	translateZ?: number;
};

export function Layer({
	children,
	className,
	depth = 0,
	translateZ,
}: LayerProps) {
	const zValue = translateZ ?? depth * -100;

	const style: CSSProperties = {
		transform: `translateZ(${zValue}px)`,
	};

	return (
		<div className={layerVariants({ className })} style={style}>
			{children}
		</div>
	);
}
