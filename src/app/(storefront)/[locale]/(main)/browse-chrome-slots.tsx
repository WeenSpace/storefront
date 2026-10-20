import { Suspense } from "react";
import { DefaultCurrency } from "@/app/config";
import { getAnnouncementBarProps, getStorefrontContent } from "@/lib/content/server";
import { CartDrawerWrapper } from "@/ui/components/cart/cart-drawer-wrapper";
import { AnnouncementBar } from "@/ui/sections/announcement-bar/announcement-bar";
import { DismissibleAnnouncementBar } from "@/ui/sections/announcement-bar/announcement-bar-slot";

export type BrowseRouteParams = Promise<{ locale: string }>;

/** Cached announcement copy + policy interpolation; nested Suspense for dismiss cookie. */
export async function AnnouncementBarSlot({ params }: { params: BrowseRouteParams }) {
	const { locale } = await params;
	const announcement = await getAnnouncementBarProps(DefaultCurrency, locale);

	if (!announcement.message.trim()) {
		return null;
	}

	const props = {
		id: announcement.id,
		message: announcement.message,
		href: announcement.href,
		linkLabel: announcement.linkLabel,
		dismissible: announcement.dismissible,
	};

	if (!props.dismissible) {
		return <AnnouncementBar {...props} />;
	}

	return (
		<Suspense fallback={<AnnouncementBar {...props} />}>
			<DismissibleAnnouncementBar {...props} />
		</Suspense>
	);
}

/**
 * Cart drawer surface copy (cached) + live checkout (cookies).
 * `getStorefrontContent` is also called in Header/Footer/getAnnouncementBarProps — all
 * `"use cache"` with the same key; Next.js dedupes per request, not four Saleor round-trips.
 */
export async function CartDrawerSlot({ params }: { params: BrowseRouteParams }) {
	const { locale: localeSlug } = await params;
	const content = await getStorefrontContent(DefaultCurrency, localeSlug);

	return (
		<CartDrawerWrapper
			channel={DefaultCurrency}
			localeSlug={localeSlug}
			cart={content.surfaces.cart}
			policies={content.policies}
		/>
	);
}
