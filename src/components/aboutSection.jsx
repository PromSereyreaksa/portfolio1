import {
  ExternalLink,
} from "lucide-react";
import { memo } from "react";
import LazyImage from "./LazyImage";
import ScrollAnimationWrapper from "./ScrollAnimationWrapper";
import {
  SiReact,
  SiJavascript,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiSupabase,
  SiTailwindcss,
  SiFigma,
  SiGit,
  SiPython,
  SiFlutter,
  SiNextdotjs,
  SiThreedotjs,
  SiTypescript,
  SiDocker,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";

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
                  I am a third-year Computer Science student specializing in Software Engineering at the Cambodia Academy of Digital Technology, 
                  alongside pursuing a Bachelor of Education in TEFL at the Institution of Foreign Languages. With proven experience leading 
                  startup projects through the ACTSmart Incubation Program and co-founding Phsar Design at Turing Hackathon Cohort 8, 
                  I bring hands-on skills in full-stack development, team leadership, and real-world product execution. I combine technical 
                  expertise with a passion for education, community impact, and innovation.
                </p>
                <p className="text-md text-gray-600 leading-relaxed italic">
                  I also like graphic design.
                </p>
              </div>
            </div>
          </div>
        </ScrollAnimationWrapper>

        {/* Academic Background - Timeline Style */}
        <ScrollAnimationWrapper animation="fadeInUp" delay={150}>
          <div className="mb-20">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-thin tracking-[0.2em] md:tracking-[0.3em] text-black mb-12 text-center max-w-full">
              ACADEMIC BACKGROUND
            </h2>
            <div className="space-y-8 max-w-5xl mx-auto">
              
              {/* Computer Science Degree */}
              <div className="border-l-4 border-gray-300 pl-6 py-4 hover:border-black transition-colors">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                  <div>
                    <h3 className="text-lg font-medium text-black mb-1">
                      Bachelor of Computer Science in Software Engineering
                    </h3>
                    <p className="text-md text-gray-700">
                      Cambodia Academy of Digital Technology (CADT)
                    </p>
                  </div>
                  <span className="text-sm font-mono text-gray-600 mt-2 md:mt-0">
                    2024 - 2027
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  Third-year student with hands-on experience in web development and software engineering projects.
                </p>
              </div>

              {/* Education Degree */}
              <div className="border-l-4 border-gray-300 pl-6 py-4 hover:border-black transition-colors">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                  <div>
                    <h3 className="text-lg font-medium text-black mb-1">
                      Bachelor of Education (B.Ed) in TEFL
                    </h3>
                    <p className="text-md text-gray-700">
                      Institution of Foreign Languages (IFL)
                    </p>
                  </div>
                  <span className="text-sm font-mono text-gray-600 mt-2 md:mt-0">
                    2024 - 2027
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  Third-year student in the Department of English, focusing on Teaching English as a Foreign Language (TEFL).
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
              
              {/* Team Lead - ACTSmart */}
              <div className="border-l-4 border-gray-300 pl-6 py-4 hover:border-black transition-colors">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                      <div>
                        <h3 className="text-lg font-medium text-black mb-1">
                          Team Lead
                        </h3>
                        <p className="text-md text-gray-700">
                          ACTSmart Incubation Program Cohort 1
                        </p>
                      </div>
                      <span className="text-sm font-mono text-gray-600 mt-2 md:mt-0">
                        JULY 12 - DECEMBER 27, 2025
                      </span>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p>
                        ◦ Selected for ACTSmart, a tech-focused incubation program supporting Cambodian startups, SMEs, and university entrepreneurs.
                      </p>
                      <p>
                        ◦ Led the team throughout the 5-month program, gaining hands-on experience in business strategy, startup operations, technical development, and economic insights, and successfully shipped a real-world product with over 130 registered users.
                      </p>
                      <p>
                        ◦ Exhibited AUREA at 3 events: Digital Government Forum (DGF) 2025, ACTSmart Networking Night, and Generation Future 2025: "Demo Day and Exhibition".
                      </p>
                    </div>
                  </div>
                  <div className="md:w-64 flex-shrink-0">
                    <img
                      src="/experience/aurea.webp"
                      alt="ACTSmart Program"
                      className="w-full h-auto rounded-lg shadow-md object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Team Lead - Turing Hackathon */}
              <div className="border-l-4 border-gray-300 pl-6 py-4 hover:border-black transition-colors">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                      <div>
                        <h3 className="text-lg font-medium text-black mb-1">
                          Team Lead
                        </h3>
                        <p className="text-md text-gray-700">
                          Turing Hackathon Cohort 8
                        </p>
                      </div>
                      <span className="text-sm font-mono text-gray-600 mt-2 md:mt-0">
                        JUNE 06 - JUNE 15, 2025
                      </span>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p>
                        ◦ Co-founded Phsar Design, a platform helping local designers showcase and sell their creative work.
                      </p>
                      <p>
                        ◦ Led the team during the hackathon and presented our project to judges, earning an Honorable Award for teamwork and project execution.
                      </p>
                    </div>
                  </div>
                  <div className="md:w-64 flex-shrink-0">
                    <img
                      src="/experience/phsardesign.webp"
                      alt="Turing Hackathon"
                      className="w-full h-auto rounded-lg shadow-md object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Trainer - CADT Next GEN */}
              <div className="border-l-4 border-gray-300 pl-6 py-4 hover:border-black transition-colors">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                      <div>
                        <h3 className="text-lg font-medium text-black mb-1">
                          Trainer
                        </h3>
                        <p className="text-md text-gray-700">
                          CADT's Next GEN Engagement Program
                        </p>
                      </div>
                      <span className="text-sm font-mono text-gray-600 mt-2 md:mt-0">
                        JULY 23 - SEPTEMBER 16, 2025
                      </span>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p>
                        ◦ Taught JavaScript to first-year students and guided hands-on project work.
                      </p>
                      <p>
                        ◦ Participated in a project showcase competition, applying technical and project management skills to solve real-world problems.
                      </p>
                    </div>
                  </div>
                  <div className="md:w-64 flex-shrink-0">
                    <img
                      src="/experience/nextgen.jpg"
                      alt="CADT Next GEN Program"
                      className="w-full h-auto rounded-lg shadow-md object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Design Volunteer */}
              <div className="border-l-4 border-gray-300 pl-6 py-4 hover:border-black transition-colors">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                      <div>
                        <h3 className="text-lg font-medium text-black mb-1">
                          Design Volunteer
                        </h3>
                        <p className="text-md text-gray-700">
                          Shadow Design Event - Season 1 & 2
                        </p>
                      </div>
                      <span className="text-sm font-mono text-gray-600 mt-2 md:mt-0">
                        NOVEMBER 2024, MAY - JUNE 2025
                      </span>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p>
                        ◦ Designed promotional posters and visual assets for social media and event marketing, improving visibility and strengthening brand consistency.
                      </p>
                      <p>
                        ◦ Assisted with logistics and media coverage, ensuring smooth event operations and effective presentation of creative work.
                      </p>
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

        {/* Skills - Logo Loop */}
        <ScrollAnimationWrapper animation="fadeInUp" delay={600}>
          <div className="mb-20">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-thin tracking-[0.2em] md:tracking-[0.3em] text-black mb-12 text-center max-w-full">
              SKILLS & TECHNOLOGIES
            </h2>
            <div className="w-full overflow-hidden">
              <div className="flex animate-scroll">
                <div className="flex items-center gap-16 px-8">
                  <SiReact className="text-[#61DAFB] w-12 h-12 flex-shrink-0" title="React" />
                  <SiJavascript className="text-[#F7DF1E] w-12 h-12 flex-shrink-0" title="JavaScript" />
                  <SiNodedotjs className="text-[#339933] w-12 h-12 flex-shrink-0" title="Node.js" />
                  <SiExpress className="text-gray-700 w-12 h-12 flex-shrink-0" title="Express" />
                  <SiMongodb className="text-[#47A248] w-12 h-12 flex-shrink-0" title="MongoDB" />
                  <SiSupabase className="text-[#3ECF8E] w-12 h-12 flex-shrink-0" title="Supabase" />
                  <SiTailwindcss className="text-[#06B6D4] w-12 h-12 flex-shrink-0" title="Tailwind CSS" />
                  <SiFigma className="text-[#F24E1E] w-12 h-12 flex-shrink-0" title="Figma" />
                  <SiGit className="text-[#F05032] w-12 h-12 flex-shrink-0" title="Git" />
                  <SiPython className="text-[#3776AB] w-12 h-12 flex-shrink-0" title="Python" />
                  <SiFlutter className="text-[#02569B] w-12 h-12 flex-shrink-0" title="Flutter" />
                  <FaJava className="text-[#007396] w-12 h-12 flex-shrink-0" title="Java" />
                  <SiNextdotjs className="text-gray-900 w-12 h-12 flex-shrink-0" title="Next.js" />
                  <SiThreedotjs className="text-gray-800 w-12 h-12 flex-shrink-0" title="Three.js" />
                </div>
                <div className="flex items-center gap-16 px-8">
                  <SiReact className="text-[#61DAFB] w-12 h-12 flex-shrink-0" title="React" />
                  <SiJavascript className="text-[#F7DF1E] w-12 h-12 flex-shrink-0" title="JavaScript" />
                  <SiNodedotjs className="text-[#339933] w-12 h-12 flex-shrink-0" title="Node.js" />
                  <SiExpress className="text-gray-700 w-12 h-12 flex-shrink-0" title="Express" />
                  <SiMongodb className="text-[#47A248] w-12 h-12 flex-shrink-0" title="MongoDB" />
                  <SiSupabase className="text-[#3ECF8E] w-12 h-12 flex-shrink-0" title="Supabase" />
                  <SiTailwindcss className="text-[#06B6D4] w-12 h-12 flex-shrink-0" title="Tailwind CSS" />
                  <SiFigma className="text-[#F24E1E] w-12 h-12 flex-shrink-0" title="Figma" />
                  <SiGit className="text-[#F05032] w-12 h-12 flex-shrink-0" title="Git" />
                  <SiPython className="text-[#3776AB] w-12 h-12 flex-shrink-0" title="Python" />
                  <SiFlutter className="text-[#02569B] w-12 h-12 flex-shrink-0" title="Flutter" />
                  <FaJava className="text-[#007396] w-12 h-12 flex-shrink-0" title="Java" />
                  <SiNextdotjs className="text-gray-900 w-12 h-12 flex-shrink-0" title="Next.js" />
                  <SiThreedotjs className="text-gray-800 w-12 h-12 flex-shrink-0" title="Three.js" />
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
