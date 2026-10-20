import {
	getDefaultCurrencyCode,
	getDefaultLocaleSlug,
	getLocaleDefinition,
	getStorefrontLocaleSlugs,
} from "@/config/locale";
import { buildStorefrontPath } from "@/lib/storefront-path";

/** Same suffix for every locale, or a per-locale suffix map (translated catalog slugs). */
export type HreflangPathInput = string | Record<string, string>;

function resolvePathSuffix(pathInput: HreflangPathInput, locale: string, fallbackSuffix: string): string {
	if (typeof pathInput === "string") return pathInput;
	return pathInput[locale] ?? pathInput[getDefaultLocaleSlug()] ?? fallbackSuffix;
}

/**
 * The locale definition is the source of hreflang identity. Channel mappings do not
 * participate because channels are no longer part of public route state.
 */
function getHreflangLanguageKey(locale: string): string | null {
	const definition = getLocaleDefinition(locale);
	return definition?.bcp47 ?? null;
}

/**
 * hreflang alternates for browse URLs.
 * Pass a single path suffix, or a per-locale map when catalog slugs are translated (ADR 0004).
 * Channel is retained as an ignored argument for existing metadata call sites during migration.
 * Includes `x-default` pointing at the configured default locale.
 */
export function buildLocaleHreflangAlternates(
	_channel: string,
	pathSuffix: HreflangPathInput,
): Record<string, string> {
	const languages: Record<string, string> = {};
	const fallbackSuffix = typeof pathSuffix === "string" ? pathSuffix : (Object.values(pathSuffix)[0] ?? "");

	for (const locale of getStorefrontLocaleSlugs()) {
		const languageKey = getHreflangLanguageKey(locale);
		if (!languageKey) continue;
		const suffix = resolvePathSuffix(pathSuffix, locale, fallbackSuffix);
		languages[languageKey] = buildStorefrontPath(locale, getDefaultCurrencyCode(locale), suffix);
	}

	const defaultLocale = getDefaultLocaleSlug();
	const xDefaultSuffix = resolvePathSuffix(pathSuffix, defaultLocale, fallbackSuffix);
	languages["x-default"] = buildStorefrontPath(
		defaultLocale,
		getDefaultCurrencyCode(defaultLocale),
		xDefaultSuffix,
	);

	return languages;
}
