import { memo } from 'react';
import { ArrowUpRight, ExternalLink, Github } from 'lucide-react';

const featuredProject = {
  title: 'LeakScope',
  subtitle: 'Automated black-box security scanner for Supabase apps',
  image: '/projects/LeakScope1.png',
  link: 'https://leakscope.tech',
  productHuntLink: 'https://www.producthunt.com/products/leakscope-supabase-security-auditor',
  timeline: 'MARCH 2026 - PRESENT',
  role: 'Founder and Full-stack Engineer',
  challenge:
    'Security issues in Supabase deployments are often exposed through public assets and config drift, but teams rarely have continuous external checks.',
  solution:
    'Built a scanner pipeline that inspects live surfaces without credentials, validates RLS and auth patterns, and reports exploitable findings with remediation context.',
  impact: ['1,450+ applications scanned', '9,900+ vulnerabilities identified'],
  stack: ['Supabase', 'Security Testing', 'RLS', 'JWT', 'Automation', 'React']
};

const projects = [
  {
    title: 'AUREA',
    summary: 'Website builder helping designers ship portfolios quickly.',
    role: 'Co-founder, Frontend and Product',
    timeline: 'SEPTEMBER 2025 - PRESENT',
    outcome: 'Shipped public MVP and onboarded 130+ registered users.',
    stack: ['React', 'Vite', 'Tailwind CSS', 'SEO'],
    link: 'https://www.aurea.tools/'
  },
  {
    title: 'Phsar Design',
    summary: 'Creative freelancing platform connecting local digital artists with clients.',
    role: 'Frontend Engineer',
    timeline: 'JULY 2025 - PRESENT',
    outcome: 'Delivered production-ready frontend architecture for marketplace flows.',
    stack: ['React', 'Redux Toolkit', 'Vite', 'Router'],
    link: 'https://phsardesign.vercel.app/'
  },
  {
    title: 'StockMate',
    summary: 'Offline-first stock management mobile app with practical analytics.',
    role: 'Mobile Developer',
    timeline: 'JANUARY 2026',
    outcome: 'Implemented reliable CRUD, stock movement tracking, and low-stock alerts.',
    stack: ['Flutter', 'Clean Architecture', 'SQLite'],
    link: ''
  },
  {
    title: 'Automata Visualizer',
    summary: 'Interactive educational app for automata theory and algorithm exploration.',
    role: 'Software Engineer',
    timeline: 'JULY 2025',
    outcome: 'Built an interactive learning experience used for demo teaching sessions.',
    stack: ['Python', 'Algorithms', 'Education'],
    link: 'https://automata-f6k9.onrender.com/'
  }
];

const ProjectsSection = memo(() => {
  return (
    <section className="hero-surface section-shell w-full px-6 md:px-12 lg:px-20">
      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-8 md:gap-10 items-end mb-12 md:mb-16">
          <div className="text-left">
            <p className="text-xs tracking-[0.22em] text-zinc-500 mb-3">SELECTED WORK</p>
            <h2 className="display-hero text-zinc-950 mb-3">PROJECTS</h2>
            <p className="display-brutal text-zinc-300 leading-[0.9]">BUILD DESIGN SHIP</p>
          </div>
          <p className="text-sm md:text-base leading-relaxed text-zinc-700 max-w-2xl">
            Projects where I owned outcomes end-to-end: product direction, implementation quality, and real-world impact.
          </p>
        </div>

        <article className="grid lg:grid-cols-[minmax(320px,560px)_1fr] bg-white rounded-2xl overflow-hidden mb-8 md:mb-10">
          <div className="relative aspect-square w-full">
            <img
              src={featuredProject.image}
              alt="LeakScope project dashboard preview"
              width="1080"
              height="1080"
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
            <div className="absolute left-4 top-4 md:left-6 md:top-6 px-2.5 py-1 text-[11px] tracking-[0.18em] bg-blue-600 text-white">
              FEATURED
            </div>
            <div className="absolute left-4 right-4 md:left-6 md:right-6 bottom-5 text-white">
              <p className="text-[11px] tracking-[0.16em] text-white/80 mb-2">{featuredProject.timeline}</p>
              <h3 className="display-brutal text-white mb-2">{featuredProject.title}</h3>
              <p className="text-sm text-white/90">{featuredProject.subtitle}</p>
            </div>
          </div>

          <div className="p-6 md:p-8 lg:p-9">
            <div className="mb-5">
              <p className="text-xs tracking-[0.16em] text-zinc-500 mb-2">ROLE</p>
              <p className="text-sm md:text-base text-zinc-800">{featuredProject.role}</p>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <p className="text-xs tracking-[0.16em] text-zinc-500 mb-1.5">CHALLENGE</p>
                <p className="text-sm text-zinc-700 leading-relaxed">{featuredProject.challenge}</p>
              </div>
              <div>
                <p className="text-xs tracking-[0.16em] text-zinc-500 mb-1.5">SOLUTION</p>
                <p className="text-sm text-zinc-700 leading-relaxed">{featuredProject.solution}</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 mb-6">
              {featuredProject.impact.map((item) => (
                <div key={item} className="bg-zinc-50 rounded-lg px-3 py-3 text-sm text-zinc-800">
                  {item}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 mb-7">
              {featuredProject.stack.map((tag) => (
                <span key={tag} className="px-2.5 py-1 rounded-full bg-zinc-100 text-[11px] tracking-[0.08em] text-zinc-700">
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={featuredProject.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-zinc-950 text-white hover:bg-zinc-800 transition-colors text-sm tracking-[0.12em]"
              >
                <span>VIEW LIVE PRODUCT</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <a
                href={featuredProject.productHuntLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-zinc-300 bg-white text-zinc-800 hover:border-zinc-900 hover:text-zinc-950 transition-colors text-sm tracking-[0.04em]"
              >
                <span>Check us out on Product Hunt</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </article>

        <div className="grid md:grid-cols-2 gap-4 md:gap-5">
          {projects.map((project) => (
            <article
              key={project.title}
              className="h-full bg-white rounded-xl p-5 md:p-6 transition-all"
            >
              <div className="flex items-start justify-between gap-3 mb-4">
                <div>
                  <h3 className="text-[clamp(1.2rem,2.8vw,1.8rem)] leading-[0.96] font-semibold tracking-[0.03em] text-zinc-900 mb-1">{project.title}</h3>
                  <p className="text-xs tracking-[0.14em] text-zinc-500">{project.timeline}</p>
                </div>
                {project.link ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs tracking-[0.12em] text-zinc-600 hover:text-zinc-900 transition-colors"
                  >
                    <span>LIVE</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <span className="text-xs tracking-[0.12em] text-zinc-400">PRIVATE</span>
                )}
              </div>

              <p className="text-sm leading-relaxed text-zinc-700 mb-4">{project.summary}</p>

              <div className="space-y-3 mb-5">
                <div>
                  <p className="text-[11px] tracking-[0.16em] text-zinc-500 mb-1">ROLE</p>
                  <p className="text-sm text-zinc-800">{project.role}</p>
                </div>
                <div>
                  <p className="text-[11px] tracking-[0.16em] text-zinc-500 mb-1">OUTCOME</p>
                  <p className="text-sm text-zinc-700">{project.outcome}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {project.stack.map((tag) => (
                  <span key={tag} className="px-2 py-1 rounded-full text-[11px] bg-zinc-100 text-zinc-700 tracking-[0.05em]">
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="text-center pt-12 md:pt-14">
          <a
            href="https://github.com/PromSereyreaksa"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-white text-zinc-700 hover:text-zinc-950 transition-colors text-sm tracking-[0.12em]"
          >
            <Github className="w-4 h-4" />
            <span>VIEW MORE ON GITHUB</span>
          </a>
        </div>
      </div>
    </section>
  );
});

ProjectsSection.displayName = 'ProjectsSection';

export default ProjectsSection;




