"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Clock, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ModernNavbar from "@/components/modern-navbar";
import Footer from "@/components/footer";
import { Input } from "@/components/ui/input";
import Head from "next/head";
import { motion } from "framer-motion";

interface Post {
  _id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  category: string;
  slug: string;
  tags: string[];
}

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/news`, {
          cache: "no-store",
        });
        if (!res.ok) throw new Error(`Failed to fetch posts (status: ${res.status})`);
        const data = await res.json();
        console.log("Fetched posts:", data);
        setPosts(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred while fetching posts");
        setPosts([]); // Avoid using sample data to prevent slug mismatches
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const filteredPosts = posts
    .filter(
      (post: Post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (post.tags && post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())))
    )
    .filter((post: Post) => selectedCategory === "All" || post.category === selectedCategory)
    .sort((a: Post, b: Post) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const categories = ["All", ...new Set(posts.map((post) => post.category))];

  const heroVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <ModernNavbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-48 w-full bg-gray-200 rounded-t-lg"></div>
                <CardContent className="p-6">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="h-8 bg-gray-200 rounded w-24"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Latest News & Updates | Tana River County</title>
        <meta name="description" content="Stay informed with the latest news from Tana River County." />
        <meta name="keywords" content="Tana River, news, community, education, environment, partnerships" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Latest News & Updates | Tana River County" />
        <meta
          property="og:description"
          content="Discover the latest initiatives, community impact, and events in Tana River County."
        />
        <meta property="og:image" content="/images/og-image.jpg" />
        <meta property="og:url" content="https://yourwebsite.com/blog" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <ModernNavbar />
        <section className="relative py-12 sm:py-16 bg-gradient-to-r from-emerald-600 to-red-600 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/80 to-red-600/80"></div>
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div initial="hidden" animate="visible" variants={heroVariants}>
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold mb-4 tracking-tight">
                Tana River Stories
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-6 sm:mb-8 leading-relaxed">
                Uncover the heart of our community through stories of impact, resilience, and progress in Tana River County.
              </p>
              <Link href="#posts">
                <Button
                  className="bg-white text-emerald-600 hover:bg-emerald-100 font-semibold py-2 sm:py-3 px-6 sm:px-8 rounded-full text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  aria-label="Explore all blog posts"
                >
                  Discover Stories <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        <section className="py-8 bg-white sticky top-0 z-10 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="relative w-full sm:w-1/3">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                  aria-label="Search blog posts"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category)}
                    className={
                      selectedCategory === category
                        ? "bg-emerald-600 text-white hover:bg-emerald-700"
                        : "text-gray-600"
                    }
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="posts" className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {filteredPosts.length === 0 ? (
              <div className="text-center py-12">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    vectorEffect="non-scaling-stroke"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="mt-2 text-lg font-medium text-gray-900">No posts found</h3>
                <p className="mt-1 text-gray-500">
                  {searchTerm || selectedCategory !== "All"
                    ? "Try adjusting your search or filter criteria."
                    : "There are currently no posts available."}
                </p>
                {searchTerm && (
                  <div className="mt-6">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearchTerm("");
                        setSelectedCategory("All");
                      }}
                    >
                      Clear all filters
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <Card key={post._id} className="group hover:shadow-xl transition-all duration-300" role="article">
                    <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                      <Image
                        src={post.image || "/images/placeholder.jpg"}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        priority={posts[0]?._id === post._id}
                        onError={(e) => {
                          console.error(`Failed to load image for post ${post.title}: ${post.image}`);
                          (e.target as HTMLImageElement).src = "/images/placeholder.jpg";
                        }}
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-emerald-600 text-white px-3 py-1 rounded-full text-sm">
                          {post.category}
                        </span>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                        <div className="flex items-center" aria-label={`Published on ${post.date}`}>
                          <Calendar className="h-4 w-4 mr-2" />
                          {new Date(post.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </div>
                        <div className="flex items-center" aria-label={`${post.readTime} read time`}>
                          <Clock className="h-4 w-4 mr-2" />
                          {post.readTime}
                        </div>
                      </div>
                      <h3 className="font-display text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                      <Link href={`/blog/${encodeURIComponent(post.slug)}`}>
                        <Button
                          variant="ghost"
                          className="group-hover:text-emerald-600 p-0"
                          onClick={() => console.log(`Navigating to /blog/${post.slug}`)}
                        >
                          Read More
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default BlogPage;