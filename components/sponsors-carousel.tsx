"use client";

import Image from "next/image";

const sponsors = [
  {
    name: "Bridges",
    logo: "/images/sponsors/bridges.png",
  },
  {
    name: "Zizi Afrique Foundation",
    logo: "/images/sponsors/zizi-afrique.png",
  },
  {
    name: "Safaricom Foundation",
    logo: "/images/sponsors/safaricom.png",
  },
  {
    name: "BBC Media Action",
    logo: "/images/sponsors/bbc-media-action.png",
  },
  {
    name: "Vox Radio",
    logo: "/images/sponsors/vox-radio.png",
  },
  {
    name: "Paradigm Initiative",
    logo: "/images/sponsors/paradigm-initiative.png",
  },
  {
    name: "NetHope",
    logo: "/images/sponsors/nethope.png",
  },
  {
    name: "unaco",
    logo: "/images/sponsors/unaco.png",
  },
  {
    name: "voices",
    logo: "/images/sponsors/voices.png",
  },
  {
    name: "ushahidi",
    logo: "/images/sponsors/ushahidi.png",
  },
  {
    name: "Common",
    logo: "/images/sponsors/common.png",
  },
  {
    name: "newzealand",
    logo: "/images/sponsors/newzealand.png",
  },
];

export default function SponsorsCarousel() {
  return (
    <div className="py-16 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h3 className="font-display text-2xl text-gray-900 mb-4">Our Partners & Sponsors</h3>
          <p className="text-gray-600">Working together to create lasting impact in our communities</p>
        </div>

        {/* Infinite Scroll Container */}
        <div className="relative overflow-hidden">
          <div className="flex animate-scroll">
            {/* First set of logos */}
            {sponsors.map((sponsor, index) => (
              <div
                key={`first-${index}`}
                className="flex-shrink-0 mx-4 sm:mx-6 lg:mx-8 flex items-center justify-center"
                style={{ minWidth: "200px" }} // Reduced minWidth for better fit
              >
                <div className="p-4 rounded-2xl hover:shadow-xl transition-shadow duration-300 w-full h-32 flex items-center justify-center group">
                  <Image
                    src={sponsor.logo || "/placeholder.svg"}
                    alt={`${sponsor.name} logo`}
                    width={160} // Reduced for better proportionality
                    height={80} // Reduced for better proportionality
                    className="max-w-full max-h-full object-contain transition-all duration-300 group-hover:scale-110"
                    quality={100}
                    priority={index < 4} // Prioritize first few images for faster loading
                    onError={(e) => {
                      console.error(`Failed to load image for ${sponsor.name}: ${sponsor.logo}`);
                      e.currentTarget.src = "/placeholder.svg"; // Fallback on error
                    }}
                  />
                </div>
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {sponsors.map((sponsor, index) => (
              <div
                key={`second-${index}`}
                className="flex-shrink-0 mx-4 sm:mx-6 lg:mx-8 flex items-center justify-center"
                style={{ minWidth: "200px" }}
              >
                <div className="p-4 rounded-2xl hover:shadow-xl transition-shadow duration-300 w-full h-32 flex items-center justify-center group">
                  <Image
                    src={sponsor.logo || "/placeholder.svg"}
                    alt={`${sponsor.name} logo`}
                    width={160}
                    height={80}
                    className="max-w-full max-h-full object-contain transition-all duration-300 group-hover:scale-110"
                    quality={100}
                    priority={index < 4}
                    onError={(e) => {
                      console.error(`Failed to load image for ${sponsor.name}: ${sponsor.logo}`);
                      e.currentTarget.src = "/placeholder.svg"; // Fallback on error
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}