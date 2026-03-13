import { memo } from 'react';
import { ArrowRight, Download, Mail } from 'lucide-react';
import OptimizedProfileImage from './OptimizedProfileImage';

function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (!element) return;

  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  window.history.pushState(null, '', `#${sectionId}`);
}

const LandingSection = memo(() => {
  return (
    <section className="hero-surface min-h-screen w-full pt-28 md:pt-32 pb-14 px-6 md:px-12 lg:px-20">
      <noscript>
        <div className="max-w-7xl mx-auto text-left">
          <h1 className="text-5xl font-medium tracking-wide text-black mb-4">Serey Reaksa Prom</h1>
          <p className="text-xl text-zinc-700">Full-stack engineer building thoughtful digital products with clear UX.</p>
        </div>
      </noscript>

      <div className="relative max-w-7xl mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
        <div className="space-y-7 animate-fadeInUp-1">
          <span className="inline-flex items-center bg-white/70 px-3 py-1 rounded-full text-[11px] tracking-[0.2em] text-zinc-700">
            CREATIVE TECHNOLOGIST FROM CAMBODIA
          </span>

          <div className="space-y-4">
            <p className="text-sm md:text-base tracking-[0.16em] text-zinc-600">SEREY REAKSA PROM</p>
            <h1 className="text-[clamp(2.25rem,5vw,4.6rem)] leading-[0.98] font-semibold tracking-[0.02em] text-zinc-950">
              I design and build digital products people enjoy using.
            </h1>
            <p className="max-w-2xl text-base md:text-lg leading-relaxed text-zinc-700">
              Full-stack developer focused on product execution, strong UX, and clean systems that make complex ideas feel simple.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2 animate-fadeInUp-3">
            <button
              type="button"
              onClick={() => scrollToSection('projects')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-950 text-white hover:bg-zinc-800 transition-colors duration-200 text-sm tracking-[0.14em] cursor-pointer"
            >
              <span>VIEW PROJECTS</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => scrollToSection('contact')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/90 text-zinc-800 hover:bg-white hover:text-zinc-950 transition-colors duration-200 text-sm tracking-[0.12em] cursor-pointer"
            >
              <Mail className="w-4 h-4" />
              <span>HIRE ME</span>
            </button>

          </div>

          <a
            href="/CV/Prom Sereyreaksa-CV.pdf"
            download="Prom-Sereyreaksa-CV.pdf"
            className="inline-flex items-center gap-2 text-xs tracking-[0.16em] text-zinc-600 hover:text-zinc-900 transition-colors animate-fadeInUp-4"
          >
            <Download className="w-3.5 h-3.5" />
            <span>DOWNLOAD CV</span>
          </a>
        </div>

        <div className="animate-fadeInLeft">
          <div className="relative mx-auto w-[320px] md:w-[384px] lg:w-[448px]">
            <div className="absolute -inset-10 bg-gradient-to-br from-blue-100/40 to-zinc-300/20 -z-10 blur-2xl" aria-hidden="true" />
            <div className="relative bg-white rounded-2xl overflow-hidden">
              <div className="aspect-square">
                <OptimizedProfileImage />
              </div>
              <div className="px-4 md:px-6 py-4 flex items-center justify-between text-[11px] tracking-[0.14em] text-zinc-600">
                <span>PHNOM PENH</span>
                <span>OPEN TO INTERNSHIPS & FREELANCE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

LandingSection.displayName = 'LandingSection';

export default LandingSection;


