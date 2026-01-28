import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tokens, reset } from '../styles/shared.js';

export type EventCardVariant = 'default' | 'compact' | 'featured';

/**
 * Tampa Devs Event Card Component
 *
 * @element td-event-card
 *
 * @prop {EventCardVariant} variant - Card display variant
 * @prop {string} title - Event title
 * @prop {string} date - Event date (ISO string)
 * @prop {string} time - Formatted time string
 * @prop {string} location - Venue name
 * @prop {string} groupName - Group/organizer name
 * @prop {string} groupUrl - Link to group page
 * @prop {string} eventUrl - Link to event details
 * @prop {string} imageUrl - Event photo URL
 * @prop {number} rsvpCount - Number of RSVPs
 * @prop {boolean} isOnline - Whether event is online
 * @prop {string} description - Event description (featured variant)
 * @prop {string} relativeTime - Relative time string (e.g., "Tomorrow", "In 3 days")
 *
 * @csspart card - The card container
 * @csspart image - The image element
 * @csspart content - The content area
 * @csspart title - The title element
 */
@customElement('td-event-card')
export class TdEventCard extends LitElement {
  static styles = [
    tokens,
    reset,
    css`
      :host {
        display: block;
      }

      /* ============================================
         COMPACT VARIANT
         ============================================ */
      .card-compact {
        display: flex;
        gap: 1rem;
        padding: 1rem;
        background: var(--td-color-surface);
        border-radius: var(--td-radius-lg);
        border: 1px solid var(--td-color-border);
        transition: border-color var(--td-transition-fast);
      }

      .card-compact:hover {
        border-color: rgba(28, 36, 56, 0.3);
      }

      .compact-date {
        flex-shrink: 0;
        width: 4rem;
        text-align: center;
      }

      .compact-date-month {
        font-size: 0.875rem;
        font-weight: 600;
        color: var(--td-color-navy);
      }

      .compact-date-day {
        font-size: 1.5rem;
        font-weight: 700;
        color: var(--td-color-text);
      }

      .compact-date-time {
        font-size: 0.75rem;
        color: var(--td-color-text-muted);
      }

      .compact-content {
        flex: 1;
        min-width: 0;
      }

      .compact-title {
        font-weight: 600;
        color: var(--td-color-text);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin: 0;
      }

      .compact-title:hover {
        color: var(--td-color-navy);
      }

      .compact-group {
        font-size: 0.875rem;
        color: var(--td-color-text-muted);
      }

      .compact-group a:hover {
        color: var(--td-color-navy);
      }

      .compact-meta {
        margin-top: 0.25rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.75rem;
        color: var(--td-color-text-muted);
      }

      .online-indicator {
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
      }

      .online-dot {
        width: 0.5rem;
        height: 0.5rem;
        background: #22C55E;
        border-radius: 50%;
      }

      /* ============================================
         FEATURED VARIANT
         ============================================ */
      .card-featured {
        position: relative;
        overflow: hidden;
        border-radius: var(--td-radius-2xl);
        background: linear-gradient(135deg, var(--td-color-navy) 0%, var(--td-color-navy-dark) 100%);
        color: white;
        box-shadow: var(--td-shadow-xl), 0 8px 16px rgba(28, 36, 56, 0.3);
      }

      .featured-bg-image {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        opacity: 0.3;
      }

      .featured-overlay {
        position: absolute;
        inset: 0;
        backdrop-filter: blur(2px);
        background: linear-gradient(135deg, rgba(28, 36, 56, 0.6) 0%, rgba(26, 32, 49, 0.8) 100%);
      }

      .featured-content {
        position: relative;
        padding: 1.5rem;
      }

      @media (min-width: 768px) {
        .featured-content {
          padding: 2rem;
        }
      }

      .featured-meta {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: #D1D5DB;
        font-size: 0.875rem;
        margin-bottom: 0.5rem;
      }

      .featured-meta-label {
        text-transform: uppercase;
        letter-spacing: 0.05em;
        font-weight: 600;
      }

      .featured-title {
        font-size: 1.5rem;
        font-weight: 700;
        margin: 0 0 0.5rem 0;
      }

      @media (min-width: 768px) {
        .featured-title {
          font-size: 1.875rem;
        }
      }

      .featured-title a:hover {
        text-decoration: underline;
      }

      .featured-group {
        color: #D1D5DB;
      }

      .featured-group a:hover {
        color: white;
      }

      .featured-description {
        margin-top: 1rem;
        color: rgba(209, 213, 219, 0.8);
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      .featured-footer {
        margin-top: 1.5rem;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 1rem;
      }

      .featured-location,
      .featured-rsvp {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.875rem;
      }

      .featured-cta {
        margin-top: 1.5rem;
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        background: linear-gradient(180deg, var(--td-color-coral) 0%, var(--td-color-coral-dark) 100%);
        color: white;
        padding: 0.75rem 1.5rem;
        border-radius: var(--td-radius-lg);
        font-weight: 600;
        transition: all var(--td-transition-fast);
        box-shadow: var(--td-shadow-md), 0 4px 6px rgba(232, 90, 79, 0.15);
      }

      .featured-cta:hover {
        background: linear-gradient(180deg, var(--td-color-coral-light) 0%, var(--td-color-coral) 100%);
        transform: translateY(-2px);
        box-shadow: var(--td-shadow-lg), 0 6px 10px rgba(232, 90, 79, 0.2);
      }

      /* ============================================
         DEFAULT VARIANT
         ============================================ */
      .card-default {
        height: 100%;
        display: flex;
        flex-direction: column;
        border-radius: var(--td-radius-xl);
        overflow: hidden;
        transition: all var(--td-transition-normal);
        backdrop-filter: blur(4px);
        background: rgba(255, 255, 255, 0.8);
        border: 1px solid rgba(255, 255, 255, 0.2);
        box-shadow:
          0 4px 6px -1px rgba(0, 0, 0, 0.05),
          0 2px 4px -2px rgba(0, 0, 0, 0.03),
          inset 0 1px 0 0 rgba(255, 255, 255, 0.1);
      }

      .card-default:hover {
        background: rgba(255, 255, 255, 0.9);
        box-shadow:
          0 10px 15px -3px rgba(0, 0, 0, 0.08),
          0 4px 6px -4px rgba(0, 0, 0, 0.04),
          inset 0 1px 0 0 rgba(255, 255, 255, 0.15);
      }

      .default-image-wrapper {
        height: 10rem;
        flex-shrink: 0;
        background: #F3F4F6;
        position: relative;
        overflow: hidden;
      }

      .default-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .default-image-placeholder {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .default-image-placeholder svg {
        width: 3rem;
        height: 3rem;
        color: #D1D5DB;
      }

      .date-badge {
        position: absolute;
        top: 0.75rem;
        left: 0.75rem;
        backdrop-filter: blur(12px);
        background: rgba(255, 255, 255, 0.8);
        border-radius: var(--td-radius-lg);
        padding: 0.25rem 0.5rem;
        box-shadow: var(--td-shadow-lg), 0 4px 6px rgba(0, 0, 0, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.5);
      }

      .date-badge-month {
        font-size: 0.75rem;
        font-weight: 600;
        color: var(--td-color-navy);
      }

      .date-badge-day {
        font-size: 1.125rem;
        font-weight: 700;
        color: var(--td-color-text);
        line-height: 1.2;
      }

      .online-badge {
        position: absolute;
        top: 0.75rem;
        right: 0.75rem;
        backdrop-filter: blur(12px);
        background: rgba(34, 197, 94, 0.9);
        color: white;
        font-size: 0.75rem;
        font-weight: 500;
        padding: 0.25rem 0.625rem;
        border-radius: var(--td-radius-full);
        display: flex;
        align-items: center;
        gap: 0.375rem;
        box-shadow: var(--td-shadow-lg), 0 4px 6px rgba(34, 197, 94, 0.25);
        border: 1px solid rgba(74, 222, 128, 0.3);
      }

      .online-badge-dot {
        width: 0.375rem;
        height: 0.375rem;
        background: white;
        border-radius: 50%;
        animation: pulse 2s infinite;
      }

      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }

      .default-content {
        flex: 1;
        padding: 1rem;
        display: flex;
        flex-direction: column;
      }

      .default-time {
        font-size: 0.875rem;
        color: var(--td-color-text-muted);
        margin-bottom: 0.25rem;
      }

      .default-title {
        font-weight: 600;
        color: var(--td-color-text);
        transition: color var(--td-transition-fast);
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        min-height: 3rem;
        margin: 0;
      }

      .default-title:hover {
        color: var(--td-color-navy);
      }

      .default-group {
        font-size: 0.875rem;
        color: var(--td-color-text-muted);
        margin-top: 0.25rem;
      }

      .default-group a:hover {
        color: var(--td-color-navy);
      }

      .default-spacer {
        flex: 1;
      }

      .default-footer {
        margin-top: 0.75rem;
        padding-top: 0.75rem;
        border-top: 1px solid #F3F4F6;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 0.75rem;
        color: var(--td-color-text-muted);
      }

      .default-location {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        overflow: hidden;
      }

      .default-location span {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .default-rsvp {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        flex-shrink: 0;
        margin-left: 0.5rem;
      }

      .icon-sm {
        width: 0.875rem;
        height: 0.875rem;
        flex-shrink: 0;
      }

      .icon-md {
        width: 1rem;
        height: 1rem;
      }

      a {
        color: inherit;
        text-decoration: none;
      }
    `,
  ];

  @property({ type: String }) variant: EventCardVariant = 'default';
  @property({ type: String }) title = '';
  @property({ type: String }) date = '';
  @property({ type: String }) time = '';
  @property({ type: String }) location = '';
  @property({ type: String }) groupName = '';
  @property({ type: String }) groupUrl = '';
  @property({ type: String }) eventUrl = '';
  @property({ type: String }) imageUrl = '';
  @property({ type: Number }) rsvpCount = 0;
  @property({ type: Boolean }) isOnline = false;
  @property({ type: String }) description = '';
  @property({ type: String }) relativeTime = '';

  private _getMonth(): string {
    if (!this.date) return '';
    const d = new Date(this.date);
    return d.toLocaleDateString('en-US', { month: 'short' });
  }

  private _getDay(): number {
    if (!this.date) return 0;
    return new Date(this.date).getDate();
  }

  private _renderCompact() {
    return html`
      <article class="card-compact" part="card">
        <div class="compact-date">
          <div class="compact-date-month">${this._getMonth()}</div>
          <div class="compact-date-day">${this._getDay()}</div>
          <div class="compact-date-time">${this.time}</div>
        </div>
        <div class="compact-content" part="content">
          <a href=${this.eventUrl || '#'}>
            <h3 class="compact-title" part="title">${this.title}</h3>
          </a>
          <div class="compact-group">
            ${this.groupUrl
              ? html`<a href=${this.groupUrl}>${this.groupName}</a>`
              : this.groupName}
          </div>
          <div class="compact-meta">
            ${this.isOnline
              ? html`<span class="online-indicator"><span class="online-dot"></span>Online</span>`
              : this.location
                ? html`<span>${this.location}</span>`
                : nothing}
            <span>·</span>
            <span>${this.rsvpCount} going</span>
          </div>
        </div>
      </article>
    `;
  }

  private _renderFeatured() {
    return html`
      <article class="card-featured" part="card">
        ${this.imageUrl
          ? html`<img class="featured-bg-image" src=${this.imageUrl} alt="" part="image" />`
          : nothing}
        <div class="featured-overlay"></div>
        <div class="featured-content" part="content">
          <div class="featured-meta">
            <span class="featured-meta-label">${this.relativeTime || 'Upcoming'}</span>
            <span>·</span>
            <span>${this.time}</span>
          </div>

          <h2 class="featured-title" part="title">
            <a href=${this.eventUrl || '#'}>${this.title}</a>
          </h2>

          <div class="featured-group">
            ${this.groupUrl
              ? html`<a href=${this.groupUrl}>${this.groupName}</a>`
              : this.groupName}
          </div>

          ${this.description
            ? html`<p class="featured-description">${this.description}</p>`
            : nothing}

          <div class="featured-footer">
            ${!this.isOnline && this.location
              ? html`
                  <div class="featured-location">
                    <svg class="icon-md" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>${this.location}</span>
                  </div>
                `
              : nothing}
            <div class="featured-rsvp">
              <svg class="icon-md" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>${this.rsvpCount} going</span>
            </div>
          </div>

          <a class="featured-cta" href=${this.eventUrl || '#'}>
            View Event
            <svg class="icon-md" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </article>
    `;
  }

  private _renderDefault() {
    return html`
      <article class="card-default" part="card">
        <div class="default-image-wrapper">
          ${this.imageUrl
            ? html`<img class="default-image" src=${this.imageUrl} alt="" part="image" />`
            : html`
                <div class="default-image-placeholder">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              `}
          <div class="date-badge">
            <div class="date-badge-month">${this._getMonth()}</div>
            <div class="date-badge-day">${this._getDay()}</div>
          </div>
          ${this.isOnline
            ? html`
                <div class="online-badge">
                  <span class="online-badge-dot"></span>
                  Online
                </div>
              `
            : nothing}
        </div>

        <div class="default-content" part="content">
          <div class="default-time">${this.time}</div>
          <a href=${this.eventUrl || '#'}>
            <h3 class="default-title" part="title">${this.title}</h3>
          </a>
          <div class="default-group">
            ${this.groupUrl
              ? html`<a href=${this.groupUrl}>${this.groupName}</a>`
              : this.groupName}
          </div>

          <div class="default-spacer"></div>

          <div class="default-footer">
            <div class="default-location">
              ${!this.isOnline && this.location
                ? html`
                    <svg class="icon-sm" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    <span>${this.location}</span>
                  `
                : html`<span style="color: #16A34A;">Online Event</span>`}
            </div>
            <div class="default-rsvp">
              <svg class="icon-sm" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>${this.rsvpCount}</span>
            </div>
          </div>
        </div>
      </article>
    `;
  }

  render() {
    switch (this.variant) {
      case 'compact':
        return this._renderCompact();
      case 'featured':
        return this._renderFeatured();
      default:
        return this._renderDefault();
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'td-event-card': TdEventCard;
  }
}
