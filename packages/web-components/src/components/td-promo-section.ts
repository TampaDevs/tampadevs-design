import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tokens, reset } from '../styles/shared.js';

/**
 * Tampa Devs Promo Section Component
 * Full-width promotional section with background image and modern glass overlay
 *
 * @element td-promo-section
 *
 * @prop {string} backgroundImage - Background image URL
 * @prop {string} tag - Optional tag/category text (uppercase)
 * @prop {string} title - Main title text
 * @prop {string} description - Description text
 * @prop {string} ctaText - CTA button text
 * @prop {string} ctaHref - CTA button link
 * @prop {boolean} flipped - Flip alignment to right side
 * @prop {string} logoSrc - Optional logo image source
 * @prop {string} variant - Style variant: 'gradient' | 'glass' | 'solid'
 *
 * @slot - Default slot for custom content
 * @slot logo - Logo slot
 * @slot cta - Custom CTA slot
 *
 * @csspart container - The main container
 * @csspart content - The content wrapper
 * @csspart tag - The tag element
 * @csspart title - The title element
 * @csspart description - The description element
 * @csspart cta - The CTA button
 */
@customElement('td-promo-section')
export class TdPromoSection extends LitElement {
  static styles = [
    tokens,
    reset,
    css`
      :host {
        display: block;
        width: 100%;
      }

      .promo {
        background-position: center center;
        background-size: cover;
        border-radius: var(--td-radius-xl);
        position: relative;
        width: 100%;
        min-height: 320px;
        overflow: hidden;
      }

      /* Gradient variant (default) */
      .promo--gradient .promo__content {
        background-image: linear-gradient(
          to right,
          rgba(28, 36, 56, 0.95) 0%,
          rgba(28, 36, 56, 0.7) 50%,
          transparent 100%
        );
      }

      .promo--gradient.promo--flipped .promo__content {
        background-image: linear-gradient(
          to left,
          rgba(28, 36, 56, 0.95) 0%,
          rgba(28, 36, 56, 0.7) 50%,
          transparent 100%
        );
      }

      /* Glass variant with soft fade */
      .promo--glass::before {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(
          to right,
          rgba(28, 36, 56, 0.85) 0%,
          rgba(28, 36, 56, 0.7) 30%,
          rgba(28, 36, 56, 0.3) 60%,
          transparent 100%
        );
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        mask-image: linear-gradient(
          to right,
          black 0%,
          black 40%,
          transparent 100%
        );
        -webkit-mask-image: linear-gradient(
          to right,
          black 0%,
          black 40%,
          transparent 100%
        );
        border-radius: var(--td-radius-xl);
        pointer-events: none;
      }

      .promo--glass.promo--flipped::before {
        background: linear-gradient(
          to left,
          rgba(28, 36, 56, 0.85) 0%,
          rgba(28, 36, 56, 0.7) 30%,
          rgba(28, 36, 56, 0.3) 60%,
          transparent 100%
        );
        mask-image: linear-gradient(
          to left,
          black 0%,
          black 40%,
          transparent 100%
        );
        -webkit-mask-image: linear-gradient(
          to left,
          black 0%,
          black 40%,
          transparent 100%
        );
      }

      .promo--glass .promo__content {
        background: transparent;
        position: relative;
        z-index: 1;
      }

      /* Solid variant */
      .promo--solid .promo__content {
        background: rgba(28, 36, 56, 0.9);
      }

      .promo__content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        height: 100%;
        min-height: 320px;
        padding: 2rem;
        color: white;
        border-radius: var(--td-radius-xl);
        transition: all var(--td-transition-normal);
      }

      @media (min-width: 640px) {
        .promo__content {
          padding: 3rem;
        }
      }

      @media (min-width: 768px) {
        .promo__content {
          padding: 4rem;
          max-width: 60%;
        }
      }

      .promo--flipped .promo__content {
        align-items: flex-end;
        text-align: right;
        margin-left: auto;
      }

      .logo {
        max-width: 180px;
        margin-bottom: 1.5rem;
      }

      .logo img,
      .logo ::slotted(img) {
        max-width: 180px;
        height: auto;
      }

      .tag {
        text-transform: uppercase;
        font-weight: 600;
        font-size: 0.75rem;
        letter-spacing: 0.1em;
        margin: 0 0 0.5rem 0;
        color: var(--td-color-coral);
      }

      .title {
        color: white;
        margin: 0;
        font-size: 1.75rem;
        font-weight: 700;
        line-height: 1.2;
      }

      @media (min-width: 640px) {
        .title {
          font-size: 2.25rem;
        }
      }

      .description {
        color: rgba(255, 255, 255, 0.85);
        max-width: 500px;
        font-size: 1rem;
        line-height: 1.6;
        margin: 1rem 0 0 0;
      }

      @media (min-width: 640px) {
        .description {
          font-size: 1.125rem;
        }
      }

      .cta-button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        color: white;
        background-color: var(--td-color-coral);
        padding: 0.875rem 1.5rem;
        border-radius: var(--td-radius-lg);
        font-weight: 600;
        font-size: 0.875rem;
        text-decoration: none;
        text-transform: uppercase;
        letter-spacing: 0.025em;
        margin-top: 1.5rem;
        transition: all var(--td-transition-fast);
        box-shadow: 0 4px 6px -1px rgba(232, 90, 79, 0.25);
      }

      .cta-button:hover {
        background-color: var(--td-color-coral-light);
        transform: translateY(-1px);
        box-shadow: 0 6px 10px -2px rgba(232, 90, 79, 0.3);
      }

      .cta-slot ::slotted(a),
      .cta-slot ::slotted(button) {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        color: white;
        background-color: var(--td-color-coral);
        padding: 0.875rem 1.5rem;
        border-radius: var(--td-radius-lg);
        font-weight: 600;
        font-size: 0.875rem;
        text-decoration: none;
        text-transform: uppercase;
        letter-spacing: 0.025em;
        margin-top: 1.5rem;
        border: none;
        cursor: pointer;
        transition: all var(--td-transition-fast);
      }

      .cta-slot ::slotted(a:hover),
      .cta-slot ::slotted(button:hover) {
        background-color: var(--td-color-coral-light);
      }
    `,
  ];

  @property({ type: String }) backgroundImage = '';
  @property({ type: String }) tag = '';
  @property({ type: String }) title = '';
  @property({ type: String }) description = '';
  @property({ type: String }) ctaText = '';
  @property({ type: String }) ctaHref = '';
  @property({ type: Boolean }) flipped = false;
  @property({ type: String }) logoSrc = '';
  @property({ type: String }) variant: 'gradient' | 'glass' | 'solid' = 'gradient';

  render() {
    const containerStyle = this.backgroundImage
      ? `background-image: url(${this.backgroundImage});`
      : 'background-color: var(--td-color-navy);';

    return html`
      <div
        class="promo promo--${this.variant} ${this.flipped ? 'promo--flipped' : ''}"
        part="container"
        style=${containerStyle}
      >
        <div class="promo__content" part="content">
          ${this.logoSrc
            ? html`<div class="logo"><img src=${this.logoSrc} alt="" part="logo" /></div>`
            : html`<div class="logo"><slot name="logo"></slot></div>`}

          ${this.tag
            ? html`<p class="tag" part="tag">${this.tag}</p>`
            : nothing}

          ${this.title
            ? html`<h2 class="title" part="title">${this.title}</h2>`
            : nothing}

          ${this.description
            ? html`<p class="description" part="description">${this.description}</p>`
            : nothing}

          ${this.ctaText && this.ctaHref
            ? html`<a class="cta-button" href=${this.ctaHref} part="cta">${this.ctaText}</a>`
            : html`<div class="cta-slot"><slot name="cta"></slot></div>`}

          <slot></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'td-promo-section': TdPromoSection;
  }
}
