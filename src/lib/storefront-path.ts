import { getDefaultCurrencyCode } from "@/config/locale";

/** Helpers for locale-only `/{locale}/…` browse URLs and their configured currency context. */

export type StorefrontPathPrefix = {
	locale: string;
	currency: string;
	/** Path after currency, including leading slash — e.g. `/products/foo` or `` for homepage */
	suffix: string;
};

export function buildStorefrontPath(locale: string, currency: string, suffix = ""): string {
	const normalizedSuffix = suffix.startsWith("/") || suffix === "" ? suffix : `/${suffix}`;
	return `/${encodeURIComponent(locale)}${normalizedSuffix}`;
}

/**
 * Parse a pathname into locale + currency + suffix when it matches the browse prefix.
 */
export function parseStorefrontPathname(pathname: string): StorefrontPathPrefix | null {
	const segments = pathname.split("/").filter(Boolean);
	if (segments.length < 1) return null;

	const [localeSegment, ...rest] = segments;
	const locale = decodeURIComponent(localeSegment);
	return {
		locale,
		currency: getDefaultCurrencyCode(locale),
		suffix: rest.length > 0 ? `/${rest.join("/")}` : "",
	};
}

export function replaceStorefrontLocale(pathname: string, newLocale: string): string | null {
	const parsed = parseStorefrontPathname(pathname);
	if (!parsed) return null;
	return buildStorefrontPath(newLocale, parsed.currency, parsed.suffix);
}

/** Compatibility helper for internal Saleor channel callers; channel is not public URL state. */
export function replaceStorefrontChannel(pathname: string, _newChannel: string): string | null {
	const parsed = parseStorefrontPathname(pathname);
	return parsed ? buildStorefrontPath(parsed.locale, parsed.currency, parsed.suffix) : null;
}

/** Strip `/{locale}` for nav active-state matching. */
export function stripStorefrontPrefix(pathname: string, locale: string, _channel?: string): string {
	const prefix = `/${locale}`;
	if (pathname === prefix || pathname === `${prefix}/`) {
		return "/";
	}
	if (pathname.startsWith(`${prefix}/`)) {
		return pathname.slice(prefix.length);
	}
	return pathname;
}
