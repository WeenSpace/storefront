import { type ReactNode } from "react";
import { notFound } from "next/navigation";
import { isStorefrontLocaleSlug } from "@/config/locale";

export default async function CurrencyLayout({
	children,
	params,
}: {
	children: ReactNode;
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;

	if (!isStorefrontLocaleSlug(locale)) {
		notFound();
	}

	return children;
}
