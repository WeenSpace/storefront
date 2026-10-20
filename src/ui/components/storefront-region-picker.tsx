"use client";

import type { ReactNode } from "react";
import { Check, ChevronDown, Globe, Languages } from "lucide-react";
import { useTranslations } from "next-intl";
import type { LocaleSelectOption } from "@/lib/locale-display";
import { useStorefrontRegionNavigation } from "@/hooks/use-storefront-region-navigation";
import { cn } from "@/lib/utils";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
} from "@/ui/components/ui/dropdown-menu";

type StorefrontRegionPickerProps = Readonly<{
	locales: LocaleSelectOption[];
	variant?: "default" | "inverted";
	className?: string;
}>;

function PickerSection({
	icon: Icon,
	title,
	children,
}: Readonly<{
	icon: typeof Globe;
	title: string;
	children: ReactNode;
}>) {
	return (
		<section className="min-w-0">
			<div className="mb-2 flex items-start gap-2 px-2">
				<Icon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
				<p className="text-xs font-semibold uppercase tracking-wider text-foreground">{title}</p>
			</div>
			{children}
		</section>
	);
}

function OptionRow({ label, selected }: Readonly<{ label: string; selected?: boolean }>) {
	return (
		<span className="flex min-w-0 flex-1 items-center gap-3">
			<span className="min-w-0 flex-1 truncate font-medium">{label}</span>
			{hint ? (
				<span className="min-w-8 shrink-0 text-right text-xs tabular-nums text-muted-foreground">{hint}</span>
			) : null}
			<span className="flex h-4 w-4 shrink-0 items-center justify-center" aria-hidden>
				{selected ? <Check className="h-4 w-4 text-foreground" /> : null}
			</span>
		</span>
	);
}

export function StorefrontRegionPicker({
	locales,
	variant = "default",
	className,
}: StorefrontRegionPickerProps) {
	const { locale, navigateToLocale } = useStorefrontRegionNavigation();
	const t = useTranslations("nav.regionPicker");

	const showLanguage = locales.length > 1;
	const summary = locales.find((item) => item.slug === locale)?.label ?? t("languageTitle");

	if (!showLanguage) {
		return null;
	}

	const inverted = variant === "inverted";

	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				className={cn(
					"group inline-flex max-w-full items-center gap-2.5 rounded-full border px-4 py-2.5 text-sm transition-all",
					"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
					inverted
						? "border-inverse/20 bg-background/5 text-inverse-subtle hover:border-inverse/35 hover:bg-background/10 hover:text-inverse focus-visible:ring-background/40 focus-visible:ring-offset-foreground"
						: "border-border bg-background text-foreground shadow-sm hover:border-border/80 hover:bg-secondary/60 focus-visible:ring-ring focus-visible:ring-offset-background",
					className,
				)}
				aria-label={t("ariaLabel")}
			>
				<Globe
					className={cn(
						"h-4 w-4 shrink-0 transition-transform group-data-[state=open]:rotate-12",
						inverted ? "opacity-80" : "text-muted-foreground",
					)}
					aria-hidden
				/>
				<span className="truncate font-medium">{summary}</span>
				<ChevronDown
					className={cn(
						"h-4 w-4 shrink-0 transition-transform group-data-[state=open]:rotate-180",
						inverted ? "opacity-60" : "text-muted-foreground",
					)}
					aria-hidden
				/>
			</DropdownMenuTrigger>

			<DropdownMenuContent
				align="start"
				side="top"
				sideOffset={10}
				collisionPadding={16}
				className={cn("w-[min(calc(100vw-2rem),24rem)] rounded-xl border p-3 shadow-lg")}
			>
				<PickerSection icon={Languages} title={t("languageTitle")}>
					<DropdownMenuGroup>
						<DropdownMenuRadioGroup value={locale} onValueChange={navigateToLocale}>
							{locales.map((item) => (
								<DropdownMenuRadioItem
									key={item.slug}
									value={item.slug}
									lang={item.slug}
									className="my-0.5 rounded-lg py-2.5 pl-3 pr-3 data-[state=checked]:bg-accent/60 [&>span:first-child]:hidden"
								>
									<OptionRow label={item.label} selected={item.slug === locale} />
								</DropdownMenuRadioItem>
							))}
						</DropdownMenuRadioGroup>
					</DropdownMenuGroup>
				</PickerSection>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
