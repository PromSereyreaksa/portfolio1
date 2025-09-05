import { memo, useMemo } from 'react';
import LazyImage from './LazyImage';
import ScrollAnimationWrapper from './ScrollAnimationWrapper';

const BrutalistArtworkSection = memo(() => {
  // All artwork pieces (webp versions for better performance)
  const artworks = useMemo(() => [
    { id: 1, src: "/2.webp", title: "CTA Design", category: "CONCEPT" },
    { id: 2, src: "/3.webp", title: "Jett <3", category: "CONCEPT" },
    { id: 3, src: "/4.webp", title: "Lucy and David", category: "CONCEPT" },
    { id: 4, src: "/5.webp", title: "ARCANE", category: "CONCEPT" },
    { id: 5, src: "/6.webp", title: "EMPIRE OF THE UNDYING", category: "CONCEPT" },
    { id: 6, src: "/7.webp", title: "Digital Design Competition", category: "CONCEPT" }
  ], []);

  return (
    <section className="py-24 px-8 md:px-16 lg:px-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Title */}
        <ScrollAnimationWrapper animation="fadeInUp" delay={200}>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-thin tracking-[0.2em] md:tracking-[0.3em] text-black mb-6 max-w-full">
              VISUAL WORK
            </h2>
            <div className="w-24 h-px bg-black mx-auto mb-6"></div>
            <p className="text-sm md:text-base font-light text-gray-600 max-w-2xl mx-auto leading-relaxed">
              A collection of visual designs, illustrations, and creative expressions 
              spanning various mediums and styles.
            </p>
          </div>
        </ScrollAnimationWrapper>

        {/* Artwork Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {artworks.map((artwork, index) => (
            <ScrollAnimationWrapper 
              key={artwork.id} 
              animation="fadeInUp" 
              delay={400 + index * 100}
            >
              <div className="group relative overflow-hidden bg-gray-50 rounded-lg hover:shadow-lg transition-shadow duration-500">
                
                {/* Artwork Image */}
                <div className="relative overflow-hidden aspect-[4/5]">
                  <LazyImage 
                    src={artwork.src} 
                    alt={`${artwork.title} - ${artwork.category} Art by Prom Sereyreaksa`}
                    className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500"></div>
                </div>

                {/* Artwork Info */}
                <div className="p-3 sm:p-4 md:p-6">
                  <div className="flex items-center justify-between mb-1 sm:mb-2">
                    <h3 className="text-sm sm:text-base md:text-lg font-light tracking-wide text-black group-hover:text-gray-700 transition-colors">
                      {artwork.title}
                    </h3>
                    <span className="text-xs font-mono tracking-wider text-gray-500">
                      {artwork.id.toString().padStart(2, '0')}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 tracking-wide">
                    {artwork.category}
                  </p>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500 pointer-events-none"></div>
              </div>
            </ScrollAnimationWrapper>
          ))}
        </div>

        {/* See All Button */}
        <ScrollAnimationWrapper animation="fadeInUp" delay={800}>
          <div className="text-center mt-12">
            <a 
              href="/gallery.html"
              className="inline-flex items-center space-x-2 px-8 py-3 border border-gray-300 text-gray-700 hover:border-black hover:text-black transition-colors duration-300"
            >
              <span className="text-sm tracking-wide">SEE ALL WORK</span>
            </a>
          </div>
        </ScrollAnimationWrapper>
      </div>
    </section>
  );
});

BrutalistArtworkSection.displayName = 'BrutalistArtworkSection';

export default BrutalistArtworkSection;
