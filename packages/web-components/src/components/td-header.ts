import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { tokens, reset } from '../styles/shared.js';
import './td-logo.js';

export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
  icon?: string;
}

/**
 * Tampa Devs Header/Navigation Component
 * Modern sticky header with glass morphism effect
 *
 * @element td-header
 *
 * @prop {NavLink[]} links - Navigation links
 * @prop {NavLink[]} actions - Action links (right side, e.g., Jobs, Favorites)
 * @prop {string} homeHref - Home link URL (default: /)
 * @prop {boolean} sticky - Make header sticky (default: true)
 *
 * @slot brand - Custom brand/logo slot (defaults to td-logo)
 * @slot actions - Custom actions slot
 *
 * @csspart header - The header element
 * @csspart nav - The nav element
 * @csspart brand - The brand link
 * @csspart links - The links container
 * @csspart link - Individual link
 * @csspart actions - The actions container
 * @csspart hamburger - The hamburger button
 * @csspart mobile-menu - The mobile menu
 */
@customElement('td-header')
export class TdHeader extends LitElement {
  static styles = [
    tokens,
    reset,
    css`
      :host {
        display: block;
        width: 100%;
      }

      .header {
        background: rgba(255, 255, 255, 0.7);
        backdrop-filter: blur(24px);
        -webkit-backdrop-filter: blur(24px);
        border-bottom: 1px solid rgba(229, 231, 235, 0.5);
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05);
      }

      :host([sticky]) .header {
        position: sticky;
        top: 0;
        z-index: 50;
      }

      /* Dark mode support via CSS custom properties */
      @media (prefers-color-scheme: dark) {
        .header {
          background: rgba(3, 7, 18, 0.7);
          border-bottom-color: rgba(31, 41, 55, 0.5);
        }
      }

      .nav {
        max-width: 80rem;
        margin: 0 auto;
        padding: 0 1rem;
      }

      @media (min-width: 640px) {
        .nav {
          padding: 0 1.5rem;
        }
      }

      @media (min-width: 1024px) {
        .nav {
          padding: 0 2rem;
        }
      }

      .nav-inner {
        display: flex;
        justify-content: space-between;
        height: 4rem;
      }

      .nav-left {
        display: flex;
        align-items: center;
        gap: 2rem;
      }

      .brand {
        display: flex;
        align-items: center;
        text-decoration: none;
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

      .desktop-links {
        display: none;
        align-items: center;
        gap: 0.25rem;
      }

      @media (min-width: 768px) {
        .desktop-links {
          display: flex;
        }
      }

      .nav-link {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 0.75rem;
        border-radius: var(--td-radius-lg);
        font-size: 0.875rem;
        font-weight: 500;
        color: #4B5563;
        text-decoration: none;
        transition: background-color var(--td-transition-fast), color var(--td-transition-fast);
      }

      @media (prefers-color-scheme: dark) {
        .nav-link {
          color: #9CA3AF;
        }
      }

      .nav-link:hover {
        background-color: rgba(243, 244, 246, 1);
      }

      @media (prefers-color-scheme: dark) {
        .nav-link:hover {
          background-color: rgba(31, 41, 55, 1);
        }
      }

      .nav-link.active {
        background-color: rgba(28, 36, 56, 0.1);
        color: var(--td-color-navy);
      }

      @media (prefers-color-scheme: dark) {
        .nav-link.active {
          background-color: rgba(43, 52, 71, 0.3);
          color: white;
        }
      }

      .nav-link svg {
        width: 1.25rem;
        height: 1.25rem;
      }

      .nav-right {
        display: flex;
        align-items: center;
        gap: 1rem;
      }

      .actions {
        display: none;
        align-items: center;
        gap: 0.25rem;
      }

      @media (min-width: 768px) {
        .actions {
          display: flex;
        }
      }

      .hamburger {
        display: flex;
        padding: 0.5rem;
        border-radius: var(--td-radius-lg);
        color: #4B5563;
        background: none;
        border: none;
        cursor: pointer;
      }

      @media (prefers-color-scheme: dark) {
        .hamburger {
          color: #9CA3AF;
        }
      }

      .hamburger:hover {
        background-color: rgba(243, 244, 246, 1);
      }

      @media (prefers-color-scheme: dark) {
        .hamburger:hover {
          background-color: rgba(31, 41, 55, 1);
        }
      }

      @media (min-width: 768px) {
        .hamburger {
          display: none;
        }
      }

      .hamburger svg {
        width: 1.5rem;
        height: 1.5rem;
      }

      .mobile-menu {
        display: none;
        padding: 1rem 0;
        border-top: 1px solid rgba(229, 231, 235, 1);
      }

      @media (prefers-color-scheme: dark) {
        .mobile-menu {
          border-top-color: rgba(31, 41, 55, 1);
        }
      }

      .mobile-menu.open {
        display: block;
      }

      @media (min-width: 768px) {
        .mobile-menu {
          display: none !important;
        }
      }

      .mobile-menu-inner {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
      }
    `,
  ];

  @property({ type: Array }) links: NavLink[] = [];
  @property({ type: Array }) actions: NavLink[] = [];
  @property({ type: String }) homeHref = '/';
  @property({ type: Boolean, reflect: true }) sticky = true;

  @state() private mobileMenuOpen = false;

  private toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  private renderLink(link: NavLink, closeMobile = false) {
    const handleClick = closeMobile ? () => this.mobileMenuOpen = false : undefined;

    return html`
      <a
        class="nav-link"
        href=${link.href}
        part="link"
        target=${link.external ? '_blank' : nothing}
        rel=${link.external ? 'noopener noreferrer' : nothing}
        @click=${handleClick}
      >
        ${link.icon ? html`<span .innerHTML=${link.icon}></span>` : nothing}
        ${link.label}
      </a>
    `;
  }

  render() {
    return html`
      <header class="header" part="header">
        <nav class="nav" part="nav">
          <div class="nav-inner">
            <div class="nav-left">
              <a class="brand" href=${this.homeHref} part="brand">
                <slot name="brand">
                  <td-logo variant="full" size="sm"></td-logo>
                </slot>
              </a>

              <div class="desktop-links" part="links">
                ${this.links.map(link => this.renderLink(link))}
              </div>
            </div>

            <div class="nav-right">
              <div class="actions" part="actions">
                <slot name="actions">
                  ${this.actions.map(link => this.renderLink(link))}
                </slot>
              </div>

              <button
                class="hamburger"
                part="hamburger"
                @click=${this.toggleMobileMenu}
                aria-label="Toggle menu"
                aria-expanded=${this.mobileMenuOpen}
              >
                ${this.mobileMenuOpen
                  ? html`<svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>`
                  : html`<svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>`}
              </button>
            </div>
          </div>

          <div class="mobile-menu ${this.mobileMenuOpen ? 'open' : ''}" part="mobile-menu">
            <div class="mobile-menu-inner">
              ${this.links.map(link => this.renderLink(link, true))}
              ${this.actions.map(link => this.renderLink(link, true))}
            </div>
          </div>
        </nav>
      </header>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'td-header': TdHeader;
  }
}
