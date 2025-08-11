"use client";
import { useState, useEffect } from "react";
import { Menu, X, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function FloatingIslandNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();
  const isBlogPage = pathname.includes("/blog");

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY || currentScrollY < 20) {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <nav
        className={`fixed top-4 left-1/2 transform -translate-x-1/2 w-[90%] max-w-[50vw] z-50 transition-all duration-300 rounded-3xl shadow-xl ${
          scrolled || isBlogPage
            ? "bg-gradient-to-r from-red-600/20 to-red-700/20 backdrop-blur-lg border border-red-500/30"
            : "bg-gradient-to-r from-red-600/30 to-red-700/30 backdrop-blur-xl border border-red-500/20"
        } ${isVisible ? "translate-y-0" : "-translate-y-[120%]"}`}
      >
        <div className="px-3 sm:px-4 lg:px-6">
          <div className="flex justify-between items-center h-12 sm:h-14">
            {/* Home Icon */}
            <div className="flex items-center">
              <Link href="/">
                <Home
                  className={`h-6 w-6 stroke-[1.5] ${
                    isBlogPage || scrolled ? "text-white" : "text-white"
                  } hover:text-white hover:scale-105 transition-all duration-200`}
                  aria-label="Home"
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-2">
              <Link
                href="#story"
                className="nav-link px-3 py-2 font-medium text-sm text-white hover:text-white hover:scale-105 transition-all duration-200"
              >
                Our Story
              </Link>
              <Link
                href="#work"
                className="nav-link px-3 py-2 font-medium text-sm text-white hover:text-white hover:scale-105 transition-all duration-200"
              >
                Our Work
              </Link>
              <Link
                href="/amanimashinani"
                className="nav-link px-3 py-2 font-medium text-sm text-white hover:text-white hover:scale-105 transition-all duration-200"
              >
                Amani Mashinani
              </Link>
              <Link
                href="/kijijiconnect"
                className="nav-link px-3 py-2 font-medium text-sm text-white hover:text-white hover:scale-105 transition-all duration-200"
              >
                Kijiji Connect
              </Link>
              <Link
                href="/blog"
                className="nav-link px-3 py-2 font-medium text-sm text-white hover:text-white hover:scale-105 transition-all duration-200"
              >
                Media Hub
              </Link>
            </div>

            {/* Desktop CTA Button */}
            <div className="hidden lg:block">
              <Link href="/radio">
                <Button
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold px-5 py-1.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-sm"
                >
                  Vox Radio
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg transition-all duration-200 text-white hover:text-white hover:bg-red-500/20"
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
              >
                {isOpen ? (
                  <X className="h-6 w-6 transition-transform duration-300 scale-100 transform" />
                ) : (
                  <Menu className="h-6 w-6 transition-transform duration-300 scale-100 transform" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div
        className={`lg:hidden fixed top-0 left-0 h-full w-64 z-50 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-full px-4 pt-16 pb-6 space-y-2 bg-gradient-to-r from-red-600/30 to-red-700/30 backdrop-blur-lg shadow-lg border-r border-red-500/20">
          <Link
            href="#story"
            className="block px-3 py-2 font-medium text-sm text-white hover:text-white hover:bg-red-500/20 rounded-lg transition-all duration-200"
            onClick={() => setIsOpen(false)}
          >
            Our Story
          </Link>
          <Link
            href="#work"
            className="block px-3 py-2 font-medium text-sm text-white hover:text-white hover:bg-red-500/20 rounded-lg transition-all duration-200"
            onClick={() => setIsOpen(false)}
          >
            Our Work
          </Link>
          <Link
            href="/amanimashinani"
            className="block px-3 py-2 font-medium text-sm text-white hover:text-white hover:bg-red-500/20 rounded-lg transition-all duration-200"
            onClick={() => setIsOpen(false)}
          >
            Amani Mashinani
          </Link>
          <Link
            href="/kijijiconnect"
            className="block px-3 py-2 font-medium text-sm text-white hover:text-white hover:bg-red-500/20 rounded-lg transition-all duration-200"
            onClick={() => setIsOpen(false)}
          >
            Kijiji Connect
          </Link>
          <Link
            href="/blog"
            className="block px-3 py-2 font-medium text-sm text-white hover:text-white hover:bg-red-500/20 rounded-lg transition-all duration-200"
            onClick={() => setIsOpen(false)}
          >
            Media Hub
          </Link>
          <div className="pt-3">
            <Link href="/radio">
              <Button
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-2 rounded-lg text-sm"
                onClick={() => setIsOpen(false)}
              >
                Vox Radio
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}