import React from 'react';

export default function CategorySection() {
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
		<section className="py-16 lg:py-20 bg-gray-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-12">
					<h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
						Browse by category
					</h2>
					<p className="text-lg text-gray-600 max-w-2xl mx-auto">
						Find your perfect experience from our curated selection of activities
					</p>
				</div>

				<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 lg:gap-6">
					{categories.map((category, index) => (
						<div key={index} className="group cursor-pointer">
							<div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
								<div
									className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform`}
								>
									<span className="text-2xl">{category.icon}</span>
								</div>
								<h3 className="font-semibold text-gray-900 text-center text-sm mb-1">
									{category.name}
								</h3>
								<p className="text-xs text-gray-500 text-center">
									{category.count}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}