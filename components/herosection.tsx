'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { Button } from './ui/button';
import { motion, useReducedMotion } from 'framer-motion';

const StatCard = ({
  value,
  label,
}: {
  value: string;
  label: string;
}) => {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.div
      className="bg-white/5 backdrop-blur-sm rounded-lg p-4 lg:p-6 text-center border border-white/10 hover:bg-white/10 transition-colors duration-300"
      whileHover={!shouldReduceMotion ? { scale: 1.05 } : {}}
    >
      <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1">
        {value}
      </p>
      <p className="text-gray-300 text-xs sm:text-sm lg:text-base">{label}</p>
    </motion.div>
  );
};

const HeroSection = () => {
  const shouldReduceMotion = useReducedMotion();
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioError, setAudioError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleRadio = async () => {
    if (!audioRef.current) return;
    try {
      if (isPlaying) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
      }
      setAudioError(null);
    } catch (error) {
      console.error('Audio playback error:', error);
      setAudioError('Failed to play audio. Please try again or check your connection.');
    }
  };

  // Animation variants
  const fadeUp = (delay = 0) =>
    shouldReduceMotion
      ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
      : {
          hidden: { opacity: 0, y: 20 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: 'easeOut', delay },
          },
        };

  return (
    <section
      data-herobg
      className="relative w-full min-h-[90vh] py-12 px-4 sm:px-6 md:px-10 lg:px-16 flex flex-col justify-center overflow-hidden bg-black bg-cover bg-center"
      style={{
        backgroundImage: `url('https://res.cloudinary.com/dn6yc8dj0/image/upload/v1757422438/phonebackground_piasvi.png')`,
      }}
    >
      {/* Desktop background override */}
      <style>
        {`
          @media (min-width: 1024px) {
            section[data-herobg] {
              background-image: url('https://res.cloudinary.com/dn6yc8dj0/image/upload/v1757422435/backfull_w7xat4.png') !important;
            }
          }
        `}
      </style>

      {/* Hidden Audio */}
      <audio
        ref={audioRef}
        src="https://uk3-vn.mixstream.net/:8134/listen.mp3"
        preload="none"
        crossOrigin="anonymous"
      />

      <motion.div
        className="relative z-10 max-w-7xl mx-auto w-full flex flex-col items-start gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
        }}
      >
        {/* Headings */}
        <div className="text-left w-full">
          <motion.div variants={fadeUp(0.2)}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-canela font-normal text-red-600 leading-tight">
              Amani
            </h1>
            <h2 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-amsterdam text-white mt-[-0.5rem]">
              Center
            </h2>
          </motion.div>

          <motion.p
            className="text-base md:text-lg lg:text-xl text-gray-300 max-w-lg leading-relaxed mt-4 mb-6"
            variants={fadeUp(0.4)}
          >
            Uniting Communities Through Media & ICT in Tana River County, Kenya.
            We exist to champion peace and development projects for rural
            communities in the Tana region.
          </motion.p>

          {/* Buttons */}
          <motion.div
            className="flex flex-wrap gap-3"
            variants={fadeUp(0.6)}
          >
            <Link href="/donate">
              <Button className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-full shadow-lg text-sm">
                Donate Now
              </Button>
            </Link>
            <Link href="/volunteer">
              <Button className="bg-white text-black hover:bg-gray-200 px-5 py-2.5 rounded-full shadow-lg text-sm">
                Join Us
              </Button>
            </Link>
            <motion.button
              onClick={toggleRadio}
              aria-label={isPlaying ? 'Pause live radio' : 'Play live radio'}
              className={`px-5 py-2.5 rounded-full shadow-lg text-sm flex items-center gap-2 border transition-colors duration-300 ${
                isPlaying
                  ? 'bg-green-600 text-white border-green-400 hover:bg-green-700'
                  : 'bg-white text-black border-green-300 hover:bg-gray-200'
              }`}
              variants={fadeUp(0.8)}
              whileHover={!shouldReduceMotion ? { scale: 1.05 } : {}}
              whileTap={!shouldReduceMotion ? { scale: 0.95 } : {}}
            >
              <span>{isPlaying ? 'Pause Radio' : 'Listen Live'}</span>
              <motion.span
                animate={
                  isPlaying && !shouldReduceMotion ? { scale: [1, 1.2, 1] } : {}
                }
                transition={
                  isPlaying && !shouldReduceMotion
                    ? { repeat: Infinity, duration: 1.5 }
                    : {}
                }
                className={isPlaying ? 'text-green-200' : 'text-green-500'}
              >
                {isPlaying ? '⏸' : '▶'}
              </motion.span>
            </motion.button>
          </motion.div>

          {audioError && (
            <motion.p
              className="text-red-500 text-sm mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {audioError}
            </motion.p>
          )}
        </div>

        {/* Statistics */}
        <motion.div
          className="w-full mt-8"
          variants={fadeUp(1)}
        >
          {/* Responsive grid: 2 columns on mobile, 3 on sm, 5 on lg */}
          <div className="
            grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4
          ">
            <StatCard value="500K+" label="Radio Listeners" />
            <StatCard value="150+" label="Youths Trained" />
            <StatCard value="15+" label="Partnerships" />
            <StatCard value="3" label="Tertiary Schools Connected" />
            <StatCard value="2" label="Schools in STEM Projects" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
