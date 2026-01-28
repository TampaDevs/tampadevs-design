import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tokens, reset } from '../styles/shared.js';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type AvatarShape = 'circle' | 'square';

/**
 * Tampa Devs Avatar Component
 * Profile photo display with fallback initials
 *
 * @element td-avatar
 *
 * @prop {string} src - Image URL
 * @prop {string} alt - Alt text for the image
 * @prop {string} name - Name for generating fallback initials
 * @prop {'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'} size - Avatar size
 * @prop {'circle' | 'square'} shape - Avatar shape
 * @prop {boolean} ring - Show accent ring around avatar
 * @prop {string} status - Status indicator: 'online' | 'offline' | 'busy' | 'away'
 *
 * @csspart avatar - The avatar container
 * @csspart image - The image element
 * @csspart fallback - The fallback initials container
 * @csspart status - The status indicator
 */
@customElement('td-avatar')
export class TdAvatar extends LitElement {
  static styles = [
    tokens,
    reset,
    css`
      :host {
        display: inline-block;
        position: relative;
      }

      .avatar {
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        background: linear-gradient(135deg, var(--td-color-navy-light), var(--td-color-navy));
        border: 2px solid rgba(255, 255, 255, 0.1);
        transition: all var(--td-transition-fast);
      }

      :host([shape="circle"]) .avatar,
      :host(:not([shape])) .avatar {
        border-radius: var(--td-radius-full);
      }

      :host([shape="square"]) .avatar {
        border-radius: var(--td-radius-lg);
      }

      :host([ring]) .avatar {
        box-shadow: 0 0 0 3px var(--td-color-coral);
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .fallback {
        color: white;
        font-weight: 600;
        text-transform: uppercase;
        user-select: none;
      }

      .status {
        position: absolute;
        border-radius: var(--td-radius-full);
        border: 2px solid var(--td-color-navy);
      }

      .status-online {
        background-color: var(--td-color-success, #10B981);
      }

      .status-offline {
        background-color: #6B7280;
      }

      .status-busy {
        background-color: var(--td-color-error, #EF4444);
      }

      .status-away {
        background-color: var(--td-color-warning, #F59E0B);
      }

      /* Size: xs (24px) */
      :host([size="xs"]) .avatar {
        width: 24px;
        height: 24px;
      }
      :host([size="xs"]) .fallback {
        font-size: 0.5rem;
      }
      :host([size="xs"]) .status {
        width: 8px;
        height: 8px;
        bottom: -2px;
        right: -2px;
      }

      /* Size: sm (32px) */
      :host([size="sm"]) .avatar {
        width: 32px;
        height: 32px;
      }
      :host([size="sm"]) .fallback {
        font-size: 0.625rem;
      }
      :host([size="sm"]) .status {
        width: 10px;
        height: 10px;
        bottom: -1px;
        right: -1px;
      }

      /* Size: md (48px) - default */
      :host([size="md"]) .avatar,
      :host(:not([size])) .avatar {
        width: 48px;
        height: 48px;
      }
      :host([size="md"]) .fallback,
      :host(:not([size])) .fallback {
        font-size: 0.875rem;
      }
      :host([size="md"]) .status,
      :host(:not([size])) .status {
        width: 12px;
        height: 12px;
        bottom: 0;
        right: 0;
      }

      /* Size: lg (64px) */
      :host([size="lg"]) .avatar {
        width: 64px;
        height: 64px;
      }
      :host([size="lg"]) .fallback {
        font-size: 1rem;
      }
      :host([size="lg"]) .status {
        width: 14px;
        height: 14px;
        bottom: 2px;
        right: 2px;
      }

      /* Size: xl (96px) */
      :host([size="xl"]) .avatar {
        width: 96px;
        height: 96px;
      }
      :host([size="xl"]) .fallback {
        font-size: 1.5rem;
      }
      :host([size="xl"]) .status {
        width: 18px;
        height: 18px;
        bottom: 4px;
        right: 4px;
      }

      /* Size: 2xl (128px) */
      :host([size="2xl"]) .avatar {
        width: 128px;
        height: 128px;
      }
      :host([size="2xl"]) .fallback {
        font-size: 2rem;
      }
      :host([size="2xl"]) .status {
        width: 24px;
        height: 24px;
        bottom: 6px;
        right: 6px;
      }
    `,
  ];

  @property({ type: String }) src = '';
  @property({ type: String }) alt = '';
  @property({ type: String }) name = '';
  @property({ type: String, reflect: true }) size: AvatarSize = 'md';
  @property({ type: String, reflect: true }) shape: AvatarShape = 'circle';
  @property({ type: Boolean, reflect: true }) ring = false;
  @property({ type: String }) status = '';

  private _imageError = false;

  private getInitials(): string {
    if (!this.name) return '?';
    const parts = this.name.trim().split(/\s+/);
    if (parts.length === 1) {
      return parts[0].substring(0, 2);
    }
    return parts[0][0] + parts[parts.length - 1][0];
  }

  private handleImageError() {
    this._imageError = true;
    this.requestUpdate();
  }

  render() {
    const showImage = this.src && !this._imageError;

    return html`
      <div class="avatar" part="avatar">
        ${showImage
          ? html`
              <img
                src=${this.src}
                alt=${this.alt || this.name}
                part="image"
                @error=${this.handleImageError}
              />
            `
          : html`
              <span class="fallback" part="fallback">
                ${this.getInitials()}
              </span>
            `}
      </div>
      ${this.status
        ? html`<span class="status status-${this.status}" part="status"></span>`
        : nothing}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'td-avatar': TdAvatar;
  }
}
