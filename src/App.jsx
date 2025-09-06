
import { lazy, Suspense, useEffect, Component } from 'react'
import './App.css'
import Navigation from './components/Navigation.jsx'
import LandingSection from './components/landingSection.jsx'

// Error Boundary Component for better error handling
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error in development, send to monitoring in production
    if (process.env.NODE_ENV === 'development') {
      console.error('Error caught by boundary:', error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-2xl font-light text-gray-800 mb-4">Something went wrong</h1>
            <p className="text-gray-600 mb-4">Please refresh the page to try again.</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Defer analytics loading to reduce initial bundle size
const Analytics = lazy(() => 
  import('@vercel/analytics/react').then(module => ({ default: module.Analytics }))
)

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
    <ErrorBoundary>
      <div className="App">
        {/* Always visible components - critical path */}
        <Navigation />
        
        {/* Landing section optimized for LCP */}
        <div id="landing">
          <LandingSection />
        </div>

        {/* Intro animation */}
        <Suspense fallback={<div className="h-20"></div>}>
          <IntroTransition />
        </Suspense>

        {/* Lazy loaded sections */}
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="animate-pulse text-gray-500">Loading...</div>
          </div>
        }>
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
        
        {/* Defer analytics loading */}
        <Suspense fallback={null}>
          <Analytics />
        </Suspense>
      </div>
    </ErrorBoundary>
  )
}

export default App
