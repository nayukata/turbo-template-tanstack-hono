"use client";

import {
	Button as AriaButton,
	type ButtonProps as AriaButtonProps,
} from "react-aria-components";
import { tv, type VariantProps } from "tailwind-variants";

export const buttonVariants = tv({
	base: "inline-flex cursor-pointer items-center justify-center rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
	variants: {
		variant: {
			default:
				"bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 hover:shadow-md",
			destructive:
				"bg-destructive text-destructive-foreground hover:bg-destructive/90",
			outline:
				"border border-border bg-transparent text-foreground hover:bg-surface-2 hover:border-muted",
			secondary: "bg-surface-2 text-foreground hover:bg-surface-3",
			ghost: "text-muted-foreground hover:text-foreground hover:bg-surface-1",
			link: "text-foreground underline-offset-4 hover:underline",
		},
		size: {
			default: "h-10 px-5 py-2",
			sm: "h-9 px-4 text-xs",
			lg: "h-12 px-8 text-base",
			icon: "h-10 w-10",
		},
	},
	defaultVariants: {
		variant: "default",
		size: "default",
	},
});

type ButtonProps = AriaButtonProps & VariantProps<typeof buttonVariants>;

export function Button({ className, variant, size, ...props }: ButtonProps) {
	return (
		<AriaButton
			className={(renderProps) =>
				buttonVariants({
					variant,
					size,
					className:
						typeof className === "function"
							? className(renderProps)
							: className,
				})
			}
			{...props}
		/>
	);
}
