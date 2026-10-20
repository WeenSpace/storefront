import { describe, expect, it } from "vitest";
import {
	buildStorefrontPath,
	parseStorefrontPathname,
	replaceStorefrontChannel,
	replaceStorefrontLocale,
	stripStorefrontPrefix,
} from "./storefront-path";

describe("storefront-path", () => {
	it("builds browse paths", () => {
		expect(buildStorefrontPath("en", "USD")).toBe("/en");
		expect(buildStorefrontPath("en", "USD", "/products/hoodie")).toBe("/en/products/hoodie");
	});

	it("parses browse paths", () => {
		expect(parseStorefrontPathname("/en/products/hoodie")).toEqual({
			locale: "en",
			currency: "USD",
			suffix: "/products/hoodie",
		});
		expect(parseStorefrontPathname("/en")).toEqual({
			locale: "en",
			currency: "USD",
			suffix: "",
		});
		expect(parseStorefrontPathname("/")).toBeNull();
	});

	it("resolves currency from locale configuration without adding it to the path", () => {
		expect(parseStorefrontPathname("/pl/produkty/buty")).toEqual({
			locale: "pl",
			currency: "USD",
			suffix: "/produkty/buty",
		});
	});

	it("swaps channel while preserving locale and suffix", () => {
		expect(replaceStorefrontChannel("/en/products/hoodie", "EUR")).toBe("/en/products/hoodie");
	});

	it("swaps locale while preserving channel and suffix", () => {
		expect(replaceStorefrontLocale("/en/products/hoodie", "pl")).toBe("/pl/products/hoodie");
	});

	it("strips locale/channel prefix", () => {
		expect(stripStorefrontPrefix("/en/products", "en")).toBe("/products");
		expect(stripStorefrontPrefix("/en", "en")).toBe("/");
	});
});
