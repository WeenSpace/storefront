import { afterEach, describe, expect, it, vi } from "vitest";
import { buildLocaleHreflangAlternates } from "./hreflang";

describe("buildLocaleHreflangAlternates", () => {
	afterEach(() => {
		vi.unstubAllEnvs();
	});

	it("builds locale-defined BCP 47 hreflang keys without channel routing", () => {
		vi.stubEnv("NEXT_PUBLIC_STOREFRONT_LOCALES", "en,pl");
		vi.stubEnv("STOREFRONT_CHANNELS", "default-channel");

		expect(buildLocaleHreflangAlternates("default-channel", "/products/hoodie")).toEqual({
			"en-US": "/en/products/hoodie",
			"pl-PL": "/pl/products/hoodie",
			"x-default": "/en/products/hoodie",
		});
	});

	it("keeps locale-only alternates when legacy locale-channel mappings are configured", () => {
		vi.stubEnv("NEXT_PUBLIC_STOREFRONT_LOCALES", "en,pl,ja");
		vi.stubEnv("STOREFRONT_CHANNELS", "default-channel,channel-pln,japan");
		vi.stubEnv("NEXT_PUBLIC_STOREFRONT_LOCALE_CHANNELS", "en:default-channel,pl:channel-pln,ja:japan");

		expect(buildLocaleHreflangAlternates("default-channel", "/products/hoodie")).toEqual({
			"en-US": "/en/products/hoodie",
			"pl-PL": "/pl/products/hoodie",
			"ja-JP": "/ja/products/hoodie",
			"x-default": "/en/products/hoodie",
		});
	});

	it("uses per-locale path suffixes for translated catalog slugs", () => {
		vi.stubEnv("NEXT_PUBLIC_STOREFRONT_LOCALES", "en,pl");
		vi.stubEnv("NEXT_PUBLIC_DEFAULT_LOCALE", "en");
		vi.stubEnv("STOREFRONT_CHANNELS", "default-channel");

		expect(
			buildLocaleHreflangAlternates("default-channel", {
				en: "/products/hoodie",
				pl: "/products/bluza",
			}),
		).toEqual({
			"en-US": "/en/products/hoodie",
			"pl-PL": "/pl/products/bluza",
			"x-default": "/en/products/hoodie",
		});
	});
});
