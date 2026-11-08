import React, { useState, useEffect, useRef } from 'react'
import { init, updateReducedMotion, CursorController } from '../assets/cursor'
import { colors, typography, spacing } from '../assets/tokens'

interface NavigationProps {
  activeSection: string
  onSectionChange: (section: string) => void
  reducedMotion: boolean
}

export const Navigation: React.FC<NavigationProps> = ({
  activeSection,
  onSectionChange,
  reducedMotion
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const cursorController = useRef<CursorController | null>(null)

  // Section data
  const sections = [
    { key: 'hero', label: 'Home', href: '#hero' },
    { key: 'work', label: 'Selected Work', href: '#work' },
    { key: 'experiments', label: 'Experiments', href: '#experiments' },
    { key: 'about', label: 'About', href: '#about' },
    { key: 'capabilities', label: 'Capabilities', href: '#capabilities' },
    { key: 'experience', label: 'Experience', href: '#experience' },
    { key: 'contact', label: 'Contact', href: '#contact' }
  ]

  useEffect(() => {
    // Initialize cursor controller
    cursorController.current = init({ reducedMotion })
    return () => cursorController.current?.cleanup()
  }, [reducedMotion])

  useEffect(() => {
    if (cursorController.current) {
      updateReducedMotion(cursorController.current, reducedMotion)
    }
  }, [reducedMotion])

  const handleNavigate = (sectionKey: string) => {
    setIsMenuOpen(false)
    onSectionChange(sectionKey)
  }

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-xl border-b border-muted-borders">
      <div className="max-w-7xl mx-auto px-6 py-4 sm:px-8 lg:px-8">
        <div className="flex items-center justify-between flex-col sm:flex-row gap-4">

          {/* Logo/Wordmark */}
          <a href="#hero" className="flex items-center gap-2 text-primary-text text-lg font-medium sm:text-xl tracking-wider">
            <span className="icon">VK</span>
            <span>Viplov</span>
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={handleMenuToggle}
            className="md:hidden p-2 rounded-md transition-colors duration-200 hover:bg-muted"
            aria-controls="mobile-menu"
            aria-expanded={isMenuOpen}
          >
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path d="M3 12l2.29 2.29a1 1 0 0 1 1.42 0l1.71-1.72a1 1 0 0 1 1.42 1.42L6 21l7.71-7.71a1 1 0 0 1 0 1.42l-1.71 1.72a1 1 0 0 1-1.42 0 1 1 0 0 1-1.42-1.42L4 19.72V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v14.72" />
            </svg>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {sections.map((section) => (
              <a
                key={section.key}
                href={section.href}
                className={`nav-link ${activeSection === section.key ? 'active' : ''} transition-colors duration-200 block py-2 whitespace-nowrap`}
                onClick={() => handleNavigate(section.key)}
                style={{ color: activeSection === section.key ? colors.accent : colors.primaryText }}
              >
                {section.label}
              </a>
            ))}
          </div>

          {/* CTA Button - Enter Playground */}
          <a
            href="#experiments"
            className="cta-button inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent bg-transparent text-accent text-sm font-medium hover:bg-accent transition-colors duration-200"
            onClick={() => handleNavigate('experiments')}
          >
            Enter the playground
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        {/* Mobile Menu (hidden on desktop) */}
        {isMenuOpen && (
          <div
            id="mobile-menu"
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl flex flex-col items-center gap-8 py-12 md:hidden"
            aria-label="Main navigation"
          >
            {sections.map((section) => (
              <a
                key={section.key}
                href={section.href}
                className="text-primary-text text-2xl font-medium mb-6 transition-colors duration-200"
                onClick={() => handleNavigate(section.key)}
              >
                {section.label}
              </a>
            ))}
            <div className="mt-8 w-full max-w-md">
              <a
                href="#experiments"
                className="w-full py-3 px-6 rounded-full border border-accent text-accent text-center text-sm font-medium hover:bg-accent/10 transition-colors duration-200"
                onClick={() => handleNavigate('experiments')}
              >
                Enter the playground
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}