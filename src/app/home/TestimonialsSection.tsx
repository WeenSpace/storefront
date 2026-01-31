import Image from 'next/image';
import { StarIcon } from '@heroicons/react/24/solid';

export default function TestimonialsSection() {
	const testimonials = [
		{
			name: "Sarah Johnson",
			location: "New York, USA",
			avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
			rating: 5,
			review: "Absolutely incredible experience! Our guide was so knowledgeable and passionate. The skip-the-line access saved us hours of waiting. Would definitely book again!",
			experience: "Louvre Museum Tour",
			date: "2 days ago",
		},
		{
			name: "David Chen",
			location: "Toronto, Canada",
			avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
			rating: 5,
			review: "The Tokyo food tour exceeded all expectations. Got to try authentic dishes I never would have discovered on my own. The local guide made it truly special.",
			experience: "Tokyo Food Walking Tour",
			date: "5 days ago",
		},
		{
			name: "Maria Garcia",
			location: "Madrid, Spain",
			avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
			rating: 5,
			review: "Perfect way to explore Central Park! The bike tour was so much fun and very informative. Great value for money and well organized.",
			experience: "Central Park Bike Tour",
			date: "1 week ago",
		},
	];

	return (
		<section className="py-16 lg:py-20 bg-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-12">
					<h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
						What travelers say
					</h2>
					<p className="text-lg text-gray-600 max-w-2xl mx-auto">
						Real experiences from real customers who&apos;ve booked with us
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
					{testimonials.map((testimonial, index) => (
						<div
							key={index}
							className="bg-gray-50 rounded-2xl p-8 hover:shadow-md transition-all duration-300 border border-gray-100"
						>
							<div className="flex items-center mb-4">
								{Array.from({ length: testimonial.rating }, (_, i) => (
									<StarIcon key={i} className="h-5 w-5 text-yellow-400" />
								))}
							</div>

							<p className="text-gray-700 mb-6 leading-relaxed">
								&ldquo;{testimonial.review}&rdquo;
							</p>

							<div className="flex items-center justify-between">
								<div className="flex items-center">
									<Image
										src={testimonial.avatar}
										alt={testimonial.name}
										width={48}
										height={48}
										className="w-12 h-12 rounded-full object-cover mr-4"
									/>
									<div>
										<h4 className="font-bold text-gray-900">
											{testimonial.name}
										</h4>
										<p className="text-sm text-gray-600">
											{testimonial.location}
										</p>
									</div>
								</div>
								<div className="text-right">
									<p className="text-xs text-blue-600 font-medium mb-1">
										{testimonial.experience}
									</p>
									<p className="text-xs text-gray-500">
										{testimonial.date}
									</p>
								</div>
							</div>
						</div>
					))}
				</div>

				<div className="text-center">
					<div className="inline-flex items-center space-x-4 bg-gradient-to-r from-yellow-50 to-orange-50 px-8 py-4 rounded-2xl border border-yellow-200">
						<div className="flex items-center">
							<StarIcon className="h-8 w-8 text-yellow-400 mr-2" />
							<div>
								<div className="text-3xl font-bold text-gray-900">4.8</div>
								<div className="text-sm text-gray-600">out of 5</div>
							</div>
						</div>
						<div className="w-px h-12 bg-gray-300"></div>
						<div>
							<div className="text-2xl font-bold text-gray-900">
								250,000+
							</div>
							<div className="text-sm text-gray-600">verified reviews</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}