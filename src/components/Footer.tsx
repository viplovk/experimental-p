import React from 'react'

export const Footer: React.FC = () => {
  return (
    <footer className="py-16 sm:py-24 bg-secondaryBackground border-t border-muted-borders">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand/Wordmark */}
          <div>
            <a href="#hero" className="flex items-center gap-2 text-primary-text text-lg font-medium sm:text-xl tracking-wider">
              <span className="icon">VK</span>
              <span>Viplov</span>
            </a>
            <p className="mt-4 text-sm"
              style={{ color: colors.secondaryText }}
            >
              Creative Developer / Digital Experience Designer
            </p>
          </div>

          {/* Navigation links */}
          <div>
            <h4 className="font-medium text-sm mb-4"
              style={{ color: colors.primaryText }}
            >
              Navigation
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#work"
                  className="hover:text-accent transition-colors duration-200"
                  style={{ color: colors.secondaryText }}
                >
                  Selected Work
                </a>
              </li>
              <li>
                <a
                  href="#experiments"
                  className="hover:text-accent transition-colors duration-200"
                  style={{ color: colors.secondaryText }}
                >
                  Experiments
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="hover:text-accent transition-colors duration-200"
                  style={{ color: colors.secondaryText }}
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-accent transition-colors duration-200"
                  style={{ color: colors.secondaryText }}
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Social links */}
          <div>
            <h4 className="font-medium text-sm mb-4"
              style={{ color: colors.primaryText }}
            >
              Social
            </h4>
            <div className="flex gap-3">
              <a
                href="https://github.com/viplovk"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link p-2 rounded-md hover:bg-accent/10 transition-colors duration-200"
                aria-label="GitHub"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/viplov7"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link p-2 rounded-md hover:bg-accent/10 transition-colors duration-200"
                aria-label="LinkedIn"
              >
                LinkedIn
              </a>
              <a
                href="https://instagram.com/studymaterialboy"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link p-2 rounded-md hover:bg-accent/10 transition-colors duration-200"
                aria-label="Instagram"
              >
                Instagram
              </a>
              <a
                href="https://x.com/vishuk30"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link p-2 rounded-md hover:bg-accent/10 transition-colors duration-200"
                aria-label="X"
              >
                X
              </a>
            </div>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="font-medium text-sm mb-4"
              style={{ color: colors.primaryText }}
            >
              Contact
            </h4>
            <p className="text-sm"
              style={{ color: colors.secondaryText }}
            >
              <a
                href="mailto:viplov7@icloud.com"
                className="hover:text-accent transition-colors duration-200"
                style={{ color: colors.secondaryText }}
                rel="noopener noreferrer"
              >
                viplov7@icloud.com
              </a>
            </p>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-muted-borders flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs"
            style={{ color: colors.muted }}
          >
            © 2026 Viplov. All rights reserved.
          </p>
          <div className="flex gap-2">
            <a
              href="mailto:viplov7@icloud.com"
              className="text-xs hover:text-accent transition-colors duration-200"
              style={{ color: colors.secondaryText }}
            >
              Email
            </a>
            <a
              href="https://github.com/viplovk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs hover:text-accent transition-colors duration-200"
              style={{ color: colors.secondaryText }}
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}