import { memo } from 'react';
import OptimizedProfileImage from './OptimizedProfileImage';

const LandingSection = memo(() => {
  return (
    <section className="relative flex items-center justify-center min-h-screen w-full bg-white px-8 md:px-16 lg:px-24 pt-20 md:pt-0 mb-12 overflow-hidden">
      {/* Fallback content for crawlers - always visible */}
      <noscript>
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-6xl font-thin tracking-wider text-black mb-4">SEREY REAKSA PROM</h1>
          <p className="text-xl font-light text-gray-800 mb-2">Creative Technologist</p>
          <p className="text-base text-gray-600">Software Developer</p>
        </div>
      </noscript>
      
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        
        {/* Avatar - Optimized profile image for LCP */}
        <div className="flex justify-center md:justify-end animate-fadeInLeft">
          <OptimizedProfileImage />
        </div>

        {/* Minimal Text Content - All animated with CSS */}
        <div className="text-center md:text-left space-y-8">
          <div className="space-y-2 animate-fadeInUp-1">
            <p className="text-lg md:text-xl font-light text-gray-600">Hello, My name is</p>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-thin tracking-wide md:tracking-wider text-black max-w-full animate-fadeInUp-2">
            SEREY REAKSA
          </h1>
          
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-light tracking-wide md:tracking-widest text-gray-600 -mt-2 max-w-full animate-fadeInUp-3">
            PROM
          </h2>

          <div className="w-16 h-px bg-black mx-auto md:mx-0 my-8 animate-fadeInUp-4"></div>

          <div className="space-y-2 animate-fadeInUp-5">
            <p className="text-lg md:text-xl font-light tracking-wide text-gray-800">
              Creative Technologist
            </p>
            <p className="text-sm md:text-base font-light text-gray-600">
              Software Developer
            </p>
          </div>

          <div className="space-y-1 animate-fadeInUp-6">
            
            <p className="text-sm font-light text-gray-500">Cambodia Academy of Digital Technology</p>
            <div className="flex items-center justify-center md:justify-start space-x-2">
              <img 
                src="/AUREA.webp" 
                alt="AUREA" 
                className="w-5 h-5 rounded-full flex-shrink-0"
                width="20"
                height="20"
                loading="lazy"
                decoding="async"
              />
              <p className="text-sm font-light text-gray-500">Co Founder of AUREA</p>
              <img 
                src="/Luminyx-1.webp" 
                alt="Luminyx Logo" 
                className="w-5 h-5 rounded-full flex-shrink-0"
                width="20"
                height="20"
                loading="lazy"
                decoding="async"
              />
              <p className="text-sm font-light text-gray-500">Video Editor at LUMINYX</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

LandingSection.displayName = 'LandingSection';

export default LandingSection;
