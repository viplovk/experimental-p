import React, { useRef, useState, useEffect } from 'react'
import { init, updateReducedMotion } from '../assets/cursor'
import { colors, typography, spacing } from '../assets/tokens'

interface ExperimentsSectionProps {
  activeSection: string
  onSectionChange: (section: string) => void
  reducedMotion: boolean
}

export const ExperimentsSection: React.FC<ExperimentsSectionProps> = ({
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

    // Observe the section container
    const sectionRef = useRef<HTMLDivElement>(null)
    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [hasEntered])

  return (
    <section
      id="experiments"
      className="py-24 sm:py-32 lg:py-40 relative bg-background"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-title font-extrabold text-4xl sm:text-5xl lg:text-6xl mb-6"
            style={{ color: colors.primaryText }}
          >
            Experiments
          </h2>
          <p className="section-subtitle text-muted"
            style={{ color: colors.secondaryText }}
          >
            A digital playground for creative exploration
          </p>
        </div>

        {/* Three discipline columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* A. Creative Coding Laboratory */}
          <div
            className="group rounded-2xl border border-muted-borders background-surface p-8 sm:p-10 hover:border-accent transition-all duration-500 group-hover:shadow-xl"
            style={{ transitionTimingFunction: reducedMotion ? 'linear' : 'cubic-bezier(0.4, 0, 0.2, 1)' }}
          >
            <div className="mb-6">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4"
                style={{ backgroundImage: 'radial-gradient(circle, var(--accent) 20%, transparent 40%)' }}
              >
                <svg className="w-6 h-6 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="2" x2="22" y2="22" />
                  <line x1="2" y1="22" x2="22" y2="2" />
                </svg>
              </div>
              <h3 className="text-xl font-medium"
                style={{ color: colors.primaryText }}
              >
                Creative Coding Laboratory
              </h3>
              <p className="text-sm mt-2"
                style={{ color: colors.muted }}
              >
                Three.js experiments, WebGL, shader experiments, generative visuals, procedural artwork, interactive graphics
              </p>
            </div>

            {/* Interactive visual demo placeholder */}
            <div
              className="h-40 sm:h-52 rounded-lg overflow-hidden bg-secondary/500 border border-muted-borders"
              style={{
                transition: reducedMotion ? 'none' : 'transform 0.3s ease'
              }}
            >
              <span className="absolute inset-0 flex items-center justify-center text-muted"
                style={{ fontSize: reducedMotion ? '0.875rem' : '1rem' }}
              >
                Interactive Demo
              </span>
            </div>
          </div>

          {/* B. Motion and Interaction Laboratory */}
          <div
            className="group rounded-2xl border border-muted-borders background-surface p-8 sm:p-10 hover:border-accent transition-all duration-500 group-hover:shadow-xl"
            style={{ transitionTimingFunction: reducedMotion ? 'linear' : 'cubic-bezier(0.4, 0, 0.2, 1)' }}
          >
            <div className="mb-6">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4"
                style={{ backgroundImage: 'radial-gradient(circle at 30% 30%, var(--accent) 20%, transparent 40%)' }}
              >
                <svg className="w-6 h-6 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <polyline points="20 6 9 17 2 12" />
                  <polyline points="22 18 15 12 9 6" />
                </svg>
              </div>
              <h3 className="text-xl font-medium"
                style={{ color: colors.primaryText }}
              >
                Motion & Interaction Laboratory
              </h3>
              <p className="text-sm mt-2"
                style={{ color: colors.muted }}
              >
                GSAP animations, scroll-based interactions, kinetic typography, cursor interactions, experimental transitions, micro-interactions
              </p>
            </div>

            <div className="h-40 sm:h-52 rounded-lg overflow-bg-secondary/500 border border-muted-borders">
              <span className="absolute inset-0 flex items-center justify-center text-muted"
                style={{ fontSize: reducedMotion ? '0.875rem' : '1rem' }}
              >
                Interactive Demo
              </span>
            </div>
          </div>

          {/* C. Interface Experiments */}
          <div
            className="group rounded-2xl border border-muted-borders background-surface p-8 sm:p-10 hover:border-accent transition-all duration-500 group-hover:shadow-xl"
            style={{ transitionTimingFunction: reducedMotion ? 'linear' : 'cubic-bezier(0.4, 0, 0.2, 1)' }}
          >
            <div className="mb-6">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4"
                style={{ backgroundImage: 'radial-gradient(circle at 70% 70%, var(--accent) 20%, transparent 40%)' }}
              >
                <svg className="w-6 h-6 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <line x1="9" y1="20" x2="15" y2="20" />
                </svg>
              </div>
              <h3 className="text-xl font-medium"
                style={{ color: colors.primaryText }}
              >
                Interface Experiments
              </h3>
              <p className="text-sm mt-2"
                style={{ color: colors.muted }}
              >
                Unconventional UI layouts, experimental interface concepts, creative prototypes, interaction design, visual explorations
              </p>
            </div>

            <div className="h-40 sm:h-52 rounded-lg overflow-bg-secondary/500 border border-muted-borders">
              <span className="absolute inset-0 flex items-center justify-center text-muted"
                style={{ fontSize: reducedMotion ? '0.875rem' : '1rem' }}
              >
                Interactive Demo
              </span>
            </div>
          </div>
        </div>

        {/* View all CTA at bottom */}
        {reducedMotion || (
          <div className="mt-12 pt-12 border-t border-muted-borders">
            <a
              href="#contact"
              className="cta-button inline-flex items-center gap-2 px-8 py-4 rounded-full border border-accent bg-transparent text-accent text-base font-medium hover:bg-accent transition-colors duration-300"
              onClick={() => onSectionChange('contact')}
            >
              Start a Project
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