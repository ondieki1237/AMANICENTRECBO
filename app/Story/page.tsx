// pages/OurStory.js
import ModernNavbar from "../../components/modern-navbar";
import Footer from "../../components/footer";
import TeamMember from "./TeamMember"; // Import the Client Component

const OurStoryPage = () => {
  return (
    <div className="min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))] font-amsterdam">
      <ModernNavbar />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 py-12 sm:py-16"> {/* Added pt-16 */}
        {/* Hero Section */}
        <section className="text-center mb-12 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[hsl(var(--destructive))] mb-6 animate-fade-in-down font-canela">
            Our Story
          </h1>
          <div className="max-w-4xl mx-auto bg-[hsl(var(--card))] rounded-2xl shadow-2xl p-6 sm:p-8 transform transition-all hover:scale-[1.01] duration-300 border border-[hsl(var(--border))]">
            <p className="text-base sm:text-lg text-[hsl(var(--muted-foreground))] leading-relaxed font-medium text-balance">
              During the 2012/2013 Kenya general elections, over 100 lives were lost, and some 6,000 people displaced in Tana River County due to intense inter-ethnic conflicts, largely driven by rumors and misinformation.
            </p>
            <p className="text-base sm:text-lg text-[hsl(var(--muted-foreground))] leading-relaxed mt-4 font-medium text-balance">
              There was an urgent need for initiatives to build peace, stop further loss of life, and rebuild tolerance among the warring communities.
            </p>
            <p className="text-base sm:text-lg text-[hsl(var(--muted-foreground))] leading-relaxed mt-4 font-medium text-balance">
              We partnered with The Sentinel Project to empower communities with reliable information through accessible technology like SMS messaging through the UnaHakika platform. This collaboration birthed the Amani Center, ensuring the sustainability of the Sentinel's efforts.
            </p>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[hsl(var(--chart-2))] mb-8 text-center animate-pulse font-canela">
            Our Journey
          </h2>
          <div className="relative">
            {/* Timeline line (hidden on mobile) */}
            <div className="hidden md:block absolute left-1/2 h-full w-1 bg-[hsl(var(--destructive)/0.5)] transform -translate-x-1/2"></div>
            
            {/* Timeline items */}
            <div className="space-y-8 md:space-y-12">
              {[
                {
                  year: "2016",
                  content:
                    "Amani Center CBO is born as an initiative to counter rumor and misinformation. Partnership with The Sentinel Project",
                  link: "https://thesentinelproject.org/",
                },
                {
                  year: "2017",
                  content:
                    "At the face of the 2017 general election, we partner with Amplifying Voices UK to establish Amani FM with an aim to heal longstanding inter-tribal tensions and foster tolerance during a critical election period.",
                  link: "https://amplifyingvoices.uk/",
                },
                {
                  year: "2021",
                  content:
                    "To achieve sustainability and reach more people in the region, Amani FM rebrands to Vox Radio",
                  link: null,
                },
                {
                  year: "2023",
                  content:
                    "Recognizing the potential of these community-driven approaches we launched Kijiji Connect project to equip communities with essential digital skills",
                  link: null,
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`relative flex flex-col md:flex-row ${
                    index % 2 === 0 ? "md:justify-start" : "md:justify-end"
                  } animate-slide-in`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div
                    className={`w-full md:w-5/12 p-4 sm:p-6 rounded-lg shadow-lg transform transition-all hover:scale-105 duration-300 ${
                      index % 2 === 0
                        ? "bg-[hsl(var(--secondary))]"
                        : "bg-[hsl(var(--accent))]"
                    } border border-[hsl(var(--border))] relative md:static`}
                  >
                    <div className="absolute -top-10 md:-top-2 md:-ml-14 w-12 h-12 rounded-full bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] flex items-center justify-center font-bold font-canela">
                      {item.year}
                    </div>
                    <p className="text-[hsl(var(--foreground))] font-medium text-balance text-sm sm:text-base">
                      {item.content}
                    </p>
                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-2 text-[hsl(var(--destructive))] hover:text-[hsl(var(--destructive)/0.8)] font-semibold transition-colors duration-200 text-sm sm:text-base"
                        aria-label={`Read more about ${item.year} milestone`}
                      >
                        READ MORE
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Board of Directors */}
          <section className="bg-[hsl(var(--card))] p-4 sm:p-6 rounded-2xl shadow-xl transform transition-all hover:shadow-2xl duration-300 border border-[hsl(var(--border))]">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[hsl(var(--destructive))] mb-6 text-center font-canela">
              Board of Directors
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { name: "JOHN GREEN", image: "john-green.jpg" },
                { name: "PHILIP AMARA", image: "philip-amara.jpg" },
                { name: "MOLE YAKO", image: "mole.png" },
                { name: "AYUB ISRAEL", image: "ayub-israel.jpg" },
                { name: "NYAMBURA WAMATTHA", image: "nyambura-wamattha.jpg" },
              ].map((member, index) => (
                <TeamMember key={index} member={member} borderColor="chart-2" />
              ))}
            </div>
          </section>

          {/* Team of Experts */}
          <section className="bg-[hsl(var(--card))] p-4 sm:p-6 rounded-2xl shadow-xl transform transition-all hover:shadow-2xl duration-300 border border-[hsl(var(--border))]">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[hsl(var(--chart-2))] mb-6 text-center font-canela">
              Our Team of Experts
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { name: "AGRIPINA KHAVAI", image: "agripina.png" },
                { name: "CAROLINE ISRAEL", image: "caroline-israel.jpg" },
                { name: "NYAMBURA WAMATTHA", image: "nyambura-wamattha.jpg" },
              ].map((member, index) => (
                <TeamMember key={index} member={member} borderColor="destructive" />
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OurStoryPage;