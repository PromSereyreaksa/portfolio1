import {
  SiAstro, SiReact, SiJavascript, SiTypescript,
  SiNodedotjs, SiExpress, SiMongodb, SiTailwindcss,
  SiFigma, SiGit, SiPython, SiFlutter,
  SiNextdotjs, SiThreedotjs, SiVite, SiOpenjdk,
  SiRedux, SiSqlite, SiJsonwebtokens, SiVuedotjs,
  SiSupabase, SiRedis, SiSocketdotio, SiDjango, SiReactrouter,
} from 'react-icons/si';

const icons = {
  'Astro': { Icon: SiAstro, color: '#FF5D01' },
  'React': { Icon: SiReact, color: '#61DAFB' },
  'JavaScript': { Icon: SiJavascript, color: '#F7DF1E' },
  'TypeScript': { Icon: SiTypescript, color: '#3178C6' },
  'Node.js': { Icon: SiNodedotjs, color: '#5FA04E' },
  'Express': { Icon: SiExpress, color: '#000000' },
  'Express JS': { Icon: SiExpress, color: '#000000' },
  'MongoDB': { Icon: SiMongodb, color: '#47A248' },
  'Tailwind CSS': { Icon: SiTailwindcss, color: '#06B6D4' },
  'Figma': { Icon: SiFigma, color: '#F24E1E' },
  'Git': { Icon: SiGit, color: '#F05032' },
  'Python': { Icon: SiPython, color: '#3776AB' },
  'Flutter': { Icon: SiFlutter, color: '#02569B' },
  'Java': { Icon: SiOpenjdk, color: '#ED8B00' },
  'Next.js': { Icon: SiNextdotjs, color: '#000000' },
  'Three.js': { Icon: SiThreedotjs, color: '#000000' },
  'Vite': { Icon: SiVite, color: '#646CFF' },
  'Redux Toolkit': { Icon: SiRedux, color: '#764ABC' },
  'Redux': { Icon: SiRedux, color: '#764ABC' },
  'SQLite': { Icon: SiSqlite, color: '#003B57' },
  'JWT': { Icon: SiJsonwebtokens, color: '#000000' },
  'Vue': { Icon: SiVuedotjs, color: '#4FC08D' },
  'Supabase': { Icon: SiSupabase, color: '#3ECF8E' },
  'Redis': { Icon: SiRedis, color: '#FF4438' },
  'WebSocket': { Icon: SiSocketdotio, color: '#010101' },
  'Django': { Icon: SiDjango, color: '#092E20' },
  'React Router': { Icon: SiReactrouter, color: '#CA4245' },
};

export default function TechTags({ stack, max = 5 }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', alignItems: 'center' }}>
      {stack.slice(0, max).map((name) => {
        const entry = icons[name];
        const Icon = entry?.Icon;
        return (
          <span key={name} title={name} style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.3rem',
            fontSize: '0.78rem',
            color: 'var(--muted)',
            border: '1px solid var(--border)',
            borderRadius: '3px',
            background: 'var(--surface)',
            padding: Icon ? '0.25rem 0.5rem' : '0.2rem 0.55rem',
            lineHeight: 1.3,
          }}>
            {Icon && <Icon size={12} color={entry.color} />}
            {name}
          </span>
        );
      })}
    </div>
  );
}
