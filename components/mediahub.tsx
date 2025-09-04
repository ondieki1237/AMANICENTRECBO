'use client'; // Required for client-side rendering in App Router

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Image from 'next/image';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Link from 'next/link';
import { Button } from './ui/button';

interface Story {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  category: string;
  image: string | null;
}

const MediaHubPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeTab, setActiveTab] = useState<string>('Blog');
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch blog posts from backend API
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/news`, {
          cache: 'no-store',
        });
        if (!response.ok) {
          throw new Error(`Failed to fetch posts (status: ${response.status})`);
        }
        const data = await response.json();
        console.log('Fetched posts:', data);

        // Map API data to Story interface
        const fetchedStories: Story[] = data
          .filter((post: any) => post.slug && post.title && post.excerpt)
          .map((post: any) => ({
            _id: post._id,
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt,
            date: post.date.split('T')[0], // Format date (e.g., "2025-08-11")
            category: post.category || 'General',
            image: post.image || '/images/stories/fallback.png',
          }));

        setStories(fetchedStories);
      } catch (err: any) {
        setError(err.message || 'An error occurred while fetching posts');
        console.error('Fetch Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const categories = ['All', ...Array.from(new Set(stories.map(story => story.category)))];

  const filteredStories = activeCategory === 'All'
    ? stories
    : stories.filter(story => story.category === activeCategory);

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
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
        <title>Media Hub | Amani Centre</title>
        <meta name="description" content="Explore our blog posts and stories from Amani Centre" />
      </Head>

      {/* Banner Section */}
      <section className="bg-[#1A1A1A] text-white py-16 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Media Hub</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Discover our blog posts and stories showcasing Amani Centre's impact
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

            {/* Loading State */}
            {loading && (
              <div className="text-center py-16">
                <p className="text-gray-600">Loading stories...</p>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="text-center py-16">
                <p className="text-red-600">Error: {error}</p>
                <p className="text-gray-600 mt-2">Please try again later or contact support.</p>
              </div>
            )}

            {/* Stories Carousel */}
            {!loading && !error && filteredStories.length > 0 ? (
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
                      key={story._id}
                      className="px-2"
                      variants={itemVariants}
                      whileHover={{ y: -5 }}
                    >
                      <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                        <div className="h-48 bg-gray-200 overflow-hidden">
                          <Image
                            src={story.image || '/images/stories/fallback.png'}
                            alt={story.title}
                            width={400}
                            height={192}
                            className="w-full h-full object-cover"
                            loading="lazy"
                            onError={(e) => {
                              console.error(`Failed to load image for story ${story.title}: ${story.image}`);
                              (e.target as HTMLImageElement).src = '/images/stories/fallback.png';
                            }}
                          />
                        </div>
                        <div className="p-6">
                          <span className="inline-block bg-yellow-200 text-gray-800 text-xs px-3 py-1 rounded-full mb-2">
                            {story.category}
                          </span>
                          <h3 className="text-xl font-semibold mb-2">{story.title}</h3>
                          <p className="text-gray-500 text-sm mb-4">{story.date}</p>
                          <Link
                            href={`/blog/${encodeURIComponent(story.slug)}`}
                            className="text-[#E50914] font-medium hover:text-[#B91C1C] inline-flex items-center transition-colors"
                            onClick={() => console.log(`Navigating to /blog/${story.slug}`)}
                          >
                            Read Story
                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </Slider>
              </motion.div>
            ) : !loading && !error && (
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