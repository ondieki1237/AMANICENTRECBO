'use client'; // Required for client-side rendering in App Router

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Image from 'next/image';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface Story {
  title: string;
  url: string;
  date: string;
  category: string;
  image: string;
}

const MediaHubPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeTab, setActiveTab] = useState<string>('Blog');

  const stories: Story[] = [
    {
      title: "Women leading change in climate resilience",
      url: "https://example.com/women-climate-resilience",
      date: "2022-03-08",
      category: "Climate",
      image: "/images/stories/women-climate.png",
    },
    {
      title: "Youth entrepreneurship in tech hubs",
      url: "https://example.com/youth-tech-hubs",
      date: "2024-01-20",
      category: "Technology",
      image: "/images/stories/youth-tech.png",
    },
    {
      title: "With schools shut by pandemic, solar radios keep Kenyan children learning",
      url: "https://www.reuters.com/article/kenya-solar-education-coronavirus/feature-with-schools-shut-by-pandemic-solar-radios-keep-kenyan-children-learning-idUKL8N2IK45N/",
      date: "2020-11-24",
      category: "Education",
      image: "/images/stories/radio.png",
    },
    {
      title: "Empowering rural communities with solar energy",
      url: "https://example.com/solar-energy-rural",
      date: "2021-06-15",
      category: "Energy",
      image: "/images/stories/solar.png",
    },

    {
      title: "Innovative farming techniques boost yields",
      url: "https://example.com/innovative-farming",
      date: "2023-09-10",
      category: "Agriculture",
      image: "/images/stories/farming.png",
    },
  ];

  const categories = ['All', ...Array.from(new Set(stories.map(story => story.category)))];

  const filteredStories = activeCategory === 'All'
    ? stories
    : stories.filter(story => story.category === activeCategory);

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const sliderSettings = {
    dots: true,
    infinite: filteredStories.length > 3,
    speed: 500,
    slidesToShow: Math.min(filteredStories.length, 3),
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(filteredStories.length, 2),
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Media Hub | Amani Center</title>
        <meta name="description" content="Explore our stories, podcasts, videos, and publications" />
      </Head>

      {/* Banner Section */}
      <section className="bg-[#1A1A1A] text-white py-16 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Media Hub</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Discover our stories, podcasts, videos, and publications that showcase our impact
          </p>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="bg-gray-100 py-4">
        <div className="container mx-auto px-4">
          <nav className="flex overflow-x-auto">
            {['Blog', 'Podcast', 'Video', 'Media Releases', 'Publications'].map((tab) => (
              <button
                key={tab}
                className={`px-6 py-2 whitespace-nowrap font-medium ${
                  activeTab === tab ? 'text-[#E50914] border-b-2 border-[#E50914]' : 'text-gray-600'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {activeTab === 'Blog' && (
          <>
            <h2 className="text-3xl font-bold mb-8">Our Stories</h2>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map(category => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-full text-sm transition-colors ${
                    activeCategory === category
                      ? 'bg-[#E50914] text-white'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-[#F43F5E] hover:text-white'
                  }`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Stories Carousel */}
            {filteredStories.length > 0 ? (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.1 },
                  },
                }}
              >
                <Slider {...sliderSettings}>
                  {filteredStories.map((story) => (
                    <motion.article
                      key={story.url}
                      className="px-2"
                      variants={itemVariants}
                      whileHover={{ y: -5 }}
                    >
                      <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                        <div className="h-48 bg-gray-200 overflow-hidden">
                          <Image
                            src={story.image}
                            alt={story.title}
                            width={400}
                            height={192}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                        <div className="p-6">
                          <span className="inline-block bg-yellow-200 text-gray-800 text-xs px-3 py-1 rounded-full mb-2">
                            {story.category}
                          </span>
                          <h3 className="text-xl font-semibold mb-2">{story.title}</h3>
                          <p className="text-gray-500 text-sm mb-4">{story.date}</p>
                          <a
                            href={story.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#E50914] font-medium hover:text-[#B91C1C] inline-flex items-center transition-colors"
                          >
                            Read Story
                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </a>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </Slider>
              </motion.div>
            ) : (
              <p className="text-gray-600 text-center">No stories available for this category.</p>
            )}
          </>
        )}

        {activeTab !== 'Blog' && (
          <div className="text-center py-16">
            <h3 className="text-2xl font-medium text-gray-600 mb-4">
              {activeTab} content coming soon
            </h3>
            <p className="text-gray-500">
              We're working on bringing you more {activeTab.toLowerCase()} content. Check back later!
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default MediaHubPage;