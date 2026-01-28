import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tokens, reset } from '../styles/shared.js';

export type SponsorTier = 'platinum' | 'gold' | 'silver' | 'bronze' | 'community';

/**
 * Tampa Devs Sponsor Card Component
 * Individual sponsor display with logo and link in a clean unified grid style
 *
 * @element td-sponsor-card
 *
 * @prop {string} name - Sponsor name (used for alt text)
 * @prop {string} logo - Logo image URL
 * @prop {string} href - Sponsor website URL
 * @prop {SponsorTier} tier - Sponsor tier (affects sizing)
 *
 * @csspart link - The anchor wrapper
 * @csspart logo - The logo image
 */
@customElement('td-sponsor-card')
export class TdSponsorCard extends LitElement {
  static styles = [
    tokens,
    reset,
    css`
      :host {
        display: block;
        height: 100%;
      }

      .sponsor-card {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2rem;
        background: #E5E7EB;
        transition: all var(--td-transition-fast);
        height: 100%;
        min-height: 120px;
        text-decoration: none;
      }

      .sponsor-card:hover {
        background: #D1D5DB;
      }

      .sponsor-card:hover img {
        transform: scale(1.05);
      }

      .sponsor-card img {
        max-width: 80%;
        max-height: 80px;
        height: auto;
        display: block;
        object-fit: contain;
        transition: transform var(--td-transition-fast);
      }

      /* Tier-based sizing */
      :host([tier="platinum"]) .sponsor-card {
        min-height: 180px;
        padding: 2.5rem;
      }

      :host([tier="platinum"]) .sponsor-card img {
        max-height: 120px;
        max-width: 85%;
      }

      :host([tier="gold"]) .sponsor-card {
        min-height: 150px;
        padding: 2rem;
      }

      :host([tier="gold"]) .sponsor-card img {
        max-height: 100px;
        max-width: 85%;
      }

      :host([tier="silver"]) .sponsor-card {
        min-height: 120px;
      }

      :host([tier="silver"]) .sponsor-card img {
        max-height: 70px;
      }

      :host([tier="bronze"]) .sponsor-card,
      :host([tier="community"]) .sponsor-card {
        min-height: 100px;
        padding: 1.5rem;
      }

      :host([tier="bronze"]) .sponsor-card img,
      :host([tier="community"]) .sponsor-card img {
        max-height: 50px;
      }
    `,
  ];

  @property({ type: String }) name = '';
  @property({ type: String }) logo = '';
  @property({ type: String }) href = '';
  @property({ type: String, reflect: true }) tier: SponsorTier = 'community';

  render() {
    return html`
      <a
        class="sponsor-card"
        href=${this.href}
        target="_blank"
        rel="noopener noreferrer"
        part="link"
      >
        <img src=${this.logo} alt=${this.name} part="logo" />
      </a>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'td-sponsor-card': TdSponsorCard;
  }
}
