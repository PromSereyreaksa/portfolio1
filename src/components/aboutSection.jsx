import { memo, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FaJava } from 'react-icons/fa';
import {
  SiAstro,
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
  SiTailwindcss,
  SiThreedotjs,
} from 'react-icons/si';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import ScrollAnimationWrapper from './ScrollAnimationWrapper';

const stackIcons = {
  Astro: <SiAstro className="text-[#FF5D01] w-12 h-12 flex-shrink-0" title="Astro" />,
  React: <SiReact className="text-[#61DAFB] w-12 h-12 flex-shrink-0" title="React" />,
  JavaScript: <SiJavascript className="text-[#F7DF1E] w-12 h-12 flex-shrink-0" title="JavaScript" />,
  'Node.js': <SiNodedotjs className="text-[#339933] w-12 h-12 flex-shrink-0" title="Node.js" />,
  Express: <SiExpress className="text-gray-700 w-12 h-12 flex-shrink-0" title="Express" />,
  MongoDB: <SiMongodb className="text-[#47A248] w-12 h-12 flex-shrink-0" title="MongoDB" />,
  'Tailwind CSS': <SiTailwindcss className="text-[#06B6D4] w-12 h-12 flex-shrink-0" title="Tailwind CSS" />,
  Figma: <SiFigma className="text-[#F24E1E] w-12 h-12 flex-shrink-0" title="Figma" />,
  Git: <SiGit className="text-[#F05032] w-12 h-12 flex-shrink-0" title="Git" />,
  Python: <SiPython className="text-[#3776AB] w-12 h-12 flex-shrink-0" title="Python" />,
  Flutter: <SiFlutter className="text-[#02569B] w-12 h-12 flex-shrink-0" title="Flutter" />,
  Java: <FaJava className="text-[#007396] w-12 h-12 flex-shrink-0" title="Java" />,
  'Next.js': <SiNextdotjs className="text-gray-900 w-12 h-12 flex-shrink-0" title="Next.js" />,
  'Three.js': <SiThreedotjs className="text-gray-800 w-12 h-12 flex-shrink-0" title="Three.js" />,
};

const AboutSection = memo(({ about, education, experience }) => {
  const [introRef, introVisible] = useScrollAnimation({
    threshold: 0.3,
    delay: 80,
    triggerOnce: true,
  });
  const [activeExperience, setActiveExperience] = useState(experience[0]?.organization ?? '');

  const toggleExperience = (organization) => {
    setActiveExperience((current) => (current === organization ? '' : organization));
  };

  return (
    <section id="about" className="hero-surface section-shell px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <ScrollAnimationWrapper animation="fadeInUp" delay={80}>
          <header id="about" className="mb-44 md:mb-52 lg:mb-60">
            <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-12 items-start">
              <div className="space-y-4">
                <h2 className="display-hero text-zinc-950 max-w-[11ch]">{about.eyebrow}</h2>
                <p className="text-sm md:text-base leading-relaxed text-zinc-500 max-w-sm">
                  {about.intro}
                </p>
                <div className="flex flex-wrap gap-x-6 gap-y-2 pt-3">
                  {about.stats.map((item) => (
                    <span key={item} className="about-stat-inline">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div ref={introRef} className="w-full text-left space-y-5 lg:pt-2">
                {about.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    className={`about-fill-text text-lg md:text-[1.45rem] leading-[1.65] ${introVisible ? 'is-revealed' : ''}`}
                  >
                    {paragraph}
                  </p>
                ))}
                <div className="pt-3 space-y-4">
                  {education.map((item) => (
                    <div key={item.degree}>
                      <h3 className="text-base md:text-lg font-medium text-zinc-900">
                        {item.degree}
                      </h3>
                      <p className="text-sm text-zinc-700">{item.school}</p>
                      <p className="text-sm text-zinc-500">{item.years}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </header>
        </ScrollAnimationWrapper>

        <ScrollAnimationWrapper animation="fadeInUp" delay={220}>
          <section id="experience" className="mt-28 md:mt-36 lg:mt-40 mb-14 md:mb-16">
            <div className="mb-10 md:mb-12">
              <p className="text-xs tracking-[0.18em] text-zinc-500 mb-2">{about.experienceIntro.eyebrow}</p>
              <h3 className="display-brutal text-zinc-950 mb-3">{about.experienceIntro.title}</h3>
              <p className="text-sm md:text-base text-zinc-600 max-w-2xl leading-relaxed">
                {about.experienceIntro.description}
              </p>
            </div>

            <div className="experience-timeline">
              {experience.map((item) => {
                const isActive = activeExperience === item.organization;

                return (
                  <article
                    key={`${item.title}-${item.organization}`}
                    className={`experience-entry experience-entry--accordion ${isActive ? 'is-active' : ''}`}
                    onMouseEnter={() => setActiveExperience(item.organization)}
                    onMouseLeave={() => setActiveExperience('')}
                  >
                    <div className="experience-accordion">
                      <button
                        type="button"
                        className="experience-toggle"
                        onClick={() => toggleExperience(item.organization)}
                        aria-expanded={isActive}
                      >
                        <span className="experience-ink" aria-hidden="true" />
                        <div className="experience-toggle-copy">
                          <p className="experience-date">{item.time}</p>
                          <p className="experience-program">{item.organization}</p>
                        </div>
                        <ChevronDown
                          className={`experience-chevron ${isActive ? 'is-active' : ''}`}
                          aria-hidden="true"
                        />
                      </button>

                      <div className={`experience-panel ${isActive ? 'is-active' : ''}`}>
                        <div className="experience-panel-inner">
                          <div className="experience-card">
                            <div className="grid md:grid-cols-[1fr_220px] gap-6 md:gap-8 items-start">
                              <div>
                                <div className="mb-4">
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
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        </ScrollAnimationWrapper>

        <ScrollAnimationWrapper animation="fadeInUp" delay={260}>
          <section>
            <div className="mb-6">
              <p className="text-xs tracking-[0.18em] text-zinc-500 mb-2">{about.stackIntro.eyebrow}</p>
              <h3 className="display-brutal text-zinc-950">{about.stackIntro.title}</h3>
            </div>

            <div className="w-full overflow-hidden py-6">
              <div className="flex w-max animate-scroll will-change-transform">
                <div className="flex items-center gap-16 px-8">
                  {about.stack.map((item) => (
                    <span key={item}>{stackIcons[item]}</span>
                  ))}
                </div>

                <div className="flex items-center gap-16 px-8">
                  {about.stack.map((item) => (
                    <span key={`${item}-duplicate`}>{stackIcons[item]}</span>
                  ))}
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
