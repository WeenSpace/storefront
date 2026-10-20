"use client";

import { useParams, usePathname } from "next/navigation";
import { stripStorefrontPrefix } from "@/lib/storefront-path";

function useSelectedPathname() {
	const pathname = usePathname();
	const { locale } = useParams<{ locale?: string }>();

	if (locale) {
		return stripStorefrontPrefix(pathname, locale);
	}

	return pathname;
}

export default useSelectedPathname;
