import { createFileRoute } from "@tanstack/react-router";
import { CTASection } from "~/features/landing/cta-section";
import { HeroSection } from "~/features/landing/hero-section";
import { HonoSection } from "~/features/landing/hono-section";
import { TanStackSection } from "~/features/landing/tanstack-section";
import { TechMarquee } from "~/features/landing/tech-marquee";
import { TursoSection } from "~/features/landing/turso-section";

export const Route = createFileRoute("/")({
	component: Home,
});

function Home() {
	return (
		<main>
			<HeroSection />
			<TechMarquee />
			<TanStackSection />
			<HonoSection />
			<TursoSection />
			<CTASection />
		</main>
	);
}
