import { useEffect, useState } from 'react';

export default function ReadingCursor() {
  const [scrollY, setScrollY] = useState(0);
  const [activeElement, setActiveElement] = useState(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Find the currently visible text element to point to
      const textElements = document.querySelectorAll('h1, h2, p, .reading-target');
      let closestElement = null;
      let closestDistance = Infinity;
      
      const viewportCenter = window.innerHeight / 2;
      
      textElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const elementCenter = rect.top + rect.height / 2;
        const distance = Math.abs(elementCenter - viewportCenter);
        
        if (distance < closestDistance && rect.top < window.innerHeight && rect.bottom > 0) {
          closestDistance = distance;
          closestElement = element;
        }
      });
      
      if (closestElement) {
        setActiveElement(closestElement);
        const rect = closestElement.getBoundingClientRect();
        
        // Position cursor to point to the left side of text (like a reading guide)
        setCursorPosition({
          x: Math.max(10, (rect.left - 50) / window.innerWidth * 100),
          y: (rect.top + rect.height / 2) / window.innerHeight * 100
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth cursor movement with slight delay for elegance
  const smoothX = cursorPosition.x + Math.sin(scrollY * 0.01) * 2;
  const smoothY = cursorPosition.y + Math.cos(scrollY * 0.008) * 1;

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      {/* Main reading cursor - diamond shape */}
      <div
        className="absolute transition-all duration-500 ease-out"
        style={{
          left: `${smoothX}%`,
          top: `${smoothY}%`,
          transform: 'translate(-50%, -50%)'
        }}
      >
        {/* Thin diamond cursor */}
        <div className="relative">
          <div 
            className="w-4 h-4 border border-black/30 transform rotate-45 transition-all duration-300"
            style={{
              borderColor: activeElement ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.2)',
              borderWidth: '1px'
            }}
          />
        </div>

        {/* Reading line - extends from cursor to text */}
        {activeElement && (
          <div
            className="absolute top-1/2 left-full h-px bg-gradient-to-r from-black/30 to-transparent transition-all duration-500"
            style={{
              width: '60px',
              transform: 'translateY(-50%)',
              opacity: 0.6
            }}
          />
        )}
      </div>

      {/* Subtle trail effect */}
      <div
        className="absolute w-0.5 h-0.5 bg-black/15 rounded-full transition-all duration-1000 ease-out"
        style={{
          left: `${smoothX - 1}%`,
          top: `${smoothY}%`,
          transform: 'translate(-50%, -50%)'
        }}
      />

      {/* Reading progress indicator */}
      <div className="absolute top-4 right-4">
        <div className="flex items-center space-x-2 text-xs font-light text-black/30">
          <div 
            className="w-3 h-3 border border-black/20 transform rotate-45"
            style={{
              backgroundColor: activeElement ? 'rgba(0, 0, 0, 0.05)' : 'transparent',
              borderWidth: '1px'
            }}
          />
          <span>Reading Guide</span>
        </div>
      </div>

      {/* Section indicator - shows what section you're currently reading */}
      {activeElement && (
        <div 
          className="absolute top-8 left-4 transition-all duration-500"
          style={{
            opacity: 0.7
          }}
        >
          <div className="flex items-center space-x-3">
            <div className="w-1 h-8 bg-black/20" />
            <div className="text-xs font-light text-black/40 tracking-wider">
              {activeElement.tagName === 'H1' && 'NAME'}
              {activeElement.tagName === 'H2' && 'TITLE'}
              {activeElement.tagName === 'P' && activeElement.textContent.includes('Hello') && 'GREETING'}
              {activeElement.tagName === 'P' && activeElement.textContent.includes('Creative') && 'PROFESSION'}
              {activeElement.tagName === 'P' && activeElement.textContent.includes('Cambodia') && 'EDUCATION'}
              {activeElement.tagName === 'P' && !activeElement.textContent.includes('Hello') && 
               !activeElement.textContent.includes('Creative') && 
               !activeElement.textContent.includes('Cambodia') && 'CONTENT'}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
