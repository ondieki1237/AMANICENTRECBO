// pages/work/kijiji-connect.jsx
"use client";

import Link from "next/link";
import Image from "next/image";
import ModernNavbar from "../../components/modern-navbar";
import Footer from "../../components/footer";
import kijijiImage from "../../../public/images/kijiji.png";

const KijijiConnect = () => {
  // Fallback image for hero section
  const heroImage = "/images/kijiji.jpg";

  // SDG data
  const sdgImages = [
    { title: "No Poverty (SDG 1)", img: "/images/sdg1.png" },
    { title: "Zero Hunger (SDG 2)", img: "/images/sdg2.png" },
    { title: "Quality Education (SDG 4)", img: "/images/sdg4.png" },
    { title: "Industry, Innovation & Infrastructure (SDG 9)", img: "/images/sdg9.png" },
    { title: "Partnerships for the Goals (SDG 17)", img: "/images/sdg17.png" },
  ];

  // Partners data
  const partners = [
    "New Zealand Embassy",
    "Paradigm Initiative",
    "The Sentinel Project",
  ];

  // Testimonials data
  const testimonials = [
    {
      name: "Vanilla Bahati",
      quote: "This training helped me to understand more about how I can use my computer skills to employ myself. I am making money online using my skills.",
      image: "/images/vanila.png",
    },
    {
      name: "Halima Ijema",
      quote: "I got a scholarship to attend college from my training at Kijiji Connect. Now I pursue my dream to become a tech expert someday.",
      image: "/images/halima.png",
    },
  ];

  return (
    <div className="min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))] font-amsterdam">
      {/* Navbar */}
      <ModernNavbar />

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 py-12 sm:py-16">
        {/* Hero Section */}
        <section className="relative w-full h-[60vh] flex items-center justify-center">
          <Image
            src={kijijiImage}
            alt="Kijiji Connect ICT Hub in Tana River"
            fill
            className="object-cover"
            priority
            onError={(e) => console.error(`Failed to load hero image: ${kijijiImage}`, e)}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent" />
          <div className="relative z-10 text-center text-white">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold drop-shadow-lg font-canela">
              Kijiji Connect: Empowering Tana River
            </h1>
            <Link
              href="/volunteer"
              className="mt-6 inline-block bg-[hsl(var(--destructive))] text-white py-3 px-6 rounded-lg hover:bg-[hsl(var(--destructive)/0.8)] transition"
              aria-label="Support Kijiji Connect"
            >
              Support Us
            </Link>
          </div>
        </section>

        {/* Project Milestones */}
        <section className="bg-[hsl(var(--card))] py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[hsl(var(--chart-2))] mb-8 text-center font-canela">
              Project Milestones
            </h2>
            <div className="flex overflow-x-auto sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6 snap-x snap-mandatory">
              {[
                { value: ">150", text: "Trainees (2023-2024)" },
                { value: "55%", text: "Alumni transitioned to jobs, college, internships" },
                { value: "2", text: "Local TVETs engaged in digital skills training" },
                { value: "3", text: "Funding partners" },
              ].map((milestone, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md flex-shrink-0 w-64 sm:w-auto snap-center hover:shadow-xl transition"
                >
                  <p className="text-3xl sm:text-4xl font-bold text-[hsl(var(--destructive))] mb-2">{milestone.value}</p>
                  <p className="text-[hsl(var(--muted-foreground))] text-sm sm:text-base">{milestone.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Project Stories Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[hsl(var(--chart-2))] mb-12 font-canela">
            Our Impact Stories
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Partnering with Paradigm Initiative */}
            <div className="bg-[hsl(var(--card))] rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300 border border-[hsl(var(--border))]">
              <div className="relative h-48 w-full">
                <Image
                  src="/images/paradigm.jpg"
                  alt="Youth at Paradigm Initiative training"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-2">
                  <span className="inline-block bg-[hsl(var(--secondary))] text-[hsl(var(--foreground))] text-xs px-2 py-1 rounded-fullHealth uppercase font-semibold tracking-wide">
                    Digital Inclusion
                  </span>
                  <span className="ml-2 text-[hsl(var(--muted-foreground))] text-xs">10-week program</span>
                </div>
                <h3 className="text-xl font-bold text-[hsl(var(--foreground))] mb-3">Partnering with Paradigm Initiative</h3>
                <p className="text-[hsl(var(--muted-foreground))] mb-4">
                  Closing the digital gap for young people in Tana through our first-class partnership with PIN.
                  The program provides 21st century skills to underserved youth.
                </p>
                <Link
                  href="https://paradigmhq.org/press-release-hundreds-of-youth-from-under-served-communities-in-kenya-set-to-benefit-from-the-life-legacy-program/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-[hsl(var(--destructive))] font-medium hover:text-[hsl(var(--destructive)/0.8)] transition"
                  aria-label="Read full story about Paradigm Initiative partnership"
                >
                  Read Full Story
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Support from The Sentinel Project */}
            <div className="bg-[hsl(var(--card))] rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300 border border-[hsl(var(--border))]">
              <div className="relative h-48 w-full">
                <Image
                  src="/images/peacebuild.jpg"
                  alt="Community digital literacy training"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-2">
                  <span className="inline-block bg-[hsl(var(--secondary))] text-[hsl(var(--foreground))] text-xs px-2 py-1 rounded-full uppercase font-semibold tracking-wide">
                    Digital Literacy
                  </span>
                  <span className="ml-2 text-[hsl(var(--muted-foreground))] text-xs">Rural Communities</span>
                </div>
                <h3 className="text-xl font-bold text-[hsl(var(--foreground))] mb-3">Support from The Sentinel Project</h3>
                <p className="text-[hsl(var(--muted-foreground))] mb-4">
                  Promoting critical thinking and digital literacy in rural areas to help communities
                  evaluate online information and combat disinformation.
                </p>
                <Link
                  href="https://thesentinelproject.org/2017/10/25/peacebuilding-radio-amani-fm-throughout-the-kenyan-elections/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-[hsl(var(--destructive))] font-medium hover:text-[hsl(var(--destructive)/0.8)] transition"
                  aria-label="Read full story about The Sentinel Project support"
                >
                  Read Full Story
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Digital Peacebuilding: Build Up Org. */}
            <div className="bg-[hsl(var(--card))] rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300 border border-[hsl(var(--border))]">
              <div className="relative h-48 w-full">
                <Image
                  src="/images/peacebuilding.jpg"
                  alt="Youth peacebuilding workshop"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-2">
                  <span className="inline-block bg-[hsl(var(--secondary))] text-[hsl(var(--foreground))] text-xs px-2 py-1 rounded-full uppercase font-semibold tracking-wide">
                    Peacebuilding
                  </span>
                  <span className="ml-2 text-[hsl(var(--muted-foreground))] text-xs">Online Course</span>
                </div>
                <h3 className="text-xl font-bold text-[hsl(var(--foreground))] mb-3">Digital Peacebuilding with Build Up</h3>
                <p className="text-[hsl(var(--muted-foreground))] mb-4">
                  Equipping trainees with insights to become peace ambassadors in digital spaces
                  and providing practical tools to spread peace within their communities.
                </p>
                <Link
                  href="/our-work/peacebuilding"
                  className="inline-flex items-center text-[hsl(var(--destructive))] font-medium hover:text-[hsl(var(--destructive)/0.8)] transition"
                  aria-label="Learn more about digital peacebuilding"
                >
                  Learn More
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* How We Do It Section */}
        <section className="bg-[hsl(var(--background))] py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[hsl(var(--destructive))] mb-12 font-canela">
            How We Do It
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {/* Item 1 - Training */}
            <div className="flex flex-col items-center text-center">
              <Image
                src="/images/training.png"
                alt="Trainer guiding students with laptops"
                width={300}
                height={200}
                className="rounded-2xl object-cover shadow-md"
              />
              <h3 className="mt-6 text-xl font-semibold text-[hsl(var(--destructive))] font-canela">Training</h3>
              <p className="mt-2 text-[hsl(var(--muted-foreground))]">Both at our hub and in partnership with local TVETs.</p>
            </div>

            {/* Item 2 - Mentorship */}
            <div className="flex flex-col items-center text-center">
              <Image
                src="/images/mentoring.png"
                alt="Mentor with student smiling"
                width={300}
                height={200}
                className="rounded-2xl object-cover shadow-md"
              />
              <h3 className="mt-6 text-xl font-semibold text-[hsl(var(--destructive))] font-canela">Mentorship & Linkage</h3>
              <p className="mt-2 text-[hsl(var(--muted-foreground))]">
                We connect alumni to mentorship, study, internship, and work opportunities.
              </p>
            </div>

            {/* Item 3 - Internet */}
            <div className="flex flex-col items-center text-center">
              <Image
                src="/images/internet.png"
                alt="Students learning in computer lab"
                width={300}
                height={200}
                className="rounded-2xl object-cover shadow-md"
              />
              <h3 className="mt-6 text-xl font-semibold text-[hsl(var(--destructive))] font-canela">Internet Connectivity</h3>
              <p className="mt-2 text-[hsl(var(--muted-foreground))]">
                We facilitate digital learning in local schools and TVETs.
              </p>
            </div>

            {/* Item 4 - STEM */}
            <div className="flex flex-col items-center text-center">
              <Image
                src="/images/stem.png"
                alt="Students exploring STEM on a laptop"
                width={300}
                height={200}
                className="rounded-2xl object-cover shadow-md"
              />
              <h3 className="mt-6 text-xl font-semibold text-[hsl(var(--destructive))] font-canela">STEM Education</h3>
              <p className="mt-2 text-[hsl(var(--muted-foreground))]">
                Through STEM Bootcamps, we encourage young learners to take up STEM subjects.
              </p>
            </div>
          </div>
        </section>

        {/* Alumni Testimonials */}
        <section className="bg-[hsl(var(--chart-2))] py-12 sm:py-16 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 font-canela">Alumni Testimonials</h2>
            <p className="text-lg mb-6">In their own words...</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-[hsl(var(--card))] text-[hsl(var(--foreground))] p-6 rounded-lg shadow-md hover:shadow-xl transition">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={100}
                    height={100}
                    className="rounded-full mx-auto mb-4"
                    onError={(e) => console.error(`Failed to load testimonial image: ${testimonial.image}`, e)}
                  />
                  <p className="text-lg italic mb-2">{`"${testimonial.quote}"`}</p>
                  <p className="font-semibold text-[hsl(var(--destructive))]">- {testimonial.name}</p>
                </div>
              ))}
            </div>
            <Link
              href="https://www.linkedin.com"
              className="mt-6 inline-block bg-white text-[hsl(var(--chart-2))] py-2 px-4 rounded-lg hover:bg-[hsl(var(--muted))] transition"
              aria-label="View more testimonials on LinkedIn"
            >
              More on LinkedIn
            </Link>
          </div>
        </section>

        {/* Our Next Focus */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            <div>
              <Image
                src="/images/focus.png"
                alt="Next Focus"
                width={400}
                height={400}
                className="rounded-lg object-cover shadow-md"
                onError={(e) => console.error("Failed to load next focus image", e)}
              />
            </div>
            <div className="bg-[hsl(var(--card))] p-6 rounded-lg shadow-md flex flex-col justify-between border border-[hsl(var(--border))]">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-[hsl(var(--chart-2))] mb-6 font-canela">Our Next Focus</h2>
                <div className="space-y-4">
                  {[
                    "Expand STEM Education to 10 Schools by 2026",
                    "Grow into an Innovation Hub by 2027",
                    "Mobile Digital Learning for Remote Villages in 2025",
                    "70% Transition of Alumni into Paid Work",
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="bg-[hsl(var(--destructive))] text-white px-4 py-3 rounded-full shadow hover:bg-[hsl(var(--destructive)/0.8)] transition"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Join us in Our Mission */}
        <section className="bg-[hsl(var(--chart-2))] py-12 sm:py-16 text-white text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-canela">Join us in Our Mission</h2>
            <p className="text-lg mb-6">
              There's still work to be done to improve youth employability and economic opportunities in Tana River County.
              Join us in equipping people with the skills and tools they need to thrive.
            </p>
            <p className="text-lg mb-6">Here is how you can join us:</p>
            <ul className="list-disc list-inside text-lg mb-6">
              <li>Sponsor a Student - Support a young person's journey toward digital empowerment.</li>
              <li>Become a Partner - Help us expand our reach through funding, training, or tech support.</li>
              <li>Give in Kind - Donate equipment or resources to enhance our training programs.</li>
            </ul>
            <Link
              href="/volunteer"
              className="inline-block bg-white text-[hsl(var(--chart-2))] py-3 px-6 rounded-lg hover:bg-[hsl(var(--muted))] transition"
              aria-label="Get involved with Kijiji Connect"
            >
              Get Involved
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default KijijiConnect;