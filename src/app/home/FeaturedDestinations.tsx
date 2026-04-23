import Image from 'next/image';
import { StarIcon } from '@heroicons/react/24/solid';

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
		// ...existing destinations data...
	];

	return (
		<section className="py-16 lg:py-20 bg-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-end mb-12">
					<div>
						<h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
							Top destinations
						</h2>
						<p className="text-lg text-gray-600">
							Explore the world&apos;s most loved places
						</p>
					</div>
					<button className="hidden lg:block text-blue-600 hover:text-blue-700 font-semibold transition-colors">
						View all destinations →
					</button>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
					{destinations.map((destination, index) => (
						<div
							key={index}
							className="group cursor-pointer bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
						>
							<div className="relative overflow-hidden">
								<Image
									src={destination.image}
									alt={destination.name}
									width={800}
									height={600}
									className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
								<div className="absolute bottom-6 left-6 text-white">
									<h3 className="text-2xl font-bold mb-1">
										{destination.name}
									</h3>
									<p className="text-sm opacity-90">
										{destination.country}
									</p>
								</div>
								<div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
									<span className="text-sm font-bold text-gray-900">
										{destination.price}
									</span>
								</div>
							</div>

							<div className="p-6">
								<div className="flex items-center justify-between mb-2">
									<p className="text-gray-600 font-medium">
										{destination.activities}
									</p>
									<div className="flex items-center">
										<StarIcon className="h-4 w-4 text-yellow-400 mr-1" />
										<span className="text-sm font-bold text-gray-900">
											{destination.rating}
										</span>
									</div>
								</div>
								<p className="text-sm text-gray-500">
									{destination.reviews.toLocaleString()} reviews
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

export default FeaturedDestinations;