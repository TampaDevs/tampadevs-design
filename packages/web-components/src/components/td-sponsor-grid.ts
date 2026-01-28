import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tokens, reset } from '../styles/shared.js';
import './td-sponsor-card.js';

export interface Sponsor {
  name: string;
  logo: string;
  href: string;
  tier?: 'platinum' | 'gold' | 'silver' | 'bronze' | 'community';
}

/**
 * Tampa Devs Sponsor Grid Component
 * Displays sponsors in a clean unified grid layout
 *
 * @element td-sponsor-grid
 *
 * @prop {string} title - Section title
 * @prop {string} description - Section description
 * @prop {Sponsor[]} sponsors - Array of sponsor objects
 * @prop {boolean} showTierHeadings - Show tier headings (default: false)
 * @prop {string} tier - Filter to show only a specific tier
 *
 * @slot header - Custom header slot
 * @slot footer - Footer slot (for CTAs)
 *
 * @csspart container - The main container
 * @csspart header - The header section
 * @csspart title - The section title
 * @csspart description - The section description
 * @csspart grid - The sponsor grid
 * @csspart tier-heading - Tier heading elements
 */
@customElement('td-sponsor-grid')
export class TdSponsorGrid extends LitElement {
  static styles = [
    tokens,
    reset,
    css`
      :host {
        display: block;
        width: 100%;
      }

      .sponsor-section {
        background: white;
        border-radius: var(--td-radius-xl);
        overflow: hidden;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      }

      .section-header {
        text-align: center;
        padding: 1.25rem 1.5rem;
        border-bottom: 2px solid #1F2937;
      }

      .section-title {
        font-size: 1.125rem;
        font-weight: 700;
        color: #1F2937;
        margin: 0;
        letter-spacing: -0.01em;
      }

      .section-description {
        font-size: 0.875rem;
        color: #6B7280;
        margin: 0.5rem 0 0 0;
        line-height: 1.5;
      }

      .tier-section {
        border-bottom: 1px solid #D1D5DB;
      }

      .tier-section:last-child {
        border-bottom: none;
      }

      .tier-heading {
        font-size: 0.75rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: #6B7280;
        padding: 0.75rem 1rem;
        background: #F9FAFB;
        border-bottom: 1px solid #E5E7EB;
        margin: 0;
      }

      .sponsor-grid {
        display: grid;
        gap: 1px;
        background: #D1D5DB;
      }

      /* Default grid - responsive columns based on tier */
      .sponsor-grid--mixed {
        grid-template-columns: repeat(2, 1fr);
      }

      @media (min-width: 640px) {
        .sponsor-grid--mixed {
          grid-template-columns: repeat(3, 1fr);
        }
      }

      /* Platinum/Gold tier - larger cards, 2 columns */
      .sponsor-grid--platinum,
      .sponsor-grid--gold {
        grid-template-columns: repeat(2, 1fr);
      }

      /* Silver tier - 3 columns */
      .sponsor-grid--silver {
        grid-template-columns: repeat(2, 1fr);
      }

      @media (min-width: 640px) {
        .sponsor-grid--silver {
          grid-template-columns: repeat(3, 1fr);
        }
      }

      /* Bronze/Community tier - smaller, more columns */
      .sponsor-grid--bronze,
      .sponsor-grid--community {
        grid-template-columns: repeat(2, 1fr);
      }

      @media (min-width: 640px) {
        .sponsor-grid--bronze,
        .sponsor-grid--community {
          grid-template-columns: repeat(3, 1fr);
        }
      }

      @media (min-width: 768px) {
        .sponsor-grid--bronze,
        .sponsor-grid--community {
          grid-template-columns: repeat(4, 1fr);
        }
      }

      .footer-slot {
        padding: 1.5rem;
        display: flex;
        justify-content: center;
        gap: 1rem;
        flex-wrap: wrap;
        background: #F9FAFB;
        border-top: 1px solid #E5E7EB;
      }

      .footer-slot:empty {
        display: none;
      }

      .footer-slot ::slotted(a),
      .footer-slot ::slotted(button) {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0.75rem 1.5rem;
        background-color: var(--td-color-coral);
        color: white;
        font-weight: 600;
        font-size: 0.875rem;
        text-decoration: none;
        border-radius: var(--td-radius-lg);
        border: none;
        cursor: pointer;
        transition: all var(--td-transition-fast);
      }

      .footer-slot ::slotted(a:hover),
      .footer-slot ::slotted(button:hover) {
        background-color: var(--td-color-coral-light);
        transform: translateY(-1px);
      }
    `,
  ];

  @property({ type: String }) title = '';
  @property({ type: String }) description = '';
  @property({ type: Array }) sponsors: Sponsor[] = [];
  @property({ type: Boolean }) showTierHeadings = false;
  @property({ type: String }) tier = '';

  private get filteredSponsors(): Sponsor[] {
    if (this.tier) {
      return this.sponsors.filter(s => s.tier === this.tier);
    }
    return this.sponsors;
  }

  private get sponsorsByTier(): Map<string, Sponsor[]> {
    const tiers = new Map<string, Sponsor[]>();
    const tierOrder = ['platinum', 'gold', 'silver', 'bronze', 'community'];

    tierOrder.forEach(tier => tiers.set(tier, []));

    this.filteredSponsors.forEach(sponsor => {
      const tier = sponsor.tier || 'community';
      const tierSponsors = tiers.get(tier) || [];
      tierSponsors.push(sponsor);
      tiers.set(tier, tierSponsors);
    });

    return tiers;
  }

  private renderSponsorCard(sponsor: Sponsor) {
    return html`
      <td-sponsor-card
        name=${sponsor.name}
        logo=${sponsor.logo}
        href=${sponsor.href}
        tier=${sponsor.tier || 'community'}
      ></td-sponsor-card>
    `;
  }

  private renderTierSection(tier: string, sponsors: Sponsor[]) {
    if (sponsors.length === 0) return nothing;

    const tierLabel = tier.charAt(0).toUpperCase() + tier.slice(1);

    return html`
      <div class="tier-section">
        ${this.showTierHeadings
          ? html`<h4 class="tier-heading" part="tier-heading">${tierLabel} Sponsors</h4>`
          : nothing}
        <div class="sponsor-grid sponsor-grid--${tier}" part="grid">
          ${sponsors.map(sponsor => this.renderSponsorCard(sponsor))}
        </div>
      </div>
    `;
  }

  render() {
    const hasMixedTiers = !this.tier && !this.showTierHeadings;

    return html`
      <div class="sponsor-section" part="container">
        ${this.title || this.description
          ? html`
              <div class="section-header" part="header">
                ${this.title
                  ? html`<h2 class="section-title" part="title">${this.title}</h2>`
                  : nothing}
                ${this.description
                  ? html`<p class="section-description" part="description">${this.description}</p>`
                  : nothing}
              </div>
            `
          : nothing}

        ${this.showTierHeadings
          ? html`
              ${Array.from(this.sponsorsByTier.entries()).map(([tier, sponsors]) =>
                this.renderTierSection(tier, sponsors)
              )}
            `
          : html`
              <div class="sponsor-grid ${hasMixedTiers ? 'sponsor-grid--mixed' : `sponsor-grid--${this.tier || 'mixed'}`}" part="grid">
                ${this.filteredSponsors.map(sponsor => this.renderSponsorCard(sponsor))}
              </div>
            `}

        <div class="footer-slot">
          <slot name="footer"></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'td-sponsor-grid': TdSponsorGrid;
  }
}
