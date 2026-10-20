/**
 * Storefront channel configuration.
 *
 * Saleor may have many channels (B2B, internal, regional) that should not all
 * become storefront routes. Prefer an explicit allowlist via STOREFRONT_CHANNELS.
 *
 * Resolution order (see getStorefrontChannelSlugs in channel-slugs.ts):
 * 1. STOREFRONT_CHANNELS — comma-separated allowlist (recommended for production)
 * 2. STOREFRONT_DISCOVER_CHANNELS=true + SALEOR_APP_TOKEN — fetch all active from API
 * 3. No public fallback — currency is the storefront selector.
 */

function parseEnvChannelList(raw: string | undefined): string[] | null {
	if (!raw?.trim()) return null;

	const slugs = raw
		.split(",")
		.map((slug) => slug.trim())
		.filter(Boolean);

	return slugs.length > 0 ? [...new Set(slugs)] : null;
}

/** Explicit storefront allowlist from STOREFRONT_CHANNELS, if set. */
export function getConfiguredStorefrontChannelSlugs(): string[] | null {
	return parseEnvChannelList(process.env.STOREFRONT_CHANNELS);
}

/** Opt-in API discovery — off by default to avoid exposing every Saleor channel. */
export function isStorefrontChannelDiscoveryEnabled(): boolean {
	const value = process.env.STOREFRONT_DISCOVER_CHANNELS;
	return value === "true" || value === "1";
}

/** True when channel slugs must be resolved via Saleor API (no static allowlist). */
export function needsAsyncChannelDiscovery(): boolean {
	return (
		!getConfiguredStorefrontChannelSlugs() &&
		isStorefrontChannelDiscoveryEnabled() &&
		Boolean(process.env.SALEOR_APP_TOKEN)
	);
}

/** Sync resolution for internal Saleor compatibility only. */
export function getStaticStorefrontChannelSlugs(): string[] {
	const configured = getConfiguredStorefrontChannelSlugs();
	return configured ?? [];
}

export function isAllowedStorefrontChannel(slug: string, allowedSlugs: readonly string[]): boolean {
	return allowedSlugs.includes(slug);
}

export function filterToStorefrontChannels<T extends { slug: string; isActive?: boolean | null }>(
	channels: T[],
	allowedSlugs: readonly string[],
): T[] {
	const allowed = new Set(allowedSlugs);
	return channels.filter((channel) => channel.isActive !== false && allowed.has(channel.slug));
}

export type ChannelSelectOption = {
	id: string;
	name: string;
	slug: string;
	currencyCode: string;
};

/** Active storefront channels only — slim shape for the footer client selector. */
export function toChannelSelectOptions(
	channels: Array<ChannelSelectOption & { isActive?: boolean | null }>,
	allowedSlugs: readonly string[],
): ChannelSelectOption[] {
	return filterToStorefrontChannels(channels, allowedSlugs).map(({ id, name, slug, currencyCode }) => ({
		id,
		name,
		slug,
		currencyCode,
	}));
}

/** Whether the footer needs channel metadata from Saleor (multi-channel + app token). */
export function shouldFetchChannelMetadata(allowedSlugs: readonly string[]): boolean {
	return allowedSlugs.length > 1 && Boolean(process.env.SALEOR_APP_TOKEN);
}
