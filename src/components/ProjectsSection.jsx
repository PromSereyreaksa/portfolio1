import { ExternalLink, Github } from 'lucide-react';
import { memo, useLayoutEffect, useRef, useCallback } from 'react';
import Lenis from 'lenis';

//* -------------------- ScrollStackItem -------------------- */
export const ScrollStackItem = ({ children, itemClassName = '' }) => (
  <div
    className={`scroll-stack-card relative w-full p-6 md:p-8 origin-top will-change-transform ${itemClassName}`}
    style={{ backfaceVisibility: 'hidden' }}
  >
    {children}
  </div>
)

/* -------------------- ScrollStack -------------------- */
export const ScrollStack = ({
  children,
  className = '',
  itemDistance = 120,
  itemScale = 0.04,
  itemStackDistance = 40,
  stackPosition = '25%',
  scaleEndPosition = '15%',
  baseScale = 0.88,
  blurAmount = 2,
  onStackComplete
}) => {
  const containerRef = useRef(null)
  const cardsRef = useRef([])
  const cardOffsetsRef = useRef([])
  const lenisRef = useRef(null)
  const rafRef = useRef(null)
  const lastTransformsRef = useRef(new Map())
  const lenisScrollRef = useRef(0)
  const completedRef = useRef(false)

  /* -------------------- Helpers -------------------- */
  const percentToPx = (val, h) =>
    typeof val === 'string' ? (parseFloat(val) / 100) * h : val

  const clamp = (v, min, max) => Math.min(Math.max(v, min), max)

  const progress = (v, start, end) =>
    clamp((v - start) / (end - start), 0, 1)

  /* -------------------- Core Update -------------------- */
  const update = useCallback(() => {
    const scrollTop = lenisScrollRef.current
    const vh = window.innerHeight

    const stackPx = percentToPx(stackPosition, vh)
    const scaleEndPx = percentToPx(scaleEndPosition, vh)

    const endEl = document.querySelector('.scroll-stack-end')
    const endTop = endEl
      ? endEl.getBoundingClientRect().top + scrollTop
      : Infinity

    cardsRef.current.forEach((card, i) => {
      const cardTop = cardOffsetsRef.current[i]

      const pinStart = cardTop - stackPx - itemStackDistance * i
      const pinEnd = Math.max(pinStart + 1, endTop - vh)

      const scaleProg = progress(
        scrollTop,
        cardTop - stackPx - itemStackDistance * i,
        cardTop - scaleEndPx
      )

      const scaleTarget = baseScale + i * itemScale
      const scale = 1 - scaleProg * (1 - scaleTarget)

      const pinned = scrollTop >= pinStart && scrollTop < pinEnd
      const released = scrollTop >= pinEnd

      let translateY = 0
      if (pinned) {
        translateY = scrollTop - cardTop + stackPx + itemStackDistance * i
      } else if (released) {
        translateY = pinEnd - cardTop + stackPx + itemStackDistance * i
      }

      /* Blur for depth */
      let blur = 0
      if (blurAmount) {
        let topIndex = 0
        cardsRef.current.forEach((_, j) => {
          if (scrollTop >= cardOffsetsRef.current[j] - stackPx - itemStackDistance * j) {
            topIndex = j
          }
        })
        if (i < topIndex) blur = (topIndex - i) * blurAmount
      }

      const next = {
        y: Math.round(translateY * 100) / 100,
        s: Math.round(scale * 1000) / 1000,
        b: Math.round(blur * 100) / 100
      }

      const prev = lastTransformsRef.current.get(i)
      if (
        !prev ||
        prev.y !== next.y ||
        prev.s !== next.s ||
        prev.b !== next.b
      ) {
        card.style.transform = `translate3d(0,${next.y}px,0) scale(${next.s})`
        card.style.filter = next.b ? `blur(${next.b}px)` : 'none'
        lastTransformsRef.current.set(i, next)
      }

      /* Completion callback */
      if (i === cardsRef.current.length - 1) {
        if (pinned && !completedRef.current) {
          completedRef.current = true
          onStackComplete?.()
        }
        if (!pinned && scrollTop < pinStart) {
          completedRef.current = false
        }
      }
    })
  }, [
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    blurAmount,
    onStackComplete
  ])

  /* -------------------- Init -------------------- */
  useLayoutEffect(() => {
    const cards = Array.from(document.querySelectorAll('.scroll-stack-card'))
    cardsRef.current = cards

    cardOffsetsRef.current = cards.map(
      el => el.getBoundingClientRect().top + window.scrollY
    )

    cards.forEach((card, i) => {
      if (i < cards.length - 1) card.style.marginBottom = `${itemDistance}px`
      card.style.willChange = 'transform, filter'
      card.style.transformOrigin = 'top center'
    })

    const lenis = new Lenis({
      smoothWheel: true,
      duration: 0.8,
      lerp: 0.12,
      syncTouch: false
    })

    lenis.scrollTo(window.scrollY, { immediate: true })

    lenis.on('scroll', ({ scroll }) => {
      lenisScrollRef.current = scroll
      update()
    })

    const raf = time => {
      lenis.raf(time)
      rafRef.current = requestAnimationFrame(raf)
    }
    rafRef.current = requestAnimationFrame(raf)

    lenisRef.current = lenis
    update()

    return () => {
      cancelAnimationFrame(rafRef.current)
      lenis.destroy()
      lastTransformsRef.current.clear()
    }
  }, [update, itemDistance])

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      <div className="pb-[12vh] px-4 md:px-8 lg:px-20">
        {children}
        <div className="scroll-stack-end h-px w-full" />
      </div>
    </div>
  )
}

// Main Projects Section Component
const ProjectsSection = memo(() => {
  const projects = [
    {
      title: "AUREA",
      description: "AUREA is an easy, fast, and efficient website builder that helps designers create stunning portfolios with a flexible template system. Built using React + Vite with Tailwind CSS for modern, responsive UI. Optimized for SEO, performance, and fast load times. Features an interactive portfolio editor and pre-built templates for quick setup.",
      image: "/projects/aurea.webp",
      link: "https://www.aurea.tools/",
      date: "SEPTEMBER 2025",
      status: "Live Product",
      tags: ["React", "Vite", "Tailwind CSS", "SEO", "Portfolio Builder"],
      featured: true
    },
    {
      title: "Phsar Design",
      description: "Creative freelancing platform connecting talented digital artists and designers. Built the frontend using React 18 + Vite with Redux Toolkit for state management and React Router v6 for navigation. Styled with Tailwind CSS for rapid UI development. Collaborated with backend teams for seamless UX.",
      image: "/projects/Phsardesign.webp",
      link: "https://phsardesign.vercel.app/",
      date: "JULY 2025",
      status: "In Development",
      tags: ["React", "Vite", "Redux Toolkit", "Tailwind CSS", "Freelancing"]
    },
    {
      title: "StockMate",
      description: "Offline-first stock management mobile app using Flutter with Clean Architecture. Features product CRUD operations, stock in/out tracking, low-stock alerts, and basic analytics dashboard. Uses local database storage for offline functionality.",
      image: "/projects/aurea.webp",
      link: "#",
      date: "JANUARY 2026",
      status: "Completed",
      tags: ["Flutter", "Clean Architecture", "Mobile", "Offline-First"]
    },
    {
      title: "Automata Visualizer",
      description: "Interactive educational tool demonstrating key concepts in automata theory and computational algorithms. Built with Python and additional programming languages for developing and testing automata-based solutions with efficient code structures and robust logic.",
      image: "/projects/Automata.webp",
      link: "https://automata-f6k9.onrender.com/",
      date: "JULY 2025",
      status: "Educational Project",
      tags: ["Python", "Automata Theory", "Algorithms", "Education"]
    },
    {
      title: "Basic Banking System",
      description: "Full-stack banking system built with Java and Spring for GUI. Features user authentication, account management, and transaction handling. Applied OOP concepts including encapsulation, inheritance, abstraction, and polymorphism with clean architecture. Includes basic admin and staff management.",
      image: "/projects/aurea.webp",
      link: "#",
      date: "MARCH 2025",
      status: "Academic Project",
      tags: ["Java", "Spring", "OOP", "Full-Stack", "Clean Architecture"]
    }
  ];

  return (
    <section className="relative w-full bg-white">
      {/* Fixed Title Header - Properly positioned */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="py-8 md:py-12 px-6 md:px-16 lg:px-24">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-thin tracking-[0.2em] md:tracking-[0.3em] text-black mb-4">
              PROJECTS
            </h2>
            <div className="w-24 h-px bg-black mx-auto mb-4"></div>
            <p className="text-sm md:text-base font-light text-gray-600 max-w-2xl mx-auto leading-relaxed">
              A collection of digital experiences, tools, and platforms that bridge creativity with technology.
            </p>
          </div>
        </div>
      </div>

    

      {/* ScrollStack Section */}
      <ScrollStack
        itemDistance={30}
        itemScale={0.02}
        itemStackDistance={40}
        stackPosition="20%"
        scaleEndPosition="5%"
        baseScale={0.92}
        blurAmount={0}
      >
        {projects.map((project, index) => (
          <ScrollStackItem
            key={project.title}
            itemClassName="bg-white border-l-4 border-gray-300 hover:border-black transition-colors"
          >
            <div className="flex flex-col">
              {/* Header with Title and Date */}
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4 gap-2">
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-medium tracking-wide text-black mb-2">
                    {project.title}
                  </h3>
                  {project.featured && (
                    <span className="inline-block bg-black text-white px-2 py-1 text-xs tracking-wider font-mono mb-2">
                      FEATURED
                    </span>
                  )}
                </div>
                <div className="flex flex-col items-start md:items-end gap-1 flex-shrink-0">
                  <span className="text-sm font-mono text-gray-600">{project.date}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-gray-600">{project.status}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-700 leading-relaxed mb-4">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-gray-100 text-gray-700 text-xs tracking-wide"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Link */}
              {project.link !== "#" && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center group w-fit text-sm text-gray-600 hover:text-black transition-colors"
                >
                  <span className="tracking-wide">View Project</span>
                  <ExternalLink className="ml-2 w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </a>
              )}
            </div>
          </ScrollStackItem>
        ))}
      </ScrollStack>

      {/* GitHub CTA - After ScrollStack with proper spacing */}
      <div className="text-center py-20 md:py-32 px-6 md:px-8 bg-white">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-light tracking-wide text-black mb-4">
            More on GitHub
          </h3>
          <p className="text-sm text-gray-600 mb-8">
            Explore more projects, code samples, and open source contributions
          </p>
          <a
            href="https://github.com/PromSereyreaksa"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-6 md:px-8 py-3 border border-gray-300 text-gray-700 hover:border-black hover:text-black transition-colors duration-300 rounded"
          >
            <Github className="w-4 h-4" />
            <span className="text-sm tracking-wide">VIEW GITHUB</span>
          </a>
        </div>
      </div>
    </section>
  );
});

ProjectsSection.displayName = 'ProjectsSection';

export default ProjectsSection;