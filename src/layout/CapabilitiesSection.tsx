import React, { useRef, useState, useEffect } from 'react'
import { init, updateReducedMotion } from '../assets/cursor'
import { colors, typography, spacing } from '../assets/tokens'

interface CapabilitiesSectionProps {
  activeSection: string
  onSectionChange: (section: string) => void
  reducedMotion: boolean
}

export const CapabilitiesSection: React.FC<CapabilitiesSectionProps> = ({
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

  // Capability categories with their actual technologies
  const capabilities = [
    {
      category: 'Design',
      title: 'UI/UX Design',
      description: 'User interface and user experience design focusing on intuitive flows, visual hierarchies, and accessible interactions.'
    },
    {
      category: 'Design',
      title: 'Visual Design',
      description: 'Brand identity, typography systems, color theory, and graphic composition for digital products.'
    },
    {
      category: 'Design',
      title: 'Digital Experience Design',
      description: 'Holistic design systems that bridge branding, interface, and interaction into cohesive experiences.'
    },
    {
      category: 'Frontend',
      title: 'HTML',
      description: 'Semantic HTML structure with accessibility at the core.'
    },
    {
      category: 'Frontend',
      title: 'CSS',
      description: 'Custom CSS with design systems, responsive layouts, and animation frameworks.'
    },
    {
      category: 'Frontend',
      title: 'JavaScript',
      description: 'Vanilla JavaScript for interactive experiences, DOM manipulation, and state management.'
    },
    {
      category: 'Frontend',
      title: 'React',
      description: 'React component architecture with hooks, context, and performance optimization.'
    },
    {
      category: 'Frontend',
      title: 'Next.js',
      description: 'Next.js app router, server components, and full-stack capabilities.'
    },
    {
      category: 'Motion & Creative',
      title: 'GSAP',
      description: 'GreenSock Animation Platform for sophisticated timelines, scroll-based animations, and complex sequencing.'
    },
    {
      category: 'Motion & Creative',
      title: 'Three.js',
      description: 'Three.js for 3D scenes, WebGL integration, and experimental visual compositions.'
    },
    {
      category: 'Backend',
      title: 'Backend Development',
      description: 'Server-side logic, API design, and data management.'
    },
    {
      category: 'Other Technologies',
      title: 'Flutter',
      description: 'Cross-platform mobile and web UI toolkit with expressive and adaptable widgets.'
    },
    {
      category: 'Other Technologies',
      title: 'Dart',
      description: 'Client-optimized language for fast apps on any platform.'
    },
    {
      category: 'Other Technologies',
      title: 'Elixir',
      description: 'Scalable functional language for building maintainable applications.'
    }
  ]

  return (
    <section
      id="capabilities"
      className="py-24 sm:py-32 lg:py-40 relative bg-background"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-title font-extrabold text-4xl sm:text-5xl lg:text-6xl mb-6"
            style={{ color: colors.primaryText }}
          >
            Capabilities
          </h2>
          <p className="section-subtitle text-muted"
            style={{ color: colors.secondaryText }}
          >
            Refined visual capability map
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {capabilities.map((cap) => (
            <div
              key={cap.category + cap.title}
              className="group rounded-xl border border-muted-borders background-surface p-6 sm:p-8 hover:border-accent transition-all duration-300 group-hover:shadow-lg"
              style={{ transitionTimingFunction: reducedMotion ? 'linear' : 'cubic-bezier(0.4, 0, 0.2, 1)' }}
            >
              <div className="cap-icon mb-4"
                style={{
                  width: '24px',
                  height: '24px',
                  margin: '0 auto 1.5rem',
                  background: reducedMotion ? 'var(--accent)/10' : 'var(--accent)/5',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {cap.title.substring(0, 2).toUpperCase().split('').map((char, i) => (
                  <span key={i}
                    className="text-accent"
                    style={{ fontSize: '1.2rem', opacity: reducedMotion ? 0.5 : 1 }}
                  >
                    {char}
                  </span>
                ))}
              </div>

              <h3 className="cap-title font-medium text-sm sm:text-base mb-2"
                style={{ color: colors.primaryText, transition: 'color 0.3s ease' }}
              >
                {cap.title}
              </h3>

              <p className="cap-description text-xs sm:text-sm"
                style={{ color: colors.secondaryText, fontSize: reducedMotion ? '0.75rem' : '0.875rem', lineHeight: 1.4 }}
              >
                {cap.description}
              </p>
            </div>
          ))}
        </div>

        {/* Visual connector lines - only in non-reduced motion */}
        {!reducedMotion && (
          <div className="mt-12 pt-12 border-t border-muted-borders">
            <div className="flex items-center justify-center gap-8">
              <div className="w-1 h-10 bg-accent/20"></div>
              <div className="w-1 h-10 bg-accent/20"></div>
              <div className="w-1 h-10 bg-accent/20"></div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}