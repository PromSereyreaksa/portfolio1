
import './App.css'
import Navigation from './components/Navigation.jsx'
import AboutSection from './components/aboutSection.jsx'
import BrutalistArtworkSection from './components/BrutalistArtworkSection.jsx'
import ContactSection from './components/ContactSection.jsx'
import IntroTransition from './components/IntroTransition.jsx'
import LandingSection from './components/landingSection.jsx'
import ProjectsSection from './components/ProjectsSection.jsx'

function App() {

  return (
    <div className="bg-white min-h-screen">
      <Navigation />
      <div id="landing">
        <LandingSection />
      </div>
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
    </div>
  )
}

export default App
