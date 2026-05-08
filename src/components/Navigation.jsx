import { Menu, X } from 'lucide-react';
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

const SECTION_LINKS = [
  { id: 'landing', label: 'HOME' },
  { id: 'about', label: 'ABOUT' },
  { id: 'experience', label: 'EXPERIENCE' },
  { id: 'projects', label: 'PROJECTS' },
  { id: 'visual-work', label: 'VISUAL WORK' },
  { id: 'contact', label: 'CONTACT' },
];

const SECTION_URLS = {
  landing: '/',
  about: '/about',
  experience: '/about#experience',
  projects: '/projects',
  'visual-work': '/visual-work',
  contact: '/contact',
};

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState('landing');
  const [pillStyle, setPillStyle] = useState({ opacity: 0, width: 0, x: 0 });
  const itemRefs = useRef({});
  const navLinks = useMemo(() => SECTION_LINKS, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const currentHash = window.location.hash?.replace('#', '');
    const currentPath = window.location.pathname;

    if (currentHash) {
      setActiveItem(currentHash);
      return;
    }

    if (currentPath === '/about') {
      setActiveItem('about');
      return;
    }

    if (currentPath === '/projects') {
      setActiveItem('projects');
      return;
    }

    if (currentPath === '/visual-work') {
      setActiveItem('visual-work');
      return;
    }

    if (currentPath === '/contact') {
      setActiveItem('contact');
      return;
    }

    setActiveItem('landing');
  }, []);

  useEffect(() => {
    const updateActiveSection = () => {
      const sections = SECTION_LINKS.map((section) => document.getElementById(section.id)).filter(Boolean);
      if (sections.length === 0) return;

      const activationOffset = 180;
      const nextSectionOffset = 220;
      const scrollProbe = window.scrollY;
      let currentSection = sections[0].id;

      for (let index = 0; index < sections.length; index += 1) {
        const current = sections[index];
        const next = sections[index + 1];
        const currentTop = window.scrollY + current.getBoundingClientRect().top;
        const nextTop = next ? window.scrollY + next.getBoundingClientRect().top : Number.POSITIVE_INFINITY;
        const boundary = next ? nextTop - nextSectionOffset : Number.POSITIVE_INFINITY;

        if (scrollProbe >= currentTop - activationOffset && scrollProbe < boundary) {
          currentSection = current.id;
          break;
        }

        if (scrollProbe >= currentTop - activationOffset) {
          currentSection = current.id;
        }
      }

      setActiveItem(currentSection);
    };

    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection);
    window.addEventListener('hashchange', updateActiveSection);

    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
      window.removeEventListener('hashchange', updateActiveSection);
    };
  }, []);

  useLayoutEffect(() => {
    const activeElement = itemRefs.current[activeItem];
    if (!activeElement) {
      setPillStyle((current) => ({ ...current, opacity: 0 }));
      return;
    }

    const updatePill = () => {
      const { offsetLeft, offsetWidth } = activeElement;
      setPillStyle({
        opacity: 1,
        width: offsetWidth,
        x: offsetLeft,
      });
    };

    updatePill();
    window.addEventListener('resize', updatePill);
    return () => window.removeEventListener('resize', updatePill);
  }, [activeItem, navLinks]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (!element) return;

    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.history.replaceState(null, '', SECTION_URLS[sectionId] || `/#${sectionId}`);
    setActiveItem(sectionId);
    setIsOpen(false);
  };

  const desktopItemClass = (isActive) =>
    `relative z-10 inline-flex items-center rounded-full text-[11px] lg:text-xs tracking-[0.13em] transition-colors duration-300 px-2.5 lg:px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
      isActive ? 'text-white' : 'text-zinc-600 hover:text-black'
    }`;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'pt-3' : 'pt-5'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-12 lg:px-20">
        <div
          className={`w-full flex items-center justify-between h-14 pl-5 pr-2 md:pl-6 md:pr-3 rounded-full border transition-all duration-300 ${
            scrolled
              ? 'bg-white/96 border-zinc-200/80 shadow-[0_18px_40px_-28px_rgba(0,0,0,0.28)] backdrop-blur-xl'
              : 'bg-white/82 border-white/70 backdrop-blur-xl shadow-[0_18px_40px_-32px_rgba(0,0,0,0.2)]'
          }`}
        >
          <button
            type="button"
            onClick={() => scrollToSection('landing')}
            className="text-sm font-medium tracking-[0.22em] text-black hover:text-zinc-700 transition-colors cursor-pointer shrink-0"
            aria-label="Go to homepage section"
          >
            SEREY REAKSA
          </button>

          <div className="hidden lg:flex items-center ml-auto">
            <div className="relative flex items-center gap-0.5 lg:gap-1 rounded-full p-1">
              <span
                aria-hidden="true"
                className="absolute inset-y-1 rounded-full bg-zinc-950 shadow-[0_10px_24px_-18px_rgba(0,0,0,0.9)] transition-[transform,width,opacity] duration-300 ease-out"
                style={{
                  opacity: pillStyle.opacity,
                  width: `${pillStyle.width}px`,
                  transform: `translateX(${pillStyle.x}px)`,
                }}
              />
              {navLinks.map((link) => {
                const isActive = activeItem === link.id;
                return (
                  <button
                    key={link.id}
                    ref={(node) => {
                      itemRefs.current[link.id] = node;
                    }}
                    type="button"
                    onClick={() => scrollToSection(link.id)}
                    className={desktopItemClass(isActive)}
                  >
                    {link.label}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="lg:hidden ml-auto text-zinc-700 hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md p-2 transition-colors"
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        <div
          id="mobile-menu"
          className={`lg:hidden transition-all duration-300 ease-out overflow-hidden ${
            isOpen ? 'max-h-[32rem] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div
            className={`mt-2 rounded-2xl border px-2 py-2 ${
              scrolled
                ? 'bg-white/96 border-zinc-200/80 shadow-[0_18px_40px_-28px_rgba(0,0,0,0.28)] backdrop-blur-xl'
                : 'bg-white/90 border-white/70 backdrop-blur-xl shadow-[0_18px_40px_-32px_rgba(0,0,0,0.2)]'
            }`}
          >
            {navLinks.map((link) => {
              const isActive = activeItem === link.id;
              return (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => scrollToSection(link.id)}
                  className={`block w-full text-left px-4 py-3 text-xs tracking-[0.2em] transition-colors rounded-xl cursor-pointer ${
                    isActive
                      ? 'bg-zinc-950 text-white'
                      : 'text-zinc-600 hover:bg-zinc-100 hover:text-black'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
