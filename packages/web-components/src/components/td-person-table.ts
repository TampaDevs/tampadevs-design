import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { tokens, reset } from '../styles/shared.js';
import { tabStyles } from '../styles/tabs.js';
import './td-avatar.js';
import './td-icon.js';

export interface PersonTableMember {
  name: string;
  role: string;
  photo?: string;
  term?: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
  website?: string;
}

export interface PersonTableYear {
  year: string;
  label?: string;
  members: PersonTableMember[];
}

/**
 * Tampa Devs Person Table Component
 * Table display for people (leadership, authors, team members, etc.)
 * Supports both simple mode (members array) and tabbed mode (years array)
 *
 * @element td-person-table
 *
 * @prop {string} title - Table title
 * @prop {PersonTableMember[]} members - Array of people to display (simple mode)
 * @prop {PersonTableYear[]} years - Array of year data with members (tabbed mode)
 * @prop {string} activeYear - Currently selected year (tabbed mode)
 * @prop {boolean} showTerm - Show term/dates column
 * @prop {boolean} showSocials - Show social links column
 * @prop {boolean} compact - Use compact row height
 *
 * @fires year-change - When the active year tab changes (tabbed mode)
 *
 * @csspart container - The main container
 * @csspart header - The header area with title and tabs
 * @csspart title - The title element
 * @csspart tabs - The tabs container
 * @csspart tab - Each tab button
 * @csspart table - The table element
 * @csspart row - Each table row
 * @csspart cell - Each table cell
 */
@customElement('td-person-table')
export class TdPersonTable extends LitElement {
  static styles = [
    tokens,
    reset,
    tabStyles,
    css`
      :host {
        display: block;
      }

      .container {
        background: rgba(28, 36, 56, 0.8);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        border: 1px solid rgba(255, 255, 255, 0.05);
        border-radius: var(--td-radius-xl);
        overflow: hidden;
        box-shadow:
          inset 0 1px 1px 0 rgba(255, 255, 255, 0.05),
          0 8px 24px -4px rgba(0, 0, 0, 0.15);
      }

      /* Header with title and tabs */
      .header {
        display: flex;
        align-items: stretch;
        min-height: 56px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      }

      .title {
        display: flex;
        align-items: center;
        font-size: 1.25rem;
        font-weight: 700;
        color: white;
        margin: 0;
        padding: 0 1.5rem;
        flex-shrink: 0;
      }

      /* Simple title without tabs */
      .title-only {
        padding: 1.5rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      }

      .title-only .title {
        padding: 0;
        min-height: auto;
      }

      /* Table styles */
      .table-wrapper {
        overflow-x: auto;
      }

      table {
        width: 100%;
        border-collapse: collapse;
      }

      th {
        text-align: left;
        font-size: 0.75rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: rgba(156, 163, 175, 0.8);
        padding: 1rem 1.5rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        background: rgba(0, 0, 0, 0.1);
      }

      td {
        padding: 1rem 1.5rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.03);
        vertical-align: middle;
      }

      :host([compact]) td {
        padding: 0.75rem 1.5rem;
      }

      tr:last-child td {
        border-bottom: none;
      }

      tbody tr:hover td {
        background: rgba(255, 255, 255, 0.02);
      }

      .person-cell {
        display: flex;
        align-items: center;
        gap: 1rem;
      }

      .person-info {
        display: flex;
        flex-direction: column;
        gap: 0.125rem;
      }

      .person-name {
        font-weight: 600;
        color: white;
      }

      .person-role-mobile {
        display: none;
        font-size: 0.75rem;
        color: var(--td-color-coral);
      }

      .role-cell {
        color: var(--td-color-coral);
        font-weight: 500;
      }

      .term-cell {
        color: rgba(209, 213, 219, 0.6);
        font-size: 0.875rem;
      }

      .socials-cell {
        display: flex;
        gap: 0.5rem;
      }

      .social-link {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 28px;
        height: 28px;
        border-radius: var(--td-radius-md);
        background: rgba(255, 255, 255, 0.08);
        color: rgba(209, 213, 219, 0.6);
        transition: all var(--td-transition-fast);
        text-decoration: none;
      }

      .social-link:hover {
        background: var(--td-color-coral);
        color: white;
        transform: translateY(-1px);
      }

      /* Responsive */
      @media (max-width: 768px) {
        .header {
          flex-wrap: wrap;
        }

        .title {
          padding: 1rem 1.5rem;
          width: 100%;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        th:nth-child(2),
        td:nth-child(2) {
          display: none;
        }

        .person-role-mobile {
          display: block;
        }

        th,
        td {
          padding: 0.75rem 1rem;
        }
      }

      @media (max-width: 480px) {
        th:nth-child(3),
        td:nth-child(3) {
          display: none;
        }
      }

      /* Empty state */
      .empty {
        padding: 3rem;
        text-align: center;
        color: rgba(156, 163, 175, 0.6);
      }
    `,
  ];

  @property({ type: String }) title = '';
  @property({ type: Array }) members: PersonTableMember[] = [];
  @property({ type: Array }) years: PersonTableYear[] = [];
  @property({ type: String }) activeYear = '';
  @property({ type: Boolean }) showTerm = true;
  @property({ type: Boolean }) showSocials = true;
  @property({ type: Boolean, reflect: true }) compact = false;

  @state() private _canScrollLeft = false;
  @state() private _canScrollRight = false;

  @query('.tabs-scroll') private _tabsScrollRef!: HTMLElement;

  // Check if we're in tabbed mode
  private get isTabbedMode(): boolean {
    return this.years.length > 0;
  }

  // Get the current members to display
  private get displayMembers(): PersonTableMember[] {
    if (this.isTabbedMode) {
      const yearData = this.years.find((y) => y.year === this.activeYear);
      return yearData?.members ?? [];
    }
    return this.members;
  }

  firstUpdated() {
    if (this.isTabbedMode && !this.activeYear && this.years.length > 0) {
      this.activeYear = this.years[0].year;
    }
    requestAnimationFrame(() => this._updateScrollButtons());
  }

  updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('years')) {
      if (!this.activeYear && this.years.length > 0) {
        this.activeYear = this.years[0].year;
      }
      requestAnimationFrame(() => this._updateScrollButtons());
    }
  }

  private _updateScrollButtons() {
    const el = this._tabsScrollRef;
    if (!el) return;

    this._canScrollLeft = el.scrollLeft > 0;
    this._canScrollRight = el.scrollLeft < el.scrollWidth - el.clientWidth - 1;
  }

  private _scrollTabs(direction: 'left' | 'right') {
    const el = this._tabsScrollRef;
    if (!el) return;

    const scrollAmount = 150;
    el.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });

    setTimeout(() => this._updateScrollButtons(), 300);
  }

  private _handleTabClick(year: string) {
    this.activeYear = year;
    this.dispatchEvent(
      new CustomEvent('year-change', {
        detail: { year },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _handleTabsScroll() {
    this._updateScrollButtons();
  }

  private hasSocials(member: PersonTableMember): boolean {
    return !!(member.linkedin || member.github || member.twitter || member.website);
  }

  private renderSocialLinks(member: PersonTableMember) {
    const links = [];

    if (member.linkedin) {
      links.push(
        html`<a class="social-link" href=${member.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn">
          <td-icon name="linkedin" size="sm"></td-icon>
        </a>`
      );
    }

    if (member.github) {
      links.push(
        html`<a class="social-link" href=${member.github} target="_blank" rel="noopener noreferrer" title="GitHub">
          <td-icon name="github" size="sm"></td-icon>
        </a>`
      );
    }

    if (member.twitter) {
      links.push(
        html`<a class="social-link" href=${member.twitter} target="_blank" rel="noopener noreferrer" title="Twitter">
          <td-icon name="twitter" size="sm"></td-icon>
        </a>`
      );
    }

    if (member.website) {
      links.push(
        html`<a class="social-link" href=${member.website} target="_blank" rel="noopener noreferrer" title="Website">
          <td-icon name="globe" size="sm"></td-icon>
        </a>`
      );
    }

    return links;
  }

  private renderTabs() {
    const showScrollButtons = this.years.length > 4;

    return html`
      <div class="tabs-wrapper">
        ${showScrollButtons
          ? html`
              <button
                class="tabs-scroll-btn"
                @click=${() => this._scrollTabs('left')}
                ?disabled=${!this._canScrollLeft}
                aria-label="Scroll tabs left"
              >
                <td-icon name="chevron-left" size="sm"></td-icon>
              </button>
            `
          : nothing}

        <div
          class="tabs-scroll"
          part="tabs"
          @scroll=${this._handleTabsScroll}
        >
          ${this.years.map(
            (yearData) => html`
              <button
                class="tab ${this.activeYear === yearData.year ? 'active' : ''}"
                part="tab ${this.activeYear === yearData.year ? 'tab-active' : ''}"
                @click=${() => this._handleTabClick(yearData.year)}
              >
                ${yearData.label || yearData.year}
                <span class="badge">${yearData.members.length}</span>
              </button>
            `
          )}
        </div>

        ${showScrollButtons
          ? html`
              <button
                class="tabs-scroll-btn"
                @click=${() => this._scrollTabs('right')}
                ?disabled=${!this._canScrollRight}
                aria-label="Scroll tabs right"
              >
                <td-icon name="chevron-right" size="sm"></td-icon>
              </button>
            `
          : nothing}
      </div>
    `;
  }

  private renderHeader() {
    if (!this.title && !this.isTabbedMode) {
      return nothing;
    }

    // Tabbed mode: header with title and tabs
    if (this.isTabbedMode) {
      return html`
        <div class="header" part="header">
          ${this.title ? html`<h2 class="title" part="title">${this.title}</h2>` : nothing}
          ${this.renderTabs()}
        </div>
      `;
    }

    // Simple mode: just title
    return html`
      <div class="title-only">
        <h2 class="title" part="title">${this.title}</h2>
      </div>
    `;
  }

  render() {
    const members = this.displayMembers;
    const showSocialsColumn = this.showSocials && members.some((m) => this.hasSocials(m));

    return html`
      <div class="container" part="container">
        ${this.renderHeader()}

        ${members.length === 0
          ? html`<div class="empty">${this.isTabbedMode ? 'No members for this year' : 'No members to display'}</div>`
          : html`
              <div class="table-wrapper">
                <table part="table">
                  <thead>
                    <tr part="header">
                      <th>Name</th>
                      <th>Role</th>
                      ${this.showTerm ? html`<th>Term</th>` : nothing}
                      ${showSocialsColumn ? html`<th>Links</th>` : nothing}
                    </tr>
                  </thead>
                  <tbody>
                    ${members.map(
                      (member) => html`
                        <tr part="row">
                          <td part="cell">
                            <div class="person-cell">
                              <td-avatar
                                src=${member.photo || ''}
                                name=${member.name}
                                size="sm"
                              ></td-avatar>
                              <div class="person-info">
                                <span class="person-name">${member.name}</span>
                                <span class="person-role-mobile">${member.role}</span>
                              </div>
                            </div>
                          </td>
                          <td part="cell" class="role-cell">${member.role}</td>
                          ${this.showTerm
                            ? html`<td part="cell" class="term-cell">${member.term || '—'}</td>`
                            : nothing}
                          ${showSocialsColumn
                            ? html`
                                <td part="cell">
                                  <div class="socials-cell">
                                    ${this.renderSocialLinks(member)}
                                  </div>
                                </td>
                              `
                            : nothing}
                        </tr>
                      `
                    )}
                  </tbody>
                </table>
              </div>
            `}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'td-person-table': TdPersonTable;
  }
}
