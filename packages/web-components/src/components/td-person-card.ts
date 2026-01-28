import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tokens, reset } from '../styles/shared.js';
import './td-avatar.js';
import './td-icon.js';

export type PersonCardVariant = 'default' | 'compact' | 'featured' | 'author';

export interface SocialLink {
  platform: 'github' | 'twitter' | 'linkedin' | 'website' | 'email';
  url: string;
}

/**
 * Tampa Devs Person Card Component
 * Display people with photo, name, role, bio, and social links
 *
 * @element td-person-card
 *
 * @prop {string} name - Person's name
 * @prop {string} role - Person's role/title
 * @prop {string} organization - Organization name
 * @prop {string} bio - Short biography
 * @prop {string} photo - Photo URL
 * @prop {SocialLink[]} socials - Array of social links
 * @prop {'default' | 'compact' | 'featured' | 'author'} variant - Card variant
 * @prop {string} href - Link URL for the entire card
 *
 * @csspart card - The card container
 * @csspart avatar - The avatar element
 * @csspart content - The content area
 * @csspart name - The name element
 * @csspart role - The role element
 * @csspart bio - The bio element
 * @csspart socials - The social links container
 */
@customElement('td-person-card')
export class TdPersonCard extends LitElement {
  static styles = [
    tokens,
    reset,
    css`
      :host {
        display: block;
      }

      .card {
        display: flex;
        background: rgba(28, 36, 56, 0.8);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        border: 1px solid rgba(255, 255, 255, 0.05);
        border-radius: var(--td-radius-xl);
        overflow: hidden;
        transition: all var(--td-transition-base);
        box-shadow:
          inset 0 1px 1px 0 rgba(255, 255, 255, 0.05),
          0 8px 24px -4px rgba(0, 0, 0, 0.15);
      }

      a.card {
        text-decoration: none;
        color: inherit;
      }

      .card:hover {
        transform: translateY(-4px);
        box-shadow:
          inset 0 1px 1px 0 rgba(255, 255, 255, 0.08),
          0 16px 32px -8px rgba(0, 0, 0, 0.2);
        border-color: rgba(255, 255, 255, 0.1);
      }

      .content {
        flex: 1;
        min-width: 0;
      }

      .name {
        font-weight: 700;
        color: white;
        margin: 0;
      }

      .role {
        color: var(--td-color-coral);
        font-weight: 500;
        margin: 0;
      }

      .organization {
        color: rgba(209, 213, 219, 0.6);
        font-size: 0.875rem;
        margin: 0;
      }

      .bio {
        color: rgba(209, 213, 219, 0.8);
        margin: 0;
        line-height: 1.6;
      }

      .socials {
        display: flex;
        gap: 0.75rem;
      }

      .social-link {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        border-radius: var(--td-radius-md);
        background: rgba(255, 255, 255, 0.1);
        color: rgba(209, 213, 219, 0.8);
        transition: all var(--td-transition-fast);
        text-decoration: none;
      }

      .social-link:hover {
        background: var(--td-color-coral);
        color: white;
        transform: translateY(-2px);
      }

      /* Variant: default */
      :host([variant="default"]) .card,
      :host(:not([variant])) .card {
        flex-direction: column;
        align-items: center;
        text-align: center;
        padding: 2rem;
        gap: 1rem;
      }

      :host([variant="default"]) .name,
      :host(:not([variant])) .name {
        font-size: 1.25rem;
      }

      :host([variant="default"]) .role,
      :host(:not([variant])) .role {
        font-size: 0.875rem;
        margin-top: 0.25rem;
      }

      :host([variant="default"]) .bio,
      :host(:not([variant])) .bio {
        font-size: 0.875rem;
        margin-top: 0.75rem;
      }

      :host([variant="default"]) .socials,
      :host(:not([variant])) .socials {
        margin-top: 1rem;
        justify-content: center;
      }

      /* Variant: compact */
      :host([variant="compact"]) .card {
        flex-direction: row;
        align-items: center;
        padding: 1rem;
        gap: 1rem;
      }

      :host([variant="compact"]) .content {
        display: flex;
        flex-direction: column;
        gap: 0.125rem;
      }

      :host([variant="compact"]) .name {
        font-size: 1rem;
      }

      :host([variant="compact"]) .role {
        font-size: 0.75rem;
      }

      :host([variant="compact"]) .bio {
        display: none;
      }

      :host([variant="compact"]) .socials {
        display: none;
      }

      /* Variant: featured */
      :host([variant="featured"]) .card {
        flex-direction: column;
        padding: 2.5rem;
        gap: 1.5rem;
        align-items: center;
        text-align: center;
        background: linear-gradient(
          135deg,
          rgba(28, 36, 56, 0.9) 0%,
          rgba(43, 52, 71, 0.9) 100%
        );
      }

      :host([variant="featured"]) .name {
        font-size: 1.5rem;
      }

      :host([variant="featured"]) .role {
        font-size: 1rem;
        margin-top: 0.25rem;
      }

      :host([variant="featured"]) .bio {
        font-size: 1rem;
        margin-top: 1rem;
        max-width: 400px;
      }

      :host([variant="featured"]) .socials {
        margin-top: 1.5rem;
        justify-content: center;
      }

      /* Variant: author */
      :host([variant="author"]) .card {
        flex-direction: row;
        align-items: flex-start;
        padding: 1.5rem;
        gap: 1rem;
        background: rgba(28, 36, 56, 0.6);
      }

      :host([variant="author"]) .content {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
      }

      :host([variant="author"]) .name {
        font-size: 1rem;
      }

      :host([variant="author"]) .role {
        font-size: 0.75rem;
        color: rgba(209, 213, 219, 0.6);
      }

      :host([variant="author"]) .bio {
        font-size: 0.875rem;
        margin-top: 0.5rem;
      }

      :host([variant="author"]) .socials {
        margin-top: 0.75rem;
      }

      :host([variant="author"]) .social-link {
        width: 28px;
        height: 28px;
      }
    `,
  ];

  @property({ type: String }) name = '';
  @property({ type: String }) role = '';
  @property({ type: String }) organization = '';
  @property({ type: String }) bio = '';
  @property({ type: String }) photo = '';
  @property({ type: Array }) socials: SocialLink[] = [];
  @property({ type: String, reflect: true }) variant: PersonCardVariant = 'default';
  @property({ type: String }) href = '';

  private getAvatarSize() {
    switch (this.variant) {
      case 'compact':
        return 'md';
      case 'featured':
        return '2xl';
      case 'author':
        return 'lg';
      default:
        return 'xl';
    }
  }

  private getSocialIcon(platform: string) {
    switch (platform) {
      case 'github':
        return 'github';
      case 'twitter':
        return 'twitter';
      case 'linkedin':
        return 'linkedin';
      case 'website':
        return 'globe';
      case 'email':
        return 'mail';
      default:
        return 'link';
    }
  }

  private renderSocials() {
    if (!this.socials?.length) return nothing;

    return html`
      <div class="socials" part="socials">
        ${this.socials.map(
          (social) => html`
            <a
              class="social-link"
              href=${social.platform === 'email' ? `mailto:${social.url}` : social.url}
              target=${social.platform === 'email' ? '_self' : '_blank'}
              rel="noopener noreferrer"
              title=${social.platform}
            >
              <td-icon name=${this.getSocialIcon(social.platform)} size="sm"></td-icon>
            </a>
          `
        )}
      </div>
    `;
  }

  private renderContent() {
    return html`
      <td-avatar
        src=${this.photo}
        name=${this.name}
        size=${this.getAvatarSize()}
        ?ring=${this.variant === 'featured'}
        part="avatar"
      ></td-avatar>

      <div class="content" part="content">
        <h3 class="name" part="name">${this.name}</h3>
        ${this.role ? html`<p class="role" part="role">${this.role}</p>` : nothing}
        ${this.organization
          ? html`<p class="organization">${this.organization}</p>`
          : nothing}
        ${this.bio ? html`<p class="bio" part="bio">${this.bio}</p>` : nothing}
        ${this.renderSocials()}
      </div>
    `;
  }

  render() {
    if (this.href) {
      return html`
        <a class="card" href=${this.href} part="card">
          ${this.renderContent()}
        </a>
      `;
    }

    return html`
      <div class="card" part="card">
        ${this.renderContent()}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'td-person-card': TdPersonCard;
  }
}
