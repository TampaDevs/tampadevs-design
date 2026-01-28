import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { tokens, reset } from '../styles/shared.js';
import './td-icon.js';

export interface CarouselImage {
  src: string;
  alt: string;
  title?: string;
  caption?: string;
}

/**
 * Tampa Devs Image Carousel Component
 * Auto-playing image gallery with navigation dots
 *
 * @element td-image-carousel
 *
 * @prop {CarouselImage[]} images - Array of images to display
 * @prop {boolean} autoplay - Enable auto-play (default: true)
 * @prop {number} interval - Auto-play interval in ms (default: 4000)
 * @prop {boolean} showDots - Show navigation dots (default: true)
 * @prop {boolean} showArrows - Show navigation arrows (default: true)
 * @prop {boolean} showCaptions - Show image captions (default: true)
 * @prop {boolean} loop - Loop back to start (default: true)
 * @prop {string} aspectRatio - Container aspect ratio (default: 16/9)
 *
 * @fires slide-change - When the active slide changes
 *
 * @csspart container - The main container
 * @csspart slide - Each slide
 * @csspart dots - The dots container
 * @csspart dot - Each dot
 * @csspart arrow - Navigation arrows
 */
@customElement('td-image-carousel')
export class TdImageCarousel extends LitElement {
  static styles = [
    tokens,
    reset,
    css`
      :host {
        display: block;
      }

      .container {
        position: relative;
        border-radius: var(--td-radius-xl);
        overflow: hidden;
        background: #000;
        box-shadow: var(--td-shadow-xl);
      }

      .slides-wrapper {
        position: relative;
        width: 100%;
        padding-bottom: var(--aspect-ratio, 56.25%);
      }

      .slides-track {
        position: absolute;
        inset: 0;
        display: flex;
        transition: transform 0.5s ease-out;
      }

      .slide {
        flex-shrink: 0;
        width: 100%;
        height: 100%;
        position: relative;
      }

      .slide img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: opacity 0.3s ease;
      }

      .slide:not(.active) img {
        opacity: 0.5;
      }

      /* Caption overlay */
      .caption-overlay {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 2rem;
        background: linear-gradient(
          to top,
          rgba(0, 0, 0, 0.8) 0%,
          rgba(0, 0, 0, 0.4) 50%,
          transparent 100%
        );
        color: white;
      }

      .caption-title {
        font-size: 1.25rem;
        font-weight: 700;
        margin-bottom: 0.25rem;
      }

      .caption-text {
        font-size: 0.875rem;
        color: rgba(255, 255, 255, 0.8);
      }

      /* Navigation arrows */
      .nav-arrow {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        z-index: 10;
        width: 48px;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(0, 0, 0, 0.5);
        border: none;
        border-radius: 50%;
        color: white;
        cursor: pointer;
        opacity: 0;
        transition: all var(--td-transition-fast);
      }

      .container:hover .nav-arrow {
        opacity: 1;
      }

      .nav-arrow:hover {
        background: rgba(0, 0, 0, 0.8);
      }

      .nav-arrow:disabled {
        opacity: 0.3;
        cursor: not-allowed;
      }

      .nav-arrow.prev {
        left: 1rem;
      }

      .nav-arrow.next {
        right: 1rem;
      }

      .nav-arrow svg {
        width: 24px;
        height: 24px;
      }

      /* Dots navigation */
      .dots {
        position: absolute;
        bottom: 1rem;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 0.5rem;
        z-index: 10;
      }

      .dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.4);
        border: none;
        padding: 0;
        cursor: pointer;
        transition: all var(--td-transition-fast);
      }

      .dot:hover {
        background: rgba(255, 255, 255, 0.6);
      }

      .dot.active {
        background: white;
        transform: scale(1.25);
      }

      /* Progress bar for autoplay */
      .progress-bar {
        position: absolute;
        bottom: 0;
        left: 0;
        height: 3px;
        background: var(--td-color-coral);
        transition: width linear;
        z-index: 10;
      }

      /* Hide controls variant */
      :host([minimal]) .nav-arrow,
      :host([minimal]) .dots,
      :host([minimal]) .progress-bar {
        display: none;
      }

      /* Touch device - always show arrows */
      @media (hover: none) {
        .nav-arrow {
          opacity: 1;
        }
      }

      /* Responsive */
      @media (max-width: 640px) {
        .nav-arrow {
          width: 40px;
          height: 40px;
        }

        .nav-arrow svg {
          width: 20px;
          height: 20px;
        }

        .caption-overlay {
          padding: 1rem;
        }

        .caption-title {
          font-size: 1rem;
        }
      }
    `,
  ];

  @property({ type: Array }) images: CarouselImage[] = [];
  @property({ type: Boolean }) autoplay = true;
  @property({ type: Number }) interval = 4000;
  @property({ type: Boolean }) showDots = true;
  @property({ type: Boolean }) showArrows = true;
  @property({ type: Boolean }) showCaptions = true;
  @property({ type: Boolean }) loop = true;
  @property({ type: String }) aspectRatio = '16/9';
  @property({ type: Boolean, reflect: true }) minimal = false;

  @state() private _currentIndex = 0;
  @state() private _progress = 0;

  private _autoplayTimer: number | null = null;
  private _progressTimer: number | null = null;

  connectedCallback() {
    super.connectedCallback();
    if (this.autoplay) {
      this._startAutoplay();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._stopAutoplay();
  }

  private _startAutoplay() {
    this._stopAutoplay();
    this._progress = 0;

    const progressInterval = 50; // Update progress every 50ms
    const progressIncrement = (progressInterval / this.interval) * 100;

    this._progressTimer = window.setInterval(() => {
      this._progress += progressIncrement;
      if (this._progress >= 100) {
        this._progress = 0;
        this._next();
      }
    }, progressInterval);
  }

  private _stopAutoplay() {
    if (this._autoplayTimer) {
      clearInterval(this._autoplayTimer);
      this._autoplayTimer = null;
    }
    if (this._progressTimer) {
      clearInterval(this._progressTimer);
      this._progressTimer = null;
    }
  }

  private _getAspectPadding(): string {
    const [width, height] = this.aspectRatio.split('/').map(Number);
    if (width && height) {
      return `${(height / width) * 100}%`;
    }
    return '56.25%'; // 16:9 default
  }

  private _goToSlide(index: number) {
    if (this.loop) {
      if (index < 0) {
        index = this.images.length - 1;
      } else if (index >= this.images.length) {
        index = 0;
      }
    } else {
      index = Math.max(0, Math.min(index, this.images.length - 1));
    }

    this._currentIndex = index;
    this._progress = 0;

    this.dispatchEvent(
      new CustomEvent('slide-change', {
        detail: { index, image: this.images[index] },
        bubbles: true,
        composed: true,
      })
    );

    // Restart autoplay timer
    if (this.autoplay) {
      this._startAutoplay();
    }
  }

  private _prev() {
    this._goToSlide(this._currentIndex - 1);
  }

  private _next() {
    this._goToSlide(this._currentIndex + 1);
  }

  private _handleMouseEnter() {
    if (this.autoplay) {
      this._stopAutoplay();
    }
  }

  private _handleMouseLeave() {
    if (this.autoplay) {
      this._startAutoplay();
    }
  }

  private _renderSlide(image: CarouselImage, index: number) {
    const isActive = index === this._currentIndex;

    return html`
      <div class="slide ${isActive ? 'active' : ''}" part="slide">
        <img src=${image.src} alt=${image.alt} loading=${index === 0 ? 'eager' : 'lazy'} />
        ${this.showCaptions && (image.title || image.caption)
          ? html`
              <div class="caption-overlay">
                ${image.title ? html`<div class="caption-title">${image.title}</div>` : nothing}
                ${image.caption ? html`<div class="caption-text">${image.caption}</div>` : nothing}
              </div>
            `
          : nothing}
      </div>
    `;
  }

  render() {
    if (this.images.length === 0) {
      return html`<div class="container" part="container">No images to display</div>`;
    }

    const canGoPrev = this.loop || this._currentIndex > 0;
    const canGoNext = this.loop || this._currentIndex < this.images.length - 1;

    return html`
      <div
        class="container"
        part="container"
        @mouseenter=${this._handleMouseEnter}
        @mouseleave=${this._handleMouseLeave}
      >
        <div class="slides-wrapper" style="--aspect-ratio: ${this._getAspectPadding()}">
          <div
            class="slides-track"
            style="transform: translateX(-${this._currentIndex * 100}%)"
          >
            ${this.images.map((img, i) => this._renderSlide(img, i))}
          </div>

          ${this.showArrows
            ? html`
                <button
                  class="nav-arrow prev"
                  part="arrow"
                  @click=${this._prev}
                  ?disabled=${!canGoPrev}
                  aria-label="Previous image"
                >
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  class="nav-arrow next"
                  part="arrow"
                  @click=${this._next}
                  ?disabled=${!canGoNext}
                  aria-label="Next image"
                >
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              `
            : nothing}

          ${this.showDots && this.images.length > 1
            ? html`
                <div class="dots" part="dots">
                  ${this.images.map(
                    (_, i) => html`
                      <button
                        class="dot ${i === this._currentIndex ? 'active' : ''}"
                        part="dot"
                        @click=${() => this._goToSlide(i)}
                        aria-label="Go to slide ${i + 1}"
                      ></button>
                    `
                  )}
                </div>
              `
            : nothing}

          ${this.autoplay
            ? html`<div class="progress-bar" style="width: ${this._progress}%"></div>`
            : nothing}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'td-image-carousel': TdImageCarousel;
  }
}
