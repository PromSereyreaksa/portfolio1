import ScrollAnimationWrapper from './ScrollAnimationWrapper';

export default function LandingSection() {
  return (
    <section className="relative flex items-center justify-center min-h-screen w-full bg-white px-8 md:px-16 lg:px-24 overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        
        {/* Avatar */}
        <ScrollAnimationWrapper animation="fadeInLeft" delay={200}>
          <div className="flex justify-center md:justify-end">
            <img
              src="/me.jpg"
              alt="Prom Sereyreaksa"
              className="w-80 h-80 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem] object-cover rounded-full shadow-2xl"
            />
          </div>
        </ScrollAnimationWrapper>

        {/* Minimal Text Content */}
        <div className="text-center md:text-left space-y-8">
          <ScrollAnimationWrapper animation="fadeInUp" delay={400}>
            <div className="space-y-2">
              <p className="text-lg md:text-xl font-light text-gray-600">Hello • សួស្តី - My name is</p>
            </div>
          </ScrollAnimationWrapper>
          
          <ScrollAnimationWrapper animation="fadeInUp" delay={600}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-thin tracking-wide md:tracking-wider text-black max-w-full">
              SEREY REAKSA
            </h1>
          </ScrollAnimationWrapper>
          
          <ScrollAnimationWrapper animation="fadeInUp" delay={700}>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-light tracking-wide md:tracking-widest text-gray-600 -mt-2 max-w-full">
              PROM
            </h2>
          </ScrollAnimationWrapper>

          <ScrollAnimationWrapper animation="fadeInUp" delay={800}>
            <div className="w-16 h-px bg-black mx-auto md:mx-0 my-8"></div>
          </ScrollAnimationWrapper>

          <ScrollAnimationWrapper animation="fadeInUp" delay={900}>
            <div className="space-y-2">
              <p className="text-lg md:text-xl font-light tracking-wide text-gray-800">
                Creative Technologist
              </p>
              <p className="text-sm md:text-base font-light text-gray-600">
                Software Engineer & Graphic Designer
              </p>
            </div>
          </ScrollAnimationWrapper>

          <ScrollAnimationWrapper animation="fadeInUp" delay={1000}>
            <div className="space-y-1">
              <p className="text-sm font-light text-gray-500">Cambodia Academy of Digital Technology</p>
              <div className="flex items-center justify-center md:justify-start space-x-2">
                <img src="/Luminyx.jpg" alt="Luminyx" className="w-5 h-5 rounded-full object-cover" />
                <p className="text-sm font-light text-gray-500">Video Editor at Luminyx</p>
              </div>
            </div>
          </ScrollAnimationWrapper>
        </div>
      </div>
    </section>
  );
}
