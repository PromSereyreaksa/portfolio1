import { useEffect, useRef, useState } from 'react';

export default function SkillProjectAnimation() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeConnections, setActiveConnections] = useState([]);
  const canvasRef = useRef(null);

  // Elegant skill mappings
  const connections = [
    { skill: 'React', projects: ['Phsar Design', 'Ideagen', 'Todone'] },
    { skill: 'Tailwind', projects: ['Phsar Design', 'Ideagen', 'Todone'] },
    { skill: 'Figma', projects: ['Phsar Design'] },
    { skill: 'Express', projects: ['Phsar Design'] },
    { skill: 'Django', projects: ['Automata Visualizer'] }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const aboutSection = document.querySelector('[data-section="about"]');
      const projectsSection = document.querySelector('[data-section="projects"]');
      
      if (!aboutSection || !projectsSection) return;

      const aboutRect = aboutSection.getBoundingClientRect();
      const projectsRect = projectsSection.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Calculate smooth progress as user scrolls between sections
      const totalDistance = aboutRect.height + (aboutRect.bottom - projectsRect.top);
      const scrolled = Math.max(0, viewportHeight - aboutRect.bottom);
      const progress = Math.min(1, Math.max(0, scrolled / (viewportHeight * 0.8)));

      setScrollProgress(progress);

      // Gradually activate connections
      const activeCount = Math.floor(progress * connections.length);
      setActiveConnections(connections.slice(0, activeCount));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Create elegant SVG connection lines
  useEffect(() => {
    const createConnectionOverlay = () => {
      // Remove existing overlay
      const existingOverlay = document.getElementById('skill-connection-overlay');
      if (existingOverlay) existingOverlay.remove();

      // Create new SVG overlay
      const overlay = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      overlay.id = 'skill-connection-overlay';
      overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        pointer-events: none;
        z-index: 100;
        opacity: ${scrollProgress * 0.6};
      `;

      activeConnections.forEach((connection, connectionIndex) => {
        const skillElements = document.querySelectorAll(`[data-skill="${connection.skill}"]`);
        
        skillElements.forEach(skillEl => {
          connection.projects.forEach((projectName, projectIndex) => {
            const projectEl = document.querySelector(`[data-project="${projectName}"]`);
            if (!projectEl || !skillEl) return;

            const skillRect = skillEl.getBoundingClientRect();
            const projectRect = projectEl.getBoundingClientRect();

            // Calculate elegant curved path
            const startX = skillRect.right;
            const startY = skillRect.top + skillRect.height / 2;
            const endX = projectRect.left;
            const endY = projectRect.top + projectRect.height / 2;

            const midX = (startX + endX) / 2;
            const midY = (startY + endY) / 2 - 50; // Slight curve

            // Create path element
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            const pathData = `M ${startX} ${startY} Q ${midX} ${midY} ${endX} ${endY}`;
            
            path.setAttribute('d', pathData);
            path.setAttribute('stroke', '#000');
            path.setAttribute('stroke-width', '1');
            path.setAttribute('fill', 'none');
            path.setAttribute('opacity', '0.2');
            path.style.strokeDasharray = '4 4';
            path.style.animation = `drawLine 3s ease-in-out ${connectionIndex * 0.8}s both`;

            // Add flowing dot
            const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            dot.setAttribute('r', '2');
            dot.setAttribute('fill', '#000');
            dot.style.animation = `flowDot 4s ease-in-out ${connectionIndex * 0.8}s infinite`;

            // Create motion path for dot
            const motionPath = document.createElementNS('http://www.w3.org/2000/svg', 'animateMotion');
            motionPath.setAttribute('dur', '4s');
            motionPath.setAttribute('repeatCount', 'indefinite');
            motionPath.setAttribute('begin', `${connectionIndex * 0.8}s`);
            
            const motionPathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            motionPathElement.setAttribute('d', pathData);
            motionPath.appendChild(motionPathElement);
            
            dot.appendChild(motionPath);

            overlay.appendChild(path);
            overlay.appendChild(dot);
          });
        });
      });

      document.body.appendChild(overlay);
    };

    if (scrollProgress > 0.1) {
      createConnectionOverlay();
    }

    return () => {
      const overlay = document.getElementById('skill-connection-overlay');
      if (overlay) overlay.remove();
    };
  }, [scrollProgress, activeConnections]);

  // Add elegant CSS animations
  useEffect(() => {
    const styles = `
      @keyframes drawLine {
        0% { 
          stroke-dasharray: 0 1000;
          opacity: 0;
        }
        20% {
          opacity: 0.3;
        }
        100% { 
          stroke-dasharray: 1000 0;
          opacity: 0.2;
        }
      }

      @keyframes flowDot {
        0% { 
          opacity: 0;
          transform: scale(0.8);
        }
        10% {
          opacity: 1;
          transform: scale(1);
        }
        90% {
          opacity: 1;
          transform: scale(1);
        }
        100% { 
          opacity: 0;
          transform: scale(0.8);
        }
      }

      [data-skill] {
        transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
      }

      [data-skill]:hover {
        background-color: rgba(0,0,0,0.02) !important;
        transform: translateX(4px);
        border-left: 2px solid #000;
        padding-left: 14px;
      }

      [data-project] {
        transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
      }

      [data-project]:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 25px rgba(0,0,0,0.08);
        border-color: #000;
      }

      .skill-glow {
        position: relative;
      }

      .skill-glow::before {
        content: '';
        position: absolute;
        top: -2px;
        left: -2px;
        right: -2px;
        bottom: -2px;
        background: linear-gradient(45deg, transparent, rgba(0,0,0,0.1), transparent);
        z-index: -1;
        border-radius: inherit;
        opacity: 0;
        transition: opacity 0.6s ease;
      }

      [data-skill].active::before,
      [data-project].active::before {
        opacity: 1;
      }

      /* Elegant breathing animation for active elements */
      .breathing {
        animation: breathe 3s ease-in-out infinite;
      }

      @keyframes breathe {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.02); }
      }
    `;

    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);

    return () => {
      if (styleSheet.parentNode) {
        styleSheet.parentNode.removeChild(styleSheet);
      }
    };
  }, []);

  // Add data attributes and highlight active connections
  useEffect(() => {
    // Add section data attributes
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      if (section.textContent.includes('SKILLS') && section.textContent.includes('EXPERIENCE')) {
        section.setAttribute('data-section', 'about');
      }
      if (section.textContent.includes('PROJECTS') && !section.textContent.includes('SKILLS')) {
        section.setAttribute('data-section', 'projects');
      }
    });

    // Add skill and project data attributes
    const addDataAttributes = () => {
      const allSpans = document.querySelectorAll('span');
      allSpans.forEach(span => {
        const text = span.textContent;
        const skillDiv = span.closest('div');
        if (text.includes('React') && skillDiv) skillDiv.setAttribute('data-skill', 'React');
        if (text.includes('Tailwind') && skillDiv) skillDiv.setAttribute('data-skill', 'Tailwind');
        if (text.includes('Figma') && skillDiv) skillDiv.setAttribute('data-skill', 'Figma');
        if (text.includes('Express') && skillDiv) skillDiv.setAttribute('data-skill', 'Express');
        if (text.includes('Django') && skillDiv) skillDiv.setAttribute('data-skill', 'Django');
      });

      const projectTitles = document.querySelectorAll('h3, h4, h5');
      projectTitles.forEach(title => {
        const text = title.textContent;
        const projectContainer = title.closest('.group, .border, div[class*="p-"], div[class*="space-"]');
        if (text.includes('Phsar Design') && projectContainer) projectContainer.setAttribute('data-project', 'Phsar Design');
        if (text.includes('Ideagen') && projectContainer) projectContainer.setAttribute('data-project', 'Ideagen');
        if (text.includes('Automata Visualizer') && projectContainer) projectContainer.setAttribute('data-project', 'Automata Visualizer');
        if (text.includes('Todone') && projectContainer) projectContainer.setAttribute('data-project', 'Todone');
      });
    };

    setTimeout(addDataAttributes, 500);

    // Highlight active connections
    const highlightActive = () => {
      // Remove previous highlights
      document.querySelectorAll('.active, .breathing').forEach(el => {
        el.classList.remove('active', 'breathing');
      });

      // Add highlights for active connections
      activeConnections.forEach(connection => {
        const skillElements = document.querySelectorAll(`[data-skill="${connection.skill}"]`);
        skillElements.forEach(el => {
          el.classList.add('active', 'breathing');
        });

        connection.projects.forEach(projectName => {
          const projectElements = document.querySelectorAll(`[data-project="${projectName}"]`);
          projectElements.forEach(el => {
            el.classList.add('active', 'breathing');
          });
        });
      });
    };

    highlightActive();
  }, [activeConnections]);

  return null;
}
