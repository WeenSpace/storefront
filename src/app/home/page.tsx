import HeroSection from "./HeroSection";
import CategorySection from "./CategorySection";
import FeaturedDestinations from "./FeaturedDestinations";
import PopularExperiences from "./PopularExperiences";
import TestimonialsSection from "./TestimonialsSection";

export const metadata = {
	title: "ACME Storefront, powered by Saleor & Next.js",
	description:
		"Storefront Next.js Example for building performant e-commerce experiences with Saleor - the composable, headless commerce platform for global brands.",
};

export default function Page() {
	return (
		<main className="min-h-screen bg-white">
			<HeroSection />
			<CategorySection />
			<FeaturedDestinations />
			<PopularExperiences />
			<TestimonialsSection />
		</main>
	);
}
