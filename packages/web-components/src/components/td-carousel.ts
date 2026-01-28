import { LitElement, html, css } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { tokens, reset } from '../styles/shared.js';

/**
 * Tampa Devs Carousel Component
 * Horizontal scrolling carousel with navigation controls
 *
 * @element td-carousel
 *
 * @prop {string} title - Optional section title
 * @prop {number} scrollAmount - Pixels to scroll on button click (default: 400)
 * @prop {boolean} hideControls - Hide navigation buttons
 * @prop {string} gap - Gap between items (default: 1.5rem)
 *
 * @slot - Carousel items
 *
 * @csspart container - The main container
 * @csspart title - The title element
 * @csspart track - The scrolling track
 * @csspart button-left - Left navigation button
 * @csspart button-right - Right navigation button
 */
@customElement('td-carousel')
export class TdCarousel extends LitElement {
  static styles = [
    tokens,
    reset,
    css`
      :host {
        display: block;
        position: relative;
      }

      .carousel-title {
        font-size: 1.5rem;
        font-weight: 700;
        color: var(--td-color-text);
        margin-bottom: 1.5rem;
      }

      .carousel-wrapper {
        position: relative;
      }

      .carousel-wrapper:hover .nav-button {
        opacity: 1;
      }

      .carousel-track {
        display: flex;
        gap: var(--carousel-gap, 1.5rem);
        overflow-x: auto;
        padding-bottom: 1rem;
        scroll-snap-type: x mandatory;
        scrollbar-width: none;
        -ms-overflow-style: none;
      }

      .carousel-track::-webkit-scrollbar {
        display: none;
      }

      .carousel-track ::slotted(*) {
        flex-shrink: 0;
        scroll-snap-align: start;
      }

      .nav-button {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        z-index: 10;
        background: var(--td-color-surface);
        box-shadow: var(--td-shadow-lg);
        border-radius: var(--td-radius-full);
        padding: 0.5rem;
        opacity: 0;
        transition: opacity var(--td-transition-fast);
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .nav-button:hover {
        background: var(--td-color-border);
      }

      .nav-button--left {
        left: -1rem;
      }

      .nav-button--right {
        right: -1rem;
      }

      .nav-button svg {
        width: 1.5rem;
        height: 1.5rem;
        color: var(--td-color-text-muted);
      }

      /* Hide controls variant */
      :host([hideControls]) .nav-button {
        display: none;
      }

      /* Touch device - always show controls */
      @media (hover: none) {
        .nav-button {
          opacity: 1;
        }
      }
    `,
  ];

  @property({ type: String }) title = '';
  @property({ type: Number }) scrollAmount = 400;
  @property({ type: Boolean, reflect: true }) hideControls = false;
  @property({ type: String }) gap = '1.5rem';

  @query('.carousel-track') private track!: HTMLElement;

  private scrollTrack(direction: 'left' | 'right') {
    if (this.track) {
      const amount = direction === 'left' ? -this.scrollAmount : this.scrollAmount;
      this.track.scrollBy({
        left: amount,
        behavior: 'smooth',
      });
    }
  }

  render() {
    const trackStyle = `--carousel-gap: ${this.gap};`;

    return html`
      <div class="carousel-container" part="container">
        ${this.title
          ? html`<h2 class="carousel-title" part="title">${this.title}</h2>`
          : ''}

        <div class="carousel-wrapper">
          <button
            class="nav-button nav-button--left"
            part="button-left"
            @click=${() => this.scrollTrack('left')}
            aria-label="Scroll left"
          >
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div class="carousel-track" part="track" style=${trackStyle}>
            <slot></slot>
          </div>

          <button
            class="nav-button nav-button--right"
            part="button-right"
            @click=${() => this.scrollTrack('right')}
            aria-label="Scroll right"
          >
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'td-carousel': TdCarousel;
  }
}
