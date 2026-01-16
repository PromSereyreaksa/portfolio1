import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code,
  Server,
  Database,
  Palette,
  Cloud,
  Figma,
  Heart,
  Trophy,
  GraduationCap,
  Shield,
  Sparkles,
} from "lucide-react";
import { memo } from "react";
import LazyImage from "./LazyImage";
import ScrollAnimationWrapper from "./ScrollAnimationWrapper";

const AboutSection = memo(() => {
  return (
    <section className="py-24 px-8 md:px-16 lg:px-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <ScrollAnimationWrapper animation="fadeInUp" delay={100}>
          <div className="mb-20">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-thin tracking-[0.2em] md:tracking-[0.3em] text-black mb-8 text-center max-w-full">
              ABOUT ME
            </h2>
            <div className="max-w-5xl mx-auto space-y-6">
              <div className="border-l-2 border-gray-200 pl-6">
                <p className="text-md text-gray-700 leading-relaxed mb-4 text-justify">
                  I am an ambitious Computer Science student specializing in
                  Software Engineering at the Cambodia Academy of Digital
                  Technology, with complementary studies in English at the
                  Institute of Foreign Languages - Department of English. With
                  hands-on experience leading startup projects through the
                  ACTSmart Incubation Program, co-founding Phsar Design at
                  Turing Hackathon Cycle 8, I bring
                  proven skills in full-stack development, team leadership, and
                  real-world product execution. I combine technical expertise with a
                  passion for community impact and innovation.
                </p>
                <p className="text-md text-gray-600 leading-relaxed italic">
                    I also like graphic design.
                </p>
              </div>
            </div>
          </div>
        </ScrollAnimationWrapper>

        {/* Experience & Achievements */}
        <ScrollAnimationWrapper animation="fadeInUp" delay={200}>
          <div className="mb-20">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-thin tracking-[0.2em] md:tracking-[0.3em] text-black mb-8 text-center max-w-full">
              EXPERIENCE
            </h2>
            <div className="space-y-8 max-w-5xl mx-auto">
              <div className="border-l-2 border-gray-200 pl-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <h3 className="font-light tracking-wide text-black mb-2 text-xl flex items-center">
                      <Heart className="mr-2" size={16} />
                      Volunteer Leadership
                    </h3>
                    <p className="text-md text-gray-600 mb-2">
                      Extensive volunteer experience across multiple fields
                      including leadership roles, community building, and
                      project management.
                    </p>
                    <div className="space-y-1 text-sm text-gray-500">
                      <p>
                        • Shadow Design Event Season 1 & 2 - Support Team &
                        Graphic Design
                      </p>
                      <p>
                        • Air & Tech Show - ពិព័រណ៍យន្តហោះ & បច្ចេកវិទ្យា
                        (Exhibition Team)
                      </p>
                      <p>• Digital Government Forum</p>
                      <p>• CADT's Next GEN Engagement Program</p>
                      <p>• Youth Environmental Summit, Singapore</p>
                      <p>
                        • International School-to-School Experience (ISSE),
                        Australia
                      </p>
                      <p>
                        • JCI Cohort 5 - Let's Read OC TEAM
                      </p>
                      <p>• Multiple community and educational initiatives</p>
                    </div>
                  </div>
                  <div className="md:w-64 flex-shrink-0">
                    <img
                      src="/experience/shadowdesign.webp"
                      alt="Shadow Design Event"
                      className="w-full h-auto rounded-lg shadow-md object-cover"
                    />
                  </div>
                </div>
              </div>

              <div className="border-l-2 border-gray-200 pl-6">
                <h3 className="font-light tracking-wide text-black text-xl mb-4 flex items-center">
                  <Trophy className="mr-2" size={16} />
                  Hackathons & Competitions
                </h3>

                <div className="space-y-8">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1">
                      <strong>
                        <h4 className="text-base mb-1">
                          ACTSmart Incubation Program
                        </h4>
                      </strong>
                      <i>
                        <p className="text-sm text-gray-600 mb-2">
                          Selected Digital Startup
                        </p>
                      </i>
                      <div className="space-y-1 text-sm text-gray-500">
                        <p>
                          • Selected for ACTSmart, a tech-focused incubation
                          program supporting Cambodian startups, SMEs, and
                          university entrepreneurs.
                        </p>
                        <p>
                          • Led the team throughout the 5-month program, gaining
                          hands-on experience in business strategy, startup
                          operations, technical development, and economic
                          insights, and successfully shipped a real-world
                          product with over 130 registered users.
                        </p>
                        <p>
                          • Exhibited AUREA at 3 events: Digital Government
                          Forum (DGF) 2025, ACTSmart Networking Night, and
                          Generation Future 2025: "Demo Day and Exhibition".
                        </p>
                         <a
                          href="https://www.aupptechcenter.com/actsmart-cohort-1-startups-profile/aurea/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-blue-600 hover:text-blue-800 mt-2"
                        >
                          <ExternalLink size={10} className="mr-1" /> ACTSmart Cohort 1 Startups Profile - AUREA
                        </a>
                      </div>
                    </div>
                    <div className="md:w-64 flex-shrink-0">
                      <img
                        src="/experience/aurea.webp"
                        alt="AUREA Project"
                        className="w-full h-auto rounded-lg shadow-md object-cover"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1">
                      <strong>
                        <h4 className="text-base mb-1">
                          Turing Hackathon Cycle 8
                        </h4>
                      </strong>
                      <i>
                        <p className="text-sm text-gray-600 mb-2">
                          Selected Digital Startup
                        </p>
                      </i>
                      <div className="space-y-1 text-sm text-gray-500">
                        <p>
                          • Co‑ounded Phsar Design, a platform helping local
                          designers showcase and sell their creative work.
                        </p>
                        <p>
                          • Led the team during the hackathon and presented our
                          project to judges, earning an Honorable Award for
                          teamwork, and project execution.
                        </p>
                        <a
                          href="https://startupcambodia.gov.kh/resource/category/blog/281"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-blue-600 hover:text-blue-800 mt-2"
                        >
                          <ExternalLink size={10} className="mr-1" /> Read
                          Turing Cycle 8 Blog
                        </a>
                      </div>
                    </div>
                    <div className="md:w-64 flex-shrink-0">
                      <img
                        src="/experience/phsardesign.webp"
                        alt="Phsar Design Project"
                        className="w-full h-auto rounded-lg shadow-md object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollAnimationWrapper>

        {/* Current Work */}
        <ScrollAnimationWrapper animation="fadeInUp" delay={400}>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-thin tracking-[0.2em] md:tracking-[0.3em] text-black mb-6 max-w-full">
              CURRENT WORK
            </h2>
            <div className="w-24 h-px bg-black mx-auto mb-8"></div>
            <p className="text-sm md:text-base font-light text-gray-600 max-w-2xl mx-auto leading-relaxed mb-12">
              Currently engaged in creative and technical roles across different
              organizations
            </p>

            {/* Work Grid - Clean layout with side-by-side mobile display */}
            <div className="grid grid-cols-2 gap-4 md:gap-8 max-w-4xl mx-auto">
              <div className="group text-center">
                <div className="relative mb-4 md:mb-6">
                  <LazyImage
                    src="/Luminyx-1.webp"
                    alt="Luminyx Company Logo"
                    className="w-16 h-16 md:w-20 md:h-20 mx-auto object-cover rounded-lg group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <h3 className="text-sm md:text-lg font-light tracking-wide text-black mb-1 md:mb-2 group-hover:text-gray-700 transition-colors">
                  Video Editor
                </h3>
                <p className="text-xs md:text-sm text-gray-600">at Luminyx</p>
              </div>

              <div className="group text-center">
                <div className="relative mb-4 md:mb-6">
                  <LazyImage
                    src="/AUREA.webp"
                    alt="COPPSARY Project Group Logo"
                    className="w-16 h-16 md:w-20 md:h-20 mx-auto object-cover rounded-lg group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <h3 className="text-sm md:text-lg font-light tracking-wide text-black mb-1 md:mb-2 group-hover:text-gray-700 transition-colors">
                  Co Founder
                </h3>
                <p className="text-xs md:text-sm text-gray-600 mb-2">AUREA</p>
                <a
                  href="https://www.aurea.tools/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-xs text-blue-600 hover:text-blue-800 group-hover:translate-y-1 transition-all duration-300"
                >
                  <ExternalLink size={10} className="mr-1" /> Check it out
                </a>
              </div>
            </div>
          </div>
        </ScrollAnimationWrapper>

        {/* Skills */}
        <ScrollAnimationWrapper animation="fadeInUp" delay={600}>
          <div className="mb-20">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-thin tracking-[0.2em] md:tracking-[0.3em] text-black mb-8 text-center max-w-full">
              SKILLS
            </h2>
            <div className="max-w-4xl mx-auto space-y-12">
              {/* Primary Technologies */}
              <div>
                <h3 className="text-xl font-light tracking-wide text-black mb-6 text-center">
                  Primary Technologies
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {[
                    { name: "React", icon: Code },
                    { name: "Express", icon: Server },
                    { name: "Supabase", icon: Database },
                    { name: "Tailwind CSS", icon: Palette },
                    { name: "Figma", icon: Figma },
                    { name: "MongoDB", icon: Database },
                  ].map((skill) => (
                    <div
                      key={skill.name}
                      className="flex flex-col items-center space-y-2 p-4 rounded-lg border border-gray-200 hover:border-gray-400 transition-colors"
                    >
                      <skill.icon size={24} className="text-gray-700" />
                      <span className="text-sm font-light text-gray-700">
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Exploring */}
              <div>
                <h3 className="text-xl font-light tracking-wide text-black mb-6 text-center">
                  Currently Exploring
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {[
                    { name: "Python", icon: Code },
                    { name: "Flutter", icon: Code },
                    { name: "Cloud & VPS", icon: Cloud },
                    { name: "Next.js", icon: Code },
                    { name: "Three.js", icon: Sparkles },
                    { name: "Cybersecurity", icon: Shield },
                  ].map((skill) => (
                    <div
                      key={skill.name}
                      className="flex flex-col items-center space-y-2 p-4 rounded-lg border border-gray-200 hover:border-gray-400 transition-colors"
                    >
                      <skill.icon size={24} className="text-gray-600" />
                      <span className="text-sm font-light text-gray-600">
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ScrollAnimationWrapper>
      </div>
    </section>
  );
});

AboutSection.displayName = "AboutSection";

export default AboutSection;
