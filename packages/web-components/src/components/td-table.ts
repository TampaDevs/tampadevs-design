import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { tokens, reset } from '../styles/shared.js';
import { tabStyles } from '../styles/tabs.js';
import './td-icon.js';

export interface TableColumn {
  key: string;
  label: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
  hideOnMobile?: boolean;
}

export interface TableTab {
  id: string;
  label: string;
  data: Record<string, unknown>[];
}

/**
 * Tampa Devs Table Component
 * Reusable data table with glass morphism styling and optional tabbed mode
 *
 * @element td-table
 *
 * @prop {string} title - Table title
 * @prop {TableColumn[]} columns - Column definitions
 * @prop {any[]} data - Row data array (simple mode)
 * @prop {TableTab[]} tabs - Tab definitions with data (tabbed mode)
 * @prop {string} activeTab - Currently active tab ID (tabbed mode)
 * @prop {boolean} compact - Use compact row height
 * @prop {boolean} striped - Add striped row styling
 * @prop {boolean} hoverable - Add hover effect on rows
 *
 * @fires tab-change - When the active tab changes (tabbed mode)
 *
 * @slot title-actions - Content to show in the title bar (right side)
 * @slot empty - Content to show when data is empty
 * @slot cell-{key} - Custom cell renderer slot for a specific column
 *
 * @csspart container - The outer container
 * @csspart header - The title header area
 * @csspart title - The title text
 * @csspart tabs - The tabs container
 * @csspart tab - Each tab
 * @csspart title-actions - The title actions area
 * @csspart table - The table element
 * @csspart thead - The table header
 * @csspart tbody - The table body
 * @csspart row - Each table row
 * @csspart cell - Each table cell
 */
@customElement('td-table')
export class TdTable extends LitElement {
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

      .title-actions {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0 1.5rem;
        margin-left: auto;
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
        white-space: nowrap;
      }

      th.align-center {
        text-align: center;
      }

      th.align-right {
        text-align: right;
      }

      td {
        padding: 1rem 1.5rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.03);
        vertical-align: middle;
        color: rgba(255, 255, 255, 0.9);
      }

      td.align-center {
        text-align: center;
      }

      td.align-right {
        text-align: right;
      }

      :host([compact]) td {
        padding: 0.75rem 1.5rem;
      }

      tr:last-child td {
        border-bottom: none;
      }

      :host([hoverable]) tbody tr:hover td {
        background: rgba(255, 255, 255, 0.02);
      }

      :host([striped]) tbody tr:nth-child(even) td {
        background: rgba(0, 0, 0, 0.1);
      }

      /* Empty state */
      .empty {
        padding: 3rem;
        text-align: center;
        color: rgba(156, 163, 175, 0.6);
      }

      /* Hide columns on mobile */
      @media (max-width: 768px) {
        .hide-mobile {
          display: none;
        }

        th,
        td {
          padding: 0.75rem 1rem;
        }

        .header {
          flex-wrap: wrap;
        }

        .title {
          padding: 1rem 1.5rem;
          width: 100%;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }
      }
    `,
  ];

  @property({ type: String }) title = '';
  @property({ type: Array }) columns: TableColumn[] = [];
  @property({ type: Array }) data: Record<string, unknown>[] = [];
  @property({ type: Array }) tabs: TableTab[] = [];
  @property({ type: String }) activeTab = '';
  @property({ type: Boolean, reflect: true }) compact = false;
  @property({ type: Boolean, reflect: true }) striped = false;
  @property({ type: Boolean, reflect: true }) hoverable = true;

  @state() private _canScrollLeft = false;
  @state() private _canScrollRight = false;

  @query('.tabs-scroll') private _tabsScrollRef!: HTMLElement;

  // Check if we're in tabbed mode
  private get isTabbedMode(): boolean {
    return this.tabs.length > 0;
  }

  // Get the current data to display
  private get displayData(): Record<string, unknown>[] {
    if (this.isTabbedMode) {
      const tab = this.tabs.find((t) => t.id === this.activeTab);
      return tab?.data ?? [];
    }
    return this.data;
  }

  firstUpdated() {
    if (this.isTabbedMode && !this.activeTab && this.tabs.length > 0) {
      this.activeTab = this.tabs[0].id;
    }
    requestAnimationFrame(() => this._updateScrollButtons());
  }

  updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('tabs')) {
      if (!this.activeTab && this.tabs.length > 0) {
        this.activeTab = this.tabs[0].id;
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

  private _handleTabClick(tabId: string) {
    this.activeTab = tabId;
    this.dispatchEvent(
      new CustomEvent('tab-change', {
        detail: { tab: tabId },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _handleTabsScroll() {
    this._updateScrollButtons();
  }

  private renderCell(row: Record<string, unknown>, column: TableColumn) {
    const value = row[column.key];

    // Check if there's a slotted cell renderer
    const slot = this.querySelector(`[slot="cell-${column.key}"]`);
    if (slot) {
      // Clone the slot content and inject the value
      const clone = slot.cloneNode(true) as HTMLElement;
      clone.removeAttribute('slot');
      return html`${clone}`;
    }

    // Default: render value as string
    return String(value ?? '—');
  }

  private renderTabs() {
    const showScrollButtons = this.tabs.length > 4;

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
          ${this.tabs.map(
            (tab) => html`
              <button
                class="tab ${this.activeTab === tab.id ? 'active' : ''}"
                part="tab ${this.activeTab === tab.id ? 'tab-active' : ''}"
                @click=${() => this._handleTabClick(tab.id)}
              >
                ${tab.label}
                <span class="badge">${tab.data.length}</span>
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
    const hasTitle = this.title;
    const hasTabs = this.isTabbedMode;
    const hasTitleActions = this.querySelector('[slot="title-actions"]');

    if (!hasTitle && !hasTabs && !hasTitleActions) {
      return nothing;
    }

    return html`
      <div class="header" part="header">
        ${hasTitle ? html`<h2 class="title" part="title">${this.title}</h2>` : nothing}
        ${hasTabs ? this.renderTabs() : nothing}
        ${hasTitleActions
          ? html`
              <div class="title-actions" part="title-actions">
                <slot name="title-actions"></slot>
              </div>
            `
          : nothing}
      </div>
    `;
  }

  render() {
    const displayData = this.displayData;

    return html`
      <div class="container" part="container">
        ${this.renderHeader()}

        ${displayData.length === 0
          ? html`
              <div class="empty">
                <slot name="empty">${this.isTabbedMode ? 'No data for this tab' : 'No data to display'}</slot>
              </div>
            `
          : html`
              <div class="table-wrapper">
                <table part="table">
                  <thead part="thead">
                    <tr>
                      ${this.columns.map(
                        (col) => html`
                          <th
                            class="${col.align ? `align-${col.align}` : ''} ${col.hideOnMobile ? 'hide-mobile' : ''}"
                            style=${col.width ? `width: ${col.width}` : ''}
                          >
                            ${col.label}
                          </th>
                        `
                      )}
                    </tr>
                  </thead>
                  <tbody part="tbody">
                    ${displayData.map(
                      (row) => html`
                        <tr part="row">
                          ${this.columns.map(
                            (col) => html`
                              <td
                                part="cell"
                                class="${col.align ? `align-${col.align}` : ''} ${col.hideOnMobile ? 'hide-mobile' : ''}"
                              >
                                ${this.renderCell(row, col)}
                              </td>
                            `
                          )}
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
    'td-table': TdTable;
  }
}
