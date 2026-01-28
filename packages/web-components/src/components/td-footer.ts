import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tokens, reset } from '../styles/shared.js';
import './td-logo.js';

export interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface FooterLinkGroup {
  title: string;
  links: FooterLink[];
}

export interface SocialLink {
  name: string;
  href: string;
  icon: string;
}

/**
 * Tampa Devs Footer Component
 * Modern footer with link groups and social icons
 *
 * @element td-footer
 *
 * @prop {string} description - Footer description text
 * @prop {FooterLinkGroup[]} linkGroups - Groups of footer links
 * @prop {SocialLink[]} socials - Social media links
 * @prop {string} copyright - Copyright text (default: current year + Tampa Devs)
 *
 * @slot brand - Custom brand/logo slot (defaults to td-logo)
 * @slot description - Custom description slot
 * @slot bottom - Additional bottom content
 *
 * @csspart footer - The footer element
 * @csspart container - The inner container
 * @csspart brand - The brand section
 * @csspart links - The links grid
 * @csspart link-group - A link group
 * @csspart bottom - The bottom bar
 * @csspart socials - The social icons
 */
@customElement('td-footer')
export class TdFooter extends LitElement {
  static styles = [
    tokens,
    reset,
    css`
      :host {
        display: block;
        width: 100%;
      }

      .footer {
        background-color: #F9FAFB;
        border-top: 1px solid #E5E7EB;
      }

      @media (prefers-color-scheme: dark) {
        .footer {
          background-color: #111827;
          border-top-color: #1F2937;
        }
      }

      .container {
        max-width: 80rem;
        margin: 0 auto;
        padding: 3rem 1rem;
      }

      @media (min-width: 640px) {
        .container {
          padding: 3rem 1.5rem;
        }
      }

      @media (min-width: 1024px) {
        .container {
          padding: 3rem 2rem;
        }
      }

      .grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 2rem;
      }

      @media (min-width: 768px) {
        .grid {
          grid-template-columns: 2fr 1fr 1fr;
        }
      }

      .brand-section {
        grid-column: span 1;
      }

      .brand {
        display: inline-block;
      }

      .brand td-logo,
      .brand ::slotted(td-logo) {
        --logo-text-color: var(--td-color-navy, #1C2438);
      }

      @media (prefers-color-scheme: dark) {
        .brand td-logo,
        .brand ::slotted(td-logo) {
          --logo-text-color: white;
        }
      }

      .description {
        margin-top: 0.5rem;
        font-size: 0.875rem;
        color: #4B5563;
        max-width: 28rem;
        line-height: 1.5;
      }

      @media (prefers-color-scheme: dark) {
        .description {
          color: #9CA3AF;
        }
      }

      .link-group h3 {
        font-size: 0.875rem;
        font-weight: 600;
        color: var(--td-color-text);
        text-transform: uppercase;
        letter-spacing: 0.05em;
        margin: 0 0 1rem 0;
      }

      @media (prefers-color-scheme: dark) {
        .link-group h3 {
          color: white;
        }
      }

      .link-group ul {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }

      .link-group a {
        font-size: 0.875rem;
        color: #4B5563;
        text-decoration: none;
        transition: color var(--td-transition-fast);
      }

      @media (prefers-color-scheme: dark) {
        .link-group a {
          color: #9CA3AF;
        }
      }

      .link-group a:hover {
        color: var(--td-color-navy);
      }

      @media (prefers-color-scheme: dark) {
        .link-group a:hover {
          color: white;
        }
      }

      .bottom-bar {
        margin-top: 2rem;
        padding-top: 2rem;
        border-top: 1px solid #E5E7EB;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        align-items: center;
      }

      @media (min-width: 640px) {
        .bottom-bar {
          flex-direction: row;
          justify-content: space-between;
        }
      }

      @media (prefers-color-scheme: dark) {
        .bottom-bar {
          border-top-color: #1F2937;
        }
      }

      .copyright {
        font-size: 0.875rem;
        color: #6B7280;
        margin: 0;
      }

      .socials {
        display: flex;
        align-items: center;
        gap: 1rem;
      }

      .social-link {
        color: #9CA3AF;
        transition: color var(--td-transition-fast);
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .social-link:hover {
        color: #4B5563;
      }

      @media (prefers-color-scheme: dark) {
        .social-link:hover {
          color: #D1D5DB;
        }
      }

      .social-link svg {
        width: 1.25rem;
        height: 1.25rem;
      }

      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
      }
    `,
  ];

  @property({ type: String }) description = '';
  @property({ type: Array }) linkGroups: FooterLinkGroup[] = [];
  @property({ type: Array }) socials: SocialLink[] = [];
  @property({ type: String }) copyright = '';

  private get copyrightText() {
    if (this.copyright) return this.copyright;
    return `\u00A9 ${new Date().getFullYear()} Tampa Devs. All rights reserved.`;
  }

  private renderLink(link: FooterLink) {
    return html`
      <li>
        <a
          href=${link.href}
          target=${link.external ? '_blank' : nothing}
          rel=${link.external ? 'noopener noreferrer' : nothing}
        >
          ${link.label}
        </a>
      </li>
    `;
  }

  private renderLinkGroup(group: FooterLinkGroup) {
    return html`
      <div class="link-group" part="link-group">
        <h3>${group.title}</h3>
        <ul>
          ${group.links.map(link => this.renderLink(link))}
        </ul>
      </div>
    `;
  }

  private renderSocialLink(social: SocialLink) {
    return html`
      <a
        class="social-link"
        href=${social.href}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span class="sr-only">${social.name}</span>
        <span .innerHTML=${social.icon}></span>
      </a>
    `;
  }

  render() {
    return html`
      <footer class="footer" part="footer">
        <div class="container" part="container">
          <div class="grid">
            <div class="brand-section" part="brand">
              <div class="brand">
                <slot name="brand">
                  <td-logo variant="full" size="sm"></td-logo>
                </slot>
              </div>
              <slot name="description">
                ${this.description
                  ? html`<p class="description">${this.description}</p>`
                  : nothing}
              </slot>
            </div>

            ${this.linkGroups.map(group => this.renderLinkGroup(group))}
          </div>

          <div class="bottom-bar" part="bottom">
            <p class="copyright">${this.copyrightText}</p>

            ${this.socials.length > 0
              ? html`
                  <div class="socials" part="socials">
                    ${this.socials.map(social => this.renderSocialLink(social))}
                  </div>
                `
              : nothing}

            <slot name="bottom"></slot>
          </div>
        </div>
      </footer>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'td-footer': TdFooter;
  }
}
