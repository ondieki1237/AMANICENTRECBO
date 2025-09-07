"use client";
import React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import ModernNavbar from "./modern-navbar";
import Image from "next/image";
import Link from "next/link";

export default function AreasOfFocusPage() {
  const focusAreas = [
    {
      title: "Climate Education",
      desc: "Empowering communities with knowledge about climate change adaptation and environmental conservation.",
      img: "/images/climate_change.png",
      link: "/amanimashinani#climate",
    },
    {
      title: "Basic & Tertiary Education",
      desc: "Supporting educational initiatives from primary learning to higher education opportunities.",
      img: "/images/education.png",
      link: "/amanimashinani#education",
    },
    {
      title: "Peacebuilding & Civic Engagement",
      desc: "Promoting dialogue, reconciliation, and active participation in decision-making to strengthen peace and democracy.",
      img: "/images/peace.png",
      link: "/amanimashinani#peace",
    },
    {
      title: "Economic Empowerment",
      desc: "Creating opportunities for sustainable livelihoods and entrepreneurship development.",
      img: "/images/economic.png",
      link: "/amanimashinani#economic",
    },
  ];

  return (
    <div className="min-h-screen bg-white font-body">
      {/* Navigation Bar */}
      <ModernNavbar />

      {/* Areas of Focus Section */}
      <section id="work" className="py-8 sm:py-12 bg-gray-50">
        <div className="w-full px-2 sm:px-4">
          {/* Section Header */}
          <div className="text-center mb-8">
            <div className="inline-block bg-emerald-100 px-3 py-1 rounded-full mb-3">
              <p className="text-emerald-600 font-semibold text-xs sm:text-sm uppercase">
                Our Focus
              </p>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-gray-900 mb-2">
              Areas of Focus
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Our comprehensive approach addresses multiple aspects of community
              development and empowerment
            </p>
          </div>

          {/* Focus Cards */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 mb-10 md:justify-between">
            {focusAreas.map((item, idx) => (
              <Card
                key={idx}
                className="group hover:shadow-lg transition-all duration-300 border rounded-lg overflow-hidden flex-1 min-w-[220px] max-w-xs md:max-w-sm"
              >
                <div className="flex flex-col h-full">
                  {/* Image */}
                  <div className="relative w-full h-48">
                    <Image
                      src={item.img}
                      alt={item.title}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  {/* Text */}
                  <CardContent className="p-5 flex flex-col flex-1">
                    <h3 className="font-display text-lg sm:text-xl md:text-2xl text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4 flex-1">
                      {item.desc}
                    </p>
                    <Link href={item.link} passHref legacyBehavior>
                      <Button
                        variant="outline"
                        className="w-fit px-4 py-2 text-emerald-700 border-emerald-500 hover:bg-emerald-50 flex items-center gap-2 mt-auto"
                      >
                        Read More
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <Button
              size="lg"
              className="bg-emerald-500 hover:bg-emerald-600 text-white text-base px-6 py-3 rounded-full shadow-md transition-all flex items-center gap-2 mx-auto"
            >
              Support Our Work
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}