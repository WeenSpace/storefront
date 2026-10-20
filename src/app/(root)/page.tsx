import { redirect } from "next/navigation";
import { getDefaultLocaleSlug } from "@/config/locale";
import { buildStorefrontPath } from "@/lib/storefront-path";
import { DefaultCurrency } from "@/app/config";

export default function RootPage() {
	redirect(buildStorefrontPath(getDefaultLocaleSlug(), DefaultCurrency));
}
