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
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false); // Close mobile menu after clicking
    }
  };

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <button 
              onClick={() => scrollToSection('landing')}
              className="text-xl font-thin tracking-wider text-black hover:text-gray-600 transition-colors cursor-pointer"
            >
              SEREY REAKSA
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('landing')}
              className="text-sm tracking-wide text-gray-700 hover:text-black transition-colors"
            >
              HOME
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="text-sm tracking-wide text-gray-700 hover:text-black transition-colors"
            >
              ABOUT
            </button>
            <button 
              onClick={() => scrollToSection('projects')}
              className="text-sm tracking-wide text-gray-700 hover:text-black transition-colors"
            >
              PROJECTS
            </button>
            <button 
              onClick={() => scrollToSection('visual-work')}
              className="text-sm tracking-wide text-gray-700 hover:text-black transition-colors"
            >
              VISUAL WORK
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-sm tracking-wide text-gray-700 hover:text-black transition-colors"
            >
              CONTACT
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-black focus:outline-none transition-colors"
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
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}>
          <div className="py-4 space-y-2 border-t border-gray-200 bg-white/95 backdrop-blur-sm">
            <button
              onClick={() => scrollToSection('landing')}
              className="block w-full text-left px-4 py-2 text-sm tracking-wide text-gray-700 hover:text-black hover:bg-gray-50 transition-colors"
            >
              HOME
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="block w-full text-left px-4 py-2 text-sm tracking-wide text-gray-700 hover:text-black hover:bg-gray-50 transition-colors"
            >
              ABOUT
            </button>
            <button
              onClick={() => scrollToSection('projects')}
              className="block w-full text-left px-4 py-2 text-sm tracking-wide text-gray-700 hover:text-black hover:bg-gray-50 transition-colors"
            >
              PROJECTS
            </button>
            <button
              onClick={() => scrollToSection('visual-work')}
              className="block w-full text-left px-4 py-2 text-sm tracking-wide text-gray-700 hover:text-black hover:bg-gray-50 transition-colors"
            >
              VISUAL WORK
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="block w-full text-left px-4 py-2 text-sm tracking-wide text-gray-700 hover:text-black hover:bg-gray-50 transition-colors"
            >
              CONTACT
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
