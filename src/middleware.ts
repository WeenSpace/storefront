import { type NextRequest, NextResponse } from "next/server";
import {
	getDefaultCurrencyCode,
	getDefaultLocaleSlug,
	isLocaleSlug,
	isStorefrontLocaleSlug,
} from "@/config/locale";
import { getUniqueLocaleForLegacyChannel, isConfiguredLocaleChannelPair } from "@/config/locale-channel";
import { BROWSE_LOCALE_COOKIE, getBrowseLocaleCookieOptions } from "@/lib/browse-locale";
import { buildStorefrontPath } from "@/lib/storefront-path";

const RESERVED_ROOT_SEGMENTS = new Set([
	"api",
	"checkout",
	"_next",
	"favicon.ico",
	"robots.txt",
	"sitemap.xml",
]);

const RESERVED_LOCALE_SEGMENTS = new Set([
	"account",
	"cart",
	"categories",
	"collections",
	"login",
	"orders",
	"pages",
	"products",
	"search",
	"signup",
]);

function withBrowseLocaleCookie(request: NextRequest, response: NextResponse, locale: string): NextResponse {
	if (!isStorefrontLocaleSlug(locale)) {
		return response;
	}

	// Skip Set-Cookie when the value is already correct — re-setting on every HTML response
	// marks responses as uncacheable at shared CDNs even when nothing changed.
	const current = request.cookies.get(BROWSE_LOCALE_COOKIE)?.value;
	if (current === locale) {
		return response;
	}

	response.cookies.set(BROWSE_LOCALE_COOKIE, locale, getBrowseLocaleCookieOptions());
	return response;
}

function redirectLegacyChannelPath(request: NextRequest, segments: string[]): NextResponse | null {
	const [first, second, ...rest] = segments;
	let locale: string | null = null;
	let suffixSegments: string[] = [];

	if (isStorefrontLocaleSlug(first)) {
		if (!second || RESERVED_LOCALE_SEGMENTS.has(second) || !isConfiguredLocaleChannelPair(first, second)) {
			return null;
		}
		locale = first;
		suffixSegments = rest;
	} else {
		locale = getUniqueLocaleForLegacyChannel(first);
		if (!locale || !isStorefrontLocaleSlug(locale)) return null;
		suffixSegments = [second, ...rest].filter((segment): segment is string => Boolean(segment));
	}

	const url = request.nextUrl.clone();
	const suffix = suffixSegments.length > 0 ? `/${suffixSegments.join("/")}` : "";
	url.pathname = buildStorefrontPath(locale, getDefaultCurrencyCode(locale), suffix);
	return withBrowseLocaleCookie(request, NextResponse.redirect(url, 308), locale);
}

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	if (
		pathname.startsWith("/_next") ||
		pathname.startsWith("/api") ||
		pathname.includes(".") // static files
	) {
		return NextResponse.next();
	}

	const segments = pathname.split("/").filter(Boolean);
	const defaultLocale = getDefaultLocaleSlug();

	// Root → default browse home
	if (segments.length === 0) {
		const url = request.nextUrl.clone();
		url.pathname = buildStorefrontPath(defaultLocale, getDefaultCurrencyCode(defaultLocale));
		return withBrowseLocaleCookie(request, NextResponse.redirect(url, 308), defaultLocale);
	}

	const [first] = segments;

	if (RESERVED_ROOT_SEGMENTS.has(first)) {
		return NextResponse.next();
	}

	// Disabled locale slug (defined but not in NEXT_PUBLIC_STOREFRONT_LOCALES) → canonical default locale
	if (isLocaleSlug(first) && !isStorefrontLocaleSlug(first)) {
		return NextResponse.next();
	}

	const legacyRedirect = redirectLegacyChannelPath(request, segments);
	if (legacyRedirect) {
		return legacyRedirect;
	}

	// Canonical format: /{locale}/…
	if (isStorefrontLocaleSlug(first)) {
		return withBrowseLocaleCookie(request, NextResponse.next(), first);
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/((?!_next/static|_next/image).*)"],
};
