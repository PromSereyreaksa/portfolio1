import { memo, useState } from 'react';
import LazyImage from './LazyImage';
import ScrollAnimationWrapper from './ScrollAnimationWrapper';

const BrutalistArtworkSection = memo(({ section, artwork }) => {
  const [activeArtwork, setActiveArtwork] = useState(null);

  const handleArtworkClick = (artworkId) => {
    setActiveArtwork(activeArtwork === artworkId ? null : artworkId);
  };

  return (
    <section className="hero-surface section-shell px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <ScrollAnimationWrapper animation="fadeInUp" delay={200}>
          <div className="text-left mb-16">
            <h2 className="display-hero text-zinc-950 mb-6 max-w-full">{section.title}</h2>
            <p className="text-sm md:text-base text-zinc-700 max-w-2xl leading-relaxed">
              {section.description}
            </p>
          </div>
        </ScrollAnimationWrapper>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {artwork.map((item, index) => (
            <ScrollAnimationWrapper
              key={item.id}
              animation="fadeInUp"
              delay={400 + index * 100}
            >
              <div
                className="group relative overflow-hidden rounded-xl bg-zinc-50 active:scale-[0.98] transition-all duration-300 cursor-pointer"
                onClick={() => handleArtworkClick(item.id)}
              >
                <div className="relative overflow-hidden aspect-[4/5]">
                  <LazyImage
                    src={item.src}
                    alt={`${item.title} - ${item.category} Art by Prom Sereyreaksa`}
                    className={`w-full h-full object-cover transition-all duration-700 ${
                      activeArtwork === item.id
                        ? 'md:filter md:grayscale md:group-hover:grayscale-0 grayscale-0 scale-105'
                        : 'filter grayscale group-hover:grayscale-0 group-hover:scale-105'
                    }`}
                  />
                  <div
                    className={`absolute inset-0 transition-colors duration-300 ${
                      activeArtwork === item.id
                        ? 'md:bg-black/0 md:group-hover:bg-black/[0.08] bg-black/[0.08]'
                        : 'bg-black/0 group-hover:bg-black/[0.08]'
                    }`}
                  />
                </div>

                <div className="p-3 sm:p-4 md:p-6">
                  <div className="flex items-center justify-between mb-1 sm:mb-2">
                    <h3
                      className={`text-[clamp(0.95rem,1.5vw,1.25rem)] font-medium tracking-[0.04em] transition-colors ${
                        activeArtwork === item.id
                          ? 'md:text-zinc-950 md:group-hover:text-zinc-800 text-zinc-800'
                          : 'text-zinc-950 group-hover:text-zinc-800'
                      }`}
                    >
                      {item.title}
                    </h3>
                    <span
                      className={`text-xs font-mono tracking-wider transition-colors ${
                        activeArtwork === item.id
                          ? 'md:text-zinc-500 md:group-hover:text-zinc-700 text-zinc-700'
                          : 'text-zinc-500 group-hover:text-zinc-700'
                      }`}
                    >
                      {item.id.toString().padStart(2, '0')}
                    </span>
                  </div>
                  <p
                    className={`text-xs sm:text-sm tracking-wide transition-colors ${
                      activeArtwork === item.id
                        ? 'md:text-zinc-600 md:group-hover:text-zinc-700 text-zinc-700'
                        : 'text-zinc-600 group-hover:text-zinc-700'
                    }`}
                  >
                    {item.category}
                  </p>
                </div>

                <div
                  className={`absolute inset-0 transition-colors duration-300 pointer-events-none ${
                    activeArtwork === item.id
                      ? 'md:bg-black/0 md:group-hover:bg-black/[0.04] bg-black/[0.04]'
                      : 'bg-black/0 group-hover:bg-black/[0.04]'
                  }`}
                />

                <div
                  className={`md:hidden absolute top-2 right-2 transition-opacity duration-200 ${
                    activeArtwork === item.id ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
              </div>
            </ScrollAnimationWrapper>
          ))}
        </div>

        <ScrollAnimationWrapper animation="fadeInUp" delay={800}>
          <div className="text-center mt-12">
            <a
              href="/gallery.html"
              className="inline-flex items-center space-x-2 px-8 py-3 rounded-full bg-zinc-100 text-zinc-700 hover:text-zinc-950 active:scale-95 transition-all duration-300"
            >
              <span className="text-sm tracking-[0.12em]">SEE ALL WORK</span>
            </a>
          </div>
        </ScrollAnimationWrapper>
      </div>
    </section>
  );
});

BrutalistArtworkSection.displayName = 'BrutalistArtworkSection';

export default BrutalistArtworkSection;
