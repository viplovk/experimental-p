import React, { useRef, useState, useEffect } from 'react'
import { init, updateReducedMotion } from '../assets/cursor'
import { colors, typography, spacing } from '../assets/tokens'

interface ContactSectionProps {
  activeSection: string
  onSectionChange: (section: string) => void
  reducedMotion: boolean
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  activeSection,
  onSectionChange,
  reducedMotion
}) => {
  const [hasEntered, setHasEntered] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

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

  // Project type options
  const projectTypes = [
    'Website development',
    'UI/UX design',
    'Creative development',
    'Interactive / 3D experience',
    'Frontend engineering',
    'Full-stack application',
    'Creative collaboration',
    'Other'
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormError(null)

    const formData = new FormData(e.currentTarget as HTMLFormElement)
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const projectType = formData.get('projectType') as string
    const budget = formData.get('budget') as string
    const timeline = formData.get('timeline') as string
    const message = formData.get('message') as string

    // Validation
    if (!name || !email || !projectType || !message) {
      setFormError('Please fill in all required fields')
      return
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setFormError('Please enter a valid email address')
      return
    }

    // Build the message for the mailto link
    const subject = `Portfolio Inquiry: ${name} - ${projectType}`
    const body = `
Name: ${name}
Email: ${email}
Project Type: ${projectType}
${budget ? `Budget: ${budget}` : ''}
${timeline ? `Timeline: ${timeline}` : ''}
Message: ${message}
`.trim()

    // Build mailto link
    const mailtoLink = `mailto:viplov7@icloud.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`

    // Open the visitor's default email application
    window.open(mailtoLink, '_blank')

    setFormSubmitted(true)

    // Clear form after a delay
    setTimeout(() => {
      setFormSubmitted(false)
    }, 3000)
  }

  return (
    <section
      id="contact"
      className="py-24 sm:py-32 lg:py-40 relative bg-background"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-title font-extrabold text-4xl sm:text-5xl lg:text-6xl mb-6"
            style={{ color: colors.primaryText }}
          >
            Contact
          </h2>
          <p className="section-subtitle text-muted"
            style={{ color: colors.secondaryText }}
          >
            Have something unusual in mind? Let's make it real.
          </p>
        </div>

        {formSubmitted ? (
          <div className="contact-success text-center">
            <svg className="w-12 h-12 mx-auto mb-6 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M20 6L9 17l-5-5" />
            </svg>
            <h3 className="mb-4">Message sent successfully!</h3>
            <p className="text-muted"
              style={{ color: colors.secondaryText }}
            >
              I'll get back to you soon. In the meantime, feel free to explore the portfolio or check out the projects.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="contact-form space-y-6"
            noValidate
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: colors.primaryText }}
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-muted-borders bg-transparent text-primary-text placeholder-secondaryText transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent/20"
                  style={{
                    transition: 'border-color 0.3s ease, background 0.3s ease'
                  }}
                  placeholder="Your name"
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: colors.primaryText }}
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-muted-borders bg-transparent text-primary-text placeholder-secondaryText transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent/20"
                  style={{
                    transition: 'border-color 0.3s ease, background 0.3s ease'
                  }}
                  placeholder="viplov7@icloud.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: colors.primaryText }}
                >
                  Project Type
                </label>
                <select
                  name="projectType"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-muted-borders bg-transparent text-primary-text placeholder-secondaryText transition-colors duration-200 appearance-none cursor-pointer"
                  style={{
                    transition: 'border-color 0.3s ease, background 0.3s ease',
                    '&:focus': 'outline: none'
                  }}
                >
                  {projectTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: colors.primaryText }}
                >
                  Approximate Budget
                </label>
                <input
                  type="text"
                  name="budget"
                  placeholder="e.g., $5,000 - $10,000"
                  className="w-full px-4 py-3 rounded-xl border border-muted-borders bg-transparent text-primary-text placeholder-secondaryText transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent/20"
                  style={{
                    transition: 'border-color 0.3s ease, background 0.3s ease'
                  }}
                />
              </div>
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: colors.primaryText }}
              >
                Timeline
              </label>
              <input
                type="text"
                name="timeline"
                placeholder="e.g., Within 1 month, ASAP, etc."
                className="w-full px-4 py-3 rounded-xl border border-muted-borders bg-transparent text-primary-text placeholder-secondaryText transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent/20"
                style={{
                  transition: 'border-color 0.3s ease, background 0.3s ease'
                }}
                placeholder="Whenever you're ready"
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: colors.primaryText }}
              >
                Message
              </label>
              <textarea
                name="message"
                rows={5}
                required
                className="w-full px-4 py-3 rounded-xl border border-muted-borders bg-transparent text-primary-text placeholder-secondaryText resize-none transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent/20"
                style={{
                  transition: 'border-color 0.3s ease, background 0.3s ease',
                  minHeight: '200px'
                }}
                placeholder="Tell me about your project..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="submit-button w-full py-4 px-8 rounded-full border border-accent bg-accent text-white text-base font-medium hover:opacity-90 transition-opacity duration-200"
              style={{
                transition: 'opacity 0.3s ease, background 0.3s ease',
                background: 'var(--accent)',
                borderColor: 'var(--accent)'
              }}
            >
              Send Inquiry
              <svg className="w-4 h-4 inline-middle" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </form>
        )}

        {/* Mailto fallback section */}
        <div className="mt-12 pt-12 border-t border-muted-borders">
          <h3 className="text-sm sm:text-base uppercase tracking-wider"
            style={{ color: colors.muted }}
          >
            Email Directly
          </h3>
          <p className="text-muted mt-2"
            style={{ color: colors.secondaryText, marginBottom: '1rem' }}
          >
            If the form does not open your email application, you can send directly to:
          </p>
          <a
            href="mailto:viplov7@icloud.com"
            className="cta-button-inline block w-full py-3 px-6 rounded-full border border-accent bg-transparent text-accent text-sm font-medium hover:bg-accent/10 transition-colors duration-300"
            style={{
              transition: 'color 0.3s ease, background 0.3s ease',
              background: 'var(--accent)/5',
              borderColor: 'var(--accent)'
            }}
          >
            viplov7@icloud.com
          </a>
        </div>
      </div>
    </section>
  )
}