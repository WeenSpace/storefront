import { type ReactNode, Suspense } from "react";
import { Footer } from "@/ui/components/footer";
import { Header } from "@/ui/components/header";

export const metadata = {
	title: "Saleor Storefront example",
	description: "Starter pack for building performant e-commerce experiences with Saleor.",
};

const DEAULT_CHANNEL = "default-channel"; // Default channel for the storefront

export default function RootLayout(props: { children: ReactNode }) {
	return (
		<>
			<Suspense>
				<Header channel={DEAULT_CHANNEL} />
			</Suspense>
			<div className="flex min-h-[calc(100dvh-64px)] flex-col">
				<main className="flex-1">{props.children}</main>
			</div>
			<Suspense>
				<Footer channel={DEAULT_CHANNEL} />
			</Suspense>
		</>
	);
}
