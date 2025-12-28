import type { SVGProps } from "react";

export function TanStackIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg viewBox="0 0 633 633" aria-hidden="true" {...props}>
			<defs>
				<linearGradient id="tanstack__b" x1="50%" x2="50%" y1="0%" y2="71.65%">
					<stop offset="0%" stopColor="#6BDAFF" />
					<stop offset="31.922%" stopColor="#F9FFB5" />
					<stop offset="70.627%" stopColor="#FFA770" />
					<stop offset="100%" stopColor="#FF7373" />
				</linearGradient>
			</defs>
			<circle cx="308.5" cy="308.5" r="308.5" fill="url(#tanstack__b)" />
			<ellipse
				cx="308.5"
				cy="720.5"
				fill="#6DA300"
				fillOpacity=".5"
				rx="266"
				ry="316.5"
				style={{ mixBlendMode: "multiply" }}
			/>
		</svg>
	);
}
