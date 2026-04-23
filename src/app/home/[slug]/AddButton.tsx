"use client";

import { useFormStatus } from "react-dom";

export function AddButton({ disabled }: { disabled: boolean }) {
	const { pending } = useFormStatus();

	return (
		<button
			type="submit"
			disabled={disabled || pending}
			aria-disabled={disabled || pending}
			className="rounded-md border bg-neutral-900 px-8 py-3 text-lg text-white hover:bg-neutral-800 disabled:cursor-not-allowed disabled:bg-neutral-500 disabled:hover:bg-neutral-500"
		>
			{pending ? "Adding to cart..." : "Add to cart"}
		</button>
	);
}
