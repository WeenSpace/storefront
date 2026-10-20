import { redirect } from "next/navigation";
import { DefaultCurrency } from "@/app/config";
import { buildStorefrontPath } from "@/lib/storefront-path";

type Props = {
	params: Promise<{ locale: string }>;
};

/**
 * Redirect legacy /orders route to the new /account/orders route.
 */
export default async function LegacyOrdersPage({ params }: Props) {
	const { locale } = await params;
	redirect(buildStorefrontPath(locale, DefaultCurrency, "/account/orders"));
}
