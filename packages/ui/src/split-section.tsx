"use client";

import {
	type MotionValue,
	motion,
	useScroll,
	useSpring,
	useTransform,
} from "motion/react";
import { type ReactNode, useRef } from "react";

type SplitSectionProps = {
	logo: ReactNode;
	title: string;
	subtitle: string;
	features: Array<{ title: string; description: string }>;
	brandSide?: "left" | "right";
	accentColor: string;
	glowClass?: string;
};

function useParallax(value: MotionValue<number>, distance: number) {
	return useTransform(value, [0, 1], [-distance, distance]);
}

export function SplitSection({
	logo,
	title,
	subtitle,
	features,
	brandSide = "left",
	accentColor,
	glowClass = "",
}: SplitSectionProps) {
	const sectionRef = useRef<HTMLElement>(null);

	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start end", "end start"],
	});

	const smoothProgress = useSpring(scrollYProgress, {
		stiffness: 100,
		damping: 30,
		restDelta: 0.001,
	});

	// Parallax for logo
	const logoY = useParallax(smoothProgress, 50);
	const logoScale = useTransform(smoothProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
	const logoRotate = useTransform(smoothProgress, [0, 0.5, 1], [-5, 0, 5]);

	// Content animations
	const contentY = useParallax(smoothProgress, 30);
	const opacity = useTransform(
		smoothProgress,
		[0, 0.2, 0.5, 0.8, 1],
		[0, 1, 1, 1, 0],
	);

	// Staggered feature animations
	const featureOpacity = useTransform(
		smoothProgress,
		[0.1, 0.3, 0.7, 0.9],
		[0, 1, 1, 0],
	);

	const BrandPanel = (
		<motion.div
			className="relative flex h-full min-h-[60vh] items-center justify-center overflow-hidden md:min-h-screen"
			style={{ opacity }}
		>
			{/* Glow background */}
			<div
				className={`absolute inset-0 opacity-20 blur-3xl ${glowClass}`}
				style={{
					background: `radial-gradient(circle at center, ${accentColor} 0%, transparent 70%)`,
				}}
			/>

			{/* Logo with 3D effect */}
			<motion.div
				className="relative z-10"
				style={{
					y: logoY,
					scale: logoScale,
					rotateX: logoRotate,
				}}
			>
				<motion.div
					className="flex flex-col items-center gap-6"
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
					viewport={{ once: false, amount: 0.5 }}
				>
					{/* Logo glow */}
					<div className="relative">
						<div
							className="absolute inset-0 blur-2xl opacity-60"
							style={{ color: accentColor }}
						>
							{logo}
						</div>
						<div className="relative">{logo}</div>
					</div>

					<div className="text-center">
						<h2
							className="text-4xl font-bold tracking-tight md:text-5xl"
							style={{ color: accentColor }}
						>
							{title}
						</h2>
						<p className="mt-2 text-sm tracking-widest text-muted-foreground uppercase">
							{subtitle}
						</p>
					</div>
				</motion.div>
			</motion.div>
		</motion.div>
	);

	const ContentPanel = (
		<motion.div
			className="flex h-full min-h-[60vh] items-center justify-center px-8 py-16 md:min-h-screen md:px-16"
			style={{ opacity, y: contentY }}
		>
			<div className="max-w-md">
				{/* Features - hover dims siblings */}
				<motion.div
					className="feature-list space-y-8"
					style={{ opacity: featureOpacity }}
				>
					{features.map((feature, index) => (
						<motion.div
							key={feature.title}
							className="feature-item group"
							initial={{ opacity: 0, x: brandSide === "left" ? 30 : -30 }}
							whileInView={{ opacity: 1, x: 0 }}
							transition={{
								duration: 0.6,
								delay: index * 0.1,
								ease: [0.16, 1, 0.3, 1],
							}}
							viewport={{ once: false, amount: 0.5 }}
						>
							<div className="flex items-start gap-4">
								<div
									className="mt-2 h-2 w-2 rounded-full shrink-0 transition-transform duration-300 group-hover:scale-150"
									style={{ backgroundColor: accentColor }}
								/>
								<div>
									<h4 className="text-lg font-semibold text-foreground transition-colors duration-300 group-hover:text-white">
										{feature.title}
									</h4>
									<p className="mt-1 text-sm leading-relaxed text-muted-foreground">
										{feature.description}
									</p>
								</div>
							</div>
						</motion.div>
					))}
				</motion.div>
			</div>
		</motion.div>
	);

	return (
		<section
			ref={sectionRef}
			className="relative flex min-h-screen w-full flex-col md:flex-row"
		>
			{/* Subtle grid pattern */}
			<div
				className="pointer-events-none absolute inset-0 opacity-5"
				style={{
					backgroundImage: `linear-gradient(${accentColor}20 1px, transparent 1px), linear-gradient(90deg, ${accentColor}20 1px, transparent 1px)`,
					backgroundSize: "60px 60px",
				}}
			/>

			{/* Mobile: Brand always first. Desktop: respects brandSide */}
			<div
				className={`w-full md:w-1/2 ${brandSide === "right" ? "order-1 md:order-2" : ""}`}
			>
				{BrandPanel}
			</div>
			<div
				className={`w-full md:w-1/2 ${brandSide === "right" ? "order-2 md:order-1" : ""}`}
			>
				{ContentPanel}
			</div>

			{/* Section divider line */}
			<div
				className="absolute bottom-0 left-1/2 h-px w-1/2 -translate-x-1/2 opacity-20"
				style={{
					background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
				}}
			/>
		</section>
	);
}
