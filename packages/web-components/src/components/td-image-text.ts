import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tokens, reset } from '../styles/shared.js';

/**
 * Tampa Devs Image Text Component
 * Side-by-side image and text layout with reversible order
 *
 * @element td-image-text
 *
 * @prop {string} imageSrc - Image source URL
 * @prop {string} imageAlt - Image alt text
 * @prop {string} title - Section title
 * @prop {string} description - Section description
 * @prop {boolean} reversed - Reverse the order (text first, then image)
 * @prop {string} imagePosition - Image position: 'cover' | 'contain' | 'auto'
 * @prop {string} ctaText - CTA button text
 * @prop {string} ctaHref - CTA button link
 *
 * @slot image - Custom image slot
 * @slot content - Custom content slot (replaces title/description)
 * @slot cta - Custom CTA slot
 *
 * @csspart container - The main container
 * @csspart image-wrapper - The image wrapper
 * @csspart image - The image element
 * @csspart content - The content wrapper
 * @csspart title - The title element
 * @csspart description - The description element
 * @csspart cta - The CTA button
 */
@customElement('td-image-text')
export class TdImageText extends LitElement {
  static styles = [
    tokens,
    reset,
    css`
      :host {
        display: block;
        width: 100%;
      }

      .container {
        display: grid;
        grid-template-columns: 1fr;
        gap: 2rem;
        align-items: center;
      }

      @media (min-width: 768px) {
        .container {
          grid-template-columns: 1fr 1fr;
        }

        :host([reversed]) .container {
          direction: rtl;
        }

        :host([reversed]) .container > * {
          direction: ltr;
        }
      }

      .image-wrapper {
        width: 100%;
        aspect-ratio: 16 / 10;
        border-radius: var(--td-radius-lg);
        overflow: hidden;
        background-color: var(--td-color-border);
      }

      .image-wrapper img,
      .image-wrapper ::slotted(img) {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      :host([imagePosition="contain"]) .image-wrapper img,
      :host([imagePosition="contain"]) .image-wrapper ::slotted(img) {
        object-fit: contain;
      }

      :host([imagePosition="auto"]) .image-wrapper img,
      :host([imagePosition="auto"]) .image-wrapper ::slotted(img) {
        object-fit: none;
      }

      .content {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      .title {
        font-size: 2rem;
        font-weight: 700;
        color: var(--td-color-text);
        margin: 0;
        line-height: 1.2;
      }

      .description {
        font-size: 1.125rem;
        color: var(--td-color-text-muted);
        margin: 0;
        line-height: 1.6;
      }

      .cta-button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0.75rem 1.5rem;
        background-color: var(--td-color-coral);
        color: white;
        font-weight: 600;
        text-transform: uppercase;
        text-decoration: none;
        border-radius: var(--td-radius-md);
        transition: background-color var(--td-transition-fast);
        margin-top: 0.5rem;
        width: fit-content;
      }

      .cta-button:hover {
        background-color: var(--td-color-coral-light);
      }

      .cta-slot ::slotted(a),
      .cta-slot ::slotted(button) {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0.75rem 1.5rem;
        background-color: var(--td-color-coral);
        color: white;
        font-weight: 600;
        text-transform: uppercase;
        text-decoration: none;
        border-radius: var(--td-radius-md);
        border: none;
        cursor: pointer;
        transition: background-color var(--td-transition-fast);
      }

      .cta-slot ::slotted(a:hover),
      .cta-slot ::slotted(button:hover) {
        background-color: var(--td-color-coral-light);
      }
    `,
  ];

  @property({ type: String }) imageSrc = '';
  @property({ type: String }) imageAlt = '';
  @property({ type: String }) title = '';
  @property({ type: String }) description = '';
  @property({ type: Boolean, reflect: true }) reversed = false;
  @property({ type: String, reflect: true }) imagePosition: 'cover' | 'contain' | 'auto' = 'cover';
  @property({ type: String }) ctaText = '';
  @property({ type: String }) ctaHref = '';

  render() {
    return html`
      <div class="container" part="container">
        <div class="image-wrapper" part="image-wrapper">
          ${this.imageSrc
            ? html`<img src=${this.imageSrc} alt=${this.imageAlt} part="image" />`
            : html`<slot name="image"></slot>`}
        </div>

        <div class="content" part="content">
          <slot name="content">
            ${this.title
              ? html`<h2 class="title" part="title">${this.title}</h2>`
              : nothing}

            ${this.description
              ? html`<p class="description" part="description">${this.description}</p>`
              : nothing}
          </slot>

          ${this.ctaText && this.ctaHref
            ? html`<a class="cta-button" href=${this.ctaHref} part="cta">${this.ctaText}</a>`
            : html`<div class="cta-slot"><slot name="cta"></slot></div>`}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'td-image-text': TdImageText;
  }
}
