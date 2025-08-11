"use client";
import React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import ModernNavbar from "@/components/modern-navbar";

export default function AreasOfFocusPage() {
  return (
    <div className="min-h-screen bg-white font-body">
      {/* Navigation Bar */}
      <ModernNavbar />

      {/* Areas of Focus Section */}
      <section id="work" className="py-12 sm:py-24 bg-gray-50">
        <div className="max-w-screen-xl mx-auto px-2 sm:px-4 lg:px-6">
          <div className="text-center mb-12 sm:mb-20">
            <div className="inline-block bg-emerald-100 px-6 py-3 rounded-full mb-6">
              <p className="text-emerald-600 font-semibold text-sm tracking-wide uppercase">Our Focus</p>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-7xl text-gray-900 mb-6 sm:mb-8">
              Areas of Focus
            </h2>
            <p className="text-xl sm:text-2xl md:text-3xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Our comprehensive approach addresses multiple aspects of community development and empowerment
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 mb-12 sm:mb-16">
            {/* Card 1: Climate Education */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md hover:-translate-y-1">
              <CardContent className="p-3 sm:p-5 flex flex-col items-center">
                <div className="relative w-full h-32 sm:h-40 md:h-48 mb-1 overflow-hidden rounded-lg">
                  <Image
                    src="/images/climate_change.png"
                    alt="Climate education initiatives in Tana River County"
                    fill
                    className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                    quality={75}
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white to-transparent" />
                </div>
                <h3 className="font-display text-xl sm:text-2xl md:text-3xl text-gray-900 mt-0 sm:mt-1 text-center">
                  Climate Education
                </h3>
                <p className="text-gray-600 text-center leading-relaxed text-base sm:text-lg md:text-xl">
                  Empowering communities with knowledge about climate change adaptation and environmental conservation.
                </p>
              </CardContent>
            </Card>

            {/* Card 2: Civic Engagement */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md hover:-translate-y-1">
              <CardContent className="p-3 sm:p-5 flex flex-col items-center">
                <div className="relative w-full h-32 sm:h-40 md:h-48 mb-1 overflow-hidden rounded-lg">
                  <Image
                    src="/images/civic.png"
                    alt="Civic engagement activities in Tana River County"
                    fill
                    className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                    quality={75}
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white to-transparent" />
                </div>
                <h3 className="font-display text-xl sm:text-2xl md:text-3xl text-gray-900 mt-0 sm:mt-1 text-center">
                  Civic Engagement
                </h3>
                <p className="text-gray-600 text-center leading-relaxed text-base sm:text-lg md:text-xl">
                  Promoting active participation in democratic processes and community decision-making.
                </p>
              </CardContent>
            </Card>

            {/* Card 3: Public Health Information */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md hover:-translate-y-1">
              <CardContent className="p-3 sm:p-5 flex flex-col items-center">
                <div className="relative w-full h-32 sm:h-40 md:h-48 mb-1 overflow-hidden rounded-lg">
                  <Image
                    src="/images/health.png"
                    alt="Public health initiatives in Tana River County"
                    fill
                    className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                    quality={75}
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white to-transparent" />
                </div>
                <h3 className="font-display text-xl sm:text-2xl md:text-3xl text-gray-900 mt-0 sm:mt-1 text-center">
                  Public Health Information
                </h3>
                <p className="text-gray-600 text-center leading-relaxed text-base sm:text-lg md:text-xl">
                  Disseminating vital health information and promoting wellness in rural communities.
                </p>
              </CardContent>
            </Card>

            {/* Card 4: Basic & Tertiary Education */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md hover:-translate-y-1">
              <CardContent className="p-3 sm:p-5 flex flex-col items-center">
                <div className="relative w-full h-32 sm:h-40 md:h-48 mb-1 overflow-hidden rounded-lg">
                  <Image
                    src="/images/education.png"
                    alt="Educational programs in Tana River County"
                    fill
                    className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                    quality={75}
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white to-transparent" />
                </div>
                <h3 className="font-display text-xl sm:text-2xl md:text-3xl text-gray-900 mt-0 sm:mt-1 text-center">
                  Basic & Tertiary Education
                </h3>
                <p className="text-gray-600 text-center leading-relaxed text-base sm:text-lg md:text-xl">
                  Supporting educational initiatives from primary learning to higher education opportunities.
                </p>
              </CardContent>
            </Card>

            {/* Card 5: Peacebuilding */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md hover:-translate-y-1">
              <CardContent className="p-3 sm:p-5 flex flex-col items-center">
                <div className="relative w-full h-32 sm:h-40 md:h-48 mb-1 overflow-hidden rounded-lg">
                  <Image
                    src="/images/peace.png"
                    alt="Peacebuilding efforts in Tana River County"
                    fill
                    className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                    quality={75}
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white to-transparent" />
                </div>
                <h3 className="font-display text-xl sm:text-2xl md:text-3xl text-gray-900 mt-0 sm:mt-1 text-center">
                  Peacebuilding
                </h3>
                <p className="text-gray-600 text-center leading-relaxed text-base sm:text-lg md:text-xl">
                  Fostering dialogue, reconciliation, and conflict resolution within and between communities.
                </p>
              </CardContent>
            </Card>

            {/* Card 6: Economic Empowerment */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md hover:-translate-y-1">
              <CardContent className="p-3 sm:p-5 flex flex-col items-center">
                <div className="relative w-full h-32 sm:h-40 md:h-48 mb-1 overflow-hidden rounded-lg">
                  <Image
                    src="/images/economic.png"
                    alt="Economic empowerment programs in Tana River County"
                    fill
                    className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                    quality={75}
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white to-transparent" />
                </div>
                <h3 className="font-display text-xl sm:text-2xl md:text-3xl text-gray-900 mt-0 sm:mt-1 text-center">
                  Economic Empowerment
                </h3>
                <p className="text-gray-600 text-center leading-relaxed text-base sm:text-lg md:text-xl">
                  Creating opportunities for sustainable livelihoods and entrepreneurship development.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
          
          </div>
        </div>
      </section>
    </div>
  );
}