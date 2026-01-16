import { ExternalLink, Github } from 'lucide-react';
import { memo, useLayoutEffect, useRef, useCallback } from 'react';
import Lenis from 'lenis';

//* -------------------- ScrollStackItem -------------------- */
export const ScrollStackItem = ({ children, itemClassName = '' }) => (
  <div
    className={`scroll-stack-card relative w-full p-6 md:p-12 rounded-3xl shadow-lg origin-top will-change-transform ${itemClassName}`}
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
      duration: 1.1,
      lerp: 0.08
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
      description: "AUREA is an easy, fast, and efficient website builder that helps designers create stunning portfolios with a flexible template system. It removes the hassle of website setup, saves time, and lets creatives focus on their craft. AUREA also brings in the business side of design with built-in pricing tools and ready-to-use templates for real client work",
      image: "/projects/aurea.webp",
      link: "https://www.aurea.tools/",
      status: "Start up",
      tags: ["Website Builder", "Start Up", "Digital Solution"],
      featured: true
    },
    {
      title: "Netguardian",
      description: "Netguardian is a network security monitoring dashboard designed to observe, count, and visualize incoming traffic in real time. It provides insight into request rates, active sources, and traffic behavior. Perfect for testing your stresser tools",
      image: "/projects/Netguardian.webp",
      link: "https://github.com/PromSereyreaksa/Netguardian",
      status: "Working on",
      tags: ["Network", "Monitoring", "Cybersecurity"]
    },
    {
      title: "Phsar Design",
      description: "A marketplace connecting talented digital artists, designers, and creative professionals. Bring your vision to life with world-class creative services.",
      image: "/projects/Phsardesign.webp",
      link: "https://phsardesign.vercel.app/",
      status: "In Development",
      tags: ["Startup", "Marketplace", "Creative Services", "React", "Express"]
    },
    {
      title: "Automata Visualizer",
      description: "An interactive tool for managing and visualizing finite state machines. Perfect for computer science students and professionals working with formal language theory.",
      image: "/projects/Automata.webp",
      link: "https://automata-f6k9.onrender.com/",
      status: "In Development",
      tags: ["Education", "Visualization", "Computer Science", "React"]
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
        itemDistance={40}
        itemScale={0.03}
        itemStackDistance={50}
        stackPosition="20%"
        scaleEndPosition="5%"
        baseScale={0.90}
        blurAmount={1.5}
      >
        {projects.map((project, index) => (
          <ScrollStackItem
            key={project.title}
            itemClassName="bg-gradient-to-br from-gray-50 to-white border border-gray-200"
          >
            <div className="grid lg:grid-cols-2 gap-6 md:gap-8 items-center">
              {/* Project Image */}
              <div className="relative overflow-hidden rounded-2xl group">
                <img
                  src={project.image}
                  alt={`${project.title} - Project Preview`}
                  className="w-full h-48 md:h-64 lg:h-96 object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                {project.featured && (
                  <div className="absolute top-4 left-4">
                    <span className="bg-black text-white px-3 py-1.5 text-xs tracking-wider font-mono rounded">
                      FEATURED
                    </span>
                  </div>
                )}
              </div>

              {/* Project Info */}
              <div className="flex flex-col justify-center">
                <div className="mb-4">
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-light tracking-wide text-black mb-3">
                    {project.title}
                  </h3>
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-600 font-medium">{project.status}</span>
                  </div>
                </div>

                <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-6">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs tracking-wide rounded transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center group w-fit"
                >
                  <span className="text-sm tracking-wider text-black font-medium group-hover:text-gray-600 transition-colors">
                    VISIT PROJECT
                  </span>
                  <ExternalLink className="ml-2 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
              </div>
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