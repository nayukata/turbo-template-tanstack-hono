"use client";

import { Button } from "@repo/ui/button";
import {
	motion,
	useMotionValue,
	useReducedMotion,
	useScroll,
	useSpring,
	useTransform,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { GitHubIcon } from "~/components/icons";

const INSTALL_COMMAND = "npx degit nayukata/turbo-template-tanstack-hono my-app";

function copyToClipboard() {
	navigator.clipboard.writeText(INSTALL_COMMAND);
	toast.success("クリップボードにコピーしました");
}

const EASE_OUT_SOFT = [0.23, 1, 0.32, 1] as const;

function GlitchText({
	children,
	delay = 0,
	color,
	glowColor,
}: {
	children: string;
	delay?: number;
	color: string;
	glowColor: string;
}) {
	const shouldReduceMotion = useReducedMotion();

	if (shouldReduceMotion) {
		return (
			<h1
				className={`text-[clamp(2.5rem,8vw,5rem)] font-bold leading-[1.05] tracking-tight ${color}`}
				style={{ textShadow: `0 0 80px ${glowColor}` }}
			>
				{children}
			</h1>
		);
	}

	return (
		<div className="relative">
			{/* Glitch layers */}
			<motion.h1
				className={`absolute inset-0 text-[clamp(2.5rem,8vw,5rem)] font-bold leading-[1.05] tracking-tight ${color} opacity-70`}
				style={{ textShadow: `0 0 80px ${glowColor}` }}
				initial={{ x: -8, opacity: 0 }}
				animate={{
					x: [null, 5, -3, 2, 0],
					opacity: [0, 0.7, 0.5, 0.3, 0],
				}}
				transition={{
					duration: 0.5,
					delay,
					times: [0, 0.2, 0.4, 0.7, 1],
					ease: "easeOut",
				}}
			>
				{children}
			</motion.h1>
			<motion.h1
				className={`absolute inset-0 text-[clamp(2.5rem,8vw,5rem)] font-bold leading-[1.05] tracking-tight ${color} opacity-70`}
				style={{ textShadow: `0 0 80px ${glowColor}` }}
				initial={{ x: 8, opacity: 0 }}
				animate={{
					x: [null, -4, 3, -1, 0],
					opacity: [0, 0.7, 0.5, 0.3, 0],
				}}
				transition={{
					duration: 0.5,
					delay: delay + 0.05,
					times: [0, 0.2, 0.4, 0.7, 1],
					ease: "easeOut",
				}}
			>
				{children}
			</motion.h1>

			{/* Main text */}
			<motion.h1
				className={`relative text-[clamp(2.5rem,8vw,5rem)] font-bold leading-[1.05] tracking-tight ${color}`}
				style={{ textShadow: `0 0 80px ${glowColor}` }}
				initial={{ opacity: 0, x: -20, skewX: -10 }}
				animate={{ opacity: 1, x: 0, skewX: 0 }}
				transition={{
					duration: 0.8,
					delay: delay + 0.1,
					ease: EASE_OUT_SOFT,
				}}
			>
				{children}
			</motion.h1>
		</div>
	);
}

function FloatIn({
	children,
	delay = 0,
	className = "",
	y = 40,
}: {
	children: React.ReactNode;
	delay?: number;
	className?: string;
	y?: number;
}) {
	const shouldReduceMotion = useReducedMotion();

	return (
		<motion.div
			className={className}
			initial={{ opacity: 0, y }}
			animate={{ opacity: 1, y: 0 }}
			transition={
				shouldReduceMotion
					? { duration: 0.01 }
					: {
							duration: 1.4,
							delay,
							ease: EASE_OUT_SOFT,
						}
			}
		>
			{children}
		</motion.div>
	);
}

function GlowOrb({
	color,
	size,
	x,
	y,
	blur,
	delay,
}: {
	color: string;
	size: number;
	x: string;
	y: string;
	blur: number;
	delay: number;
}) {
	const shouldReduceMotion = useReducedMotion();

	return (
		<motion.div
			className="absolute rounded-full"
			style={{
				width: size,
				height: size,
				left: x,
				top: y,
				background: color,
				filter: `blur(${blur}px)`,
			}}
			initial={{ opacity: 0, scale: 0.5 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={
				shouldReduceMotion
					? { duration: 0.01 }
					: {
							duration: 2.5,
							delay,
							ease: EASE_OUT_SOFT,
						}
			}
		/>
	);
}

function AnimatedLine({ delay }: { delay: number }) {
	const shouldReduceMotion = useReducedMotion();

	return (
		<motion.div
			className="mx-auto h-px w-24"
			style={{
				background:
					"linear-gradient(90deg, transparent, oklch(0.72 0.22 40 / 0.6), transparent)",
			}}
			initial={{ scaleX: 0, opacity: 0 }}
			animate={{ scaleX: 1, opacity: 1 }}
			transition={
				shouldReduceMotion
					? { duration: 0.01 }
					: {
							duration: 1.2,
							delay,
							ease: EASE_OUT_SOFT,
						}
			}
		/>
	);
}

export function HeroSection() {
	const sectionRef = useRef<HTMLElement>(null);
	const shouldReduceMotion = useReducedMotion();
	const [mounted, setMounted] = useState(false);

	const mouseX = useMotionValue(0);
	const mouseY = useMotionValue(0);

	const springConfig = { damping: 30, stiffness: 100 };
	const orbX = useSpring(mouseX, springConfig);
	const orbY = useSpring(mouseY, springConfig);

	useEffect(() => {
		setMounted(true);

		if (shouldReduceMotion) return;

		const handleMouseMove = (e: MouseEvent) => {
			const centerX = window.innerWidth / 2;
			const centerY = window.innerHeight / 2;
			mouseX.set((e.clientX - centerX) * 0.03);
			mouseY.set((e.clientY - centerY) * 0.03);
		};

		window.addEventListener("mousemove", handleMouseMove);
		return () => window.removeEventListener("mousemove", handleMouseMove);
	}, [mouseX, mouseY, shouldReduceMotion]);

	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start start", "end start"],
	});

	const smoothProgress = useSpring(scrollYProgress, {
		stiffness: 40,
		damping: 15,
	});

	const contentY = useTransform(smoothProgress, [0, 1], ["0%", "20%"]);
	const contentOpacity = useTransform(smoothProgress, [0, 0.5], [1, 0]);
	const bgScale = useTransform(smoothProgress, [0, 1], [1, 1.2]);

	return (
		<section
			ref={sectionRef}
			className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden"
		>
			{/* Animated gradient background */}
			<motion.div
				className="pointer-events-none absolute inset-0"
				style={shouldReduceMotion ? undefined : { scale: bgScale }}
			>
				{mounted && (
					<motion.div
						className="absolute inset-0"
						style={shouldReduceMotion ? undefined : { x: orbX, y: orbY }}
					>
						<GlowOrb
							color="oklch(0.7 0.28 25 / 0.2)"
							size={600}
							x="15%"
							y="10%"
							blur={120}
							delay={0}
						/>
						<GlowOrb
							color="oklch(0.72 0.22 40 / 0.15)"
							size={500}
							x="55%"
							y="20%"
							blur={100}
							delay={0.1}
						/>
						<GlowOrb
							color="oklch(0.78 0.18 175 / 0.15)"
							size={550}
							x="30%"
							y="50%"
							blur={110}
							delay={0.2}
						/>
					</motion.div>
				)}
			</motion.div>

			{/* Grid pattern */}
			<div
				className="pointer-events-none absolute inset-0 opacity-[0.025]"
				style={{
					backgroundImage:
						"linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
					backgroundSize: "80px 80px",
				}}
			/>

			{/* Main content */}
			<motion.div
				className="relative z-10 px-6 text-center"
				style={
					shouldReduceMotion
						? undefined
						: {
								y: contentY,
								opacity: contentOpacity,
							}
				}
			>
				{/* Eyebrow */}
				<FloatIn delay={0.2} className="mb-12">
					<p className="text-[10px] font-medium uppercase tracking-[0.4em] text-muted-foreground/70">
						Full-Stack TypeScript Template
					</p>
				</FloatIn>

				{/* Main headline with glitch effect */}
				<div className="mb-6 space-y-1">
					<GlitchText
						delay={0.4}
						color="text-tanstack"
						glowColor="oklch(0.7 0.28 25 / 0.5)"
					>
						TanStack Start
					</GlitchText>
					<GlitchText
						delay={0.6}
						color="text-hono"
						glowColor="oklch(0.72 0.22 40 / 0.5)"
					>
						Hono
					</GlitchText>
					<GlitchText
						delay={0.8}
						color="text-turso"
						glowColor="oklch(0.78 0.18 175 / 0.5)"
					>
						Turso
					</GlitchText>
				</div>

				{/* Accent line */}
				<div className="my-10">
					<AnimatedLine delay={1.0} />
				</div>

				{/* Subtitle */}
				<FloatIn delay={1.2} className="mb-12">
					<p className="mx-auto max-w-md text-base leading-relaxed tracking-wide text-muted-foreground">
						データベースからUIまで、完全な型安全を実現する
						<br />
						モダンなフルスタックテンプレート
					</p>
				</FloatIn>

				{/* CTA */}
				<FloatIn
					delay={1.4}
					className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
				>
					<Button
						size="lg"
						className="group relative min-w-[180px] overflow-hidden rounded-full bg-foreground text-background transition-transform duration-300 hover:scale-105"
						onPress={copyToClipboard}
					>
						<span className="relative z-10">Get Started</span>
						<div
							className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
							style={{
								background:
									"linear-gradient(135deg, oklch(0.7 0.28 25), oklch(0.72 0.22 40), oklch(0.78 0.18 175))",
							}}
						/>
					</Button>
					<Button
						asChild
						size="lg"
						variant="outline"
						className="min-w-[180px] cursor-pointer rounded-full border-muted-foreground/30 transition-all duration-300 hover:border-foreground/60 hover:bg-foreground/5"
					>
						<a
							href="https://github.com/nayukata/turbo-template-tanstack-hono"
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center gap-2"
						>
							<GitHubIcon className="h-5 w-5" />
							GitHub
						</a>
					</Button>
				</FloatIn>
			</motion.div>
		</section>
	);
}
