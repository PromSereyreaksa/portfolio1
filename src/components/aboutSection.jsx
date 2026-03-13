import { memo } from 'react';
import { ExternalLink } from 'lucide-react';
import ScrollAnimationWrapper from './ScrollAnimationWrapper';
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

const highlights = [
  { label: 'Years building', value: '3+' },
  { label: 'Products shipped', value: '6' },
  { label: 'Core focus', value: 'Product + UX' },
  { label: 'Current base', value: 'Phnom Penh' }
];

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
  return (
    <section className="hero-surface section-shell px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <ScrollAnimationWrapper animation="fadeInUp" delay={80}>
          <header className="text-center mb-12 md:mb-14">
            <p className="text-xs tracking-[0.22em] text-zinc-500 mb-3">ABOUT</p>
            <h2 className="display-hero text-zinc-950 mb-6">ABOUT ME</h2>
            <div className="max-w-5xl mx-auto space-y-6">
              <div className="pl-6 text-left">
                <p className="text-md text-zinc-700 leading-relaxed mb-4">
                  I am an ambitious, motivated, and curious Computer Science student with an entrepreneurial mindset and a passion
                  for solving real-world problems. Analytical and proactive, I bring experience in teamwork, leadership, volunteering,
                  and project delivery. I thrive on learning, collaboration, and taking initiative, consistently seeking to create
                  meaningful impact in every endeavor.
                </p>
                <p className="text-md text-zinc-600 leading-relaxed italic">
                  Fullstack developer focused on security, product quality, and practical impact.
                </p>
              </div>
            </div>
          </header>
        </ScrollAnimationWrapper>

        <ScrollAnimationWrapper animation="fadeInUp" delay={120}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-12 md:mb-14">
            {highlights.map((item) => (
              <article key={item.label} className="bg-zinc-50 rounded-xl px-4 py-4">
                <p className="text-xs tracking-[0.14em] text-zinc-500 mb-2">{item.label}</p>
                <p className="text-lg md:text-xl text-zinc-900 font-medium">{item.value}</p>
              </article>
            ))}
          </div>
        </ScrollAnimationWrapper>

        <ScrollAnimationWrapper animation="fadeInUp" delay={160}>
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 md:gap-10 mb-14 md:mb-16">
            <article className="p-5 md:p-7 bg-white rounded-2xl">
              <p className="text-xs tracking-[0.18em] text-zinc-500 mb-3">CURRENT FOCUS</p>
              <h3 className="display-brutal text-zinc-900 mb-3">Shipping useful products</h3>
              <p className="text-sm md:text-base text-zinc-700 leading-relaxed mb-5">
                I am currently co-leading AUREA while building and iterating real products with practical impact.
                I care about clean implementation, great user experience, and measurable outcomes.
              </p>
              <a
                href="https://www.aurea.tools/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm tracking-[0.1em] text-blue-700 hover:text-blue-900 transition-colors"
              >
                <span>VISIT AUREA</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </article>

            <article className="p-5 md:p-7 bg-zinc-50 rounded-2xl">
              <p className="text-xs tracking-[0.18em] text-zinc-500 mb-3">EDUCATION</p>
              <div className="space-y-4">
                <div>
                  <h3 className="text-base md:text-lg font-medium text-zinc-900">
                    Bachelor of Computer Science in Software Engineering
                  </h3>
                  <p className="text-sm text-zinc-700">Cambodia Academy of Digital Technology (CADT)</p>
                  <p className="text-sm text-zinc-700">2024 - 2027</p>
                </div>
                <div className="pt-4">
                  <h3 className="text-base md:text-lg font-medium text-zinc-900">
                    Bachelor of Education (B.Ed) in TEFL
                  </h3>
                  <p className="text-sm text-zinc-700">Institution of Foreign Languages (IFL)</p>
                  <p className="text-sm text-zinc-700">2024 - 2027</p>
                </div>
              </div>
            </article>
          </div>
        </ScrollAnimationWrapper>

        <ScrollAnimationWrapper animation="fadeInUp" delay={220}>
          <section className="mb-14 md:mb-16">
            <div className="mb-6">
              <p className="text-xs tracking-[0.18em] text-zinc-500 mb-2">PROFESSIONAL JOURNEY</p>
              <h3 className="display-brutal text-zinc-950">Experience Highlights</h3>
            </div>

            <div className="space-y-5">
              {experience.map((item) => (
                <article key={`${item.title}-${item.organization}`} className="bg-white rounded-2xl p-5 md:p-6">
                  <div className="grid md:grid-cols-[1fr_220px] gap-5 md:gap-6 items-start">
                    <div>
                      <div className="mb-3">
                        <p className="text-[11px] tracking-[0.16em] text-zinc-500 mb-1">{item.organization}</p>
                        <h4 className="text-lg md:text-xl font-medium text-zinc-900">{item.title}</h4>
                        <p className="text-xs tracking-[0.12em] text-zinc-500 mt-1">{item.time}</p>
                      </div>

                      <ul className="space-y-2.5 text-sm text-zinc-700 leading-relaxed">
                        {item.details.map((line) => (
                          <li key={line} className="flex gap-2">
                            <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-zinc-400 flex-shrink-0" aria-hidden="true" />
                            <span>{line}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-zinc-50 rounded-xl overflow-hidden">
                      <img
                        src={item.image}
                        alt={`${item.organization} visual`}
                        className="w-full h-full object-cover aspect-[4/3]"
                        loading="lazy"
                        decoding="async"
                      />
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
          </section>
        </ScrollAnimationWrapper>
      </div>
    </section>
  );
});

AboutSection.displayName = 'AboutSection';

export default AboutSection;




