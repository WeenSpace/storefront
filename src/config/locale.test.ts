import { afterEach, describe, expect, it, vi } from "vitest";
import {
	getDefaultCurrencyCode,
	getGraphqlLanguageCode,
	LOCALE_DEFINITIONS,
	getStorefrontLocaleSlugs,
	isLocaleSlug,
	isStorefrontLocaleSlug,
} from "./locale";

describe("isStorefrontLocaleSlug", () => {
	afterEach(() => {
		vi.unstubAllEnvs();
	});

	it("accepts slugs in NEXT_PUBLIC_STOREFRONT_LOCALES", () => {
		vi.stubEnv("NEXT_PUBLIC_STOREFRONT_LOCALES", "en,pl");
		expect(isStorefrontLocaleSlug("en")).toBe(true);
		expect(isStorefrontLocaleSlug("pl")).toBe(true);
	});

	it("rejects defined locales outside the allowlist", () => {
		vi.stubEnv("NEXT_PUBLIC_STOREFRONT_LOCALES", "en");
		expect(isLocaleSlug("de")).toBe(true);
		expect(isStorefrontLocaleSlug("de")).toBe(false);
	});

	it("defaults to a single locale when NEXT_PUBLIC_STOREFRONT_LOCALES is unset", () => {
		expect(getStorefrontLocaleSlugs()).toEqual(["en"]);
		expect(isStorefrontLocaleSlug("en")).toBe(true);
		expect(isStorefrontLocaleSlug("pl")).toBe(false);
	});
});

describe("getGraphqlLanguageCode", () => {
	it("maps URL slugs to Saleor base language codes (not regional variants)", () => {
		expect(getGraphqlLanguageCode("en")).toBe("EN");
		expect(getGraphqlLanguageCode("pl")).toBe("PL");
		expect(getGraphqlLanguageCode("de")).toBe("DE");
		expect(getGraphqlLanguageCode("fr")).toBe("FR");
		expect(getGraphqlLanguageCode("fi")).toBe("FI");
		expect(getGraphqlLanguageCode("nb")).toBe("NB");
		expect(getGraphqlLanguageCode("ja")).toBe("JA");
		expect(getGraphqlLanguageCode("ko")).toBe("KO");
	});
});

describe("getDefaultCurrencyCode", () => {
	it("resolves the configured currency for every locale", () => {
		for (const locale of Object.keys(LOCALE_DEFINITIONS)) {
			expect(getDefaultCurrencyCode(locale)).toBe("USD");
		}
	});

	it("uses the default locale currency for an unknown locale", () => {
		expect(getDefaultCurrencyCode("unknown")).toBe("USD");
	});
});
