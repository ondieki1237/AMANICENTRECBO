"use client";
import { useState, useEffect } from "react";
import ModernNavbar from "../../../components/modern-navbar";
import { Card, CardContent } from "../../../components/ui/card";
import Footer from "../../../components/footer";
import { Button } from "../../../components/ui/button";
import { Calendar, Clock, Tag, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Slider from "react-slick"; // Import react-slick
import "slick-carousel/slick/slick.css"; // Import slick CSS
import "slick-carousel/slick/slick-theme.css"; // Import slick theme CSS

interface Post {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  image: string | null;
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const [post, setPost] = useState<Post | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [allPostsLoading, setAllPostsLoading] = useState(true);
  const [error, setError] = useState("");
  const [allPostsError, setAllPostsError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        console.log("Fetching post with slug:", params.slug);
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/news/${params.slug}`, {
          cache: "no-store",
        });
        console.log("Fetch response status:", res.status);
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || `Failed to fetch post '${params.slug}' (status: ${res.status})`);
        }
        const data = await res.json();
        console.log("Fetched post data:", data);
        if (!data) throw new Error(`Post with slug '${params.slug}' not found`);
        setPost(data);

        const relatedUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/news?category=${encodeURIComponent(
          data.category
        )}&exclude=${data._id}&limit=3`;
        console.log("Related posts URL:", relatedUrl);
        const relatedRes = await fetch(relatedUrl, { cache: "no-store" });
        console.log("Related posts response status:", relatedRes.status);
        if (relatedRes.ok) {
          const relatedData = await relatedRes.json();
          console.log("Fetched related posts:", relatedData);
          setRelatedPosts(relatedData.filter((post: Post) => post.slug && post.title) || []);
        } else {
          console.warn("Failed to fetch related posts:", relatedRes.status);
          setRelatedPosts([]);
        }
      } catch (err: any) {
        console.error("Fetch error:", err);
        setError(err.message || `An error occurred while fetching the post '${params.slug}'`);
      } finally {
        setLoading(false);
      }
    };

    const fetchAllPosts = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/news`, {
          cache: "no-store",
        });
        if (!res.ok) throw new Error(`Failed to fetch all posts (status: ${res.status})`);
        const data = await res.json();
        console.log("Fetched all posts:", data);
        setAllPosts(data.filter((post: Post) => post.slug && post.title && post.slug !== params.slug) || []);
      } catch (err) {
        setAllPostsError(err instanceof Error ? err.message : "An error occurred while fetching all posts");
        setAllPosts([]);
      } finally {
        setAllPostsLoading(false);
      }
    };

    fetchPost();
    fetchAllPosts();
  }, [params.slug]);

  // Carousel settings for react-slick
  const carouselSettings = {
    dots: true,
    infinite: allPosts.length > 1, // Enable infinite scroll only if more than one post
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const heroVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const metadataVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } },
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-80 bg-gray-200 rounded-lg"></div>
          <div className="h-96 w-full max-w-5xl bg-gray-200 rounded-xl"></div>
          <div className="h-4 w-3/4 bg-gray-200 rounded-lg"></div>
          <div className="h-4 w-1/2 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-white">
        <ModernNavbar />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <p className="text-red-500 text-xl font-semibold">{error || `Post with slug '${params.slug}' not found`}</p>
          <Link href="/blog" className="mt-6 inline-block text-green-600 font-medium hover:text-green-700 transition-colors">
            Back to Blog
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-white">
        <ModernNavbar />
        <main className="pt-20 pb-16">
          <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <section className="relative mb-12">
              <div className="relative w-full h-80 sm:h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-xl">
                {post.image ? (
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 1280px"
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    priority
                    onError={(e) => {
                      console.error(`Failed to load image for post ${post.title}: ${post.image}`);
                      (e.target as HTMLImageElement).src = "/images/placeholder.jpg";
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center rounded-2xl">
                    <span className="text-gray-400 text-lg">No image available</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
              </div>
              <motion.div className="absolute bottom-8 left-6 right-6" initial="hidden" animate="visible" variants={heroVariants}>
                <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mb-6">
                  {post.title}
                </h1>
                <motion.div className="flex flex-wrap items-center gap-6 text-sm text-white/90" variants={metadataVariants}>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-red-400" />
                    <span>
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-red-400" />
                    <span>{post.readTime}</span>
                  </div>
                  <div className="flex items-center">
                    <Tag className="h-5 w-5 mr-2 text-red-400" />
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">{post.category}</span>
                  </div>
                </motion.div>
              </motion.div>
            </section>
            <section className="mb-16">
              <Card className="shadow-lg rounded-2xl bg-white border border-gray-100">
                <CardContent className="p-8">
                  <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed" dangerouslySetInnerHTML={{ __html: post.content }} />
                  <div className="mt-8">
                    <p className="text-sm text-gray-500">
                      Tags:{" "}
                      {post.tags.map((tag) => (
                        <span key={tag} className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full mr-2">
                          {tag}
                        </span>
                      ))}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>

            {relatedPosts.length > 0 && (
              <section className="mb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 mb-8">Related Stories</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {relatedPosts.map((relatedPost) => (
                      <Link key={relatedPost._id} href={`/blog/${encodeURIComponent(relatedPost.slug)}`} className="group">
                        <Card className="h-full rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                          <CardContent className="p-0">
                            {relatedPost.image ? (
                              <div className="relative w-full h-56">
                                <Image
                                  src={relatedPost.image}
                                  alt={relatedPost.title}
                                  fill
                                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                  className="object-cover rounded-t-xl transition-transform duration-500 group-hover:scale-105"
                                  onError={(e) => {
                                    console.error(`Failed to load image for related post ${relatedPost.title}: ${relatedPost.image}`);
                                    (e.target as HTMLImageElement).src = "/images/placeholder.jpg";
                                  }}
                                />
                              </div>
                            ) : (
                              <div className="relative w-full h-56 bg-gray-100 flex items-center justify-center rounded-t-xl">
                                <span className="text-gray-400">No image available</span>
                              </div>
                            )}
                            <div className="p-6">
                              <h3 className="font-display text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors mb-3">
                                {relatedPost.title}
                              </h3>
                              <p className="text-gray-600 line-clamp-2">{relatedPost.excerpt}</p>
                              <span className="mt-4 inline-block text-green-600 font-medium group-hover:underline">
                                Read More
                              </span>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </div>
              </section>
            )}

            <section className="mb-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 mb-8">More Stories</h2>
                {allPostsError && (
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
                        <p className="text-sm text-red-700">{allPostsError}</p>
                      </div>
                    </div>
                  </div>
                )}
                {allPostsLoading ? (
                  <div className="flex space-x-4 overflow-x-auto">
                    {[...Array(3)].map((_, i) => (
                      <Card key={i} className="animate-pulse min-w-[300px]">
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
                ) : allPosts.length === 0 ? (
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
                    <h3 className="mt-2 text-lg font-medium text-gray-900">No more posts found</h3>
                    <p className="mt-1 text-gray-500">Check back later for more stories.</p>
                  </div>
                ) : (
                  <Slider {...carouselSettings}>
                    {allPosts.map((post) => (
                      <div key={post._id} className="px-2">
                        <Card className="group hover:shadow-xl transition-all duration-300" role="article">
                          <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                            <Image
                              src={post.image || "/images/placeholder.jpg"}
                              alt={post.title}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                              priority={allPosts[0]?._id === post._id}
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
                      </div>
                    ))}
                  </Slider>
                )}
              </div>
            </section>
          </article>
        </main>
        <Footer />
      </div>
    </>
  );
}