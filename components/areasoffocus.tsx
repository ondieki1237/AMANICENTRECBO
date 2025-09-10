'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import ModernNavbar from './modern-navbar';
import Image from 'next/image';
import Link from 'next/link';

// Neumorphic shadow utility for reusability
const neumorphicShadow = {
  boxShadow: `
    6px 6px 12px rgba(0, 0, 0, 0.08),
    -6px -6px 12px rgba(255, 255, 255, 0.9)
  `,
  transition: "box-shadow 0.3s ease, transform 0.3s ease",
};

export default function AreasOfFocusPage() {
  const focusAreas = [
    {
      title: 'Climate Education',
      desc: 'Empowering communities with knowledge about climate change adaptation and environmental conservation.',
      img: '/images/climate_change.png',
      link: '/amanimashinani#climate',
    },
    {
      title: 'Basic & Tertiary Education',
      desc: 'Supporting educational initiatives from primary learning to higher education opportunities.',
      img: '/images/education.png',
      link: '/amanimashinani#education',
    },
    {
      title: 'Peacebuilding & Civic Engagement',
      desc: 'Promoting dialogue, reconciliation, and active participation in decision-making to strengthen peace and democracy.',
      img: '/images/peace.png',
      link: '/amanimashinani#peace',
    },
    {
      title: 'Economic Empowerment',
      desc: 'Creating opportunities for sustainable livelihoods and entrepreneurship development.',
      img: '/images/economic.png',
      link: '/amanimashinani#economic',
    },
  ];

  return (
    <div className="min-h-fit bg-[#F5F6F5] font-body">
      {/* Navigation Bar */}
      <ModernNavbar />

      {/* Areas of Focus Section */}
      <section id="work" className="py-8 sm:py-12 bg-[#F5F6F5]">
        <div className="w-full px-2 sm:px-4">
          {/* Section Header */}
          <div className="text-center mb-8">
            <div
              className="inline-block bg-[#F5F6F5] px-3 py-1 rounded-full mb-3"
              style={neumorphicShadow}
            >
              <p className="text-[#10B981] font-semibold text-xs sm:text-sm uppercase">
                Our Focus
              </p>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-[#4A4A4A] mb-2">
              Areas of Focus
            </h2>
            <p className="text-base sm:text-lg text-[#6B7280] max-w-2xl mx-auto leading-relaxed">
              Our comprehensive approach addresses multiple aspects of community
              development and empowerment
            </p>
          </div>

          {/* Focus Cards */}
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8 mb-10">
            {focusAreas.map((item, idx) => (
              <Card
                key={idx}
                className="
                  group border border-[#E0E0E0]/30 rounded-2xl overflow-hidden
                  flex-1 min-w-[220px] max-w-xs md:max-w-sm
                  bg-[#F5F6F5] hover:bg-[#E8ECEF] transition-transform
                  mx-auto
                "
                style={neumorphicShadow}
                tabIndex={0}
                onMouseOver={e => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                  (e.currentTarget as HTMLElement).style.boxShadow = `
                    8px 8px 16px rgba(0, 0, 0, 0.12),
                    -8px -8px 16px rgba(255, 255, 255, 0.95)
                  `;
                }}
                onMouseOut={e => {
                  (e.currentTarget as HTMLElement).style.transform = '';
                  (e.currentTarget as HTMLElement).style.boxShadow = neumorphicShadow.boxShadow;
                }}
                onMouseDown={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = `
                    inset 4px 4px 8px rgba(0, 0, 0, 0.15),
                    inset -4px -4px 8px rgba(255, 255, 255, 0.8)
                  `;
                }}
                onMouseUp={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = `
                    8px 8px 16px rgba(0, 0, 0, 0.12),
                    -8px -8px 16px rgba(255, 255, 255, 0.95)
                  `;
                }}
              >
                <div className="flex flex-col h-full">
                  {/* Image */}
                  <div className="relative w-full h-48">
                    <Image
                      src={item.img}
                      alt={item.title}
                      fill
                      className="object-cover object-center group-hover:scale-102 transition-transform duration-300"
                    />
                  </div>
                  {/* Text */}
                  <CardContent className="p-5 flex flex-col flex-1">
                    <h3 className="font-display text-lg sm:text-xl md:text-2xl text-[#4A4A4A] mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm sm:text-base text-[#6B7280] leading-relaxed mb-4 flex-1">
                      {item.desc}
                    </p>
                    <Link href={item.link} passHref legacyBehavior>
                      <Button
                        variant="outline"
                        className="
                          w-fit px-5 py-2 text-[#10B981] border-0
                          bg-[#F5F6F5] hover:bg-[#E8ECEF]
                          rounded-full flex items-center gap-2 mt-auto
                        "
                        style={neumorphicShadow}
                        tabIndex={0}
                        onMouseOver={e => {
                          (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                          (e.currentTarget as HTMLElement).style.boxShadow = `
                            8px 8px 16px rgba(0, 0, 0, 0.12),
                            -8px -8px 16px rgba(255, 255, 255, 0.95)
                          `;
                        }}
                        onMouseOut={e => {
                          (e.currentTarget as HTMLElement).style.transform = '';
                          (e.currentTarget as HTMLElement).style.boxShadow = neumorphicShadow.boxShadow;
                        }}
                        onMouseDown={e => {
                          (e.currentTarget as HTMLElement).style.boxShadow = `
                            inset 4px 4px 8px rgba(0, 0, 0, 0.15),
                            inset -4px -4px 8px rgba(255, 255, 255, 0.8)
                          `;
                        }}
                        onMouseUp={e => {
                          (e.currentTarget as HTMLElement).style.boxShadow = `
                            8px 8px 16px rgba(0, 0, 0, 0.12),
                            -8px -8px 16px rgba(255, 255, 255, 0.95)
                          `;
                        }}
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
              className="
                bg-[#F5F6F5] text-[#10B981]
                hover:bg-[#E8ECEF]
                text-base px-6 py-3 rounded-full flex items-center gap-2 mx-auto border-0
              "
              style={neumorphicShadow}
              tabIndex={0}
              onMouseOver={e => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                (e.currentTarget as HTMLElement).style.boxShadow = `
                  8px 8px 16px rgba(0, 0, 0, 0.12),
                  -8px -8px 16px rgba(255, 255, 255, 0.95)
                `;
              }}
              onMouseOut={e => {
                (e.currentTarget as HTMLElement).style.transform = '';
                (e.currentTarget as HTMLElement).style.boxShadow = neumorphicShadow.boxShadow;
              }}
              onMouseDown={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = `
                  inset 4px 4px 8px rgba(0, 0, 0, 0.15),
                  inset -4px -4px 8px rgba(255, 255, 255, 0.8)
                `;
              }}
              onMouseUp={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = `
                  8px 8px 16px rgba(0, 0, 0, 0.12),
                  -8px -8px 16px rgba(255, 255, 255, 0.95)
                `;
              }}
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