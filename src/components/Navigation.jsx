import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Update URL hash for SEO
      window.history.pushState(null, null, `#${sectionId}`);
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false); // Close mobile menu after clicking
    }
  };

  return (
    <nav 
      className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 transition-all duration-300"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <button 
              onClick={() => scrollToSection('landing')}
              className="text-xl font-thin tracking-wider text-black hover:text-gray-600 transition-colors cursor-pointer"
            >
              SEREY REAKSA
            </button>
          </div>

          {/* Desktop navigation links - SEO-friendly with proper href attributes and hover underlines */}
          <div className="hidden md:flex items-center space-x-8">
            <a 
              href="/"
              onClick={(e) => { e.preventDefault(); scrollToSection('landing'); }}
              className="relative text-sm tracking-wide text-gray-700 hover:text-black focus:text-black focus:outline-none focus:ring-2 focus:ring-gray-300 rounded px-2 py-1 transition-colors cursor-pointer group"
            >
              HOME
              <span className="absolute left-2 bottom-1 w-0 h-0.5 bg-black transition-all duration-300 ease-out group-hover:w-8 group-focus:w-8"></span>
            </a>
            <a 
              href="/about"
              onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}
              className="relative text-sm tracking-wide text-gray-700 hover:text-black transition-colors cursor-pointer group"
            >
              ABOUT
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-black transition-all duration-300 ease-out group-hover:w-full"></span>
            </a>
            <a 
              href="/projects"
              onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }}
              className="relative text-sm tracking-wide text-gray-700 hover:text-black transition-colors cursor-pointer group"
            >
              PROJECTS
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-black transition-all duration-300 ease-out group-hover:w-full"></span>
            </a>
            <a 
              href="/visual-work"
              onClick={(e) => { e.preventDefault(); scrollToSection('visual-work'); }}
              className="relative text-sm tracking-wide text-gray-700 hover:text-black transition-colors cursor-pointer group"
            >
              VISUAL WORK
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-black transition-all duration-300 ease-out group-hover:w-full"></span>
            </a>
            <a 
              href="/contact"
              onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}
              className="relative text-sm tracking-wide text-gray-700 hover:text-black transition-colors cursor-pointer group"
            >
              CONTACT
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-black transition-all duration-300 ease-out group-hover:w-full"></span>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-black focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-md p-2 transition-colors"
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div 
          id="mobile-menu"
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
          } overflow-hidden`}
        >
          <div className="py-4 space-y-2 border-t border-gray-200 bg-white/95 backdrop-blur-sm">
            <a
              href="/"
              onClick={(e) => { e.preventDefault(); scrollToSection('landing'); }}
              className="relative block w-full text-left px-4 py-3 text-sm tracking-wide text-gray-700 hover:text-black hover:bg-gray-50 transition-all duration-200 cursor-pointer group"
            >
              HOME
              <span className="absolute left-4 bottom-1 w-0 h-0.5 bg-black transition-all duration-300 ease-out group-hover:w-12"></span>
            </a>
            <a
              href="/about"
              onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}
              className="relative block w-full text-left px-4 py-3 text-sm tracking-wide text-gray-700 hover:text-black hover:bg-gray-50 transition-all duration-200 cursor-pointer group"
            >
              ABOUT
              <span className="absolute left-4 bottom-1 w-0 h-0.5 bg-black transition-all duration-300 ease-out group-hover:w-14"></span>
            </a>
            <a
              href="/projects"
              onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }}
              className="relative block w-full text-left px-4 py-3 text-sm tracking-wide text-gray-700 hover:text-black hover:bg-gray-50 transition-all duration-200 cursor-pointer group"
            >
              PROJECTS
              <span className="absolute left-4 bottom-1 w-0 h-0.5 bg-black transition-all duration-300 ease-out group-hover:w-20"></span>
            </a>
            <a
              href="/visual-work"
              onClick={(e) => { e.preventDefault(); scrollToSection('visual-work'); }}
              className="relative block w-full text-left px-4 py-3 text-sm tracking-wide text-gray-700 hover:text-black hover:bg-gray-50 transition-all duration-200 cursor-pointer group"
            >
              VISUAL WORK
              <span className="absolute left-4 bottom-1 w-0 h-0.5 bg-black transition-all duration-300 ease-out group-hover:w-24"></span>
            </a>
            <a
              href="/contact"
              onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}
              className="relative block w-full text-left px-4 py-3 text-sm tracking-wide text-gray-700 hover:text-black hover:bg-gray-50 transition-all duration-200 cursor-pointer group"
            >
              CONTACT
              <span className="absolute left-4 bottom-1 w-0 h-0.5 bg-black transition-all duration-300 ease-out group-hover:w-16"></span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
