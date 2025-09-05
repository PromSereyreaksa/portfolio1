import { memo } from 'react';
import ResponsiveImage from './ResponsiveImage';

const LandingSection = memo(() => {
  return (
    <section className="relative flex items-center justify-center min-h-screen w-full bg-white px-8 md:px-16 lg:px-24 overflow-hidden">
      {/* Fallback content for crawlers - always visible */}
      <noscript>
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-6xl font-thin tracking-wider text-black mb-4">SEREY REAKSA PROM</h1>
          <p className="text-xl font-light text-gray-800 mb-2">Creative Technologist</p>
          <p className="text-base text-gray-600">Software Engineer & Graphic Designer</p>
        </div>
      </noscript>
      
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        
        {/* Avatar - Optimized responsive image with proper sizing */}
        <div className="flex justify-center md:justify-end animate-fadeInLeft">
          <ResponsiveImage
            src="/profile-1.webp"
            alt="Prom Sereyreaksa - Creative Technologist and Software Engineer"
            className="w-80 h-80 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem] rounded-full shadow-2xl"
            sizes="(max-width: 768px) 320px, (max-width: 1024px) 384px, 448px"
            priority={true}
          />
        </div>

        {/* Minimal Text Content - All animated with CSS */}
        <div className="text-center md:text-left space-y-8">
          <div className="space-y-2 animate-fadeInUp-1">
            <p className="text-lg md:text-xl font-light text-gray-600">Hello • សួស្តី - My name is</p>
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
              Software Engineer & Graphic Designer
            </p>
          </div>

          <div className="space-y-1 animate-fadeInUp-6">
            <p className="text-sm font-light text-gray-500">Cambodia Academy of Digital Technology</p>
            <div className="flex items-center justify-center md:justify-start space-x-2">
              <ResponsiveImage 
                src="/Luminyx.webp" 
                alt="Luminyx Logo" 
                className="w-5 h-5 rounded-full flex-shrink-0"
                sizes="20px"
                priority={false}
              />
              <p className="text-sm font-light text-gray-500">Video Editor at Luminyx</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

LandingSection.displayName = 'LandingSection';

export default LandingSection;
