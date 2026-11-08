import React, { useRef, useState, useEffect } from 'react'
import { init, updateReducedMotion } from '../assets/cursor'
import { colors, typography, spacing } from '../assets/tokens'

interface HeroSectionProps {
  activeSection: string
  onSectionChange: (section: string) => void
  reducedMotion: boolean
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  activeSection,
  onSectionChange,
  reducedMotion
}) => {
  const headingRef = useRef<HTMLHeadingElement>(null)
  const ctaRef = useRef<HTMLAnchorElement>(null)
  const [hasEntered, setHasEntered] = useState(false)

  // Use a ref for the cursor controller to ensure persistence
  const cursorController = useRef<any>(null)

  useEffect(() => {
    cursorController.current = init({ reducedMotion })
    return () => cursorController.current?.cleanup()
  }, [reducedMotion])

  useEffect(() => {
    if (cursorController.current) {
      updateReducedMotion(cursorController.current, reducedMotion)
    }
  }, [reducedMotion])

  // Staggered entrance animation triggers
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

    if (headingRef.current) {
      observer.observe(headingRef.current)
    }
  }, [hasEntered])

  return (
    <section
      id="hero"
      className="min-h-screen relative bg-background overflow-hidden pt-20"
    >
      {/* Atmospheric gradient background */}
      <div className="absolute inset-0">
        <div className="fixed inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent/5 rounded-full opacity-70 rotate-6"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/500 opacity-50 rotate-12"></div>
        </div>
        <div className="absolute top-0 left-0 right-0 h-[60vh] bg-gradient-to-b from-background via-secondaryBackground to-surface">
          {/* Subtle noise texture overlay */}
          <div className="absolute inset-0 opacity-5" />
        </div>
      </div>

      {/* Main hero content */}
      <div className="max-w-7xl mx-auto px-6 py-20 sm:px-8 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">

          {/* Text content side */}
          <div className="flex flex-col items-start justify-center">

            {/* Magnetic/attractive display typography */}
            <h1
              ref={headingRef}
              className="hero-display font-extrabold text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[1.1] tracking-tighter mb-6"
              style={{ color: colors.primaryText }}
            >
              VIPOV
            </h1>

            <p className="hero-tagline text-lg sm:text-xl mb-8 max-w-xl"
              style={{ color: colors.secondaryText }}
            >
              Creative Developer / Digital Experience Designer
            </p>

            <blockquote className="hero-motto text-xl sm:text-2xl lg:text-3xl font-serif italic mb-12"
              style={{ color: colors.accent, lineHeight: "1.4" }}
            >
              "Exploring the unusual side of the web."
            </blockquote>

            {/* Primary CTA */}
            <div className="hero-cta-wrapper mb-16">
              <a
                href="#work"
                ref={ctaRef}
                className="hero-cta inline-flex items-center gap-3 px-8 py-4 rounded-full border border-accent bg-transparent text-accent text-base font-medium hover:bg-accent transition-colors duration-300"
                onClick={() => onSectionChange('work')}
              >
                Enter the playground
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>

            {/* Supporting editorial metadata */}
            <div className="hero-meta flex flex-col sm:flex-row gap-4 pt-8 border-t border-muted-borders">
              <div className="hero-meta-item">
                <div className="hero-meta-label text-sm uppercase tracking-widest" style={{ color: colors.muted }}>
                  Location
                </div>
                <div className="hero-meta-value" style={{ color: colors.primaryText }}>
                  Delhi, India
                </div>
              </div>
              <div className="hero-meta-item">
                <div className="hero-meta-label text-sm uppercase tracking-widest" style={{ color: colors.muted }}>
                  Availability
                </div>
                <div className="hero-meta-value" style={{ color: colors.secondaryText }}>
                  Open to creative collaborations
                </div>
              </div>
            </div>

            {/* Subtle scroll indicator */}
            <div className="hero-scroll-indicator mt-24">
              <div className="scroll-wheel">
                <span />
                <span />
                <span />
              </div>
              <span className="text-xs uppercase tracking-widest" style={{ color: colors.muted }}>
                Scroll
              </span>
            </div>
          </div>

          {/* Hero visual side - experimental typographic composition */}
          <div className="relative overflow-hidden">
            {/* Background atmospheric elements */}
            <div className="absolute inset-0">
              <div className="absolute top-0 left-0 right-0 bottom-0 opacity-5" />
              <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-accent/5 rounded-full opacity-30 rotate-30" />
            </div>

            {/* Interactive typographic elements - simplified magnetic letters */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Magnetic letter 'V' */}
              <div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 magnetic-letter"
                style={{ color: colors.accent, fontSize: '12rem', fontWeight: 900 }}
                data-letter="V"
              >
                V
              </div>

              {/* Magnetic letter 'I' */}
              <div
                className="absolute top-1/4 left-1/3 transform -translate-x-1/2 -translate-y-1/2 magnetic-letter"
                style={{ color: colors.primaryText, fontSize: '8rem', fontWeight: 900 }}
                data-letter="I"
              >
                I
              </div>

              {/* Magnetic letter 'P' */}
              <div
                className="absolute bottom-1/4 right-1/3 transform -translate-x-1/2 -translate-y-1/2 magnetic-letter"
                style={{ color: colors.secondaryText, fontSize: '10rem', fontWeight: 900 }}
                data-letter="P"
              >
                P
              </div>

              {/* Magnetic letter 'L' */}
              <div
                className="absolute bottom-1/3 left-1/4 transform -translate-x-1/2 -translate-y-1/2 magnetic-letter"
                style={{ color: colors.muted, fontSize: '9rem', fontWeight: 900 }}
                data-letter="L"
              >
                L
              </div>

              {/* Magnetic letter 'O' */}
              <div
                className="absolute top-2/3 right-1/2 transform -translate-x-1/2 -translate-y-1/2 magnetic-letter"
                style={{ color: colors.accent, fontSize: '11rem', fontWeight: 900 }}
                data-letter="O"
              >
                O
              </div>

              {/* Magnetic letter 'V' (second) */}
              <div
                className="absolute top-1/3 right-1/4 transform -translate-x-1/2 -translate-y-1/2 magnetic-letter"
                style={{ color: colors.primaryText, fontSize: '7rem', fontWeight: 900 }}
                data-letter="V"
              >
                V
              </div>
            </div>

            {/* Subtle distortion wave overlay - only in non-reduced motion */}
            {!reducedMotion && (
              <div className="absolute inset-0 opacity-5">
                <svg className="absolute inset-0" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <defs>
                    <filter id="displace" x="0%" y="0%">
                      <feDisplacementMap in2="SourceGraphic" scale="10" xChannelSelector="R" yChannelSelector="G" />
                    </filter>
                  </defs>
                  <rect width="100" height="100" fill="none">
                    <animateTransform attributeName="transform" type="translate" dur="8s" repeatCount="indefinite" values="0,0; 10,0; 0,0" keyTimes="0; 0.5; 1" />
                    <animateTransform attributeName="transform" type="translate" dur="10s" repeatCount="indefinite" values="0,0; 0,-10; 0,0" keyTimes="0; 0.5; 1" />
                  </rect>
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* Subtle atmospheric gradient overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-surface/80 via-transparent to-transparent opacity-80">
          {/* Radial gradient for atmospheric feel */}
          <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-accent/5 opacity-30" />
        </div>
      </div>
    </section>
  )
}