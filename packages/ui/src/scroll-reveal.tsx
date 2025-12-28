"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const scrollRevealVariants = tv({
	base: "",
});

const animationVariants: Record<string, Variants> = {
	fadeUp: {
		hidden: { opacity: 0, y: 24 },
		visible: { opacity: 1, y: 0 },
	},
	fadeIn: {
		hidden: { opacity: 0 },
		visible: { opacity: 1 },
	},
	scaleUp: {
		hidden: { opacity: 0, scale: 0.95 },
		visible: { opacity: 1, scale: 1 },
	},
	slideLeft: {
		hidden: { opacity: 0, x: 24 },
		visible: { opacity: 1, x: 0 },
	},
	slideRight: {
		hidden: { opacity: 0, x: -24 },
		visible: { opacity: 1, x: 0 },
	},
};

type ScrollRevealProps = {
	children: ReactNode;
	className?: string;
	/** Animation variant */
	variant?: keyof typeof animationVariants;
	/** Delay in seconds */
	delay?: number;
	/** Only animate on first entry */
	once?: boolean;
	/** Duration in seconds */
	duration?: number;
} & VariantProps<typeof scrollRevealVariants>;

export function ScrollReveal({
	children,
	className,
	variant = "fadeUp",
	delay = 0,
	once = true,
	duration = 0.5,
}: ScrollRevealProps) {
	const variants = animationVariants[variant];

	return (
		<motion.div
			className={scrollRevealVariants({ className })}
			initial="hidden"
			whileInView="visible"
			viewport={{ once, margin: "-100px" }}
			variants={variants}
			transition={{
				duration,
				delay,
				ease: [0.16, 1, 0.3, 1],
			}}
		>
			{children}
		</motion.div>
	);
}
