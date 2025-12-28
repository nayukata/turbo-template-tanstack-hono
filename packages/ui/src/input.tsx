"use client";

import {
	Input as AriaInput,
	FieldError,
	Label,
	Text,
	TextField,
	type TextFieldProps,
} from "react-aria-components";
import { tv } from "tailwind-variants";

const inputVariants = tv({
	slots: {
		root: "flex flex-col gap-1.5",
		label: "text-sm font-medium leading-none",
		input:
			"flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
		description: "text-sm text-muted-foreground",
		error: "text-sm text-destructive",
	},
});

type InputProps = Omit<TextFieldProps, "className"> & {
	label?: string;
	description?: string;
	placeholder?: string;
	className?: string;
};

export function Input({
	label,
	description,
	placeholder,
	className,
	...props
}: InputProps) {
	const styles = inputVariants();

	return (
		<TextField className={styles.root({ className })} {...props}>
			{label && <Label className={styles.label()}>{label}</Label>}
			<AriaInput className={styles.input()} placeholder={placeholder} />
			{description && (
				<Text slot="description" className={styles.description()}>
					{description}
				</Text>
			)}
			<FieldError className={styles.error()} />
		</TextField>
	);
}
