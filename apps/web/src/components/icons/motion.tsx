import type { SVGProps } from "react";

export function MotionIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg viewBox="0 0 128 128" aria-hidden="true" {...props}>
			<defs>
				<linearGradient id="motion__a" x1="0%" y1="0%" x2="100%" y2="100%">
					<stop offset="0%" stopColor="#ff0080" />
					<stop offset="100%" stopColor="#7928ca" />
				</linearGradient>
			</defs>
			<rect width="128" height="128" rx="24" fill="url(#motion__a)" />
			<path
				fill="#fff"
				d="M44 40h8l20 24-20 24h-8l20-24zm20 0h8l20 24-20 24h-8l20-24z"
			/>
		</svg>
	);
}
