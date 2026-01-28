import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tokens, reset } from '../styles/shared.js';

/**
 * Tampa Devs Video Hero Component
 * Full-viewport hero section with autoplay video background
 *
 * @element td-video-hero
 *
 * @prop {string} videoWebm - WebM video source URL
 * @prop {string} videoMp4 - MP4 video source URL (fallback)
 * @prop {string} poster - Poster image URL (shown before video loads)
 * @prop {string} overlayColor - Overlay background color (default: semi-transparent navy)
 * @prop {number} height - Height in vh units (default: 80)
 *
 * @slot - Main content (logo, headings, CTAs)
 * @slot logo - Logo image slot
 * @slot heading - Main heading slot
 * @slot subheading - Subheading slot
 * @slot ctas - Call-to-action buttons slot
 *
 * @csspart container - The main container
 * @csspart video - The video element
 * @csspart overlay - The content overlay
 */
@customElement('td-video-hero')
export class TdVideoHero extends LitElement {
  static styles = [
    tokens,
    reset,
    css`
      :host {
        display: block;
        position: relative;
        width: 100%;
        overflow: hidden;
      }

      .hero {
        position: relative;
        width: 100%;
        min-height: var(--hero-height, 80vh);
        border-radius: var(--td-radius-md);
        overflow: hidden;
      }

      .video {
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: var(--overlay-color, rgba(28, 36, 56, 0.6));
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        padding: 4rem 2rem 5rem;
        color: white;
        box-sizing: border-box;
      }

      .content {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        max-width: 800px;
      }

      .logo-wrapper {
        margin-bottom: 1rem;
      }

      .logo-wrapper ::slotted(img) {
        max-width: 120px;
        height: auto;
      }

      @media (min-width: 768px) {
        .logo-wrapper ::slotted(img) {
          max-width: 145px;
        }
      }

      .heading-group {
        margin-bottom: 1rem;
      }

      .heading-group ::slotted(h1) {
        font-size: 2rem;
        font-weight: 700;
        margin: 0;
        color: white;
      }

      .heading-group ::slotted(h2) {
        font-size: 1.25rem;
        font-weight: 400;
        margin: 0.5rem 0 0 0;
        color: rgba(255, 255, 255, 0.9);
      }

      @media (min-width: 768px) {
        .heading-group ::slotted(h1) {
          font-size: 3rem;
        }

        .heading-group ::slotted(h2) {
          font-size: 1.5rem;
        }
      }

      .ctas {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 1rem;
        margin-top: 1.5rem;
      }

      .ctas ::slotted(a),
      .ctas ::slotted(button) {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        min-width: 180px;
        padding: 0.75rem 1.5rem;
        border-radius: var(--td-radius-lg);
        font-size: 1.125rem;
        font-weight: 600;
        text-transform: uppercase;
        text-decoration: none;
        color: white;
        background: rgba(232, 90, 79, 0.4);
        border: 1px solid var(--td-color-coral);
        transition: background-color 0.3s ease;
        cursor: pointer;
      }

      .ctas ::slotted(a:hover),
      .ctas ::slotted(button:hover) {
        background: var(--td-color-coral);
      }

      .ctas ::slotted(a.secondary),
      .ctas ::slotted(button.secondary) {
        background: rgba(26, 172, 156, 0.4);
        border-color: #1aac9c;
      }

      .ctas ::slotted(a.secondary:hover),
      .ctas ::slotted(button.secondary:hover) {
        background: #1aac9c;
      }

      /* Responsive height adjustments */
      @media (min-width: 800px) and (orientation: landscape) {
        .hero {
          min-height: var(--hero-height-desktop, 66.66vh);
        }
      }
    `,
  ];

  @property({ type: String }) videoWebm = '';
  @property({ type: String }) videoMp4 = '';
  @property({ type: String }) poster = '';
  @property({ type: String }) overlayColor = '';
  @property({ type: Number }) height = 80;

  render() {
    const heroStyle = `--hero-height: ${this.height}vh; --hero-height-desktop: ${Math.min(this.height, 66.66)}vh;`;
    const overlayStyle = this.overlayColor ? `--overlay-color: ${this.overlayColor};` : '';

    return html`
      <div class="hero" part="container" style=${heroStyle}>
        <video
          class="video"
          part="video"
          autoplay
          muted
          playsinline
          loop
          poster=${this.poster || nothing}
        >
          ${this.videoWebm ? html`<source type="video/webm" src=${this.videoWebm}>` : nothing}
          ${this.videoMp4 ? html`<source type="video/mp4" src=${this.videoMp4}>` : nothing}
        </video>

        <div class="overlay" part="overlay" style=${overlayStyle}>
          <div class="content">
            <div class="logo-wrapper">
              <slot name="logo"></slot>
            </div>

            <div class="heading-group">
              <slot name="heading"></slot>
              <slot name="subheading"></slot>
            </div>

            <div class="ctas">
              <slot name="ctas"></slot>
            </div>

            <slot></slot>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'td-video-hero': TdVideoHero;
  }
}
