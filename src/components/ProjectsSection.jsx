import { ChevronLeft, ChevronRight, ExternalLink, Github } from 'lucide-react';
import { memo, useEffect, useMemo, useState } from 'react';
import LazyImage from './LazyImage';
import ScrollAnimationWrapper from './ScrollAnimationWrapper';

const ProjectsSection = memo(() => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle touch gestures
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentSlide < projects.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
    if (isRightSwipe && currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const nextSlide = () => {
    setCurrentSlide(currentSlide === projects.length - 1 ? 0 : currentSlide + 1);
  };

  const projects = useMemo(() => [
    {
      title: "Phsar Design",
      description: "A marketplace connecting talented digital artists, designers, and creative professionals. Bring your vision to life with world-class creative services.",
      image: "/Phsardesign.webp",
      link: "https://phsardesign.vercel.app/",
      status: "Currently Working",
      tags: ["Startup", "Marketplace", "Creative Services", "React", "Express"],
      featured: true
    },
    {
      title: "Ideagen",
      description: "The ultimate tool for graphic designers seeking inspiration. Generate random design challenges, color palettes, and creative prompts to enhance your design skills and overcome creative blocks.",
      image: "/Ideagen.webp", 
      link: "https://ideagen-eta.vercel.app/",
      status: "Live",
      tags: ["Design Tool", "Inspiration", "React", "Creative"]
    },
    {
      title: "Automata Visualizer",
      description: "An interactive tool for managing and visualizing finite state machines. Perfect for computer science students and professionals working with formal language theory.",
      image: "/Automata.webp",
      link: "https://automata-f6k9.onrender.com/", 
      status: "Live",
      tags: ["Education", "Visualization", "Computer Science", "React"]
    },
    {
      title: "Todone",
      description: "A productivity application designed to help users organize tasks, manage projects, and boost productivity with an intuitive and clean interface.",
      image: "/Todone.webp",
      link: "#",
      status: "In Development",
      tags: ["Productivity", "Task Management", "React", "UI/UX"]
    }
  ], []);

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? projects.length - 1 : currentSlide - 1);
  };

  return (
    <section className="py-24 px-8 md:px-16 lg:px-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Title */}
        <ScrollAnimationWrapper animation="fadeInUp" delay={200}>
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-thin tracking-[0.2em] md:tracking-[0.3em] text-black mb-6 max-w-full">
              PROJECTS
            </h2>
            <div className="w-24 h-px bg-black mx-auto mb-6"></div>
            <p className="text-sm md:text-base font-light text-gray-600 max-w-2xl mx-auto leading-relaxed">
              A collection of digital experiences, tools, and platforms that bridge 
              creativity with technology.
            </p>
          </div>
        </ScrollAnimationWrapper>

        {/* Featured Project - Hidden on Mobile */}
        <ScrollAnimationWrapper animation="fadeInUp" delay={400}>
          <div className="mb-20 hidden md:block">
            <div className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-500">
              <div className="grid lg:grid-cols-2 gap-0">
                
                {/* Project Image */}
                <div className="relative overflow-hidden">
                  <LazyImage 
                    src={projects[0].image} 
                    alt={`${projects[0].title} - Project Preview`}
                    className="w-full h-64 lg:h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-black text-white px-3 py-1 text-xs tracking-wider font-mono">
                      FEATURED
                    </span>
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="mb-4">
                    <h3 className="text-2xl md:text-3xl font-light tracking-wide text-black mb-2">
                      {projects[0].title}
                    </h3>
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm text-gray-600">{projects[0].status}</span>
                    </div>
                  </div>
                  
                  <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-6">
                    {projects[0].description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {projects[0].tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-gray-200 text-gray-700 text-xs tracking-wide">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <a 
                    href={projects[0].link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center group"
                  >
                    <span className="text-sm tracking-wider text-black group-hover:text-gray-600 transition-colors">
                      VISIT PROJECT
                    </span>
                    <ExternalLink className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </ScrollAnimationWrapper>

        {/* Other Projects - Mobile Carousel / Desktop Grid */}
        <div className="relative">
          {isMobile ? (
            // Mobile Carousel - All Projects
            <>
              <div className="overflow-hidden">
                <div 
                  className="flex transition-transform duration-300 ease-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  {projects.map((project, index) => (
                    <div key={project.title} className="w-full flex-shrink-0 px-2">
                      <div className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-500 group">
                        
                        {/* Project Image */}
                        <div className="relative overflow-hidden">
                          <LazyImage 
                            src={project.image} 
                            alt={`${project.title} - Project Preview`}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500"></div>
                          
                          {/* Featured Badge for first project */}
                          {index === 0 && (
                            <div className="absolute top-4 left-4">
                              <span className="bg-black text-white px-3 py-1 text-xs tracking-wider font-mono">
                                FEATURED
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Project Info */}
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="text-lg font-light tracking-wide text-black">
                              {project.title}
                            </h3>
                            <div className="flex items-center space-x-1">
                              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                              <span className="text-xs text-gray-500">{project.status}</span>
                            </div>
                          </div>
                          
                          <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">
                            {project.description}
                          </p>

                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.tags.slice(0, 3).map((tag) => (
                              <span key={tag} className="px-2 py-1 bg-white text-gray-600 text-xs rounded">
                                {tag}
                              </span>
                            ))}
                          </div>

                          <a 
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-sm text-gray-700 hover:text-black transition-colors group-hover:translate-x-1 transform transition-transform"
                          >
                            <ExternalLink className="w-3 h-3 mr-1" />
                            <span className="text-xs tracking-wide">VIEW</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Navigation Controls */}
              <div className="flex items-center justify-center space-x-4 mt-6">
                {/* Previous Button */}
                <button
                  onClick={prevSlide}
                  className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 hover:border-black hover:text-black transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={currentSlide === 0}
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="text-sm tracking-wide">PREV</span>
                </button>

                {/* Carousel Indicators */}
                <div className="flex space-x-2">
                  {projects.map((_, index) => (
                    <button
                      key={index}
                      className={`p-2 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400 ${
                        currentSlide === index ? 'bg-black/10' : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                      onClick={() => setCurrentSlide(index)}
                      aria-label={`Go to project ${index + 1}`}
                      aria-pressed={currentSlide === index}
                    >
                      <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                        currentSlide === index ? 'bg-black' : 'bg-gray-400'
                      }`} />
                    </button>
                  ))}
                </div>

                {/* Next Button */}
                <button
                  onClick={nextSlide}
                  className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 hover:border-black hover:text-black transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={currentSlide === projects.length - 1}
                >
                  <span className="text-sm tracking-wide">NEXT</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </>
          ) : (
            // Desktop Grid
            <div className="grid grid-cols-3 gap-4 md:gap-6 lg:gap-8">
              {projects.slice(1).map((project, index) => (
                <ScrollAnimationWrapper key={project.title} animation="fadeInUp" delay={600 + index * 200}>
                  <div className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-500 group">
                    
                    {/* Project Image */}
                    <div className="relative overflow-hidden">
                      <LazyImage 
                        src={project.image} 
                        alt={`${project.title} - Project Preview`}
                        className="w-full h-32 sm:h-40 md:h-48 object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500"></div>
                    </div>

                    {/* Project Info */}
                    <div className="p-3 sm:p-4 md:p-6">
                      <div className="flex items-center justify-between mb-2 sm:mb-3">
                        <h3 className="text-sm sm:text-base md:text-lg font-light tracking-wide text-black">
                          {project.title}
                        </h3>
                        <div className="flex items-center space-x-1">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                          <span className="text-xs text-gray-500">{project.status}</span>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {project.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="px-2 py-1 bg-gray-200 text-gray-600 text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <a 
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm text-gray-700 hover:text-black transition-colors group-hover:translate-x-1 transform transition-transform"
                      >
                        <ExternalLink className="w-3 h-3 mr-1" />
                        <span className="text-xs tracking-wide">VIEW</span>
                      </a>
                    </div>
                  </div>
                </ScrollAnimationWrapper>
              ))}
            </div>
          )}
        </div>

        {/* GitHub CTA */}
        <ScrollAnimationWrapper animation="fadeInUp" delay={1200}>
          <div className="text-center mt-16">
            <p className="text-sm text-gray-600 mb-6">
              Explore more projects and code samples
            </p>
            <a 
              href="https://github.com/PromSereyreaksa"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-8 py-3 border border-gray-300 text-gray-700 hover:border-black hover:text-black transition-colors duration-300"
            >
              <Github className="w-4 h-4" />
              <span className="text-sm tracking-wide">VIEW GITHUB</span>
            </a>
          </div>
        </ScrollAnimationWrapper>
      </div>
    </section>
  );
});

ProjectsSection.displayName = 'ProjectsSection';

export default ProjectsSection;
