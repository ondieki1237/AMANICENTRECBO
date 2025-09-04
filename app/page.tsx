"use client";
import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  Users,
  Target,
  Heart,
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  BookOpen,
  Shield,
  Briefcase,
  Sprout,
  Radio,
  Linkedin,
  Facebook,
  Twitter,
  ExternalLink,
  Calendar,
  Clock,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import ModernNavbar from "../components/modern-navbar";
import MediaHubPage from "../components/mediahub";
import RadioPlayer from "../components/radio-player";
import AnimatedCounter from "../components/animated-counter";
import SponsorsCarousel from "../components/sponsors-carousel";
import ContactSection from "../components/ContactSection";
import HeroSection from "../components/herosection";
import Footer from "../components/footer";
import AreasOfFocusPage from "../components/areasoffocus";
import Radioplayer from "../components/radiosection";
import OurStoryPage from "../app/Story/page";
import { motion, useReducedMotion } from "framer-motion";

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

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPostIndex, setCurrentPostIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const shouldReduceMotion = useReducedMotion();

  // Fetch posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        if (!process.env.NEXT_PUBLIC_BACKEND_URL) {
          throw new Error("Backend URL is not defined");
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/news`);
        if (!res.ok) throw new Error(`Failed to fetch posts: ${res.statusText}`);
        const data = await res.json();
        if (!Array.isArray(data)) {
          throw new Error("Invalid data format received");
        }
        setPosts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        // Fallback to sample data
        setPosts([
          {
            _id: 1,
            title: "Community Radio Station Launches New Educational Program",
            excerpt: "Our radio station introduces a new educational program aimed at supporting local students during exam periods...",
            date: "2024-03-15",
            readTime: "5 min read",
            image: "/images/placeholder.jpg",
            category: "Education",
            slug: "community-radio-educational-program",
            tags: ["education", "community", "radio"],
          },
          {
            _id: 2,
            title: "Climate Change Workshop Successfully Conducted",
            excerpt: "Over 100 community members participated in our climate change adaptation workshop, learning practical skills...",
            date: "2024-03-10",
            readTime: "4 min read",
            image: "/images/placeholder.jpg",
            category: "Environment",
            slug: "climate-change-workshop-2024",
            tags: ["environment", "workshop", "climate"],
          },
          {
            _id: 3,
            title: "New Partnership Announced for Youth Empowerment",
            excerpt: "We're excited to announce our new partnership with local organizations to enhance youth development programs...",
            date: "2024-03-05",
            readTime: "3 min read",
            image: "/images/placeholder.jpg",
            category: "Partnerships",
            slug: "youth-empowerment-partnership",
            tags: ["youth", "partnership", "community"],
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Rotate posts every 4 seconds
  useEffect(() => {
    if (posts.length <= 1 || loading || shouldReduceMotion) return;

    const interval = setInterval(() => {
      setCurrentPostIndex((prevIndex) => (prevIndex + 1) % posts.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [posts, loading, shouldReduceMotion]);

  // Animation variants for news section
  const newsVariants = shouldReduceMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            ease: "easeOut",
          },
        },
      };

  return (
    <div className="min-h-screen bg-white font-body">
      <ModernNavbar />
      {/* Hero Section */}
      <HeroSection />

{/* Who We Are Section */}
<section id="story" className="py-24 bg-white">
  <div className="max-w-screen-xl mx-auto px-2 sm:px-4 lg:px-6">
    <div className="grid lg:grid-cols-2 gap-16 items-center">
      <div>
        <div className="inline-block bg-emerald-100 px-6 py-3 rounded-full mb-6">
          <p className="text-emerald-600 font-semibold text-sm tracking-wide uppercase">Who We Are</p>
        </div>
        <h2 className="font-display text-4xl md:text-5xl text-gray-900 mb-8">Who We Are</h2>
        <div className="w-24 h-1 bg-emerald-600 mb-8 rounded-full"></div>

        <div className="space-y-6">
          <p className="text-xl text-gray-600 leading-relaxed">
            We are a <span className="font-semibold text-emerald-600">youth-led organisation</span> based in
            Minjila, Tana River County, Kenya. Established in{" "}
            <span className="font-semibold text-red-600">2016</span>, we exist to champion peace and development
            projects for rural communities in the Tana region.
          </p>

          <div className="bg-gradient-to-r from-emerald-50 to-red-50 p-8 rounded-2xl">
            <h3 className="font-display text-2xl text-gray-900 mb-4">Our Mission</h3>
            <p className="text-gray-700 text-lg leading-relaxed">
              To bridge communities through innovative media and ICT solutions, creating pathways for economic
              empowerment, social cohesion, and sustainable development in Tana River County.
            </p>
          </div>

          {/* Added button with link to full story */}
        <Link 
          href="/Story" 
          className="inline-block mt-6 px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-full transition duration-300 shadow-lg hover:shadow-emerald-200"
        >
          Get the full story
        </Link>
        </div>
      </div>

      <div>
        <img
          src="/images/image1.png"
          alt="Community impact in Tana River"
          className="w-full max-w-lg mx-auto rounded-xl object-cover"
        />
      </div>
    </div>
  </div>
</section>

      {/* Areas of Focus */}
      <AreasOfFocusPage />

      {/* Our Approach Section */}
      <section id="approach" className="py-24 bg-gradient-to-br from-red-600 to-red-700 text-white">
        <div className="max-w-screen-xl mx-auto px-2 sm:px-4 lg:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full mb-6">
                <p className="text-white font-semibold text-sm tracking-wide uppercase">Our Approach</p>
              </div>
              <h2 className="font-display text-4xl md:text-5xl text-white mb-8">Our Approach</h2>
              <div className="w-24 h-1 bg-white mb-8 rounded-full"></div>

              <div className="space-y-6">
                <p className="text-xl text-white/90 leading-relaxed">
                  We believe that{" "}
                  <span className="font-semibold text-white">
                    empowering individuals with accurate and applicable information and skills
                  </span>{" "}
                  is key to fostering resilience and sustainable development in communities.
                </p>

                <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl">
                  <h3 className="font-display text-2xl text-white mb-4">Partnership Approach</h3>
                  <p className="text-white/90 text-lg leading-relaxed">
                    Through partnerships with state and non-state actors, we are stepping up to connect, inform, and
                    support communities in Tana River County navigate challenging times.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="font-display text-2xl text-white mb-8">Key Challenge Areas We Address:</h3>

              <div className="space-y-4">
                {[
                  "Climate change adaptation",
                  "Harsh economic times",
                  "Access to basic amenities",
                  "Health and education access",
                  "Dignified work opportunities",
                  "Peacebuilding initiatives",
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-4 bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                    <CheckCircle className="h-6 w-6 text-emerald-300 flex-shrink-0" />
                    <span className="text-white/90 text-lg">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      
      {/* Radio Stream Section */}
      <Radioplayer />
      {/* News Section */}
      <MediaHubPage />
      
      {/* Sponsors Carousel */}
      <SponsorsCarousel />

      {/* Contact Section */}
      <ContactSection />
      <Footer />
    </div>
  );
}