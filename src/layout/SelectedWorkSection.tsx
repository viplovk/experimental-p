import React, { useRef, useState, useEffect } from 'react'
import { init, updateReducedMotion } from '../assets/cursor'
import { colors, typography, spacing } from '../assets/tokens'

interface Project {
  id: string
  title: string
  github: string
  live: string | null
  category: string
  description: string
  artDirection: string
}

const projects: Project[] = [
  {
    id: 'iecet',
    title: 'IECCET',
    github: 'https://github.com/viplovk/IECCET',
    live: null,
    category: 'College Student Portal',
    description: 'College student portal / ecosystem with student dashboard, attendance management, academic resources and notes.',
    artDirection: 'Academic, institutional, structured, clean dashboard-oriented presentation'
  },
  {
    id: 'spider-web',
    title: 'Spider Web',
    github: 'https://github.com/viplovk/spider-web',
    live: 'https://spider-web-eight.vercel.app/',
    category: 'Creative Frontend Experiment',
    description: 'A creative frontend experiment designed for visual exploration and showcase purposes.',
    artDirection: 'Experimental, brutalist influences, expressive typography, unconventional layouts'
  },
  {
    id: 'bookshelf',
    title: 'Bookshelf',
    github: 'https://github.com/viplovk/bookshelf',
    live: 'https://bookshelf-coral-ten.vercel.app/',
    category: 'Digital Book Library',
    description: 'A digital book library / catalogue with warm paper-inspired accents and elegant typography.',
    artDirection: 'Literary, editorial, warm paper-inspired accents, elegant typography, book-inspired compositions'
  },
  {
    id: 'wave',
    title: 'Wave',
    github: 'https://github.com/viplovk/dart-elixir-use',
    live: 'https://dart-ex.vercel.app/',
    category: 'Team Communication',
    description: 'A team walkie-talkie and real-time chat application with voice communication and temporary rooms.',
    artDirection: 'Futuristic, technical, dark interface, audio-inspired visuals, communication-focused design'
  }
]

interface SelectedWorkSectionProps {
  activeSection: string
  onSectionChange: (section: string) => void
  reducedMotion: boolean
}

export const SelectedWorkSection: React.FC<SelectedWorkSectionProps> = ({
  activeSection,
  onSectionChange,
  reducedMotion
}) => {
  const [hasEntered, setHasEntered] = useState(false)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = init({ reducedMotion })
    return () => cursor.cleanup()
  }, [reducedMotion])

  useEffect(() => {
    updateReducedMotion(cursor, reducedMotion)
  }, [reducedMotion])

  useEffect(() => {
    if (hasEntered) return

    const observerOptions = {
      threshold: 0.3,
      rootMargin: '0px'
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasEntered(true)
          observer.disconnect()
        }
      },
      observerOptions
    )

    if (gridRef.current) {
      observer.observe(gridRef.current)
    }
  }, [hasEntered])

  return (
    <section
      id="work"
      className="py-24 sm:py-32 lg:py-40 relative bg-secondaryBackground"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-title font-extrabold text-4xl sm:text-5xl lg:text-6xl mb-6"
            style={{ color: colors.primaryText }}
          >
            Selected Work
          </h2>
          <p className="section-subtitle text-muted"
            style={{ color: colors.secondaryText }}
          >
            A curated exhibition of creative projects
          </p>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          {projects.map((project) => (
            <article
              key={project.id}
              className="group relative overflow-hidden rounded-lg border border-muted-borders background-surface hover:border-accent transition-all duration-500 group-hover:shadow-lg"
              style={{ transitionTimingFunction: reducedMotion ? 'linear' : 'cubic-bezier(0.4, 0, 0.2, 1)' }}
            >
              {/* Project image/visual area */}
              <div
                className="relative h-64 sm:h-80 overflow-hidden rounded-t-lg"
                style={{
                  background: reducedMotion ? 'var(--secondary)' : 'linear-gradient(135deg, #1e1e2f 0%, #2a2a3e 100%)',
                  transition: reducedMotion ? 'none' : 'background-position 0.5s ease'
                }}
              >
                {/* Project thumbnail */}
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{
                    backgroundImage: project.live
                      ? `url('https://via.placeholder.com/800x600/181818/b49a70?text=${encodeURIComponent(project.title)}')`
                      : `url('https://via.placeholder.com/800x600/222222/6b6b6b?text=${encodeURIComponent(project.title)}')`,
                    transition: reducedMotion ? 'none' : 'background-size 0.5s ease'
                  }}
                >
                  {/* Project badge */}
                  <span className="absolute top-3 left-3 px-3 py-1 text-xs font-medium rounded bg-accent/90 text-accent"
                    style={{ transition: reducedMotion ? 'none' : 'opacity 0.3s ease' }}
                  >
                    {project.category}
                  </span>
                </div>

                {/* Hover overlay */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: reducedMotion ? 'none' : 'linear-gradient(180deg, rgba(180,154,112,0.3) 0%, transparent 100%)',
                    transition: reducedMotion ? 'none' : 'opacity 0.3s ease'
                  }}
                >
                  <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                    <span className="text-accent font-medium">View Project</span>
                  </span>
                </div>
              </div>

              {/* Project details */}
              <div className="p-6 sm:p-8">
                <h3 className="project-title font-semibold text-lg sm:text-xl mb-2"
                  style={{ color: colors.primaryText, transition: reducedMotion ? 'none' : 'color 0.3s ease' }}
                >
                  {project.title}
                </h3>
                <p className="project-category text-sm sm:text-medium mb-4"
                  style={{ color: colors.secondaryText, transition: reducedMotion ? 'none' : 'color 0.3s ease' }}
                >
                  {project.category}
                </p>
                <p className="project-description text-sm"
                  style={{ color: colors.muted, fontSize: reducedMotion ? '0.875rem' : '1rem', lineHeight: reducedMotion ? '1.4' : '1.6', transition: reducedMotion ? 'none' : 'color 0.3s ease' }}
                >
                  {project.description}
                </p>

                {/* Project CTA */}
                <div className="mt-4 pt-4 border-t border-muted-borders">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-cta inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent bg-transparent text-accent text-sm font-medium hover:bg-accent/10 transition-colors duration-300"
                    style={{ transition: reducedMotion ? 'none' : 'color 0.3s ease' }}
                  >
                    GitHub
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </a>
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-cta-inline ml-3 inline-flex items-center gap-2 px-4 py-2 rounded-full border bg-accent/5 text-accent text-sm font-medium hover:bg-accent/10 transition-colors duration-300"
                      style={{ transition: reducedMotion ? 'none' : 'color 0.3s ease' }}
                    >
                      Live
                      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View all / CTA */}
        {reducedMotion || (
          <div className="mt-12 text-center">
            <a
              href="#experiments"
              className="cta-button inline-flex items-center gap-2 px-8 py-4 rounded-full border border-accent bg-transparent text-accent text-base font-medium hover:bg-accent transition-colors duration-300"
              onClick={() => onSectionChange('experiments')}
            >
              Explore Experiments
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        )}
      </div>
    </section>
  )
}