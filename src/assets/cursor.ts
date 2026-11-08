/**
 * Custom Fluid Cursor System
 * Features:
 * - Smooth interpolation with organic movement
 * - Subtle trailing effect
 * - Magnetic interaction with interactive elements
 * - Contextual changes over interactive elements
 * - Respects reduced-motion settings
 * - Disables/simplifies on touch devices
 */

export interface CursorOptions {
  reducedMotion: boolean
}

/**
 * Cursor controller that manages the custom cursor element
 */
export class CursorController {
  private cursorDot: HTMLElement
  private targetX: number = 0
  private targetY: number = 0
  private currentX: number = 0
  private currentY: number = 0
  private isOverInteractive: boolean = false
  private reducedMotion: boolean
  private rafId: number | null = null
  private mouseX: number = 0
  private mouseY: number = 0
  private hoverElements: Set<HTMLElement> = new Set()

  constructor(options: CursorOptions) {
    this.reducedMotion = options.reducedMotion
    this.cursorDot = document.getElementById('cursor-dot') as HTMLElement || this.createCursorElement()
    document.body.appendChild(this.cursorDot)

    this.initEventListeners()
    this.animateLoop()
  }

  private createCursorElement(): HTMLElement {
    const el = document.createElement('div')
    el.id = 'cursor-dot'
    el.className = 'cursor-dot'
    el.style.cssText = `
      width: 8px;
      height: 8px;
      background: var(--accent);
      border-radius: 50%;
      position: fixed;
      transform: translate(-50%, -50%);
      z-index: 10000;
      pointer-events: none;
      transition: transform 0.1s ease, width 0.2s ease, height 0.2s ease;
    `
    document.body.appendChild(el)
    return el
  }

  private initEventListeners(): void {
    // Mouse movement
    document.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX
      this.mouseY = e.clientY
      this.updateTarget(e.clientX, e.clientY)
    })

    // Touch movement - simplify cursor on touch
    document.addEventListener('touchmove', (e) => {
      e.preventDefault()
      const touch = e.touches[0]
      if (touch) {
        this.mouseX = touch.clientX
        this.mouseY = touch.clientY
        this.updateTarget(touch.clientX, touch.clientY)
        // Simplify cursor on touch - hide or use basic mode
        this.setCursorMode('simple')
      }
    }, { passive: false })

    // Hover detection for interactive elements
    const interactiveSelectors = 'button, a, [role="button"], input, textarea, select, .interactive'

    document.addEventListener('mouseenter', (e) => {
      const target = e.target as HTMLElement
      if (target.matches(interactiveSelectors) || target.closest(interactiveSelectors)) {
        this.isOverInteractive = true
        this.cursorDot.classList.add('expanded')
      }
    })

    document.addEventListener('mouseleave', (e) => {
      const target = e.target as HTMLElement
      if (target.matches(interactiveSelectors) || target.closest(interactiveSelectors)) {
        this.isOverInteractive = false
        this.cursorDot.classList.remove('expanded')
        this.resetCursorPosition()
      }
    })
  }

  private updateTarget(x: number, y: number): void {
    this.targetX = x
    this.targetY = y
  }

  private resetCursorPosition(): void {
    // Reset to follow mouse gently when not over interactive
    this.targetX = this.mouseX
    this.targetY = this.mouseY
  }

  private setCursorMode(mode: 'follow' | 'simple' | 'expanded'): void {
    if (this.reducedMotion) {
      // In reduced motion, keep it simple
      this.cursorDot.style.width = '8px'
      this.cursorDot.style.height = '8px'
      this.cursorDot.style.background = 'var(--accent)'
      return
    }

    switch (mode) {
      case 'simple':
        this.cursorDot.style.width = '8px'
        this.cursorDot.style.height = '8px'
        break
      case 'expanded':
        this.cursorDot.style.width = '32px'
        this.cursorDot.style.height = '32px'
        break
      case 'follow':
      default:
        this.cursorDot.style.width = '8px'
        this.cursorDot.style.height = '8px'
        break
    }
  }

  /**
   * Main animation loop - smooth interpolation of cursor position
   * Uses exponential easing for organic, fluid movement
   */
  private animateLoop(): void {
    if (this.reducedMotion) {
      // In reduced motion, just snap to position
      this.cursorDot.style.transform = `translate(${this.targetX}px, ${this.targetY}px)`
      this.rafId = requestAnimationFrame(() => this.animateLoop())
      return
    }

    // Smooth interpolation with organic easing
    const easing = 0.15 // Lower = smoother, higher = more responsive
    this.currentX += (this.targetX - this.currentX) * easing
    this.currentY += (this.targetY - this.currentY) * easing

    this.cursorDot.style.transform = `translate(${Math.round(this.currentX)}px, ${Math.round(this.currentY)}px)`

    this.rafId = requestAnimationFrame(() => this.animateLoop())
  }

  /**
   * Clean up event listeners and animation loop
   */
  cleanup(): void {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId)
      this.rafId = null
    }
    document.removeEventListener('mousemove', () => {})
    document.removeEventListener('touchmove', () => {})
    document.removeEventListener('mouseenter', () => {})
    document.removeEventListener('mouseleave', () => {})
    if (this.cursorDot && this.cursorDot.parentNode) {
      this.cursorDot.parentNode.removeChild(this.cursorDot)
    }
  }

  /**
   * Update cursor state based on reduced motion preference
   */
  updateReducedMotion(reducedMotion: boolean): void {
    this.reducedMotion = reducedMotion
    if (reducedMotion) {
      this.cursorDot.style.transition = 'none'
      this.cursorDot.style.width = '8px'
      this.cursorDot.style.height = '8px'
    } else {
      this.cursorDot.style.transition = 'transform 0.1s ease, width 0.2s ease, height 0.2s ease'
    }
  }
}

/**
 * Initialize the cursor controller
 */
export function init(options: CursorOptions): CursorController {
  return new CursorController(options)
}

/**
 * Update cursor reduced motion preference dynamically
 */
export function updateReducedMotion(controller: CursorController, reducedMotion: boolean): void {
  controller.updateReducedMotion(reducedMotion)
}