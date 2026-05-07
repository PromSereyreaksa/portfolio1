import { Suspense, lazy, useEffect } from 'react';
import Navigation from './Navigation.jsx';
import LandingSection from './landingSection.jsx';

const AboutSection = lazy(() => import('./aboutSection.jsx'));
const BrutalistArtworkSection = lazy(() => import('./BrutalistArtworkSection.jsx'));
const ContactSection = lazy(() => import('./ContactSection.jsx'));
const ProjectsSection = lazy(() => import('./ProjectsSection.jsx'));

export default function PortfolioApp({
  hero,
  about,
  education,
  experience,
  projectsSection,
  projects,
  artworkSection,
  artwork,
  contact,
  contactMethods,
}) {
  useEffect(() => {
    const titles = {
      about: 'About - Prom Sereyreaksa | Creative Technologist',
      projects: 'Projects - Prom Sereyreaksa | Software Engineer Portfolio',
      'visual-work': 'Visual Work - Prom Sereyreaksa | Graphic Designer',
      contact: 'Contact - Prom Sereyreaksa | Get In Touch',
    };

    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const target = hash ? document.getElementById(hash) : null;

      document.title =
        titles[hash] || 'Prom Sereyreaksa - Creative Technologist & Software Engineer';

      if (!target) return;
      window.setTimeout(() => {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className="App">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Navigation />
      <main id="main-content" className="portfolio-atmosphere">
        <div id="landing" className="section-anchor">
          <LandingSection hero={hero} />
        </div>
        <Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center">
              <div className="animate-pulse text-gray-500">Loading...</div>
            </div>
          }
        >
          <div className="section-anchor">
            <AboutSection about={about} education={education} experience={experience} />
          </div>
          <div id="projects" className="section-anchor">
            <ProjectsSection section={projectsSection} projects={projects} />
          </div>
          <div id="visual-work" className="section-anchor">
            <BrutalistArtworkSection section={artworkSection} artwork={artwork} />
          </div>
          <div id="contact" className="section-anchor">
            <ContactSection contact={contact} contactMethods={contactMethods} />
          </div>
        </Suspense>
      </main>
    </div>
  );
}
