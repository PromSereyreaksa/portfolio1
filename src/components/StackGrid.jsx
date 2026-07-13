import {
  SiAstro, SiReact, SiJavascript, SiTypescript,
  SiNodedotjs, SiExpress, SiMongodb, SiTailwindcss,
  SiFigma, SiGit, SiPython, SiFlutter,
  SiNextdotjs, SiThreedotjs, SiVite, SiOpenjdk,
  SiRedux, SiSqlite, SiJsonwebtokens,
} from 'react-icons/si';

const icons = {
  'Astro':        { Icon: SiAstro,       color: '#FF5D01' },
  'React':        { Icon: SiReact,       color: '#61DAFB' },
  'JavaScript':   { Icon: SiJavascript,  color: '#F7DF1E' },
  'TypeScript':   { Icon: SiTypescript,  color: '#3178C6' },
  'Node.js':      { Icon: SiNodedotjs,   color: '#5FA04E' },
  'Express':      { Icon: SiExpress,     color: '#000000' },
  'MongoDB':      { Icon: SiMongodb,     color: '#47A248' },
  'Tailwind CSS': { Icon: SiTailwindcss, color: '#06B6D4' },
  'Figma':        { Icon: SiFigma,       color: '#F24E1E' },
  'Git':          { Icon: SiGit,         color: '#F05032' },
  'Python':       { Icon: SiPython,      color: '#3776AB' },
  'Flutter':      { Icon: SiFlutter,     color: '#02569B' },
  'Java':         { Icon: SiOpenjdk,     color: '#ED8B00' },
  'Next.js':      { Icon: SiNextdotjs,   color: '#000000' },
  'Three.js':     { Icon: SiThreedotjs,  color: '#000000' },
  'Vite':         { Icon: SiVite,        color: '#646CFF' },
  'Redux Toolkit': { Icon: SiRedux,      color: '#764ABC' },
  'Redux':        { Icon: SiRedux,       color: '#764ABC' },
  'SQLite':       { Icon: SiSqlite,      color: '#003B57' },
  'JWT':          { Icon: SiJsonwebtokens, color: '#000000' },
  'Express JS':   { Icon: SiExpress,     color: '#000000' },
};

export default function StackGrid({ stack }) {
  const loop = [...stack, ...stack];

  return (
    <div className="stack-marquee" aria-label="Technology stack">
      <div className="stack-track">
        {loop.map((name, index) => {
          const entry = icons[name];
          if (!entry) {
            return (
              <span className="stack-item stack-item--text" key={`${name}-${index}`} title={name}>
                {name}
              </span>
            );
          }
          const { Icon, color } = entry;
          return (
            <span className="stack-item" key={`${name}-${index}`} title={name}>
              <Icon size={20} color={color} aria-label={name} />
            </span>
          );
        })}
      </div>
      <style>{`
        .stack-marquee {
          overflow: hidden;
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          padding: 1rem 0;
        }

        .stack-track {
          display: flex;
          width: max-content;
          gap: 2rem;
          animation: stack-scroll 28s linear infinite;
        }

        .stack-item {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 1.25rem;
          flex: 0 0 auto;
        }

        .stack-item--text {
          font-size: 0.9rem;
          color: var(--muted);
          white-space: nowrap;
        }

        @keyframes stack-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        @media (prefers-reduced-motion: reduce) {
          .stack-track {
            animation: none;
            flex-wrap: wrap;
            width: auto;
          }
        }
      `}</style>
    </div>
  );
}
