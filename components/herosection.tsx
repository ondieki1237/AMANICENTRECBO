'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { Button } from './ui/button';
import { motion, useReducedMotion } from 'framer-motion';

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
        setAudioError(null);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
        setAudioError(null);
      }
    } catch (error) {
      console.error('Audio playback error:', error);
      setAudioError('Failed to play audio. Please try again or check your connection.');
    }
  };

  // Animation variants
  const containerVariants = shouldReduceMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            when: 'beforeChildren',
            staggerChildren: 0.2,
            delay: 0.3,
          },
        },
      };

  const titleVariants = shouldReduceMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.8,
            ease: [0.6, -0.05, 0.01, 0.99],
            type: 'spring',
            stiffness: 100,
            damping: 10,
          },
        },
      };

  const subtitleVariants = shouldReduceMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            ease: 'easeOut',
            delay: 0.4,
          },
        },
      };

  const buttonVariants = shouldReduceMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 20 },
        visible: (i: number) => ({
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            ease: 'easeOut',
            delay: 0.5 + i * 0.1,
          },
        }),
      };

  const statsVariants = shouldReduceMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            ease: 'easeOut',
            delay: 0.8,
          },
        },
      };

  return (
    <section
      className="relative w-full min-h-[90vh] py-8 px-4 sm:px-6 md:px-10 md:pt-16 lg:px-16 xl:px-20 flex flex-col justify-center overflow-hidden bg-black bg-cover bg-center bg-[url('/images/phonebackground.png')] md:bg-[url('/images/backfull.png')]"
    >
      {/* Audio Element (Hidden) */}
      <audio
        ref={audioRef}
        src="https://uk3-vn.mixstream.net/:8134/listen.mp3"
        preload="none"
        crossOrigin="anonymous"
      />

      {/* Main Content */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto w-full flex flex-col items-start gap-6"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="text-left w-full">
          <motion.div variants={titleVariants}>
            <h1 className="text-5xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-canela font-normal mb-1 text-red-600 leading-tight">
              Amani
            </h1>
            <h2 className="text-3xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-amsterdam text-white leading-tight mt-[-0.5rem] md:mt-0">
              Center
            </h2>
          </motion.div>
          <motion.p
            className="text-base md:text-lg lg:text-xl text-gray-300 max-w-md leading-relaxed mt-4 mb-6 md:mx-0 text-left"
            variants={subtitleVariants}
          >
            Uniting Communities Through Media & ICT in Tana River County, Kenya. We exist to champion peace and development projects for rural communities in the Tana region.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-3 justify-start"
            variants={containerVariants}
          >
            <Link href="/donate">
              <Button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-full shadow-lg text-sm">
                Donate Now
              </Button>
            </Link>
            <Link href="/volunteer">
              <Button className="bg-white text-black hover:bg-gray-200 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full shadow-lg text-sm">
                Join Us
              </Button>
            </Link>
            <motion.button
              onClick={toggleRadio}
              className={`${
                isPlaying ? 'bg-green-600 hover:bg-green-700' : 'bg-white hover:bg-gray-200'
              } text-${isPlaying ? 'white' : 'black'} px-4 py-2 rounded-full shadow-lg text-xs sm:text-sm flex items-center gap-2 border ${
                isPlaying ? 'border-green-400' : 'border-green-300'
              }`}
              variants={buttonVariants}
              custom={2}
              whileHover={!shouldReduceMotion ? { scale: 1.05 } : {}}
              whileTap={!shouldReduceMotion ? { scale: 0.95 } : {}}
            >
              <span>{isPlaying ? 'Pause Radio' : 'Listen Live'}</span>
              <motion.span
                animate={isPlaying && !shouldReduceMotion ? { scale: [1, 1.2, 1] } : {}}
                transition={isPlaying && !shouldReduceMotion ? { repeat: Infinity, duration: 1.5 } : {}}
                className={isPlaying ? 'text-green-200' : 'text-green-500'}
              >
                {isPlaying ? '⏸' : '▶'}
              </motion.span>
            </motion.button>
          </motion.div>
          {audioError && (
            <motion.p
              className="text-red-500 text-sm mt-2 text-left"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {audioError}
            </motion.p>
          )}
        </div>

        {/* Statistics Section - Enhanced */}
        <motion.div
          className="w-full mt-6 md:mt-8"
          variants={statsVariants}
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-4 lg:gap-6">
            <motion.div
              className="bg-white/5 backdrop-blur-sm rounded-lg p-3 sm:p-4 lg:p-6 text-center border border-white/10 hover:bg-white/10 transition-colors duration-300"
              whileHover={!shouldReduceMotion ? { scale: 1.05 } : {}}
            >
              <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1">500K+</p>
              <p className="text-gray-300 text-xs sm:text-sm lg:text-base">Radio Listeners</p>
            </motion.div>
            <motion.div
              className="bg-white/5 backdrop-blur-sm rounded-lg p-3 sm:p-4 lg:p-6 text-center border border-white/10 hover:bg-white/10 transition-colors duration-300"
              whileHover={!shouldReduceMotion ? { scale: 1.05 } : {}}
            >
              <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1">150+</p>
              <p className="text-gray-300 text-xs sm:text-sm lg:text-base">Youths Trained</p>
            </motion.div>
            <motion.div
              className="bg-white/5 backdrop-blur-sm rounded-lg p-3 sm:p-4 lg:p-6 text-center border border-white/10 hover:bg-white/10 transition-colors duration-300"
              whileHover={!shouldReduceMotion ? { scale: 1.05 } : {}}
            >
              <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1">15+</p>
              <p className="text-gray-300 text-xs sm:text-sm lg:text-base">Partnerships</p>
            </motion.div>
            <motion.div
              className="bg-white/5 backdrop-blur-sm rounded-lg p-3 sm:p-4 lg:p-6 text-center border border-white/10 hover:bg-white/10 transition-colors duration-300"
              whileHover={!shouldReduceMotion ? { scale: 1.05 } : {}}
            >
              <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1">3</p>
              <p className="text-gray-300 text-xs sm:text-sm lg:text-base">Tertiary Schools Connected</p>
            </motion.div>
            <motion.div
              className="bg-white/5 backdrop-blur-sm rounded-lg p-3 sm:p-4 lg:p-6 text-center border border-white/10 hover:bg-white/10 transition-colors duration-300"
              whileHover={!shouldReduceMotion ? { scale: 1.05 } : {}}
            >
              <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1">2</p>
              <p className="text-gray-300 text-xs sm:text-sm lg:text-base">Schools in STEM Projects</p>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;