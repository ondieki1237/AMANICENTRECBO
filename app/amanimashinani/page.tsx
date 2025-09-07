"use client";
import React, { useRef } from "react";
import Footer from "../../components/footer";
import Navbar from "../../components/modern-navbar";
import { Button } from "../../components/ui/button";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const AmaniMashinani = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hover: { scale: 1.02, transition: { duration: 0.3 } },
  };

  // Create refs for each section
  const heroRef = useRef(null);
  const peaceRef = useRef(null);
  const civicRef = useRef(null);
  const climateRef = useRef(null);

  // Use useInView for each ref
  const heroInView = useInView(heroRef, { once: true, margin: "-50px" });
  const peaceInView = useInView(peaceRef, { once: true, margin: "-50px" });
  const civicInView = useInView(civicRef, { once: true, margin: "-50px" });
  const climateInView = useInView(climateRef, { once: true, margin: "-50px" });

  return (
    <div className="relative min-h-screen bg-white">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <motion.section
          ref={heroRef}
          className="mt-16 mb-12"
          initial="hidden"
          animate={heroInView ? "visible" : "hidden"}
          variants={fadeIn}
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Local communities building a stronger, more inclusive society
              </h2>
              <p className="text-gray-600 text-lg mb-6">
                With peace now taking root in Tana River County, we have expanded to programs that increase awareness
                and empower the people of Tana to actively participate in building a stronger, more inclusive society.
              </p>
              <div className="flex gap-4 flex-wrap">
                <Link href="/donate">
                  <Button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg">Donate Now</Button>
                </Link>
                <Link href="/volunteer">
                  <Button className="bg-gray-200 text-gray-900 hover:bg-gray-300 px-6 py-3 rounded-lg">Join Us</Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/images/mashinani.png"
                alt="Community meeting in Tana River County"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </motion.section>

        {/* Navigation Pills */}
        <div className="flex justify-center mb-8">
          <div className="flex gap-2 bg-gray-100 p-2 rounded-full">
            <button
              onClick={() => {
                document.getElementById("peacebuilding")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-red-600 text-white px-4 py-2 rounded-full text-sm focus:outline-none"
            >
              Peacebuilding
            </button>
            <button
              onClick={() => {
                document.getElementById("civic")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-gray-600 px-4 py-2 rounded-full text-sm hover:bg-white cursor-pointer focus:outline-none"
            >
              Civic Participation
            </button>
            <button
              onClick={() => {
                document.getElementById("climate")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-gray-600 px-4 py-2 rounded-full text-sm hover:bg-white cursor-pointer focus:outline-none"
            >
              Climate Action
            </button>
          </div>
        </div>

        {/* Peacebuilding Initiatives */}
        <motion.section
          id="peacebuilding"
          ref={peaceRef}
          className="mb-16"
          initial="hidden"
          animate={peaceInView ? "visible" : "hidden"}
          variants={fadeIn}
        >
          <div className="bg-red-50 rounded-lg p-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Peacebuilding Initiatives</h2>
            <p className="text-gray-600 mb-8 text-lg">Amani Mashinani</p>

            <div className="flex flex-col md:flex-row md:overflow-x-auto gap-6">
              {[
                {
                  title: "Una Hakika Project",
                  desc: "Our Una Hakika project trained over a hundred youth as peace ambassadors to help locals flag rumors and misinformation.",
                  img: "/images/unahakika.png",
                },
                {
                  title: "Jamii Bila Balaa Campaign",
                  desc: "A partnership with Search For Common Ground focused on raising awareness of the positive role families can play in fostering peace and security.",
                  img: "/images/game.png",
                  link: "https://documents.sfcg.org/wp-content/uploads/2020/02/Jamii_Bila_Balaa_Baseline_Report.pdf",
                },
                {
                  title: "Interreligious and Intercultural Cohesion Campaign",
                  desc: "In partnership with the Global Center on Cooperative Security, this increased respect for diversity and religious inclusion while countering violent extremism.",
                  img: "/images/peace.png",
                },
                {
                  title: "Countering Violent Extremism",
                  desc: "In partnership with the United Nations Development Programme, this initiative raised awareness about the destructive effects of conflict and its adverse effects on social and economic development.",
                  img: "/images/peacebuild.jpg",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-sm border md:min-w-[300px] flex flex-col"
                  variants={cardVariants}
                  whileHover="hover"
                >
                  <div className="mb-4">
                    <Image
                      src={item.img}
                      alt={item.title}
                      width={300}
                      height={200}
                      className="rounded-lg w-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 mb-4 flex-1">{item.desc}</p>
                  <Link href={item.link || "#"} passHref legacyBehavior>
                    <Button className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 mt-auto w-fit">
                      Learn More
                    </Button>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Civic Participation Initiatives */}
        <motion.section
          id="civic"
          ref={civicRef}
          className="mb-16"
          initial="hidden"
          animate={civicInView ? "visible" : "hidden"}
          variants={fadeIn}
        >
          <div className="bg-green-50 rounded-lg p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">
              Civic Participation Initiatives
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                {
                  title: "Accelerated Learning Program",
                  desc: "In partnership with Save the Children, we helped 2500+ children stay up-to-date with learning during COVID-19 using radio.",
                  img: "/images/education.png",
                  link: "https://www.reuters.com/article/kenya-solar-education-coronavirus/feature-with-schools-shut-by-pandemic-solar-radios-keep-kenyan-children-learning-idUKL8N2IK45N/",
                },
                {
                  title: "Tuanze Biashara",
                  desc: "In partnership with Hivos East Africa, we encouraged entrepreneurship among youth through on-air and off-air trainings.",
                  img: "/images/economic.png",
                },
                {
                  title: "My County My Responsibility",
                  desc: "We conducted sensitization campaigns on the importance of participating in public forums.",
                  img: "/images/civic.png",
                },
                {
                  title: "Countering Violent Extremism",
                  desc: "In partnership with the United Nations Development Programme, this initiative raised awareness about the destructive effects of conflict.",
                  img: "/images/peace.png",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border flex flex-col"
                  variants={cardVariants}
                  whileHover="hover"
                >
                  <div className="mb-3 sm:mb-4">
                    <Image
                      src={item.img}
                      alt={item.title}
                      width={300}
                      height={200}
                      className="rounded-lg w-full h-40 object-cover"
                    />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mb-4 flex-1 text-sm sm:text-base">
                    {item.desc}
                  </p>
                  <Link href={item.link || "#"} passHref legacyBehavior>
                    <Button className="bg-green-600 hover:bg-green-700 text-white text-xs sm:text-sm px-3 sm:px-4 py-2 mt-auto w-fit">
                      Learn More
                    </Button>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Climate Action Initiatives */}
        <motion.section
          id="climate"
          ref={climateRef}
          className="mb-16"
          initial="hidden"
          animate={climateInView ? "visible" : "hidden"}
          variants={fadeIn}
        >
          <div className="rounded-lg p-8 text-gray-900 bg-white">
            <h2 className="text-3xl font-bold mb-6">Climate Action Initiatives</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Building bridges for climate action",
                  desc: "In partnership with BBC Media Action, this helps communities adapt to extreme weather by sharing information in accessible ways.",
                  img: "/images/climate_change.png",
                  link: "https://www.bbc.co.uk/mediaaction/our-work/climate-change-resilience/bridges-project",
                },
                {
                  title: "Climate Change & Livelihoods",
                  desc: "Uses Ushahidi platform to collect data that builds resilience for women and youth.",
                  img: "/images/climate_change.png",
                  link: "https://www.ushahidi.com/in-action/tana-river-climate-change-livelihoods-restoration-project-t-clirp/",
                },
                {
                  title: "Community Early Warning Systems",
                  desc: "Implements advanced systems to better prepare communities for climate hazards.",
                  img: "/images/paradigm.jpg",
                  link: "https://www.linkedin.com/posts/nethope_nethope-tana-river-connectivity-resilience-activity-7249112728877809666-PA4P",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-sm border flex flex-col"
                  variants={cardVariants}
                  whileHover="hover"
                >
                  <div className="mb-4">
                    <Image
                      src={item.img}
                      alt={item.title}
                      width={300}
                      height={200}
                      className="rounded-lg w-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 mb-4 flex-1">{item.desc}</p>
                  <Link href={item.link || "#"} passHref legacyBehavior>
                    <Button className="bg-black hover:bg-gray-800 text-white text-sm px-4 py-2 mt-auto w-fit">
                      Learn More
                    </Button>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Partners Section */}
        <motion.section className="mb-16" initial="hidden" animate="visible" variants={fadeIn}>
          <div className="bg-gray-50 rounded-lg p-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 text-center">Our Partners</h2>
            <p className="text-gray-600 mb-8 text-lg text-center max-w-3xl mx-auto">
              We collaborate with leading organizations to maximize our impact in Tana River County.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {[
                { name: "Bridges", logo: "/images/sponsors/bridges.png" },
                { name: "Zizi Afrique Foundation", logo: "/images/sponsors/zizi-afrique.png" },
                { name: "Safaricom Foundation", logo: "/images/sponsors/safaricom.png" },
                { name: "BBC Media Action", logo: "/images/sponsors/bbc-media-action.png" },
                { name: "Vox Radio", logo: "/images/sponsors/vox-radio.png" },
                { name: "Paradigm Initiative", logo: "/images/sponsors/paradigm-initiative.png" },
                { name: "NetHope", logo: "/images/sponsors/nethope.png" },
                { name: "unaco", logo: "/images/sponsors/unaco.png" },
                { name: "voices", logo: "/images/sponsors/voices.png" },
                { name: "ushahidi", logo: "/images/sponsors/ushahidi.png" },
                { name: "Common", logo: "/images/sponsors/common.png" },
                { name: "newzealand", logo: "/images/sponsors/newzealand.png" },
              ].map((partner, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg shadow-sm border flex items-center justify-center h-24"
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
};

class ErrorBoundary extends React.Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error: error.message };
  }

  render() {
    if (this.state.error) {
      return <div className="text-red-500 text-center py-4">Error: {this.state.error}</div>;
    }
    return this.props.children;
  }
}

export default function AmaniMashinaniWithErrorBoundary() {
  return (
    <ErrorBoundary>
      <AmaniMashinani />
    </ErrorBoundary>
  );
}