'use client';
import { useState } from 'react';
import { MagnifyingGlassIcon, MapPinIcon, CalendarDaysIcon } from '@heroicons/react/24/outline';

export default function HeroSection() {
	const [searchQuery, setSearchQuery] = useState('');
	const [location, setLocation] = useState('');
	const [date, setDate] = useState('');

	return (
		<div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white overflow-hidden">
			<div className="absolute inset-0 opacity-10">
				<div className="absolute inset-0 bg-repeat" style={{backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"}}></div>
			</div>

			<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
				<div className="text-center mb-12">
					<h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
						Discover amazing{" "}
						<span className="block text-yellow-300">experiences</span>
					</h1>
					<p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto">
						Book incredible things to do around the world with local experts
					</p>
				</div>

				<div className="max-w-5xl mx-auto">
					<div className="bg-white rounded-2xl shadow-2xl p-6 lg:p-8">
						<div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
							<div className="lg:col-span-5">
								<label className="block text-sm font-medium text-gray-700 mb-2">
									What do you want to do?
								</label>
								<div className="relative">
									<MagnifyingGlassIcon className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
									<input
										type="text"
										placeholder="Search for experiences..."
										value={searchQuery}
										onChange={(e) => setSearchQuery(e.target.value)}
										className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
									/>
								</div>
							</div>

							<div className="lg:col-span-3">
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Where?
								</label>
								<div className="relative">
									<MapPinIcon className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
									<input
										type="text"
										placeholder="Destination"
										value={location}
										onChange={(e) => setLocation(e.target.value)}
										className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
									/>
								</div>
							</div>

							<div className="lg:col-span-2">
								<label className="block text-sm font-medium text-gray-700 mb-2">
									When?
								</label>
								<div className="relative">
									<CalendarDaysIcon className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
									<input
										type="date"
										value={date}
										onChange={(e) => setDate(e.target.value)}
										className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
									/>
								</div>
							</div>

							<div className="lg:col-span-2">
								<label className="block text-sm font-medium text-transparent mb-2">
									Search
								</label>
								<button className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg">
									Search
								</button>
							</div>
						</div>
					</div>
				</div>

				<div className="text-center mt-8">
					<p className="text-sm opacity-75 mb-3">Popular searches:</p>
					<div className="flex flex-wrap justify-center gap-2">
						{[
							"City tours",
							"Museums",
							"Food experiences",
							"Skip the line",
							"Day trips",
						].map((tag, index) => (
							<button
								key={index}
								className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-sm transition-colors backdrop-blur-sm"
							>
								{tag}
							</button>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}