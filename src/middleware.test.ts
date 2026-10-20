import { afterEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
import { middleware } from "./middleware";

function request(pathname: string): NextRequest {
	return new NextRequest(new URL(pathname, "https://store.example"));
}

describe("storefront locale middleware", () => {
	afterEach(() => {
		vi.unstubAllEnvs();
	});

	it("redirects a legacy channel-first path to its unique locale", () => {
		vi.stubEnv("NEXT_PUBLIC_STOREFRONT_LOCALES", "en,pl");
		vi.stubEnv("NEXT_PUBLIC_STOREFRONT_LOCALE_CHANNELS", "en:default-channel,pl:channel-pln");

		const response = middleware(request("/channel-pln/products/shoes?sort=price"));

		expect(response.status).toBe(308);
		expect(response.headers.get("location")).toBe("https://store.example/pl/products/shoes?sort=price");
	});

	it("removes an explicit legacy channel segment after the locale", () => {
		vi.stubEnv("NEXT_PUBLIC_STOREFRONT_LOCALES", "en,pl");
		vi.stubEnv("NEXT_PUBLIC_STOREFRONT_LOCALE_CHANNELS", "en:default-channel,pl:channel-pln");

		const response = middleware(request("/pl/channel-pln/products/shoes"));

		expect(response.status).toBe(308);
		expect(response.headers.get("location")).toBe("https://store.example/pl/products/shoes");
	});

	it("does not redirect a channel mapped to multiple locales", () => {
		vi.stubEnv("NEXT_PUBLIC_STOREFRONT_LOCALES", "en,pl");
		vi.stubEnv("NEXT_PUBLIC_STOREFRONT_LOCALE_CHANNELS", "en:shared,pl:shared");

		const response = middleware(request("/shared/products/shoes"));

		expect(response.status).toBe(200);
		expect(response.headers.get("location")).toBeNull();
	});

	it("does not treat a canonical route segment as a legacy channel", () => {
		vi.stubEnv("NEXT_PUBLIC_STOREFRONT_LOCALES", "en,pl");
		vi.stubEnv("NEXT_PUBLIC_STOREFRONT_LOCALE_CHANNELS", "en:products,pl:channel-pln");

		const response = middleware(request("/en/products/shoes"));

		expect(response.status).toBe(200);
		expect(response.headers.get("location")).toBeNull();
	});
});
