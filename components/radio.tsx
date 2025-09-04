"use client";

import ModernNavbar from "./modern-navbar";
import Footer from "./footer";
import { Radio, Play, Pause, Volume2 } from "lucide-react"; // Removed Link from lucide-react
import Link from "next/link"; // Added Next.js Link import
import { useState, useRef, useEffect } from "react";

function RadioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [streamStatus, setStreamStatus] = useState("Ready to play");
  const [volume, setVolume] = useState(0.7);
  const [progressWidth, setProgressWidth] = useState(0);
  const [isLive, setIsLive] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;

    const handleLoadStart = () => setStreamStatus("Loading stream...");
    const handleCanPlay = () => !isPlaying && setStreamStatus("Ready to play");
    const handlePlaying = () => {
      setIsPlaying(true);
      setIsLoading(false);
      setStreamStatus("Live streaming");
      setIsLive(true);
      setProgressWidth(100);
    };
    const handlePause = () => {
      setIsPlaying(false);
      setStreamStatus("Paused");
      setIsLive(false);
      setProgressWidth(0);
    };
    const handleEnded = () => {
      setIsPlaying(false);
      setStreamStatus("Stream ended");
      setIsLive(false);
      setProgressWidth(0);
    };
    const handleError = (e: Event) => {
      console.error("Audio error:", e, audio.error);
      setIsPlaying(false);
      setIsLoading(false);
      setStreamStatus("Connection error - Click to retry");
      setIsLive(false);
      setProgressWidth(0);
    };
    const handleStalled = () => setStreamStatus("Buffering...");
    const handleWaiting = () => setStreamStatus("Buffering...");

    audio.addEventListener("loadstart", handleLoadStart);
    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("playing", handlePlaying);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);
    audio.addEventListener("stalled", handleStalled);
    audio.addEventListener("waiting", handleWaiting);

    return () => {
      audio.removeEventListener("loadstart", handleLoadStart);
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("playing", handlePlaying);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
      audio.removeEventListener("stalled", handleStalled);
      audio.removeEventListener("waiting", handleWaiting);
    };
  }, [isPlaying, volume]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio || isLoading) return;

    if (isPlaying) {
      audio.pause();
    } else {
      setIsLoading(true);
      setStreamStatus("Connecting...");
      try {
        audio.load();
        await audio.play();
      } catch (error: any) {
        console.error("Playback failed:", error);
        setIsPlaying(false);
        setIsLoading(false);
        setIsLive(false);
        setProgressWidth(0);
        setStreamStatus(
          error.name === "NotAllowedError"
            ? "Click to allow audio playback"
            : error.name === "NotSupportedError"
            ? "Stream format not supported"
            : "Connection failed - Click to retry"
        );
      }
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number.parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) audioRef.current.volume = newVolume;
  };

  return (
    <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-lg w-full max-w-md mx-auto">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 mb-3">
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <button
            onClick={togglePlay}
            disabled={isLoading}
            className="bg-red-600 hover:bg-red-700 text-white p-2 sm:p-3 rounded-full shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPlaying ? <Pause className="h-4 sm:h-5 w-4 sm:w-5" /> : <Play className="h-4 sm:h-5 w-4 sm:w-5" />}
          </button>
          <div className="flex-1">
            <p className="font-semibold text-gray-900 text-sm sm:text-base">Live Stream</p>
            <p className="text-xs sm:text-sm text-gray-600">{streamStatus}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <Volume2 className="h-4 sm:h-5 w-4 sm:w-5 text-gray-400" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-full sm:w-20 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            style={{
              background: `linear-gradient(to right, #dc2626 ${volume * 100}%, #e5e7eb ${volume * 100}%)`,
            }}
          />
        </div>
      </div>
      <div className="w-full bg-gray-200-rounded-full h-1.5">
        <div
          className={`bg-gradient-to-r from-red-600 to-black h-1.5 rounded-full transition-all duration-300 ${
            isLive ? "animate-pulse" : ""
          }`}
          style={{ width: `${progressWidth}%` }}
        ></div>
      </div>
      <audio ref={audioRef} preload="none" className="hidden" crossOrigin="anonymous">
        <source src="https://uk3-vn.mixstream.net/:8134/listen.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}

export default function RadioPage() {
  const currentProgram = {
    title: "Morning Vibes",
    time: "6:00 AM - 9:00 AM",
    host: "Jane Doe",
  };

  const upcomingPrograms = [
    { title: "Midday Talk", time: "9:00 AM - 12:00 PM", host: "John Smith" },
    { title: "Afternoon Breeze", time: "12:00 PM - 3:00 PM", host: "Mary Johnson" },
    { title: "Evening Pulse", time: "3:00 PM - 6:00 PM", host: "Ahmed Ali" },
  ];

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
    { name: "Maureen Buya", duty: "Operations Manager", image: "/images/radio/maureen.png" },
    { name: "Edna Buya", duty: "Programs Lead", image: "/images/radio/buya.png" },
    { name: "Kula Nzomo", duty: "Community Engagement Lead", image: "/images/radio/nzomo.png" },
    { name: "Yusuf Maro", duty: "Local Stories Lead", image: "/images/radio/maro.png" },
    { name: "Yoash Festus", duty: "Radio Presenter", image: "/images/radio/yoash.png" },
    { name: "Flora Andisi", duty: "Radio Presenter", image: "/images/radio/flora.png" },
    { name: "Esther Dalano", duty: "Volunteer", image: "/images/radio/esther.png" },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <ModernNavbar />

      {/* Radio Stream Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <Link href="/radio">
              <p className="text-red-600 font-semibold text-sm tracking-wide uppercase cursor-pointer hover:underline">Live Radio</p>
            </Link>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-gray-900 mb-6">Listen to Our Radio Stream</h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Stay connected with our community through our live radio broadcasts, featuring local news, educational content, and community voices.
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
                  <h3 className="font-display text-xl sm:text-2xl text-gray-900 mb-2">{currentProgram.title}</h3>
                  <p className="text-gray-600 mb-1">Hosted by {currentProgram.host}</p>
                  <p className="text-gray-600 mb-4 sm:mb-6">{currentProgram.time}</p>
                  <RadioPlayer />
                </div>

                <div className="flex-shrink-0">
                  <div className="text-center">
                    <div className="bg-white p-3 sm:p-4 rounded-2xl shadow-lg mb-3">
                      <div className="w-12 sm:w-14 h-12 sm:h-14 bg-gradient-to-br from-red-100 to-black/20 rounded-full flex items-center justify-center mx-auto mb-2">
                        <div className="w-2 sm:w-3 h-2 sm:h-3 bg-red-500 rounded-full animate-pulse"></div>
                      </div>
                      <p className="text-xs sm:text-sm font-semibold text-gray-900">LIVE</p>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600">Broadcasting 24/7</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Programs Section */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-gray-900 mb-8 sm:mb-10 text-center">Upcoming Programs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {upcomingPrograms.map((program, index) => (
              <div key={index} className="bg-white p-5 sm:p-6 rounded-2xl shadow-lg border border-gray-100">
                <h3 className="font-display text-lg sm:text-xl text-gray-900 mb-2">{program.title}</h3>
                <p className="text-gray-600 text-sm sm:text-base mb-1">Hosted by {program.host}</p>
                <p className="text-gray-600 text-sm sm:text-base">{program.time}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-gray-900 mb-8 sm:mb-10 text-center">Latest News</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {latestNews.map((news) => (
              <div key={news.id} className="bg-gray-50 p-5 sm:p-6 rounded-2xl shadow-lg border border-gray-100">
                <h3 className="font-display text-lg sm:text-xl text-gray-900 mb-2">{news.title}</h3>
                <p className="text-gray-600 text-sm sm:text-base mb-2">{news.summary}</p>
                <p className="text-xs sm:text-sm text-gray-500">{news.date}</p>
              </div>
            ))}
          </div>
      </section>

      {/* News Bites Section */}
      <section className="py-12 sm:py-16 bg-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl mb-8 sm:mb-10 text-center">News Bites</h2>
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

      {/* Radio Personalities Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-gray-900 mb-8 sm:mb-10 text-center">Meet Our Radio Personalities</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
            {radioPersonalities.map((person, index) => (
              <div
                key={index}
                className="bg-gray-50 p-5 sm:p-6 rounded-2xl shadow-lg border border-gray-100 text-center hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <img
                    src={person.image}
                    alt={person.name}
                    className="w-full h-full object-cover rounded-full border-2 border-red-600"
                    onError={(e) => {
                      e.currentTarget.src = "/images/radio/placeholder.png"; // Fallback image if loading fails
                    }}
                  />
                  <div className="absolute inset-0 rounded-full border-4 border-transparent bg-gradient-to-br from-red-600/20 to-black/20"></div>
                </div>
                <h3 className="font-display text-lg sm:text-xl text-gray-900 mb-1">{person.name}</h3>
                <p className="text-gray-600 text-sm sm:text-base">{person.duty}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}