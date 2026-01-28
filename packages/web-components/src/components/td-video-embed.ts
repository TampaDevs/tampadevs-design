import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { tokens, reset } from '../styles/shared.js';
import './td-icon.js';

export type VideoProvider = 'youtube' | 'vimeo' | 'custom';

/**
 * Tampa Devs Video Embed Component
 * Responsive video embed with lazy loading support
 *
 * @element td-video-embed
 *
 * @prop {string} src - Video URL or embed URL
 * @prop {string} videoId - YouTube or Vimeo video ID (alternative to src)
 * @prop {VideoProvider} provider - Video provider (youtube, vimeo, custom)
 * @prop {string} title - Video title for accessibility
 * @prop {string} thumbnail - Custom thumbnail URL (for lazy loading)
 * @prop {string} aspectRatio - Aspect ratio (default: 16/9)
 * @prop {boolean} autoplay - Autoplay video (muted)
 * @prop {boolean} lazyLoad - Load video on click (shows thumbnail first)
 *
 * @csspart container - The video container
 * @csspart iframe - The video iframe
 * @csspart thumbnail - The thumbnail overlay
 * @csspart play-button - The play button
 */
@customElement('td-video-embed')
export class TdVideoEmbed extends LitElement {
  static styles = [
    tokens,
    reset,
    css`
      :host {
        display: block;
      }

      .container {
        position: relative;
        width: 100%;
        background: #000;
        border-radius: var(--td-radius-xl);
        overflow: hidden;
        box-shadow: var(--td-shadow-xl);
      }

      .aspect-wrapper {
        position: relative;
        width: 100%;
        padding-bottom: var(--aspect-ratio, 56.25%); /* 16:9 default */
      }

      iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border: none;
      }

      .thumbnail-overlay {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        background: #000;
      }

      .thumbnail-image {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform var(--td-transition-normal);
      }

      .thumbnail-overlay:hover .thumbnail-image {
        transform: scale(1.05);
      }

      .thumbnail-gradient {
        position: absolute;
        inset: 0;
        background: linear-gradient(
          to bottom,
          rgba(0, 0, 0, 0.1) 0%,
          rgba(0, 0, 0, 0.3) 50%,
          rgba(0, 0, 0, 0.5) 100%
        );
      }

      .play-button {
        position: relative;
        z-index: 1;
        width: 80px;
        height: 80px;
        display: flex;
        align-items: center;
        justify-content: center;
        /* Pure frosted glass effect */
        background: linear-gradient(
          135deg,
          rgba(255, 255, 255, 0.35) 0%,
          rgba(255, 255, 255, 0.15) 50%,
          rgba(255, 255, 255, 0.1) 100%
        );
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        border-radius: 50%;
        /* Glass edge highlight */
        border: 1.5px solid rgba(255, 255, 255, 0.4);
        transition: all var(--td-transition-fast);
        /* Multi-layer shadow for depth */
        box-shadow:
          /* Outer shadow for depth */
          0 8px 32px rgba(0, 0, 0, 0.25),
          0 4px 12px rgba(0, 0, 0, 0.15),
          /* Inner highlight - top edge shine */
          inset 0 1px 2px rgba(255, 255, 255, 0.5),
          /* Inner shadow - bottom for 3D depth */
          inset 0 -2px 6px rgba(0, 0, 0, 0.15);
      }

      .thumbnail-overlay:hover .play-button {
        transform: scale(1.1);
        border-color: rgba(255, 255, 255, 0.6);
        background: linear-gradient(
          135deg,
          rgba(255, 255, 255, 0.45) 0%,
          rgba(255, 255, 255, 0.2) 50%,
          rgba(255, 255, 255, 0.15) 100%
        );
        box-shadow:
          0 12px 40px rgba(0, 0, 0, 0.3),
          0 6px 16px rgba(0, 0, 0, 0.2),
          /* Subtle white glow on hover */
          0 0 20px rgba(255, 255, 255, 0.15),
          inset 0 1px 3px rgba(255, 255, 255, 0.6),
          inset 0 -2px 6px rgba(0, 0, 0, 0.1);
      }

      .play-button svg {
        position: relative;
        z-index: 1;
        width: 32px;
        height: 32px;
        color: white;
        margin-left: 4px; /* Visual centering for play icon */
        filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.4));
      }

      .video-title {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 1.5rem;
        color: white;
        font-weight: 600;
        font-size: 1.125rem;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
        z-index: 1;
      }

      /* Loading state */
      .loading {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(28, 36, 56, 0.9);
      }

      .loading-spinner {
        width: 48px;
        height: 48px;
        border: 3px solid rgba(255, 255, 255, 0.1);
        border-top-color: var(--td-color-coral);
        border-radius: 50%;
        animation: spin 1s linear infinite;
      }

      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }

      /* Responsive */
      @media (max-width: 640px) {
        .play-button {
          width: 60px;
          height: 60px;
        }

        .play-button svg {
          width: 24px;
          height: 24px;
          margin-left: 3px;
        }

        .video-title {
          font-size: 1rem;
          padding: 1rem;
        }
      }
    `,
  ];

  @property({ type: String }) src = '';
  @property({ type: String }) videoId = '';
  @property({ type: String }) provider: VideoProvider = 'youtube';
  @property({ type: String }) title = 'Video';
  @property({ type: String }) thumbnail = '';
  @property({ type: String }) aspectRatio = '16/9';
  @property({ type: Boolean }) autoplay = false;
  @property({ type: Boolean }) lazyLoad = true;

  @state() private _isLoaded = false;
  @state() private _isLoading = false;

  private _getEmbedUrl(): string {
    if (this.src) {
      return this.src;
    }

    if (this.videoId) {
      switch (this.provider) {
        case 'youtube':
          const ytParams = new URLSearchParams({
            autoplay: this.autoplay || this._isLoaded ? '1' : '0',
            rel: '0',
            modestbranding: '1',
          });
          return `https://www.youtube.com/embed/${this.videoId}?${ytParams}`;

        case 'vimeo':
          const vimeoParams = new URLSearchParams({
            autoplay: this.autoplay || this._isLoaded ? '1' : '0',
          });
          return `https://player.vimeo.com/video/${this.videoId}?${vimeoParams}`;

        default:
          return '';
      }
    }

    return '';
  }

  private _getThumbnailUrl(): string {
    if (this.thumbnail) {
      return this.thumbnail;
    }

    if (this.videoId && this.provider === 'youtube') {
      return `https://img.youtube.com/vi/${this.videoId}/maxresdefault.jpg`;
    }

    return '';
  }

  private _getAspectPadding(): string {
    const [width, height] = this.aspectRatio.split('/').map(Number);
    if (width && height) {
      return `${(height / width) * 100}%`;
    }
    return '56.25%'; // 16:9 default
  }

  private _handlePlayClick() {
    this._isLoading = true;
    this._isLoaded = true;
  }

  private _handleIframeLoad() {
    this._isLoading = false;
  }

  render() {
    const embedUrl = this._getEmbedUrl();
    const thumbnailUrl = this._getThumbnailUrl();
    const showThumbnail = this.lazyLoad && !this._isLoaded && thumbnailUrl;

    return html`
      <div class="container" part="container">
        <div
          class="aspect-wrapper"
          style="--aspect-ratio: ${this._getAspectPadding()}"
        >
          ${this._isLoaded || !this.lazyLoad
            ? html`
                <iframe
                  part="iframe"
                  src=${embedUrl}
                  title=${this.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen
                  @load=${this._handleIframeLoad}
                ></iframe>
                ${this._isLoading
                  ? html`
                      <div class="loading">
                        <div class="loading-spinner"></div>
                      </div>
                    `
                  : nothing}
              `
            : nothing}

          ${showThumbnail
            ? html`
                <div
                  class="thumbnail-overlay"
                  part="thumbnail"
                  @click=${this._handlePlayClick}
                  role="button"
                  tabindex="0"
                  aria-label="Play video: ${this.title}"
                  @keydown=${(e: KeyboardEvent) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      this._handlePlayClick();
                    }
                  }}
                >
                  <img
                    class="thumbnail-image"
                    src=${thumbnailUrl}
                    alt=""
                    loading="lazy"
                  />
                  <div class="thumbnail-gradient"></div>
                  <div class="play-button" part="play-button">
                    <svg fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  ${this.title
                    ? html`<div class="video-title">${this.title}</div>`
                    : nothing}
                </div>
              `
            : nothing}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'td-video-embed': TdVideoEmbed;
  }
}
