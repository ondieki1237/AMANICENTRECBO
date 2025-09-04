"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ModernNavbar from "../../components/modern-navbar";
import Footer from "../../components/footer";
import RadioPlayer from "../../components/radio-player";

// Program schedule data
const programs = [
	{
		title: "Amka na Vox",
		schedule: {
			days: ["Monday", "Tuesday", "Wednesday", "Thursday"],
			start: "05:00",
			end: "10:00",
		},
		focus: "Current affairs, legal aid, governance and accountability, and newspaper reviews.",
	},
	{
		title: "Take Over Show",
		schedule: {
			days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
			start: "10:00",
			end: "14:00",
		},
		focus: "Youth empowerment and drug abuse awareness.",
	},
	{
		title: "Rhumba",
		schedule: {
			days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
			start: "14:00",
			end: "18:00",
		},
		focus: "Educating farmers on agribusiness and addressing climate change issues.",
	},
	{
		title: "Mirindimo ya Pwani",
		schedule: {
			days: ["Monday", "Tuesday", "Wednesday", "Thursday"],
			start: "18:00",
			end: "21:00",
		},
		focus: "Women's roles in business, leadership, and reproductive health.",
	},
	{
		title: "Nuru ya Kiislamu",
		schedule: { days: ["Friday"], start: "05:00", end: "10:00" },
		focus: "Promoting spiritual growth within the Islamic community.",
	},
	{
		title: "Drive On",
		schedule: { days: ["Friday"], start: "18:00", end: "21:00" },
		focus: "Entertainment, weekly trends, and social lifestyle discussions.",
	},
	{
		title: "Darasa la Vox",
		schedule: { days: ["Saturday"], start: "06:00", end: "10:00" },
		focus: "Children’s education and entertainment.",
	},
	{
		title: "Zegede Express",
		schedule: { days: ["Saturday"], start: "10:00", end: "14:00" },
		focus: "Coastal music (mainly Bango), health, cooking tips, and social lifestyle.",
	},
	{
		title: "Crucial Reggae",
		schedule: { days: ["Saturday"], start: "14:00", end: "18:00" },
		focus: "Reggae music, sports highlights, and social issues.",
	},
	{
		title: "Tamaduni Zetu",
		schedule: { days: ["Saturday"], start: "18:00", end: "21:00" },
		focus: "Cultural music, peacebuilding, and cultural awareness.",
	},
];

export default function RadioPage() {
	// Initialize with default values to prevent null reference errors
	const [currentProgram, setCurrentProgram] = useState({
		title: "Loading...",
		time: "N/A",
		host: "N/A",
		focus: "Loading program schedule...",
	});
	const [upcomingPrograms, setUpcomingPrograms] = useState([]);
	const [error, setError] = useState(null);

	// Function to get current time in EAT (UTC+3)
	const getEATTime = () => {
		try {
			return new Date().toLocaleString("en-US", { timeZone: "Africa/Nairobi" });
		} catch (err) {
			console.error("Error getting EAT time:", err);
			setError("Failed to load time. Using system time as fallback.");
			return new Date().toLocaleString("en-US");
		}
	};

	// Function to parse time string (e.g., "05:00") to minutes
	const timeToMinutes = (timeStr) => {
		try {
			const [hours, minutes] = timeStr.split(":").map(Number);
			if (isNaN(hours) || isNaN(minutes)) throw new Error("Invalid time format");
			return hours * 60 + minutes;
		} catch (err) {
			console.error("Error parsing time:", timeStr, err);
			return 0;
		}
	};

	// Function to update current and upcoming programs
	const updatePrograms = () => {
		try {
			const now = new Date(getEATTime());
			const currentDay = now.toLocaleString("en-US", {
				timeZone: "Africa/Nairobi",
				weekday: "long",
			});
			const currentTime = now.toLocaleString("en-US", {
				timeZone: "Africa/Nairobi",
				hour12: false,
				hour: "2-digit",
				minute: "2-digit",
			});
			const currentMinutes = timeToMinutes(currentTime);

			console.log(`Current time in EAT: ${currentTime} (${currentDay})`);

			let current = null;
			const upcoming = [];

			// Find current program
			for (const program of programs) {
				if (program.schedule.days.includes(currentDay)) {
					const startMinutes = timeToMinutes(program.schedule.start);
					const endMinutes = timeToMinutes(program.schedule.end);
					if (currentMinutes >= startMinutes && currentMinutes < endMinutes) {
						current = {
							title: program.title,
							time: `${program.schedule.start} - ${program.schedule.end}`,
							host: "Vox Team",
							focus: program.focus,
						};
						break;
					}
				}
			}

			// Default if no program is airing
			if (!current) {
				current = {
					title: "Off Air",
					time: "N/A",
					host: "N/A",
					focus: "No program currently airing. Check back for the next show!",
				};
			}

			// Find upcoming programs
			const daysOfWeek = [
				"Sunday",
				"Monday",
				"Tuesday",
				"Wednesday",
				"Thursday",
				"Friday",
				"Saturday",
			];
			const allPrograms = programs.flatMap((program) =>
				program.schedule.days.map((day) => ({
					...program,
					day,
					startMinutes: timeToMinutes(program.schedule.start),
				}))
			);

			// Sort programs by day and time
			allPrograms.sort((a, b) => {
				const dayA = daysOfWeek.indexOf(a.day);
				const dayB = daysOfWeek.indexOf(b.day);
				const currentDayIndex = daysOfWeek.indexOf(currentDay);
				const dayDiffA = (dayA - currentDayIndex + 7) % 7;
				const dayDiffB = (dayB - currentDayIndex + 7) % 7;

				if (dayDiffA === dayDiffB) {
					return a.startMinutes - b.startMinutes;
				}
				return dayDiffA - dayDiffB;
			});

			// Filter future programs
			const nowMinutes = currentMinutes + daysOfWeek.indexOf(currentDay) * 24 * 60;
			for (const program of allPrograms) {
				const programDayIndex = daysOfWeek.indexOf(program.day);
				const programMinutes = program.startMinutes + programDayIndex * 24 * 60;
				if (programMinutes > nowMinutes) {
					upcoming.push({
						title: program.title,
						time: `${program.schedule.start} - ${program.schedule.end} (${program.day})`,
						host: "Vox Team",
						focus: program.focus,
					});
					if (upcoming.length >= 3) break;
				}
			}

			setCurrentProgram(current);
			setUpcomingPrograms(upcoming);
			setError(null); // Clear any previous errors
		} catch (err) {
			console.error("Error updating programs:", err);
			setError("Failed to update program schedule. Please try again later.");
		}
	};

	// Update programs on mount and every minute
	useEffect(() => {
		updatePrograms();
		const interval = setInterval(updatePrograms, 60000);
		return () => clearInterval(interval);
	}, []);

	// Existing news and personalities data
	const latestNews = [
		{
			id: 1,
			title: "Community Health Fair Scheduled for Next Week",
			summary: "Tana River County hosts a health fair to promote wellness.",
			date: "June 10, 2025",
		},
		{
			id: 2,
			title: "Local School Wins National Award",
			summary: "Garsen High School recognized for excellence in education.",
			date: "June 8, 2025",
		},
	];

	const newsBites = [
		"Local farmers receive new irrigation equipment.",
		"Youth group organizes clean-up drive this weekend.",
		"Tana River bridge construction to begin next month.",
	];

	const radioPersonalities = [
		{ name: "Maureen Buya", duty: "Radio Manager", image: "/images/radio/maureen.png" },
		{ name: "Kula Nzumo", duty: "Producer", image: "/images/radio/nzomo.png" },
		{ name: "Yoash Festus", duty: "Presenter", image: "/images/radio/yoash.png" },
		{ name: "Esther Dalano", duty: "Presenter", image: "/images/radio/esther.png" },
		{ name: "Zaikun Abdihakim", duty: "Presenter", image: "/images/radio/zaikun.jpg" },
		{ name: "Yusuf Maro", duty: "Presenter", image: "/images/radio/maro.png" },
		{ name: "Flora Andisi", duty: "Presenter", image: "/images/radio/flora.png" },
	];

	return (
		<div className="min-h-screen bg-white text-gray-900">
			<style jsx global>{`
				@keyframes equalizer-1 {
					0% {
						height: 1rem;
					}
					100% {
						height: 3rem;
					}
				}
				@keyframes equalizer-2 {
					0% {
						height: 1.5rem;
					}
					100% {
						height: 4rem;
					}
				}
				@keyframes equalizer-3 {
					0% {
						height: 2rem;
					}
					100% {
						height: 4.5rem;
					}
				}
				@keyframes equalizer-4 {
					0% {
						height: 1.2rem;
					}
					100% {
						height: 3.8rem;
					}
				}
				@keyframes equalizer-5 {
					0% {
						height: 1rem;
					}
					100% {
						height: 3.5rem;
					}
				}
			`}</style>

			{/* Header */}
			<ModernNavbar />

			{/* Error Display */}
			{error && (
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
					<p className="text-red-600 text-center">{error}</p>
				</div>
			)}

			{/* Amplifying Voices Section */}
			<section className="py-12 sm:py-16 lg:py-20 bg-gray-50 relative overflow-hidden min-h-[600px]">
				{/* Background Image */}
				<div
					className="absolute inset-0 bg-cover bg-center bg-no-repeat"
					style={{ backgroundImage: "url('/images/radio/vox.png')" }}
				></div>
				{/* Overlay for Text Readability */}
				<div className="absolute inset-0 bg-gray-50/70"></div>

				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
					{/* Navigation Buttons */}
					<div className="flex justify-between mb-8">
						<a
							href="/"
							className="inline-block px-6 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors duration-200"
						></a>
						<a
							href="https://uk3-vn.mixstream.net/:8134/listen.mp3"
							target="_blank"
							rel="noopener noreferrer"
							className="inline-block px-6 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors duration-200"
						>
							Listen Live
						</a>
					</div>

					{/* Left-Aligned Content */}
					<div className="flex justify-start">
						<div className="text-left max-w-lg space-y-8">
							<h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-gray-900 mb-6 font-bold tracking-tight">
								Amplifying Voices
							</h2>
							<blockquote className="text-lg sm:text-xl lg:text-2xl text-gray-700 italic leading-relaxed">
								"I never realised how the Orma people came to be in this region of Kenya, but since I started hearing their stories on the radio, I have begun to understand them better."
								<footer className="mt-4 not-italic font-medium text-gray-900 text-base sm:text-lg">
									Radio listener, Chara village
								</footer>
							</blockquote>
							<p className="text-base sm:text-lg text-gray-800 bg-white p-6 rounded-xl shadow-md border border-gray-100">
								<span className="font-bold">
									"80% of the population in Tana River County consume news primarily through radio."
								</span>
								<br />
								<span className="text-sm text-gray-600">
									Status of the Media Report 2020, Media Council of Kenya
								</span>
							</p>
						</div>
					</div>
				</div>
			</section>
			{/* Finding Our Voice Section */}
			<section className="py-12 sm:py-16 bg-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid md:grid-cols-2 gap-10 items-center">
						<div>
							<h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-gray-900 mb-6">
								Finding our Voice
							</h2>
							<p className="text-base sm:text-lg text-gray-600 mb-6">
								Vox Radio was formerly known as Amani FM which was inaugurated in 2017 with support from Amplifying Voices International.
							</p>
							<p className="text-base sm:text-lg text-gray-600 mb-6">
								Tana River County faces numerous challenges, including inter-ethnic violence, extremism, poverty, and natural disasters such as floods and droughts.
							</p>
							<p className="text-base sm:text-lg text-gray-600">
								In the face of these challenges, access to reliable information becomes crucial for making informed decisions and building resilient communities.
							</p>
						</div>
						<div className="bg-gray-50 p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100">
							<h3 className="font-display text-xl sm:text-2xl text-gray-900 mb-4">
								Areas of Focus
							</h3>
							<ul className="space-y-3">
								{[
									"Climate education",
									"Civic engagement",
									"Arts and Culture",
									"Youth and Women Empowerment",
									"Peacebuilding",
									"Economic empowerment",
								].map((item, index) => (
									<li key={index} className="flex items-start">
										<span className="inline-block w-2 h-2 bg-red-600 rounded-full mt-2 mr-3"></span>
										<span className="text-base sm:text-lg text-gray-700">
											{item}
										</span>
									</li>
								))}
							</ul>
							<p className="mt-6 text-base sm:text-lg text-gray-600 italic">
								Communities across Tana River County now have a common platform where they can discuss their concerns, share their hopes and hold those in authority to account.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* What Sets Us Apart Section */}
			<section className="py-12 sm:py-16 bg-gradient-to-br from-red-50 to-gray-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-gray-900 mb-10 text-center">
						What Sets Us Apart
					</h2>
					<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
						{[
							{
								title: "Community Presence",
								description:
									"For 8 years now, we continue to transform lives through educative radio programs and community listening meetings.",
							},
							{
								title: "Regional Coverage",
								description:
									"Our coverage of local stories and issues extends across Kenya's north east coastal region.",
							},
							{
								title: "Inclusive Voice",
								description:
									"We amplify the voices of specific community members (e.g. women, children, disabled, minority languages).",
							},
							{
								title: "Trusted Voice",
								description:
									"Our coverage and content is unbiased and does not favour any individual or group.",
							},
						].map((item, index) => (
							<div
								key={index}
								className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100"
							>
								<h3 className="font-display text-xl sm:text-2xl text-gray-900 mb-3">
									{item.title}
								</h3>
								<p className="text-gray-600">{item.description}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Partnership Section */}
			<section className="py-12 sm:py-16 bg-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid md:grid-cols-2 gap-10 items-center">
						{/* TEXT SIDE */}
						<div>
							<div className="text-center md:text-left mb-10 md:mb-0">
								<h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-gray-900 mb-6">
									Join us in our mission
								</h2>
								<p className="text-base sm:text-lg text-gray-600 max-w-3xl">
									To address the growing need for trusted information and local content in our region, we are seeking partnerships with organizations who share in the mission to empower rural communities with the information they need to thrive and improve their livelihoods.
								</p>
							</div>

							<div className="mt-10">
								<h3 className="font-display text-xl sm:text-2xl text-gray-900 mb-6">
									Opportunity Areas
								</h3>
								<div className="grid sm:grid-cols-2 gap-6">
									{[
										"Team's capacity building",
										"Radio's content production capacity",
										"Community engagement (off air & on-air)",
										"Resource mobilisation for sustainability",
									].map((item, index) => (
										<div
											key={index}
											className="bg-gray-50 p-5 rounded-xl border border-gray-200 flex items-center"
										>
											<span className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
												{index + 1}
											</span>
											<span className="text-gray-700">{item}</span>
										</div>
									))}
								</div>

								<div className="mt-10">
									<Link href="/volunteer">
										<button className="bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-8 rounded-full transition-colors duration-300">
											GET INVOLVED
										</button>
									</Link>
								</div>
							</div>
						</div>

						{/* IMAGE SIDE */}
						<div className="flex justify-center md:justify-end">
							<img
								src="/images/radio/vox2.png"
								alt="Modern Radio"
								className="w-full max-w-md rounded-2xl shadow-lg object-cover"
							/>
						</div>
					</div>
				</div>
			</section>

			{/* Radio Personalities Section */}
			<section className="py-12 sm:py-16 bg-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-gray-900 mb-8 sm:mb-10 text-center">
						Meet Our Radio Personalities
					</h2>
					<div className="flex overflow-x-auto space-x-6 pb-4 snap-x snap-mandatory">
						{radioPersonalities.map((person, index) => (
							<div
								key={index}
								className="bg-gray-50 p-5 sm:p-6 rounded-2xl shadow-lg border border-gray-100 text-center flex-shrink-0 w-64 snap-center hover:shadow-xl transition-shadow duration-300"
							>
								<div className="relative w-32 h-32 mx-auto mb-4">
									<img
										src={person.image}
										alt={person.name}
										className="w-full h-full object-cover rounded-full border-2 border-red-600"
										onError={(e) => {
											e.currentTarget.src = "/images/radio/placeholder.png";
										}}
									/>
									<div className="absolute inset-0 rounded-full border-4 border-transparent bg-gradient-to-br from-red-600/20 to-black/20"></div>
								</div>
								<h3 className="font-display text-lg sm:text-xl text-gray-900 mb-1">
									{person.name}
								</h3>
								<p className="text-gray-600 text-sm sm:text-base">
									{person.duty}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Upcoming Programs Section */}
			<section className="py-12 sm:py-16 bg-gray-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-gray-900 mb-8 sm:mb-10 text-center">
						Upcoming Programs
					</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
						{upcomingPrograms.length > 0 ? (
							upcomingPrograms.map((program, index) => (
								<div
									key={index}
									className="bg-white p-5 sm:p-6 rounded-2xl shadow-lg border border-gray-100"
								>
									<h3 className="font-display text-lg sm:text-xl text-gray-900 mb-2">
										{program.title}
									</h3>
									<p className="text-gray-600 text-sm sm:text-base mb-1">
										Hosted by {program.host}
									</p>
									<p className="text-gray-600 text-sm sm:text-base">
										{program.time}
									</p>
									<p className="text-gray-600 text-sm sm:text-base mt-2">
										{program.focus}
									</p>
								</div>
							))
						) : (
							<p className="text-center text-gray-600 col-span-full">
								No upcoming programs scheduled for today.
							</p>
						)}
					</div>
				</div>
			</section>
			{/* Radio Stream Section */}
			<section className="py-12 sm:py-16 bg-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-10 sm:mb-12">
						<div className="inline-block bg-red-100 px-4 py-2 rounded-full mb-4">
							<Link href="/radio">
								<p className="text-red-600 font-semibold text-sm tracking-wide uppercase cursor-pointer hover:underline">
									Live Radio
								</p>
							</Link>
						</div>
						<h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-gray-900 mb-6">
							Listen to Our Radio Stream
						</h2>
						<p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
							Stay connected with our community through our live radio broadcasts, featuring local news,
							educational content, and community voices.
						</p>
					</div>

					<div className="max-w-5xl mx-auto">
						<div className="bg-gradient-to-br from-red-50 to-black/10 p-6 sm:p-8 rounded-3xl shadow-xl border border-gray-100">
							<div className="flex flex-col lg:flex-row items-center gap-6 sm:gap-8">
								<div className="flex-shrink-0">
									<div className="bg-gradient-to-br from-red-600 to-black p-4 sm:p-6 rounded-full shadow-lg">
										<Radio className="h-8 sm:h-10 w-8 sm:w-10 text-white" />
									</div>
								</div>

								<div className="flex-1 text-center lg:text-left">
									<h3 className="font-display text-xl sm:text-2xl text-gray-900 mb-2">
										{currentProgram.title}
									</h3>
									<p className="text-gray-600 text-sm sm:text-base mb-1">
										Hosted by {currentProgram.host}
									</p>
									<p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6">
										{currentProgram.time}
									</p>
									<p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6">
										{currentProgram.focus}
									</p>
									<RadioPlayer />
								</div>

								<div className="flex-shrink-0">
									<div className="text-center">
										<div className="bg-white p-3 sm:p-4 rounded-2xl shadow-lg mb-3">
											<div className="w-12 sm:w-14 h-12 sm:h-14 bg-gradient-to-br from-red-100 to-black/20 rounded-full flex items-center justify-center mx-auto mb-2">
												<div className="w-2 sm:w-3 h-2 sm:h-3 bg-red-500 rounded-full animate-pulse"></div>
											</div>
											<p className="text-xs sm:text-sm font-semibold text-gray-900">
												LIVE
											</p>
										</div>
										<p className="text-xs sm:text-sm text-gray-600">
											Broadcasting 24/7
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Latest News Section */}
			<section className="py-12 sm:py-16 bg-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-gray-900 mb-8 sm:mb-10 text-center">
						Latest News
					</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
						{latestNews.map((news) => (
							<div
								key={news.id}
								className="bg-gray-50 p-5 sm:p-6 rounded-2xl shadow-lg border border-gray-100"
							>
								<h3 className="font-display text-lg sm:text-xl text-gray-900 mb-2">
									{news.title}
								</h3>
								<p className="text-gray-600 text-sm sm:text-base mb-2">
									{news.summary}
								</p>
								<p className="text-xs sm:text-sm text-gray-500">{news.date}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* News Bites Section */}
			<section className="py-12 sm:py-16 bg-red-600 text-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<h2 className="font-display text-2xl sm:text-3xl md:text-4xl mb-8 sm:mb-10 text-center">
						News Bites
					</h2>
					<ul className="space-y-3 sm:space-y-4 max-w-2xl mx-auto">
						{newsBites.map((bite, index) => (
							<li key={index} className="flex items-start">
								<span className="inline-block w-2 h-2 bg-white rounded-full mt-2 mr-3 sm:mr-4"></span>
								<p className="text-sm sm:text-lg">{bite}</p>
							</li>
						))}
					</ul>
				</div>
			</section>

			{/* Footer */}
			<Footer />
		</div>
	);
}