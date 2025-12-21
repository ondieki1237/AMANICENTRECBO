import React from 'react';
import { MapPin, Linkedin, Facebook, Twitter, Radio, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// Neumorphic shadow style
const neumorphicShadow = {
  boxShadow: '6px 6px 12px rgba(0,0,0,0.15), -6px -6px 12px rgba(255,255,255,0.05)',
  transition: 'box-shadow 0.3s ease, transform 0.3s ease',
};

const Footer = () => {
  return (
    <footer className="bg-black text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Logo and Description */}
          <div className="md:col-span-1 space-y-6">
            <div>
              <h3 className="font-canela text-3xl text-emerald-400 mb-1">Amani Center CBO</h3>
              <h4 className="font-amsterdam text-2xl text-white leading-tight">Center</h4>
            </div>
            <p className="text-gray-400 mb-6 text-lg leading-relaxed">
              Uniting Communities Through Media & ICT in Tana River County, Kenya since 2016.
            </p>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <MapPin className="h-4 w-4" />
              <span>Minjila, Tana River County</span>
            </div>
          </div>

          {/* Mobile Layout for Quick Links and Social Media */}
          <div className="grid grid-cols-2 gap-8 md:col-span-2 md:grid-cols-2">
            {/* Quick Links */}
            <div className="text-left space-y-6">
              <h4 className="font-display text-xl text-white mb-6">Quick Links</h4>
              <div className="space-y-3">
                <Link
                  href="#story"
                  className="block text-gray-400 hover:text-emerald-400 transition-colors">
                  Our Story
                </Link>
                <Link
                  href="#work"
                  className="block text-gray-400 hover:text-emerald-400 transition-colors">
                  Our Work
                </Link>
                <Link
                  href="#approach"
                  className="block text-gray-400 hover:text-emerald-400 transition-colors">
                  Our Approach
                </Link>
                <Link
                  href="#involved"
                  className="block text-gray-400 hover:text-emerald-400 transition-colors">
                  Get Involved
                </Link>
                <Link
                  href="#contact"
                  className="block text-gray-400 hover:text-emerald-400 transition-colors">
                  Contact Us
                </Link>
              </div>
            </div>

            {/* Social Media */}
            <div className="text-right md:text-left space-y-6">
              <h4 className="font-display text-xl text-white mb-6">Connect With Us</h4>
              <div className="space-y-4 mb-6 flex flex-col items-end md:items-start">
                <a
                  href="https://www.linkedin.com/company/kijiji-connect/?viewAsMember=true"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow us on LinkedIn"
                  className="flex items-center space-x-3 text-gray-400 hover:text-emerald-400 transition-colors group"
                  style={neumorphicShadow}
                >
                  <span>LinkedIn</span>
                  <div className="bg-gray-800 p-2 rounded-lg group-hover:bg-emerald-600 transition-colors">
                    <Linkedin className="h-5 w-5" />
                  </div>
                </a>
                <a
                  href="https://web.facebook.com/Voxradiokenya"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow us on Facebook"
                  className="flex items-center space-x-3 text-gray-400 hover:text-emerald-400 transition-colors group"
                  style={neumorphicShadow}
                >
                  <span>Facebook</span>
                  <div className="bg-gray-800 p-2 rounded-lg group-hover:bg-blue-600 transition-colors">
                    <Facebook className="h-5 w-5" />
                  </div>
                </a>
                <a
                  href="https://x.com/Amanicentercbo"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow us on X (Twitter)"
                  className="flex items-center space-x-3 text-gray-400 hover:text-emerald-400 transition-colors group"
                  style={neumorphicShadow}
                >
                  <span>X (Twitter)</span>
                  <div className="bg-gray-800 p-2 rounded-lg group-hover:bg-gray-600 transition-colors">
                    <Twitter className="h-5 w-5" />
                  </div>
                </a>
              </div>

              <div
                className="bg-gray-900 p-4 rounded-lg text-right md:text-left"
                style={neumorphicShadow}
              >
                <p className="text-sm text-gray-400 mb-2">Listen to our radio:</p>
                <a
                  href="https://uk3-vn.mixstream.net/:8134/listen.mp3"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Listen to our live radio stream"
                  className="flex items-center justify-end md:justify-start space-x-2 text-red-400 hover:text-red-300 transition-colors"
                >
                  <Radio className="h-4 w-4" />
                  <span className="text-sm">Live Stream</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-500">© 2025 Amani Center Community Based Organization. All rights reserved.</p>

            {/* Website Credit */}
            <div className="flex items-center space-x-3 text-gray-400 hover:text-gray-300 transition-colors">
              <span className="text-sm">Website built by</span>
              <div className="flex items-center space-x-2">
                <Image
                  src="/images/smo-logo.png"
                  alt="SMO Logo"
                  width={24}
                  height={24}
                  className="rounded-full bg-white p-1"
                />
                <a
                  href="https://codewithseth.co.ke"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium"
                  aria-label="Visit sethbellarin's portfolio"
                >
                  sethbellarin
                </a>
                <ExternalLink className="h-3 w-3" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;