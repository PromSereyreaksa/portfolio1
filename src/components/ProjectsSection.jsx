import { memo, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, ExternalLink, Github } from 'lucide-react';

const ProjectsSection = memo(({ section, projects }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const projectDeck = useMemo(
    () =>
      projects.map((project) => ({
        ...project,
        detailText: project.challenge || project.summary,
        bodyText: project.solution || project.outcome,
        metrics: project.impact?.length ? project.impact : [project.outcome],
        secondaryLink: project.secondaryLink || '',
        secondaryLabel: project.secondaryLabel || '',
      })),
    [projects]
  );

  const activeProject = projectDeck[activeIndex];

  const visibleProjects = useMemo(
    () =>
      Array.from({ length: Math.min(3, projectDeck.length) }, (_, slot) => {
        const index = (activeIndex + slot) % projectDeck.length;
        return {
          ...projectDeck[index],
          index,
          slot,
        };
      }),
    [activeIndex, projectDeck]
  );

  const stepProject = (direction) => {
    setActiveIndex((current) => (current + direction + projectDeck.length) % projectDeck.length);
  };

  return (
    <section className="projects-cinematic section-shell w-full px-0 md:px-0 lg:px-0">
      <div className="projects-cinematic-shell">
        <div className="projects-cinematic-grid">
          <div className="projects-copy-panel">
            <div className="projects-copy-shell">
              <p className="projects-kicker">{section.title}</p>
              <div className="projects-copy-rule" aria-hidden="true" />
              <div key={activeProject.title} className="projects-copy-content">
                <p className="projects-meta">{activeProject.timeline}</p>
                <h2 className="projects-display">{activeProject.title}</h2>
                <p className="projects-role">{activeProject.role}</p>
                <p className="projects-body">{activeProject.detailText}</p>
                <p className="projects-body projects-body--muted">{activeProject.bodyText}</p>

                <div className="projects-metrics">
                  {activeProject.metrics.map((metric) => (
                    <div key={metric} className="projects-metric">
                      {metric}
                    </div>
                  ))}
                </div>

                <div className="projects-stack-list">
                  {activeProject.stack.map((tag) => (
                    <span key={tag} className="projects-tag">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="projects-cta-row">
                  {activeProject.link ? (
                    <a
                      href={activeProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="projects-primary-cta"
                    >
                      <span>View Project</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  ) : null}

                  {activeProject.secondaryLink ? (
                    <a
                      href={activeProject.secondaryLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="projects-secondary-cta"
                    >
                      <span>{activeProject.secondaryLabel}</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  ) : null}
                </div>
              </div>

              <div className="projects-footer-row">
                <a
                  href={section.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="projects-github-link"
                >
                  <Github className="w-4 h-4" />
                  <span>More on GitHub</span>
                </a>
              </div>
            </div>
          </div>

          <div className="projects-gallery-panel">
            <button
              type="button"
              onClick={() => stepProject(-1)}
              className="projects-rail-nav projects-rail-nav--left"
              aria-label="Previous project"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>

            <div className="projects-gallery-shell">
              {visibleProjects.map((project) => {
                const isActive = project.index === activeIndex;

                return (
                  <button
                    key={`${project.title}-${project.index}`}
                    type="button"
                    onClick={() => setActiveIndex(project.index)}
                    className={`projects-gallery-card ${isActive ? 'is-active' : ''} slot-${project.slot}`}
                    aria-label={`Show ${project.title}`}
                  >
                    <img
                      src={project.image}
                      alt={`${project.title} preview`}
                      className="projects-gallery-image"
                      loading="lazy"
                      decoding="async"
                    />
                    <span className="projects-gallery-overlay" aria-hidden="true" />
                    <span className="projects-gallery-caption">
                      <span className="projects-gallery-title">{project.title}</span>
                      <span className="projects-gallery-subtitle">{project.timeline}</span>
                    </span>
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => stepProject(1)}
              className="projects-rail-nav projects-rail-nav--right"
              aria-label="Next project"
            >
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
});

ProjectsSection.displayName = 'ProjectsSection';

export default ProjectsSection;
