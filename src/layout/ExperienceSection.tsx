import React, { useRef, useState, useEffect } from 'react'
import { init, updateReducedMotion } from '../assets/cursor'
import { colors, typography, spacing } from '../assets/tokens'

interface ExperienceSectionProps {
  activeSection: string
  onSectionChange: (section: string) => void
  reducedMotion: boolean
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  activeSection,
  onSectionChange,
  reducedMotion
}) => {
  const [hasEntered, setHasEntered] = useState(false)

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

    const sectionRef = useRef<HTMLDivElement>(null)
    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [hasEntered])

  return (
    <section
      id="experience"
      className="py-24 sm:py-32 lg:py-40 relative bg-secondaryBackground"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-title font-extrabold text-4xl sm:text-5xl lg:text-6xl mb-6"
            style={{ color: colors.primaryText }}
          >
            Experience
          </h2>
          <p className="section-subtitle text-muted"
            style={{ color: colors.secondaryText }}
          >
            Selected projects and education
          </p>
        </div>

        {/* Education section */}
        <div className="mb-16">
          <h3 className="education-title font-medium text-sm sm:text-base uppercase tracking-wider"
            style={{ color: colors.accent, textTransform: 'uppercase' }}
          >
            Education
          </h3>
          <div className="education-card rounded-xl border border-muted-borders background-surface p-6 sm:p-8 mt-4"
            style={{
              transition: reducedMotion ? 'none' : 'border-color 0.3s ease'
            }}
          >
            <div className="flex items-start gap-4">
              <div className="education-icon w-10 h-10 rounded bg-accent/10 flex items-center justify-center flex-shrink-0"
                style={{
                  backgroundImage: 'radial-gradient(circle at 30% 30%, var(--accent) 20%, transparent 40%)'
                }}
              >
                <svg className="w-5 h-5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M12 2v4l2 8h4l-8 8-8-8h2l8-8 8 8v4L12 2z" />
                </svg>
              </div>
              <div>
                <p className="education-school font-medium"
                  style={{ color: colors.primaryText }}
                >
                  B.Tech in Computer Science and Engineering
                </p>
                <p className="education-college text-sm"
                  style={{ color: colors.secondaryText }}
                >
                  IEC College of Engineering and Technology
                </p>
                <p className="education-location text-xs"
                  style={{ color: colors.muted }}
                >
                  Delhi, India
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Selected Projects */}
        <div>
          <h3 className="projects-section-title font-medium text-sm sm:text-base uppercase tracking-wider"
            style={{ color: colors.accent, textTransform: 'uppercase' }}
          >
            Selected Projects
          </h3>
          <div className="projects-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {[
              { id: 'ieccet', title: 'IECCET', category: 'College Student Portal' },
              { id: 'spider', title: 'Spider Web', category: 'Creative Experiment' },
              { id: 'bookshelf', title: 'Bookshelf', category: 'Digital Library' },
              { id: 'wave', title: 'Wave', category: 'Chat Application' }
            ].map((project) => (
              <article
                key={project.id}
                className="project-summary-item rounded-lg border border-muted-borders background-surface p-4 sm:p-6 hover:border-accent transition-all duration-300"
                style={{ transitionTimingFunction: reducedMotion ? 'linear' : 'cubic-bezier(0.4, 0, 0.2, 1)' }}
              >
                <h4 className="project-summary-title"
                  style={{ color: colors.primaryText }}
                >
                  {project.title}
                </h4>
                <p className="project-summary-category"
                  style={{ color: colors.secondaryText, fontSize: '0.875rem' }}
                >
                  {project.category}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}