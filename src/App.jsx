
import { Analytics } from '@vercel/analytics/react'
import { lazy, Suspense, useEffect } from 'react'
import './App.css'
import Navigation from './components/Navigation.jsx'
import LandingSection from './components/landingSection.jsx'

// Lazy load components that are below the fold
const AboutSection = lazy(() => import('./components/aboutSection.jsx'))
const BrutalistArtworkSection = lazy(() => import('./components/BrutalistArtworkSection.jsx'))
const ContactSection = lazy(() => import('./components/ContactSection.jsx'))
const IntroTransition = lazy(() => import('./components/IntroTransition.jsx'))
const ProjectsSection = lazy(() => import('./components/ProjectsSection.jsx'))

function App() {
  // Handle URL changes and scroll to sections for SEO and UX
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          // Update document title for better SEO
          updateTitleForSection(hash.substring(1));
          
          // Smooth scroll to section
          setTimeout(() => {
            element.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'start' 
            });
          }, 100);
        }
      }
    };

    // Handle initial load
    handleHashChange();
    
    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update page title based on section for SEO
  const updateTitleForSection = (section) => {
    const titles = {
      'about': 'About - Prom Sereyreaksa | Creative Technologist',
      'projects': 'Projects - Prom Sereyreaksa | Software Engineer Portfolio',
      'visual-work': 'Visual Work - Prom Sereyreaksa | Graphic Designer',
      'contact': 'Contact - Prom Sereyreaksa | Get In Touch'
    };
    
    const newTitle = titles[section] || 'Prom Sereyreaksa - Creative Technologist & Software Engineer';
    document.title = newTitle;
  };

  return (
    <div className="bg-white min-h-screen">
      <Navigation />
      <div id="landing">
        <LandingSection />
      </div>
      <Suspense fallback={
        <div className="flex items-center justify-center py-24">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      }>
        <IntroTransition />
        <div id="about">
          <AboutSection />
        </div>
        <div id="projects">
          <ProjectsSection />
        </div>
        <div id="visual-work">
          <BrutalistArtworkSection />
        </div>
        <div id="contact">
          <ContactSection />
        </div>
      </Suspense>
      <Analytics />
    </div>
  )
}

export default App
