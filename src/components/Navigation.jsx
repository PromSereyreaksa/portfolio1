import { Menu, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SECTION_LINKS = [
  { id: 'landing', label: 'HOME' },
  { id: 'about', label: 'ABOUT' },
  { id: 'projects', label: 'PROJECTS' },
  { id: 'visual-work', label: 'VISUAL WORK' },
  { id: 'contact', label: 'CONTACT' }
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState('landing');
  const navigate = useNavigate();
  const location = useLocation();

  const isPortfolioPage = location.pathname === '/';
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
    setIsOpen(false);

    if (!isPortfolioPage) {
      setActiveItem('');
      return;
    }

    const currentHash = window.location.hash?.replace('#', '');
    setActiveItem(currentHash || 'landing');
  }, [isPortfolioPage, location.pathname]);

  useEffect(() => {
    if (!isPortfolioPage) return undefined;

    const sections = SECTION_LINKS.map((section) => document.getElementById(section.id)).filter(Boolean);
    if (sections.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleEntries.length > 0) {
          const sectionId = visibleEntries[0].target.id;
          setActiveItem(sectionId);
        }
      },
      {
        rootMargin: '-36% 0px -48% 0px',
        threshold: [0.1, 0.25, 0.5, 0.75]
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [isPortfolioPage]);

  const scrollToSection = (sectionId) => {
    const scrollToTarget = () => {
      const element = document.getElementById(sectionId);
      if (!element) return false;

      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.pushState(null, '', `#${sectionId}`);
      setActiveItem(sectionId);
      return true;
    };

    if (isPortfolioPage) {
      scrollToTarget();
      setIsOpen(false);
      return;
    }

    navigate('/');
    setIsOpen(false);

    let attempts = 0;
    const maxAttempts = 24;

    const tryScroll = () => {
      const didScroll = scrollToTarget();
      attempts += 1;
      if (!didScroll && attempts < maxAttempts) {
        window.requestAnimationFrame(tryScroll);
      }
    };

    window.requestAnimationFrame(tryScroll);
  };

  const itemClass = (isActive) =>
    `group relative text-xs md:text-sm tracking-[0.18em] transition-colors px-1 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
      isActive ? 'text-black' : 'text-zinc-600 hover:text-black'
    }`;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/96'
          : 'bg-white/78 backdrop-blur-md'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex items-center justify-between h-20">
          <button
            type="button"
            onClick={() => scrollToSection('landing')}
            className="text-sm md:text-base font-medium tracking-[0.24em] text-black hover:text-zinc-700 transition-colors cursor-pointer"
            aria-label="Go to homepage section"
          >
            SEREY REAKSA
          </button>

          <div className="hidden md:flex items-center gap-5 lg:gap-7">
            {navLinks.map((link) => {
              const isActive = activeItem === link.id;

              return (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => scrollToSection(link.id)}
                  className={itemClass(isActive)}
                >
                  {link.label}
                  <span
                    className={`absolute left-1 -bottom-[3px] h-[2px] bg-black transition-all duration-300 ${
                      isActive ? 'w-[calc(100%-0.5rem)]' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="md:hidden text-zinc-700 hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md p-2 transition-colors"
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        <div
          id="mobile-menu"
          className={`md:hidden transition-all duration-300 ease-out overflow-hidden ${
            isOpen ? 'max-h-[28rem] opacity-100 pb-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="space-y-1 pt-3 bg-white/95">
            {navLinks.map((link) => {
              const isActive = activeItem === link.id;
              const mobileBase = `block w-full text-left px-4 py-3 text-xs tracking-[0.2em] transition-colors rounded-md cursor-pointer ${
                isActive ? 'bg-zinc-100 text-black' : 'text-zinc-600 hover:bg-zinc-100 hover:text-black'
              }`;

              return (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => scrollToSection(link.id)}
                  className={mobileBase}
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

