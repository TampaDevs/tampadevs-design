import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tokens, reset } from '../styles/shared.js';

export interface MarqueeLogo {
  src: string;
  alt: string;
  href?: string;
}

/**
 * Tampa Devs Logo Marquee Component
 * Infinite scrolling logo carousel (sponsor logos, partner logos, etc.)
 *
 * @element td-logo-marquee
 *
 * @prop {MarqueeLogo[]} logos - Array of logos to display
 * @prop {number} speed - Animation duration in seconds (default: 30)
 * @prop {string} direction - Scroll direction (left, right)
 * @prop {boolean} pauseOnHover - Pause animation on hover (default: true)
 * @prop {string} logoHeight - Height of logos (default: 60px)
 * @prop {string} gap - Gap between logos (default: 3rem)
 * @prop {string} title - Optional title above marquee
 *
 * @csspart container - The main container
 * @csspart track - The scrolling track
 * @csspart logo - Each logo item
 */
@customElement('td-logo-marquee')
export class TdLogoMarquee extends LitElement {
  static styles = [
    tokens,
    reset,
    css`
      :host {
        display: block;
      }

      .container {
        background: rgba(28, 36, 56, 0.6);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        border-radius: var(--td-radius-xl);
        overflow: hidden;
        padding: 2rem 0;
      }

      .title {
        font-size: 1rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        color: rgba(156, 163, 175, 0.6);
        text-align: center;
        margin-bottom: 1.5rem;
      }

      .marquee-wrapper {
        position: relative;
        overflow: hidden;
        mask-image: linear-gradient(
          to right,
          transparent,
          black 10%,
          black 90%,
          transparent
        );
        -webkit-mask-image: linear-gradient(
          to right,
          transparent,
          black 10%,
          black 90%,
          transparent
        );
      }

      .marquee-track {
        display: flex;
        gap: var(--marquee-gap, 3rem);
        width: max-content;
        animation: marquee var(--marquee-speed, 30s) linear infinite;
      }

      :host([direction="right"]) .marquee-track {
        animation-direction: reverse;
      }

      :host([pauseOnHover]) .marquee-wrapper:hover .marquee-track {
        animation-play-state: paused;
      }

      @keyframes marquee {
        0% {
          transform: translateX(0);
        }
        100% {
          transform: translateX(-50%);
        }
      }

      .logo-group {
        display: flex;
        gap: var(--marquee-gap, 3rem);
        align-items: center;
      }

      .logo-item {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        transition: all var(--td-transition-fast);
      }

      a.logo-item:hover {
        transform: scale(1.05);
      }

      .logo-item img {
        height: var(--logo-height, 60px);
        width: auto;
        max-width: 200px;
        object-fit: contain;
        filter: grayscale(100%) brightness(0.8);
        opacity: 0.7;
        transition: all var(--td-transition-fast);
      }

      .logo-item:hover img {
        filter: grayscale(0%) brightness(1);
        opacity: 1;
      }

      /* Grayscale mode disabled variant */
      :host([color]) .logo-item img {
        filter: none;
        opacity: 1;
      }

      /* Empty state */
      .empty {
        padding: 2rem;
        text-align: center;
        color: rgba(156, 163, 175, 0.6);
      }

      /* Responsive */
      @media (max-width: 768px) {
        .container {
          padding: 1.5rem 0;
        }

        .logo-item img {
          height: calc(var(--logo-height, 60px) * 0.75);
        }
      }
    `,
  ];

  @property({ type: Array }) logos: MarqueeLogo[] = [];
  @property({ type: Number }) speed = 30;
  @property({ type: String, reflect: true }) direction: 'left' | 'right' = 'left';
  @property({ type: Boolean, reflect: true }) pauseOnHover = true;
  @property({ type: String }) logoHeight = '60px';
  @property({ type: String }) gap = '3rem';
  @property({ type: String }) title = '';
  @property({ type: Boolean, reflect: true }) color = false;

  private _renderLogo(logo: MarqueeLogo) {
    const img = html`<img src=${logo.src} alt=${logo.alt} loading="lazy" />`;

    if (logo.href) {
      return html`
        <a
          class="logo-item"
          part="logo"
          href=${logo.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          ${img}
        </a>
      `;
    }

    return html`
      <div class="logo-item" part="logo">
        ${img}
      </div>
    `;
  }

  private _renderLogoGroup() {
    return html`
      <div class="logo-group">
        ${this.logos.map((logo) => this._renderLogo(logo))}
      </div>
    `;
  }

  render() {
    if (this.logos.length === 0) {
      return html`
        <div class="container" part="container">
          <div class="empty">No logos to display</div>
        </div>
      `;
    }

    const trackStyle = `
      --marquee-speed: ${this.speed}s;
      --marquee-gap: ${this.gap};
      --logo-height: ${this.logoHeight};
    `;

    return html`
      <div class="container" part="container">
        ${this.title ? html`<div class="title">${this.title}</div>` : nothing}

        <div class="marquee-wrapper">
          <div class="marquee-track" part="track" style=${trackStyle}>
            ${this._renderLogoGroup()}
            ${this._renderLogoGroup()}
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'td-logo-marquee': TdLogoMarquee;
  }
}
