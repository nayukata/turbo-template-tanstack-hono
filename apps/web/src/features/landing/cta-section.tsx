"use client";

import { Button } from "@repo/ui/button";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";

export function CTASection() {
	const sectionRef = useRef<HTMLElement>(null);
	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start end", "end start"],
	});

	const smoothProgress = useSpring(scrollYProgress, {
		stiffness: 100,
		damping: 30,
	});

	const y = useTransform(smoothProgress, [0, 0.5], [60, 0]);
	const opacity = useTransform(smoothProgress, [0, 0.3], [0, 1]);
	const scale = useTransform(smoothProgress, [0, 0.5], [0.95, 1]);

	return (
		<section
			ref={sectionRef}
			className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-24"
		>
			{/* Background gradient */}
			<div className="absolute inset-0">
				<div className="absolute inset-0 bg-gradient-to-b from-background via-surface-1 to-background" />
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-foreground/5 blur-[150px]" />
			</div>

			{/* Grid pattern */}
			<div
				className="pointer-events-none absolute inset-0 opacity-[0.02]"
				style={{
					backgroundImage:
						"linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
					backgroundSize: "60px 60px",
				}}
			/>

			<motion.div
				className="relative z-10 text-center"
				style={{ y, opacity, scale }}
			>
				{/* Heading */}
				<motion.h2
					className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
					viewport={{ once: false }}
				>
					<span className="text-foreground">Ready to </span>
					<span
						className="bg-gradient-to-r from-tanstack via-hono to-turso bg-clip-text text-transparent"
						style={{
							backgroundSize: "200% 200%",
						}}
					>
						Build?
					</span>
				</motion.h2>

				<motion.p
					className="mx-auto mb-10 max-w-md text-sm text-muted-foreground md:text-base"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
					viewport={{ once: false }}
				>
					1つのコマンドで、型安全なフルスタック開発を始められます
				</motion.p>

				{/* Terminal */}
				<motion.div
					className="mx-auto mb-10 max-w-lg overflow-hidden rounded-xl border border-border/50 bg-surface-1"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
					viewport={{ once: false }}
				>
					<div className="flex items-center gap-2 border-b border-border/50 bg-surface-2 px-4 py-3">
						<div className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
						<div className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
						<div className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
						<span className="ml-3 text-[10px] uppercase tracking-wider text-muted-foreground">
							terminal
						</span>
					</div>
					<div className="px-5 py-4 font-mono text-sm">
						<span className="text-muted-foreground">$</span>{" "}
						<span className="text-foreground">
							npx create-turbo@latest -e with-hono-turso
						</span>
					</div>
				</motion.div>

				{/* CTAs */}
				<motion.div
					className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
					viewport={{ once: false }}
				>
					<Button
						size="lg"
						className="min-w-[200px] rounded-full bg-foreground text-background hover:bg-foreground/90"
					>
						Use Template
					</Button>
					<Button
						size="lg"
						variant="outline"
						className="min-w-[200px] rounded-full border-muted-foreground/30 hover:border-foreground/50"
					>
						View Source
					</Button>
				</motion.div>
			</motion.div>

			{/* Footer */}
			<motion.div
				className="absolute bottom-8 left-0 right-0"
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				transition={{ duration: 0.8, delay: 0.5 }}
				viewport={{ once: false }}
			>
				<p className="text-center text-xs tracking-wider text-muted-foreground">
					Built with <span className="text-tanstack">TanStack</span>
					{" + "}
					<span className="text-hono">Hono</span>
					{" + "}
					<span className="text-turso">Turso</span>
				</p>
			</motion.div>
		</section>
	);
}
