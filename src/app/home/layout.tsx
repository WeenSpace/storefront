import { type ReactNode } from "react";
import { Footer } from "@/ui/components/Footer";
import { Header } from "@/ui/components/Header";

export const metadata = {
	title: "Saleor Storefront example",
	description: "Starter pack for building performant e-commerce experiences with Saleor.",
};

const DEAULT_CHANNEL = "default-channel"; // Default channel for the storefront

export default function RootLayout(props: { children: ReactNode; params: { channel: string } }) {
	return (
		<>
			<Header channel={DEAULT_CHANNEL} />
			<div className="flex min-h-[calc(100dvh-64px)] flex-col">
				<main className="flex-1">{props.children}</main>
			</div>
			<Footer channel={DEAULT_CHANNEL} />
		</>
	);
}
