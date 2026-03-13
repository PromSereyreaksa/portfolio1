
import { lazy, Suspense, useEffect, Component } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Navigation from './components/Navigation.jsx'
import LandingSection from './components/landingSection.jsx'

// Error Boundary Component for better error handling
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error in development, send to monitoring in production
    console.error('Error caught by boundary:', error, errorInfo);
    
    // Also log to help debug deployment issues
    if (typeof window !== 'undefined') {
      console.error('Deployment Debug - Error Details:', {
        message: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        url: window.location.href,
        userAgent: navigator.userAgent
      });
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

// Lazy load admin components
const AdminLogin = lazy(() => import('./components/admin/AdminLogin.jsx'))
const AdminLayout = lazy(() => import('./components/admin/AdminLayout.jsx'))
const AdminPosts = lazy(() => import('./components/admin/AdminPosts.jsx'))
const AdminPostEditor = lazy(() => import('./components/admin/AdminPostEditor.jsx'))
const AdminStats = lazy(() => import('./components/admin/AdminStats.jsx'))

// Portfolio page component (original layout)
function PortfolioPage() {
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
    <main id="main-content" className="portfolio-atmosphere">
      {/* Landing section optimized for LCP */}
      <div id="landing" className="section-anchor">
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
        <div id="about" className="section-anchor">
          <AboutSection />
        </div>
        <div id="projects" className="section-anchor">
          <ProjectsSection />
        </div>
        <div id="visual-work" className="section-anchor">
          <BrutalistArtworkSection />
        </div>
        <div id="contact" className="section-anchor">
          <ContactSection />
        </div>
      </Suspense>
    </main>
  );
}

function App() {
  const adminPath = import.meta.env.VITE_ADMIN_PATH || 'admin';

  // Debug deployment issues
  useEffect(() => {
    console.log('App mounted successfully');
    console.log('Environment:', {
      mode: import.meta.env.MODE,
      base: import.meta.env.BASE_URL,
      prod: import.meta.env.PROD,
      dev: import.meta.env.DEV
    });
  }, []);

  return (
    <ErrorBoundary>
      <div className="App">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Routes>
          {/* Portfolio Page */}
          <Route path="/" element={
            <>
              <Navigation />
              <PortfolioPage />
            </>
          } />

          {/* Admin Routes */}
          <Route path={`/${adminPath}`} element={
            <Suspense fallback={
              <div className="min-h-screen flex items-center justify-center">
                <div className="animate-pulse text-gray-500">Loading...</div>
              </div>
            }>
              <main id="main-content">
                <AdminLogin />
              </main>
            </Suspense>
          } />

          <Route path={`/${adminPath}/dashboard`} element={
            <Suspense fallback={
              <div className="min-h-screen flex items-center justify-center">
                <div className="animate-pulse text-gray-500">Loading...</div>
              </div>
            }>
              <main id="main-content">
                <AdminLayout />
              </main>
            </Suspense>
          }>
            <Route index element={<Navigate to="posts" replace />} />
            <Route path="posts" element={<AdminPosts />} />
            <Route path="create" element={<AdminPostEditor />} />
            <Route path="edit/:postId" element={<AdminPostEditor />} />
            <Route path="stats" element={<AdminStats />} />
          </Route>

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {/* Defer analytics loading */}
        <Suspense fallback={null}>
          <Analytics />
        </Suspense>
      </div>
    </ErrorBoundary>
  )
}

export default App
