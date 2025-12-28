"use client";

import {
	Dialog as AriaDialog,
	type DialogProps,
	DialogTrigger,
	Heading,
	Modal,
	ModalOverlay,
	type ModalOverlayProps,
} from "react-aria-components";
import { tv } from "tailwind-variants";

const dialogVariants = tv({
	slots: {
		overlay:
			"fixed inset-0 z-50 bg-black/80 data-[entering]:animate-in data-[exiting]:animate-out data-[entering]:fade-in-0 data-[exiting]:fade-out-0",
		modal:
			"fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 border bg-background p-6 shadow-lg duration-200 data-[entering]:animate-in data-[exiting]:animate-out data-[entering]:fade-in-0 data-[exiting]:fade-out-0 data-[entering]:zoom-in-95 data-[exiting]:zoom-out-95 sm:rounded-lg",
		content: "flex flex-col gap-4",
		header: "flex flex-col gap-1.5 text-center sm:text-left",
		footer: "flex flex-col-reverse sm:flex-row sm:justify-end sm:gap-2",
		title: "text-lg font-semibold leading-none tracking-tight",
		description: "text-sm text-muted-foreground",
	},
});

type DialogRootProps = ModalOverlayProps & {
	children: React.ReactNode;
};

function DialogRoot({ children, ...props }: DialogRootProps) {
	const styles = dialogVariants();

	return (
		<ModalOverlay className={styles.overlay()} {...props}>
			<Modal className={styles.modal()}>{children}</Modal>
		</ModalOverlay>
	);
}

function DialogContent({ children, ...props }: DialogProps) {
	const styles = dialogVariants();
	return (
		<AriaDialog className={styles.content()} {...props}>
			{children}
		</AriaDialog>
	);
}

function DialogHeader({ children }: { children: React.ReactNode }) {
	const styles = dialogVariants();
	return <div className={styles.header()}>{children}</div>;
}

function DialogFooter({ children }: { children: React.ReactNode }) {
	const styles = dialogVariants();
	return <div className={styles.footer()}>{children}</div>;
}

function DialogTitle({ children }: { children: React.ReactNode }) {
	const styles = dialogVariants();
	return (
		<Heading slot="title" className={styles.title()}>
			{children}
		</Heading>
	);
}

function DialogDescription({ children }: { children: React.ReactNode }) {
	const styles = dialogVariants();
	return <p className={styles.description()}>{children}</p>;
}

export const Dialog = {
	Root: DialogRoot,
	Trigger: DialogTrigger,
	Content: DialogContent,
	Header: DialogHeader,
	Footer: DialogFooter,
	Title: DialogTitle,
	Description: DialogDescription,
};
