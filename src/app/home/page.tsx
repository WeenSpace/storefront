import { ProductListByCollectionDocument } from "@/gql/graphql";
import { executeGraphQL } from "@/lib/graphql";
import { ProductList } from "@/ui/components/ProductList";
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

export default async function Page({ params }: { params: { channel: string } }) {
	console.log("Channel:", params.channel);
	const data = await executeGraphQL(ProductListByCollectionDocument, {
		variables: {
			slug: "featured-products",
			channel: "default-channel",
		},
		revalidate: 60,
	});

	if (!data.collection?.products) {
		return null;
	}

	const products = data.collection?.products.edges.map(
		({ node: product }) => product
	);

	return (
		<main className="min-h-screen bg-white">
			<HeroSection />
			<CategorySection />
			<FeaturedDestinations />
			<PopularExperiences />
			<TestimonialsSection />
			<section className="mx-auto max-w-7xl p-8 pb-16">
				<h2 className="sr-only">Product list</h2>
				<ProductList products={products} />
			</section>
		</main>
	);
}
					</p>
				</div>

				<div className="mx-auto max-w-5xl">
					<div className="rounded-2xl bg-white p-6 shadow-2xl lg:p-8">
						<div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
							<div className="lg:col-span-5">
								<label className="mb-2 block text-sm font-medium text-gray-700">
									What do you want to do?
								</label>
								<div className="relative">
									<MagnifyingGlassIcon className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
									<input
										type="text"
										placeholder="Search for experiences..."
										value={searchQuery}
										onChange={(e) => setSearchQuery(e.target.value)}
										className="w-full rounded-xl border border-gray-200 py-4 pl-12 pr-4 text-gray-900 placeholder-gray-500 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500"
									/>
								</div>
							</div>

							<div className="lg:col-span-3">
								<label className="mb-2 block text-sm font-medium text-gray-700">Where?</label>
								<div className="relative">
									<MapPinIcon className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
									<input
										type="text"
										placeholder="Destination"
										value={location}
										onChange={(e) => setLocation(e.target.value)}
										className="w-full rounded-xl border border-gray-200 py-4 pl-12 pr-4 text-gray-900 placeholder-gray-500 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500"
									/>
								</div>
							</div>

							<div className="lg:col-span-2">
								<label className="mb-2 block text-sm font-medium text-gray-700">When?</label>
								<div className="relative">
									<CalendarDaysIcon className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
									<input
										type="date"
										value={date}
										onChange={(e) => setDate(e.target.value)}
										className="w-full rounded-xl border border-gray-200 py-4 pl-12 pr-4 text-gray-900 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500"
									/>
								</div>
							</div>

							<div className="lg:col-span-2">
								<label className="mb-2 block text-sm font-medium text-transparent">Search</label>
								<button className="w-full transform rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 px-6 py-4 font-bold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:from-orange-600 hover:to-pink-600">
									Search
								</button>
							</div>
						</div>
					</div>
				</div>

				<div className="mt-8 text-center">
					<p className="mb-3 text-sm opacity-75">Popular searches:</p>
					<div className="flex flex-wrap justify-center gap-2">
						{["City tours", "Museums", "Food experiences", "Skip the line", "Day trips"].map((tag, index) => (
							<button
								key={index}
								className="rounded-full bg-white/10 px-4 py-2 text-sm backdrop-blur-sm transition-colors hover:bg-white/20"
							>
								{tag}
							</button>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

const CategorySection = () => {
	const categories = [
		{
			name: "City tours",
			icon: "🏛️",
			count: "2,500+",
			color: "from-blue-500 to-blue-600",
		},
		{
			name: "Museums",
			icon: "🎨",
			count: "1,800+",
			color: "from-purple-500 to-purple-600",
		},
		{
			name: "Food & drink",
			icon: "🍽️",
			count: "3,200+",
			color: "from-orange-500 to-red-500",
		},
		{
			name: "Outdoor activities",
			icon: "🏔️",
			count: "2,100+",
			color: "from-green-500 to-green-600",
		},
		{
			name: "Art & culture",
			icon: "🎭",
			count: "1,900+",
			color: "from-pink-500 to-rose-500",
		},
		{
			name: "Day trips",
			icon: "🚌",
			count: "1,600+",
			color: "from-indigo-500 to-blue-500",
		},
		{
			name: "Water activities",
			icon: "🚤",
			count: "1,400+",
			color: "from-cyan-500 to-blue-500",
		},
		{
			name: "Night life",
			icon: "🌃",
			count: "900+",
			color: "from-violet-500 to-purple-600",
		},
	];

	return (
		<section className="bg-gray-50 py-16 lg:py-20">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="mb-12 text-center">
					<h2 className="mb-4 text-3xl font-bold text-gray-900 lg:text-4xl">Browse by category</h2>
					<p className="mx-auto max-w-2xl text-lg text-gray-600">
						Find your perfect experience from our curated selection of activities
					</p>
				</div>

				<div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-8 lg:gap-6">
					{categories.map((category, index) => (
						<div key={index} className="group cursor-pointer">
							<div className="transform rounded-2xl bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
								<div
									className={`h-16 w-16 bg-gradient-to-br ${category.color} mx-auto mb-4 flex items-center justify-center rounded-2xl transition-transform group-hover:scale-110`}
								>
									<span className="text-2xl">{category.icon}</span>
								</div>
								<h3 className="mb-1 text-center text-sm font-semibold text-gray-900">{category.name}</h3>
								<p className="text-center text-xs text-gray-500">{category.count}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

const FeaturedDestinations = () => {
	const destinations = [
		{
			name: "Paris",
			country: "France",
			image: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=800&h=600&fit=crop",
			activities: "2,341 experiences",
			rating: 4.8,
			reviews: 25420,
			price: "from $25",
		},
		{
			name: "Tokyo",
			country: "Japan",
			image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop",
			activities: "1,892 experiences",
			rating: 4.9,
			reviews: 18350,
			price: "from $35",
		},
		{
			name: "New York",
			country: "United States",
			image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&h=600&fit=crop",
			activities: "3,156 experiences",
			rating: 4.7,
			reviews: 31920,
			price: "from $20",
		},
		{
			name: "London",
			country: "United Kingdom",
			image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=600&fit=crop",
			activities: "2,687 experiences",
			rating: 4.6,
			reviews: 22580,
			price: "from $30",
		},
		{
			name: "Rome",
			country: "Italy",
			image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&h=600&fit=crop",
			activities: "1,543 experiences",
			rating: 4.8,
			reviews: 19640,
			price: "from $28",
		},
		{
			name: "Barcelona",
			country: "Spain",
			image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800&h=600&fit=crop",
			activities: "1,234 experiences",
			rating: 4.7,
			reviews: 15230,
			price: "from $22",
		},
	];

	return (
		<section className="bg-white py-16 lg:py-20">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="mb-12 flex items-end justify-between">
					<div>
						<h2 className="mb-4 text-3xl font-bold text-gray-900 lg:text-4xl">Top destinations</h2>
						<p className="text-lg text-gray-600">Explore the world's most loved places</p>
					</div>
					<button className="hidden font-semibold text-blue-600 transition-colors hover:text-blue-700 lg:block">
						View all destinations →
					</button>
				</div>

				<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
					{destinations.map((destination, index) => (
						<div
							key={index}
							className="group transform cursor-pointer overflow-hidden rounded-3xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
						>
							<div className="relative overflow-hidden">
								<img
									src={destination.image}
									alt={destination.name}
									className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-110"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
								<div className="absolute bottom-6 left-6 text-white">
									<h3 className="mb-1 text-2xl font-bold">{destination.name}</h3>
									<p className="text-sm opacity-90">{destination.country}</p>
								</div>
								<div className="absolute right-4 top-4 rounded-lg bg-white/90 px-3 py-1 backdrop-blur-sm">
									<span className="text-sm font-bold text-gray-900">{destination.price}</span>
								</div>
							</div>

							<div className="p-6">
								<div className="mb-2 flex items-center justify-between">
									<p className="font-medium text-gray-600">{destination.activities}</p>
									<div className="flex items-center">
										<StarIcon className="mr-1 h-4 w-4 text-yellow-400" />
										<span className="text-sm font-bold text-gray-900">{destination.rating}</span>
									</div>
								</div>
								<p className="text-sm text-gray-500">{destination.reviews.toLocaleString()} reviews</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

const PopularExperiences = () => {
	const experiences = [
		{
			title: "Skip-the-Line Louvre Museum Guided Tour",
			location: "Paris, France",
			image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop",
			price: 89,
			originalPrice: 120,
			rating: 4.8,
			reviews: 3241,
			duration: "3 hours",
			groupSize: "Small group",
			badge: "Bestseller",
			badgeColor: "bg-red-500",
		},
		{
			title: "Tokyo Street Food Walking Tour",
			location: "Tokyo, Japan",
			image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&h=300&fit=crop",
			price: 75,
			originalPrice: null,
			rating: 4.9,
			reviews: 2189,
			duration: "4 hours",
			groupSize: "Small group",
			badge: "Local favorite",
			badgeColor: "bg-green-500",
		},
		{
			title: "Central Park Bike Tour & Picnic",
			location: "New York, USA",
			image: "https://images.unsplash.com/photo-1518083165-cda43e069d88?w=400&h=300&fit=crop",
			price: 45,
			originalPrice: 60,
			rating: 4.7,
			reviews: 4256,
			duration: "2.5 hours",
			groupSize: "Medium group",
			badge: "Great value",
			badgeColor: "bg-blue-500",
		},
		{
			title: "Thames Sunset Cruise with Dinner",
			location: "London, UK",
			image: "https://images.unsplash.com/photo-1529655683826-aba9b3e77383?w=400&h=300&fit=crop",
			price: 85,
			originalPrice: null,
			rating: 4.6,
			reviews: 1867,
			duration: "2 hours",
			groupSize: "Large group",
			badge: null,
			badgeColor: "",
		},
	];

	return (
		<section className="bg-gray-50 py-16 lg:py-20">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="mb-12 flex items-end justify-between">
					<div>
						<h2 className="mb-4 text-3xl font-bold text-gray-900 lg:text-4xl">Popular experiences</h2>
						<p className="text-lg text-gray-600">Highly rated activities loved by travelers worldwide</p>
					</div>
					<button className="hidden font-semibold text-blue-600 transition-colors hover:text-blue-700 lg:block">
						View all experiences →
					</button>
				</div>

				<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
					{experiences.map((experience, index) => (
						<div
							key={index}
							className="group transform cursor-pointer overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
						>
							<div className="relative">
								<img
									src={experience.image}
									alt={experience.title}
									className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
								/>
								<button className="absolute right-3 top-3 rounded-full bg-white/80 p-2 shadow-sm transition-all hover:bg-white">
									<HeartIcon className="h-4 w-4 text-gray-600" />
								</button>
								{experience.badge && (
									<div
										className={`absolute left-3 top-3 ${experience.badgeColor} rounded-full px-3 py-1 text-xs font-bold text-white shadow-sm`}
									>
										{experience.badge}
									</div>
								)}
							</div>

							<div className="p-5">
								<div className="mb-3 flex items-center">
									<div className="flex items-center">
										<StarIcon className="mr-1 h-4 w-4 text-yellow-400" />
										<span className="text-sm font-bold text-gray-900">{experience.rating}</span>
										<span className="ml-1 text-sm text-gray-500">({experience.reviews})</span>
									</div>
								</div>

								<h3 className="mb-2 line-clamp-2 font-bold text-gray-900 transition-colors group-hover:text-blue-600">
									{experience.title}
								</h3>
								<p className="mb-3 text-sm text-gray-600">{experience.location}</p>

								<div className="mb-4 flex items-center space-x-4 text-xs text-gray-500">
									<div className="flex items-center">
										<ClockIcon className="mr-1 h-3 w-3" />
										{experience.duration}
									</div>
									<div className="flex items-center">
										<UsersIcon className="mr-1 h-3 w-3" />
										{experience.groupSize}
									</div>
								</div>

								<div className="flex items-center justify-between">
									<div>
										{experience.originalPrice && (
											<span className="mr-2 text-sm text-gray-400 line-through">
												${experience.originalPrice}
											</span>
										)}
										<span className="text-xl font-bold text-gray-900">${experience.price}</span>
									</div>
									<span className="text-sm text-gray-500">per person</span>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

const TestimonialsSection = () => {
	const testimonials = [
		{
			name: "Sarah Johnson",
			location: "New York, USA",
			avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
			rating: 5,
			review:
				"Absolutely incredible experience! Our guide was so knowledgeable and passionate. The skip-the-line access saved us hours of waiting. Would definitely book again!",
			experience: "Louvre Museum Tour",
			date: "2 days ago",
		},
		{
			name: "David Chen",
			location: "Toronto, Canada",
			avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
			rating: 5,
			review:
				"The Tokyo food tour exceeded all expectations. Got to try authentic dishes I never would have discovered on my own. The local guide made it truly special.",
			experience: "Tokyo Food Walking Tour",
			date: "5 days ago",
		},
		{
			name: "Maria Garcia",
			location: "Madrid, Spain",
			avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
			rating: 5,
			review:
				"Perfect way to explore Central Park! The bike tour was so much fun and very informative. Great value for money and well organized.",
			experience: "Central Park Bike Tour",
			date: "1 week ago",
		},
	];

	return (
		<section className="bg-white py-16 lg:py-20">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="mb-12 text-center">
					<h2 className="mb-4 text-3xl font-bold text-gray-900 lg:text-4xl">What travelers say</h2>
					<p className="mx-auto max-w-2xl text-lg text-gray-600">
						Real experiences from real customers who've booked with us
					</p>
				</div>

				<div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-3">
					{testimonials.map((testimonial, index) => (
						<div
							key={index}
							className="rounded-2xl border border-gray-100 bg-gray-50 p-8 transition-all duration-300 hover:shadow-md"
						>
							<div className="mb-4 flex items-center">
								{[...Array(testimonial.rating)].map((_, i) => (
									<StarIcon key={i} className="h-5 w-5 text-yellow-400" />
								))}
							</div>

							<p className="mb-6 leading-relaxed text-gray-700">"{testimonial.review}"</p>

							<div className="flex items-center justify-between">
								<div className="flex items-center">
									<img
										src={testimonial.avatar}
										alt={testimonial.name}
										className="mr-4 h-12 w-12 rounded-full object-cover"
									/>
									<div>
										<h4 className="font-bold text-gray-900">{testimonial.name}</h4>
										<p className="text-sm text-gray-600">{testimonial.location}</p>
									</div>
								</div>
								<div className="text-right">
									<p className="mb-1 text-xs font-medium text-blue-600">{testimonial.experience}</p>
									<p className="text-xs text-gray-500">{testimonial.date}</p>
								</div>
							</div>
						</div>
					))}
				</div>

				<div className="text-center">
					<div className="inline-flex items-center space-x-4 rounded-2xl border border-yellow-200 bg-gradient-to-r from-yellow-50 to-orange-50 px-8 py-4">
						<div className="flex items-center">
							<StarIcon className="mr-2 h-8 w-8 text-yellow-400" />
							<div>
								<div className="text-3xl font-bold text-gray-900">4.8</div>
								<div className="text-sm text-gray-600">out of 5</div>
							</div>
						</div>
						<div className="h-12 w-px bg-gray-300"></div>
						<div>
							<div className="text-2xl font-bold text-gray-900">250,000+</div>
							<div className="text-sm text-gray-600">verified reviews</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default async function Page({ params }: { params: { channel: string } }) {
	console.log("Channel:", params.channel);
	const data = await executeGraphQL(ProductListByCollectionDocument, {
		variables: {
			slug: "featured-products",
			channel: "default-channel",
		},
		revalidate: 60,
	});

	if (!data.collection?.products) {
		return null;
	}

	const products = data.collection?.products.edges.map(({ node: product }) => product);

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
