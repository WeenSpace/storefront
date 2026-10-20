import { afterEach, describe, expect, it, vi } from "vitest";
import {
	getConfiguredLocaleChannelPairs,
	getUniqueLocaleForLegacyChannel,
	getLocalesForChannel,
	getPairedChannelForLocale,
	isAllowedLocaleChannelPair,
	isConfiguredLocaleChannelPair,
} from "./locale-channel";

describe("locale-channel pairs", () => {
	afterEach(() => {
		vi.unstubAllEnvs();
	});

	it("allows any pair when no matrix is configured", () => {
		expect(isAllowedLocaleChannelPair("en", "default-channel")).toBe(true);
		expect(isAllowedLocaleChannelPair("pl", "us")).toBe(true);
	});

	it("restricts to configured pairs", () => {
		vi.stubEnv("NEXT_PUBLIC_STOREFRONT_LOCALE_CHANNELS", "en:default-channel,pl:channel-pln");

		expect(getConfiguredLocaleChannelPairs()).toEqual([
			{ locale: "en", channel: "default-channel" },
			{ locale: "pl", channel: "channel-pln" },
		]);
		expect(isAllowedLocaleChannelPair("en", "default-channel")).toBe(true);
		expect(isAllowedLocaleChannelPair("pl", "channel-pln")).toBe(true);
		expect(isAllowedLocaleChannelPair("pl", "default-channel")).toBe(false);
	});

	it("ignores the non-public STOREFRONT_LOCALE_CHANNELS (must be NEXT_PUBLIC_)", () => {
		vi.stubEnv("STOREFRONT_LOCALE_CHANNELS", "en:default-channel,pl:channel-pln");

		expect(getConfiguredLocaleChannelPairs()).toBeNull();
		expect(isAllowedLocaleChannelPair("pl", "default-channel")).toBe(true);
	});

	it("resolves paired channel for locale when matrix is configured", () => {
		vi.stubEnv(
			"NEXT_PUBLIC_STOREFRONT_LOCALE_CHANNELS",
			"en:default-channel,pl:channel-pln,nb:default-channel",
		);

		expect(getPairedChannelForLocale("pl", "default-channel")).toBe("channel-pln");
		expect(getPairedChannelForLocale("en", "channel-pln")).toBe("default-channel");
		expect(getPairedChannelForLocale("de", "default-channel")).toBe("default-channel");
	});

	it("lists locales allowed for a channel when matrix is configured", () => {
		vi.stubEnv(
			"NEXT_PUBLIC_STOREFRONT_LOCALE_CHANNELS",
			"en:default-channel,pl:channel-pln,nb:default-channel",
		);

		expect(getLocalesForChannel("default-channel")).toEqual(["en", "nb"]);
		expect(getLocalesForChannel("channel-pln")).toEqual(["pl"]);
	});

	it("resolves legacy channel routes only for one explicitly mapped locale", () => {
		vi.stubEnv("NEXT_PUBLIC_STOREFRONT_LOCALE_CHANNELS", "en:default-channel,pl:channel-pln");

		expect(getUniqueLocaleForLegacyChannel("channel-pln")).toBe("pl");
		expect(getUniqueLocaleForLegacyChannel("unknown")).toBeNull();
		expect(isConfiguredLocaleChannelPair("pl", "channel-pln")).toBe(true);
		expect(isConfiguredLocaleChannelPair("en", "channel-pln")).toBe(false);
	});

	it("does not guess a locale when a legacy channel maps to multiple locales", () => {
		vi.stubEnv("NEXT_PUBLIC_STOREFRONT_LOCALE_CHANNELS", "en:shared,pl:shared");

		expect(getUniqueLocaleForLegacyChannel("shared")).toBeNull();
	});
});
