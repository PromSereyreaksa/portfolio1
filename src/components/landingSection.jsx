import { memo, useEffect, useState } from 'react';
import OptimizedProfileImage from './OptimizedProfileImage';

const TYPING_SPEED = 85;
const DELETING_SPEED = 48;
const HOLD_DELAY = 1400;

const LandingSection = memo(({ hero }) => {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayedPhrase, setDisplayedPhrase] = useState(hero.rotatingPhrases[0]);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullPhrase = hero.rotatingPhrases[phraseIndex];
    let timeoutId;

    if (!isDeleting && displayedPhrase === fullPhrase) {
      timeoutId = window.setTimeout(() => setIsDeleting(true), HOLD_DELAY);
      return () => window.clearTimeout(timeoutId);
    }

    if (isDeleting && displayedPhrase.length === 0) {
      setIsDeleting(false);
      setPhraseIndex((index) => (index + 1) % hero.rotatingPhrases.length);
      return undefined;
    }

    timeoutId = window.setTimeout(() => {
      setDisplayedPhrase((currentText) =>
        isDeleting
          ? currentText.slice(0, -1)
          : fullPhrase.slice(0, currentText.length + 1)
      );
    }, isDeleting ? DELETING_SPEED : TYPING_SPEED);

    return () => window.clearTimeout(timeoutId);
  }, [displayedPhrase, isDeleting, phraseIndex]);

  return (
    <section className="hero-surface min-h-[100svh] w-full pt-28 md:pt-32 pb-14 px-6 sm:px-10 md:px-12 lg:px-20 overflow-hidden">
      <noscript>
        <div className="max-w-7xl mx-auto text-left">
          <h1 className="text-5xl font-medium tracking-wide text-black mb-4">Serey Reaksa Prom</h1>
          <p className="text-xl text-zinc-700">{hero.subheadline}</p>
        </div>
      </noscript>

      <div className="relative max-w-7xl mx-auto flex flex-col md:grid md:grid-cols-[minmax(0,1fr)_minmax(340px,400px)] lg:grid-cols-[minmax(0,1fr)_minmax(400px,470px)] xl:grid-cols-[minmax(0,1fr)_minmax(440px,520px)] gap-10 lg:gap-16 items-center">
        <div className="space-y-7 animate-fadeInUp-1 w-full text-center md:text-left">
          <div className="space-y-4">
            <h1
              className="leading-[0.96] font-semibold tracking-[0.01em] text-zinc-950"
              style={{ fontSize: 'clamp(1.8rem, 4.5vw, 5rem)' }}
            >
              {hero.headline}{' '}
              <span className="hero-typed-phrase italic text-zinc-500/80" aria-live="polite">
                {displayedPhrase}
              </span>
            </h1>
            <p
              className="leading-relaxed text-zinc-700 mx-auto md:mx-0 flex flex-wrap items-center justify-center md:justify-start gap-x-2 gap-y-1"
              style={{ fontSize: 'clamp(0.9rem, 1.4vw, 1.125rem)', maxWidth: '38rem' }}
            >
              {hero.companyIcon && hero.companyName && hero.subheadlinePrefix ? (
                <>
                  <span>{hero.subheadlinePrefix}</span>
                  <span className="inline-flex items-center gap-2">
                    <span>{hero.companyName}</span>
                    <img
                      src={hero.companyIcon}
                      alt={`${hero.companyName} icon`}
                      className="w-5 h-5 rounded-[4px] object-cover"
                      loading="eager"
                      decoding="async"
                    />
                  </span>
                </>
              ) : (
                hero.subheadline
              )}
            </p>
          </div>
        </div>

        <div className="animate-fadeInLeft w-full flex justify-center md:justify-end self-center mt-6 md:mt-0">
          <div
            className="relative shrink-0 w-full"
            style={{ maxWidth: 'clamp(300px, 36vw, 520px)' }}
          >
            <div
              className="absolute -inset-10 bg-gradient-to-br from-blue-100/40 to-zinc-300/20 -z-10 blur-2xl"
              aria-hidden="true"
            />
            <div className="relative bg-white rounded-2xl overflow-hidden">
              <div className="aspect-square w-full">
                <OptimizedProfileImage />
              </div>
              <div className="px-4 md:px-6 py-4 flex items-center text-[11px] tracking-[0.14em] text-zinc-600">
                <span>{hero.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

LandingSection.displayName = 'LandingSection';

export default LandingSection;
