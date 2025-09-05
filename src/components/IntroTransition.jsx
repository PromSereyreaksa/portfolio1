import { useEffect, useRef, useState } from 'react';

export default function IntroTransition() {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  // Calculate scroll-based animations
  const sectionTop = sectionRef.current?.offsetTop || 0;
  const relativeScroll = scrollY - sectionTop + window.innerHeight;
  const progress = Math.max(0, Math.min(1, relativeScroll / 400));

  return (
    <div 
      ref={sectionRef}
      className="relative h-80 flex items-center justify-center bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden px-4"
    >
      {/* Animated divider line */}
      <div 
        className="absolute top-0 left-1/2 transform -translate-x-1/2 h-px bg-gradient-to-r from-transparent via-black to-transparent transition-all duration-1000"
        style={{ 
          width: `${Math.min(100, progress * 300)}%`,
          opacity: isVisible ? 1 : 0
        }}
      />

      {/* Central animated element */}
      <div 
        className="text-center"
        style={{
          transform: `translateY(${isVisible ? 0 : 50}px)`,
          opacity: isVisible ? 1 : 0,
          transition: 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        {/* Rotating geometric accent */}
        <div 
          className="w-16 h-16 border border-black/20 mx-auto mb-8 transition-transform duration-2000"
          style={{ 
            transform: `rotate(${isVisible ? 45 : 0}deg) scale(${0.8 + progress * 0.4})`,
          }}
        />

        {/* Main transition text */}
        <h3 
          className="text-2xl md:text-3xl font-thin tracking-[0.3em] text-black mb-4 max-w-full"
          style={{
            transform: `translateY(${isVisible ? 0 : 30}px)`,
            opacity: isVisible ? 1 : 0,
            transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1) 0.3s'
          }}
        >
          EXPLORE
        </h3>

        {/* Expanding underline */}
        <div 
          className="h-px bg-black mx-auto mb-6 transition-all duration-1000 delay-500"
          style={{ 
            width: isVisible ? '64px' : '0px',
            opacity: isVisible ? 0.6 : 0
          }}
        />

        {/* Subtitle */}
        <p 
          className="text-sm font-light tracking-widest text-gray-600 max-w-full px-4"
          style={{
            transform: `translateY(${isVisible ? 0 : 20}px)`,
            opacity: isVisible ? 1 : 0,
            transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.6s'
          }}
        >
          THE JOURNEY CONTINUES
        </p>
      </div>

      {/* Floating accent dots - contained within boundaries */}
      {isVisible && [...Array(4)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-black/30 rounded-full"
          style={{
            left: `${30 + i * 10}%`,
            top: `${35 + (i % 2) * 30}%`,
            transform: `translateY(${Math.sin(scrollY * 0.01 + i) * 8}px)`,
            opacity: 0.4 + (i * 0.1),
            animation: `pulse ${2 + i * 0.5}s infinite`
          }}
        />
      ))}

      {/* Bottom divider */}
      <div 
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-px bg-gradient-to-r from-transparent via-black to-transparent transition-all duration-1000 delay-300"
        style={{ 
          width: `${Math.min(80, progress * 200)}%`,
          opacity: isVisible ? 0.3 : 0
        }}
      />
    </div>
  );
}
