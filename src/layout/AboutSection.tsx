import React, { useRef, useState, useEffect } from 'react'
import { init, updateReducedMotion } from '../assets/cursor'
import { colors, typography, spacing } from '../assets/tokens'

interface AboutSectionProps {
  activeSection: string
  onSectionChange: (section: string) => void
  reducedMotion: boolean
}

export const AboutSection: React.FC<AboutSectionProps> = ({
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
      id="about"
      className="py-24 sm:py-32 lg:py-40 relative bg-secondaryBackground"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text content */}
          <div>
            <span className="about-badge uppercase tracking-wider text-sm"
              style={{ color: colors.accent }}
            >
              Creative Developer
            </span>

            <h2 className="about-title font-extrabold text-4xl sm:text-5xl lg:text-6xl mb-6"
              style={{ color: colors.primaryText }}
            >
              Viplov
            </h2>

            <p className="about-text text-lg sm:text-xl mb-8"
              style={{ color: colors.secondaryText, lineHeight: 1.7 }}
            >
              Viplov is a curious multidisciplinary creator exploring the intersection of design, code, technology, and visual experimentation. He enjoys designing digital interfaces and building unusual web experiences.
            </p>

            <div className="about-interests mt-12">
              <h3 className="about-interests-title font-medium mb-6"
                style={{ color: colors.primaryText }}
              >
                His interests include:
              </h3>
              <ul className="about-interests-list space-y-4">
                <li>
                  <span className="about-interest-item flex items-center gap-2">
                    <svg className="w-4 h-4 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path d="M12 2v4l2 8h4l-8 8-8-8h2l8-8 8 8v4L12 2z" />
                    </svg>
                    Creative development
                  </span>
                </li>
                <li>
                  <span className="about-interest-item flex items-center gap-2">
                    <svg className="w-4 h-4 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path d="M12 2v4l2 8h4l-8 8-8-8h2l8-8 8 8v4L12 2z" />
                    </svg>
                    UI/UX
                  </span>
                </li>
                <li>
                  <span className="about-interest-item flex items-center gap-2">
                    <svg className="w-4 h-4 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path d="M12 2v4l2 8h4l-8 8-8-8h2l8-8 8 8v4L12 2z" />
                    </svg>
                    Frontend engineering
                  </span>
                </li>
                <li>
                  <span className="about-interest-item flex items-center gap-2">
                    <svg className="w-4 h-4 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path d="M12 2v4l2 8h4l-8 8-8-8h2l8-8 8 8v4L12 2z" />
                    </svg>
                    Motion design
                  </span>
                </li>
                <li>
                  <span className="about-interest-item flex items-center gap-2">
                    <svg className="w-4 h-4 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path d="M12 2v4l2 8h4l-8 8-8-8h2l8-8 8 8v4L12 2z" />
                    </svg>
                    Interactive experiences
                  </span>
                </li>
                <li>
                  <span className="about-interest-item flex items-center gap-2">
                    <svg className="w-4 h-4 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path d="M12 2v4l2 8h4l-8 8-8-8h2l8-8 8 8v4L12 2z" />
                    </svg>
                    Three.js and WebGL
                  </span>
                </li>
                <li>
                  <span className="about-interest-item flex items-center gap-2">
                    <svg className="w-4 h-4 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path d="M12 2v4l2 8h4l-8 8-8-8h2l8-8 8 8v4L12 2z" />
                    </svg>
                    Experimental typography
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Visual composition side - abstract artwork */}
          <div className="relative">
            {/* Abstract composition container */}
            <div className="absolute inset-0 overflow-hidden rounded-2xl">
              {/* Background abstract shapes */}
              <div className="absolute top-0 left-0 right-0 bottom-0">
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 1000">
                  <defs>
                    <filter id="shadow" x="0%" y="0%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>

                  {/* Layer 1: Large organic shapes */}
                  <g filter="url(#shadow)">
                    <path d="M100 700 C 200 500, 300 700, 400 300 C 500 100, 600 500, 700 200 C 800 100, 900 300, 900 600" stroke="var(--accent)" stroke-width="2" fill="none" opacity="0.6"/>
                    <path d="M600 900 C 700 700, 800 500, 900 400 C 950 300, 970 200, 950 100" stroke="var(--primaryText)" stroke-width="1" fill="none" opacity="0.4"/>
                  </g>

                  {/* Layer 2: Smaller floating elements */}
                  <g opacity="0.5">
                    <circle cx="200" cy="200" r="80" fill="var(--accent)" opacity="0.4"/>
                    <circle cx="800" cy="800" r="60" fill="var(--primaryText)" opacity="0.3"/>
                    <circle cx="400" cy="600" r="50" fill="var(--secondaryText)" opacity="0.3"/>
                  </g>

                  {/* Layer 3: Textural elements */}
                  <g>
                    <rect x="100" y="100" width="100" height="2" fill="var(--accent)" opacity="0.5"/>
                    <rect x="700" y="700" width="2" height="100" fill="var(--accent)" opacity="0.3"/>
                  </g>
                </svg>
              </div>

              {/* Floating interaction hint */}
              <div className="absolute bottom-6 left-6 text-center">
                <div className="text-xs uppercase tracking-wider" style={{ color: colors.muted }}>
                  Scroll
                </div>
                <div className="mt-2">
                  <span className="cursor-dot cursor-dot-simple"
                    style={{ width: '8px', height: '8px', background: 'var(--accent)' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA divider */}
        <div className="mt-16 pt-16 border-t border-muted-borders text-center">
          <a
            href="#contact"
            className="cta-button inline-flex items-center gap-2 px-8 py-4 rounded-full border border-accent bg-transparent text-accent text-base font-medium hover:bg-accent transition-colors duration-300"
            onClick={() => onSectionChange('contact')}
          >
            Have something unusual in mind? Let's make it real.
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}