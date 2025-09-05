
import { Analytics } from '@vercel/analytics/react'
import { lazy, Suspense } from 'react'
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
