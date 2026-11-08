import React, { useState, useEffect, useRef } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext'
import { HeroSection } from './layout/HeroSection'
import { SelectedWorkSection } from './layout/SelectedWorkSection'
import { ExperimentsSection } from './layout/ExperimentsSection'
import { AboutSection } from './layout/AboutSection'
import { CapabilitiesSection } from './layout/CapabilitiesSection'
import { ExperienceSection } from './layout/ExperienceSection'
import { ContactSection } from './layout/ContactSection'
import { Footer } from './components/Footer'
import { Navigation } from './components/Navigation'
import { init, updateReducedMotion, CursorController } from './assets/cursor'

// Reduced motion preference check
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

function App() {
  const [activeSection, setActiveSection] = useState<'hero' | 'work' | 'experiments' | 'about' | 'capabilities' | 'experience' | 'contact'>('hero')
  const [hasReducedMotion, setHasReducedMotion] = useState(prefersReducedMotion.matches)
  const cursorRef = useRef<CursorController | null>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const listener = (e: MediaQueryListEvent) => setHasReducedMotion(e.matches)
    prefersReducedMotion.addEventListener('change', listener)
    return () => prefersReducedMotion.removeEventListener('change', listener)
  }, [])

  useEffect(() => {
    // Initialize custom cursor controller
    cursorRef.current = init({ reducedMotion: hasReducedMotion })
    // Cleanup on unmount
    return () => {
      cursorRef.current?.cleanup()
    }
  }, [hasReducedMotion])

  const handleSectionChange = (section: string) => {
    setActiveSection(section as typeof activeSection)
  }

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Custom Cursor Container */}
      <div id="cursor-container">
        <div className="cursor-dot" ref={cursorDotRef} />
      </div>

      <ThemeProvider>
        <AuthProvider>
          {/* Navigation */}
          <Navigation
            activeSection={activeSection}
            onSectionChange={handleSectionChange}
            reducedMotion={hasReducedMotion}
          />

          {/* Main Content Sections */}
          <main className="relative z-10 min-h-screen">
            <HeroSection
              activeSection={activeSection}
              onSectionChange={handleSectionChange}
              reducedMotion={hasReducedMotion}
            />
            <SelectedWorkSection
              activeSection={activeSection}
              onSectionChange={handleSectionChange}
              reducedMotion={hasReducedMotion}
            />
            <ExperimentsSection
              activeSection={activeSection}
              onSectionChange={handleSectionChange}
              reducedMotion={hasReducedMotion}
            />
            <AboutSection
              activeSection={activeSection}
              onSectionChange={handleSectionChange}
              reducedMotion={hasReducedMotion}
            />
            <CapabilitiesSection
              activeSection={activeSection}
              onSectionChange={handleSectionChange}
              reducedMotion={hasReducedMotion}
            />
            <ExperienceSection
              activeSection={activeSection}
              onSectionChange={handleSectionChange}
              reducedMotion={hasReducedMotion}
            />
            <ContactSection
              activeSection={activeSection}
              onSectionChange={handleSectionChange}
              reducedMotion={hasReducedMotion}
            />
          </main>

          {/* Footer */}
          <Footer />
        </AuthProvider>
      </ThemeProvider>
    </div>
  )
}

export default App