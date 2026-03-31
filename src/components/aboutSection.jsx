import { memo } from 'react';
import ScrollAnimationWrapper from './ScrollAnimationWrapper';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import {
  SiExpress,
  SiFigma,
  SiFlutter,
  SiGit,
  SiJavascript,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPython,
  SiReact,
  SiSupabase,
  SiTailwindcss,
  SiThreedotjs
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';

const experience = [
  {
    title: 'Team Lead',
    organization: 'ACTSmart Incubation Program - Cohort 1',
    time: 'JULY 12 - DECEMBER 27, 2025',
    image: '/experience/aurea.webp',
    details: [
      'Selected for ACTSmart, a tech-focused incubation program supporting startups, SMEs, and university entrepreneurs.',
      'Led the team through product strategy, technical development, and execution, and shipped a real product with over 130 registered users.',
      'Exhibited AUREA at Digital Government Forum 2025, ACTSmart Networking Night, and Generation Future 2025.'
    ]
  },
  {
    title: 'Team Lead',
    organization: 'Turing Hackathon Cohort 8',
    time: 'JUNE 06 - JUNE 15, 2025',
    image: '/experience/phsardesign.webp',
    details: [
      'Co-founded Phsar Design, a platform helping local designers showcase and sell creative work.',
      'Led the team during rapid build and final judge presentation.',
      'Received honorable recognition for teamwork and delivery.'
    ]
  },
  {
    title: 'Trainer',
    organization: "CADT's Next GEN Engagement Program",
    time: 'JULY 23 - SEPTEMBER 16, 2025',
    image: '/experience/nextgen.jpg',
    details: [
      'Taught JavaScript to first-year students and guided project implementation.',
      'Mentored practical project work and presentation readiness.',
      'Strengthened technical communication and instruction skills.'
    ]
  },
  {
    title: 'Design Volunteer',
    organization: 'Shadow Design Event - Season 1 and 2',
    time: 'NOVEMBER 2024, MAY - JUNE 2025',
    image: '/experience/shadowdesign.webp',
    details: [
      'Designed promotional posters and social media visuals for event communication.',
      'Supported logistics and media coverage during live events.',
      'Helped improve event visibility and visual consistency.'
    ]
  }
];

const AboutSection = memo(() => {
  const [introRef, introVisible] = useScrollAnimation({
    threshold: 0.3,
    delay: 80,
    triggerOnce: true
  });

  return (
    <section id="about" className="hero-surface section-shell px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <ScrollAnimationWrapper animation="fadeInUp" delay={80}>
          <header id="about" className="mb-44 md:mb-52 lg:mb-60">
            <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-12 items-start">
              <div className="space-y-4">
                <h2 className="display-hero text-zinc-950 max-w-[11ch]">ABOUT ME</h2>
                <p className="text-sm md:text-base leading-relaxed text-zinc-500 max-w-sm">
                  Building software that feels clear, useful, and properly finished.
                </p>
                <div className="flex flex-wrap gap-x-6 gap-y-2 pt-3">
                  <span className="about-stat-inline">3+ years building</span>
                  <span className="about-stat-inline">6 products shipped</span>
                  <span className="about-stat-inline">Based in Phnom Penh</span>
                </div>
              </div>

              <div ref={introRef} className="w-full text-left space-y-5 lg:pt-2">
                <p className={`about-fill-text text-lg md:text-[1.45rem] leading-[1.65] ${introVisible ? 'is-revealed' : ''}`}>
                  I&apos;m a software developer and Computer Science student focused on building practical digital products with clear UX and strong execution. I work across product thinking, frontend development, and technical problem-solving to turn ideas into real, usable systems.
                </p>
                <p className={`about-fill-text text-lg md:text-[1.45rem] leading-[1.65] ${introVisible ? 'is-revealed' : ''}`}>
                  Over the last 3+ years, I&apos;ve shipped multiple products, led teams, taught students, and worked on projects across software, design, and security. I&apos;m especially interested in tools that solve real problems and feel simple, useful, and well-crafted.
                </p>
                <div className="pt-3 space-y-4">
                  <div>
                    <h3 className="text-base md:text-lg font-medium text-zinc-900">
                      Bachelor of Computer Science in Software Engineering
                    </h3>
                    <p className="text-sm text-zinc-700">Cambodia Academy of Digital Technology (CADT)</p>
                    <p className="text-sm text-zinc-500">2024 - 2027</p>
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg font-medium text-zinc-900">
                      Bachelor of Education (B.Ed) in TEFL
                    </h3>
                    <p className="text-sm text-zinc-700">Institution of Foreign Languages (IFL)</p>
                    <p className="text-sm text-zinc-500">2024 - 2027</p>
                  </div>
                </div>
              </div>
            </div>
          </header>
        </ScrollAnimationWrapper>

        <ScrollAnimationWrapper animation="fadeInUp" delay={220}>
          <section id="experience" className="mt-28 md:mt-36 lg:mt-40 mb-14 md:mb-16">
            <div className="mb-10 md:mb-12">
              <p className="text-xs tracking-[0.18em] text-zinc-500 mb-2">PROFESSIONAL JOURNEY</p>
              <h3 className="display-brutal text-zinc-950 mb-3">Experience Highlights</h3>
              <p className="text-sm md:text-base text-zinc-600 max-w-2xl leading-relaxed">
                Leadership, teaching, product building, and creative support across startups, hackathons, and community programs.
              </p>
            </div>

            <div className="experience-timeline">
              {experience.map((item) => (
                <article key={`${item.title}-${item.organization}`} className="experience-entry">
                  <div className="experience-marker" aria-hidden="true" />
                  <div className="experience-date">{item.time}</div>

                  <div className="experience-card">
                    <div className="grid md:grid-cols-[1fr_220px] gap-6 md:gap-8 items-start">
                      <div>
                        <div className="mb-4 md:min-h-[1.5rem]">
                          <p className="text-[11px] tracking-[0.16em] text-zinc-500 mb-1.5">{item.organization}</p>
                          <h4 className="text-xl md:text-2xl font-medium tracking-[-0.02em] text-zinc-950">{item.title}</h4>
                        </div>

                        <ul className="space-y-3 text-sm md:text-[0.97rem] text-zinc-700 leading-relaxed">
                          {item.details.map((line) => (
                            <li key={line} className="experience-detail">
                              <span className="experience-detail-dot" aria-hidden="true" />
                              <span>{line}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="experience-media">
                      <img
                        src={item.image}
                        alt={`${item.organization} visual`}
                        className="w-full h-full object-cover aspect-[4/3]"
                        loading="lazy"
                        decoding="async"
                      />
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </ScrollAnimationWrapper>

        <ScrollAnimationWrapper animation="fadeInUp" delay={260}>
          <section>
            <div className="mb-6">
              <p className="text-xs tracking-[0.18em] text-zinc-500 mb-2">SKILLS & TECHNOLOGIES</p>
              <h3 className="display-brutal text-zinc-950">Technology Stack</h3>
            </div>

            <div className="w-full overflow-hidden rounded-2xl bg-zinc-50 py-6">
              <div className="flex w-max animate-scroll will-change-transform">
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
          </section>
        </ScrollAnimationWrapper>
      </div>
    </section>
  );
});

AboutSection.displayName = 'AboutSection';

export default AboutSection;
