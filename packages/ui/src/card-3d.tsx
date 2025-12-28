"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import type { PointerEvent, ReactNode } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const card3DVariants = tv({
	base: "relative rounded-xl bg-surface-1 border border-border shadow-lg [transform-style:preserve-3d]",
	variants: {
		padding: {
			none: "",
			sm: "p-4",
			md: "p-6",
			lg: "p-8",
		},
	},
	defaultVariants: {
		padding: "md",
	},
});

type Card3DProps = {
	children: ReactNode;
	className?: string;
	/** Maximum tilt angle in degrees */
	tiltAmount?: number;
	/** Enable glare effect */
	glare?: boolean;
} & VariantProps<typeof card3DVariants>;

export function Card3D({
	children,
	className,
	padding,
	tiltAmount = 10,
	glare = false,
}: Card3DProps) {
	const x = useMotionValue(0);
	const y = useMotionValue(0);

	const springConfig = { stiffness: 300, damping: 30 };
	const rotateX = useSpring(
		useTransform(y, [-0.5, 0.5], [tiltAmount, -tiltAmount]),
		springConfig,
	);
	const rotateY = useSpring(
		useTransform(x, [-0.5, 0.5], [-tiltAmount, tiltAmount]),
		springConfig,
	);

	const glareX = useTransform(x, [-0.5, 0.5], [0, 100]);
	const glareY = useTransform(y, [-0.5, 0.5], [0, 100]);

	const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
		const rect = event.currentTarget.getBoundingClientRect();
		const centerX = rect.left + rect.width / 2;
		const centerY = rect.top + rect.height / 2;
		const normalizedX = (event.clientX - centerX) / rect.width;
		const normalizedY = (event.clientY - centerY) / rect.height;

		x.set(normalizedX);
		y.set(normalizedY);
	};

	const handlePointerLeave = () => {
		x.set(0);
		y.set(0);
	};

	return (
		<motion.div
			className={card3DVariants({ padding, className })}
			style={{
				rotateX,
				rotateY,
				transformPerspective: 1000,
			}}
			onPointerMove={handlePointerMove}
			onPointerLeave={handlePointerLeave}
		>
			{children}
			{glare && (
				<motion.div
					className="pointer-events-none absolute inset-0 rounded-xl opacity-20"
					style={{
						background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.4), transparent 60%)`,
					}}
					aria-hidden="true"
				/>
			)}
		</motion.div>
	);
}
