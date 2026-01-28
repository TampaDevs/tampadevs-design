import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tokens, reset } from '../styles/shared.js';
import './td-icon.js';

export interface CalendarEvent {
  id: string;
  title: string;
  dateTime: string;
  endTime?: string;
  location?: string;
  groupName?: string;
  groupUrl?: string;
  eventUrl?: string;
  isOnline?: boolean;
}

export interface CalendarDay {
  date: Date;
  events: CalendarEvent[];
}

/**
 * Tampa Devs Calendar Component
 * Vertical timeline view showing events grouped by day
 *
 * @element td-calendar
 *
 * @prop {CalendarEvent[]} events - Array of events to display
 * @prop {number} days - Number of days to show (default: 30)
 * @prop {boolean} hideEmpty - Hide days with no events (default: false)
 * @prop {string} emptyMessage - Message for days with no events
 *
 * @fires event-click - When an event is clicked
 *
 * @csspart container - The main container
 * @csspart day - A day row
 * @csspart day-header - The day header (date)
 * @csspart event - An event item
 */
@customElement('td-calendar')
export class TdCalendar extends LitElement {
  static styles = [
    tokens,
    reset,
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

      .header {
        padding: 1.5rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      }

      .title {
        font-size: 1.25rem;
        font-weight: 700;
        color: white;
        margin: 0;
      }

      .calendar-body {
        max-height: 600px;
        overflow-y: auto;
        scrollbar-width: thin;
        scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
      }

      .calendar-body::-webkit-scrollbar {
        width: 6px;
      }

      .calendar-body::-webkit-scrollbar-track {
        background: transparent;
      }

      .calendar-body::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.2);
        border-radius: 3px;
      }

      .day-row {
        display: flex;
        border-bottom: 1px solid rgba(255, 255, 255, 0.03);
      }

      .day-row:last-child {
        border-bottom: none;
      }

      .day-row.today {
        background: rgba(59, 130, 246, 0.1);
      }

      .day-header {
        flex-shrink: 0;
        width: 80px;
        padding: 1rem;
        text-align: center;
        border-right: 1px solid rgba(255, 255, 255, 0.05);
        /* Make sticky while scrolling */
        position: sticky;
        top: 0;
        align-self: flex-start;
        background: rgba(28, 36, 56, 0.95);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        z-index: 1;
      }

      .day-weekday {
        font-size: 0.75rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: rgba(156, 163, 175, 0.8);
      }

      .today .day-weekday {
        color: var(--td-color-coral);
      }

      .today .day-header {
        background: rgba(59, 130, 246, 0.15);
      }

      .day-date {
        font-size: 1.5rem;
        font-weight: 700;
        color: white;
        line-height: 1.2;
      }

      .day-month {
        font-size: 0.75rem;
        color: rgba(156, 163, 175, 0.6);
      }

      .day-events {
        flex: 1;
        padding: 0.75rem 1rem;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }

      .event-item {
        display: flex;
        align-items: flex-start;
        gap: 0.75rem;
        padding: 0.75rem;
        background: rgba(255, 255, 255, 0.03);
        border-radius: var(--td-radius-lg);
        transition: all var(--td-transition-fast);
        cursor: pointer;
        text-decoration: none;
        color: inherit;
      }

      .event-item:hover {
        background: rgba(255, 255, 255, 0.08);
      }

      .event-time {
        flex-shrink: 0;
        font-size: 0.875rem;
        font-weight: 500;
        color: var(--td-color-coral);
        min-width: 70px;
      }

      .event-content {
        flex: 1;
        min-width: 0;
      }

      .event-title {
        font-weight: 600;
        color: white;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .event-meta {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-top: 0.25rem;
        font-size: 0.75rem;
        color: rgba(156, 163, 175, 0.8);
      }

      .event-group {
        color: rgba(209, 213, 219, 0.6);
      }

      .event-location {
        display: flex;
        align-items: center;
        gap: 0.25rem;
      }

      .online-badge {
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
        color: #22C55E;
      }

      .online-dot {
        width: 6px;
        height: 6px;
        background: currentColor;
        border-radius: 50%;
      }

      .no-events {
        padding: 1rem;
        font-size: 0.875rem;
        color: rgba(156, 163, 175, 0.5);
        font-style: italic;
      }

      .empty-state {
        padding: 3rem;
        text-align: center;
        color: rgba(156, 163, 175, 0.6);
      }

      /* Responsive */
      @media (max-width: 640px) {
        .day-header {
          width: 60px;
          padding: 0.75rem 0.5rem;
        }

        .day-date {
          font-size: 1.25rem;
        }

        .event-time {
          min-width: 50px;
          font-size: 0.75rem;
        }

        .event-item {
          flex-direction: column;
          gap: 0.25rem;
        }
      }
    `,
  ];

  @property({ type: Array }) events: CalendarEvent[] = [];
  @property({ type: Number }) days = 30;
  @property({ type: Boolean }) hideEmpty = false;
  @property({ type: String }) emptyMessage = 'No events';
  @property({ type: String }) title = '';

  private _isToday(date: Date): boolean {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  }

  private _formatTime(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  }

  private _groupEventsByDate(): CalendarDay[] {
    const days: CalendarDay[] = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Create map of events by date string
    const eventsByDate = new Map<string, CalendarEvent[]>();
    for (const event of this.events) {
      const eventDate = new Date(event.dateTime);
      const dateKey = eventDate.toDateString();
      if (!eventsByDate.has(dateKey)) {
        eventsByDate.set(dateKey, []);
      }
      eventsByDate.get(dateKey)!.push(event);
    }

    // Generate days array
    for (let i = 0; i < this.days; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() + i);
      const dateKey = date.toDateString();
      const dayEvents = eventsByDate.get(dateKey) || [];

      // Sort events by time
      dayEvents.sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime());

      if (!this.hideEmpty || dayEvents.length > 0) {
        days.push({ date, events: dayEvents });
      }
    }

    return days;
  }

  private _handleEventClick(event: CalendarEvent, e: Event) {
    this.dispatchEvent(
      new CustomEvent('event-click', {
        detail: { event },
        bubbles: true,
        composed: true,
      })
    );

    // If there's an event URL and it wasn't prevented, navigate
    if (event.eventUrl && !(e as MouseEvent).defaultPrevented) {
      // Let the anchor handle navigation
    }
  }

  private _renderEvent(event: CalendarEvent) {
    const content = html`
      <span class="event-time">${this._formatTime(event.dateTime)}</span>
      <div class="event-content">
        <div class="event-title">${event.title}</div>
        <div class="event-meta">
          ${event.groupName ? html`<span class="event-group">${event.groupName}</span>` : nothing}
          ${event.groupName && (event.location || event.isOnline) ? html`<span>·</span>` : nothing}
          ${event.isOnline
            ? html`<span class="online-badge"><span class="online-dot"></span>Online</span>`
            : event.location
              ? html`<span class="event-location">${event.location}</span>`
              : nothing}
        </div>
      </div>
    `;

    if (event.eventUrl) {
      return html`
        <a
          class="event-item"
          part="event"
          href=${event.eventUrl}
          @click=${(e: Event) => this._handleEventClick(event, e)}
        >
          ${content}
        </a>
      `;
    }

    return html`
      <div
        class="event-item"
        part="event"
        @click=${(e: Event) => this._handleEventClick(event, e)}
      >
        ${content}
      </div>
    `;
  }

  private _renderDay(day: CalendarDay) {
    const weekday = day.date.toLocaleDateString('en-US', { weekday: 'short' });
    const dateNum = day.date.getDate();
    const month = day.date.toLocaleDateString('en-US', { month: 'short' });
    const isToday = this._isToday(day.date);

    return html`
      <div class="day-row ${isToday ? 'today' : ''}" part="day">
        <div class="day-header" part="day-header">
          <div class="day-weekday">${weekday}</div>
          <div class="day-date">${dateNum}</div>
          <div class="day-month">${month}</div>
        </div>
        <div class="day-events">
          ${day.events.length > 0
            ? day.events.map((event) => this._renderEvent(event))
            : html`<div class="no-events">${this.emptyMessage}</div>`}
        </div>
      </div>
    `;
  }

  render() {
    const calendarDays = this._groupEventsByDate();

    return html`
      <div class="container" part="container">
        ${this.title
          ? html`
              <div class="header">
                <h2 class="title">${this.title}</h2>
              </div>
            `
          : nothing}

        <div class="calendar-body">
          ${calendarDays.length > 0
            ? calendarDays.map((day) => this._renderDay(day))
            : html`<div class="empty-state">No upcoming events</div>`}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'td-calendar': TdCalendar;
  }
}
