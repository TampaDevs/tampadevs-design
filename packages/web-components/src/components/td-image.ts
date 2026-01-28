import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { tokens, reset } from '../styles/shared.js';

export type ImageFit = 'cover' | 'contain' | 'fill' | 'none';

/**
 * Tampa Devs Image Component
 * Responsive image with loading states, captions, and lightbox support
 *
 * @element td-image
 *
 * @prop {string} src - Image source URL
 * @prop {string} alt - Alt text for accessibility
 * @prop {string} caption - Optional caption text
 * @prop {string} credit - Optional photo credit
 * @prop {string} aspectRatio - Aspect ratio (e.g., "16/9", "4/3", "1/1")
 * @prop {ImageFit} fit - Object-fit value (cover, contain, fill, none)
 * @prop {boolean} rounded - Apply rounded corners
 * @prop {boolean} shadow - Apply shadow
 * @prop {boolean} zoomable - Enable click-to-zoom lightbox
 * @prop {string} width - Max width (e.g., "100%", "600px")
 * @prop {boolean} lazy - Enable lazy loading (default: true)
 *
 * @csspart container - The image container
 * @csspart image - The image element
 * @csspart caption - The caption element
 */
@customElement('td-image')
export class TdImage extends LitElement {
  static styles = [
    tokens,
    reset,
    css`
      :host {
        display: block;
      }

      .container {
        position: relative;
        max-width: var(--image-max-width, 100%);
      }

      .image-wrapper {
        position: relative;
        overflow: hidden;
        background: rgba(28, 36, 56, 0.1);
      }

      :host([rounded]) .image-wrapper {
        border-radius: var(--td-radius-xl);
      }

      :host([shadow]) .image-wrapper {
        box-shadow: var(--td-shadow-xl);
      }

      .aspect-wrapper {
        position: relative;
        width: 100%;
      }

      .aspect-wrapper.has-ratio {
        padding-bottom: var(--aspect-padding);
      }

      .aspect-wrapper.has-ratio img {
        position: absolute;
        inset: 0;
      }

      img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: var(--image-fit, cover);
        transition: opacity var(--td-transition-normal), transform var(--td-transition-normal);
      }

      img.loading {
        opacity: 0;
      }

      img.loaded {
        opacity: 1;
      }

      /* Zoomable state */
      :host([zoomable]) .image-wrapper {
        cursor: zoom-in;
      }

      :host([zoomable]) .image-wrapper:hover img {
        transform: scale(1.02);
      }

      /* Loading skeleton */
      .skeleton {
        position: absolute;
        inset: 0;
        background: linear-gradient(
          90deg,
          rgba(255, 255, 255, 0.05) 25%,
          rgba(255, 255, 255, 0.1) 50%,
          rgba(255, 255, 255, 0.05) 75%
        );
        background-size: 200% 100%;
        animation: shimmer 1.5s infinite;
      }

      @keyframes shimmer {
        0% {
          background-position: 200% 0;
        }
        100% {
          background-position: -200% 0;
        }
      }

      .skeleton.hidden {
        display: none;
      }

      /* Caption */
      .caption-wrapper {
        padding: 0.75rem 0;
      }

      .caption {
        font-size: 0.875rem;
        color: rgba(156, 163, 175, 0.8);
        line-height: 1.5;
      }

      .credit {
        font-size: 0.75rem;
        color: rgba(156, 163, 175, 0.6);
        margin-top: 0.25rem;
      }

      /* Lightbox */
      .lightbox {
        position: fixed;
        inset: 0;
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(0, 0, 0, 0.9);
        backdrop-filter: blur(8px);
        opacity: 0;
        visibility: hidden;
        transition: all var(--td-transition-normal);
        cursor: zoom-out;
      }

      .lightbox.open {
        opacity: 1;
        visibility: visible;
      }

      .lightbox img {
        max-width: 90vw;
        max-height: 90vh;
        object-fit: contain;
        border-radius: var(--td-radius-lg);
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
      }

      .lightbox-close {
        position: absolute;
        top: 1rem;
        right: 1rem;
        width: 48px;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(255, 255, 255, 0.1);
        border: none;
        border-radius: 50%;
        color: white;
        cursor: pointer;
        transition: all var(--td-transition-fast);
      }

      .lightbox-close:hover {
        background: rgba(255, 255, 255, 0.2);
      }

      .lightbox-close svg {
        width: 24px;
        height: 24px;
      }

      .lightbox-caption {
        position: absolute;
        bottom: 2rem;
        left: 50%;
        transform: translateX(-50%);
        text-align: center;
        color: white;
        max-width: 80vw;
      }

      .lightbox-caption .caption {
        color: white;
        font-size: 1rem;
      }

      .lightbox-caption .credit {
        color: rgba(255, 255, 255, 0.7);
      }

      /* Error state */
      .error-state {
        position: absolute;
        inset: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        color: rgba(156, 163, 175, 0.6);
        background: rgba(28, 36, 56, 0.3);
      }

      .error-state svg {
        width: 48px;
        height: 48px;
        opacity: 0.5;
      }

      .error-state span {
        font-size: 0.875rem;
      }
    `,
  ];

  @property({ type: String }) src = '';
  @property({ type: String }) alt = '';
  @property({ type: String }) caption = '';
  @property({ type: String }) credit = '';
  @property({ type: String }) aspectRatio = '';
  @property({ type: String }) fit: ImageFit = 'cover';
  @property({ type: Boolean, reflect: true }) rounded = false;
  @property({ type: Boolean, reflect: true }) shadow = false;
  @property({ type: Boolean, reflect: true }) zoomable = false;
  @property({ type: String }) width = '100%';
  @property({ type: Boolean }) lazy = true;

  @state() private _isLoaded = false;
  @state() private _hasError = false;
  @state() private _lightboxOpen = false;

  private _getAspectPadding(): string | null {
    if (!this.aspectRatio) return null;
    const [width, height] = this.aspectRatio.split('/').map(Number);
    if (width && height) {
      return `${(height / width) * 100}%`;
    }
    return null;
  }

  private _handleLoad() {
    this._isLoaded = true;
    this._hasError = false;
  }

  private _handleError() {
    this._hasError = true;
    this._isLoaded = true;
  }

  private _openLightbox() {
    if (this.zoomable && !this._hasError) {
      this._lightboxOpen = true;
      document.body.style.overflow = 'hidden';
    }
  }

  private _closeLightbox() {
    this._lightboxOpen = false;
    document.body.style.overflow = '';
  }

  private _handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      this._closeLightbox();
    }
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('keydown', this._handleKeyDown.bind(this));
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('keydown', this._handleKeyDown.bind(this));
    document.body.style.overflow = '';
  }

  render() {
    const aspectPadding = this._getAspectPadding();

    return html`
      <figure
        class="container"
        part="container"
        style="--image-max-width: ${this.width}; --image-fit: ${this.fit}"
      >
        <div
          class="image-wrapper"
          @click=${this._openLightbox}
          role=${this.zoomable ? 'button' : nothing}
          tabindex=${this.zoomable ? '0' : nothing}
          aria-label=${this.zoomable ? 'Click to enlarge image' : nothing}
        >
          <div
            class="aspect-wrapper ${aspectPadding ? 'has-ratio' : ''}"
            style=${aspectPadding ? `--aspect-padding: ${aspectPadding}` : ''}
          >
            <div class="skeleton ${this._isLoaded ? 'hidden' : ''}"></div>

            ${this._hasError
              ? html`
                  <div class="error-state">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span>Failed to load image</span>
                  </div>
                `
              : html`
                  <img
                    part="image"
                    class="${this._isLoaded ? 'loaded' : 'loading'}"
                    src=${this.src}
                    alt=${this.alt}
                    loading=${this.lazy ? 'lazy' : 'eager'}
                    @load=${this._handleLoad}
                    @error=${this._handleError}
                  />
                `}
          </div>
        </div>

        ${this.caption || this.credit
          ? html`
              <figcaption class="caption-wrapper" part="caption">
                ${this.caption ? html`<div class="caption">${this.caption}</div>` : nothing}
                ${this.credit ? html`<div class="credit">Photo: ${this.credit}</div>` : nothing}
              </figcaption>
            `
          : nothing}
      </figure>

      ${this.zoomable
        ? html`
            <div
              class="lightbox ${this._lightboxOpen ? 'open' : ''}"
              @click=${this._closeLightbox}
            >
              <button
                class="lightbox-close"
                @click=${this._closeLightbox}
                aria-label="Close lightbox"
              >
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <img src=${this.src} alt=${this.alt} @click=${(e: Event) => e.stopPropagation()} />
              ${this.caption || this.credit
                ? html`
                    <div class="lightbox-caption">
                      ${this.caption ? html`<div class="caption">${this.caption}</div>` : nothing}
                      ${this.credit
                        ? html`<div class="credit">Photo: ${this.credit}</div>`
                        : nothing}
                    </div>
                  `
                : nothing}
            </div>
          `
        : nothing}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'td-image': TdImage;
  }
}
