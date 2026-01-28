import { clsx } from 'clsx';

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

export type CalendarVariant = 'light' | 'dark';

export interface CalendarProps {
  events?: CalendarEvent[];
  days?: number;
  hideEmpty?: boolean;
  emptyMessage?: string;
  title?: string;
  onEventClick?: (event: CalendarEvent) => void;
  className?: string;
  /** Visual variant - 'light' for light backgrounds, 'dark' for glass-dark style */
  variant?: CalendarVariant;
  /** Remove max-height constraint, letting the page scroll instead of the calendar body */
  fullHeight?: boolean;
}

interface CalendarDay {
  date: Date;
  events: CalendarEvent[];
}

function isToday(date: Date): boolean {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

function formatTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

function groupEventsByDate(events: CalendarEvent[], days: number, hideEmpty: boolean): CalendarDay[] {
  const result: CalendarDay[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const eventsByDate = new Map<string, CalendarEvent[]>();
  for (const event of events) {
    const eventDate = new Date(event.dateTime);
    const dateKey = eventDate.toDateString();
    if (!eventsByDate.has(dateKey)) {
      eventsByDate.set(dateKey, []);
    }
    eventsByDate.get(dateKey)!.push(event);
  }

  for (let i = 0; i < days; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() + i);
    const dateKey = date.toDateString();
    const dayEvents = eventsByDate.get(dateKey) || [];

    dayEvents.sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime());

    if (!hideEmpty || dayEvents.length > 0) {
      result.push({ date, events: dayEvents });
    }
  }

  return result;
}

export function Calendar({
  events = [],
  days = 30,
  hideEmpty = false,
  emptyMessage = 'No events',
  title,
  onEventClick,
  className,
  variant = 'dark',
  fullHeight = false,
}: CalendarProps) {
  const calendarDays = groupEventsByDate(events, days, hideEmpty);
  const variantClass = variant === 'light' ? 'td-calendar--light' : 'td-calendar--dark';
  const heightClass = fullHeight ? 'td-calendar--full-height' : '';

  const renderEvent = (event: CalendarEvent) => {
    const content = (
      <>
        <span className="td-calendar__event-time">{formatTime(event.dateTime)}</span>
        <div className="td-calendar__event-content">
          <div className="td-calendar__event-title">{event.title}</div>
          <div className="td-calendar__event-meta">
            {event.groupName && <span className="td-calendar__event-group">{event.groupName}</span>}
            {event.groupName && (event.location || event.isOnline) && <span>·</span>}
            {event.isOnline ? (
              <span className="td-calendar__online-badge">
                <span className="td-calendar__online-dot" />
                Online
              </span>
            ) : event.location ? (
              <span className="td-calendar__event-location">{event.location}</span>
            ) : null}
          </div>
        </div>
      </>
    );

    const handleClick = () => onEventClick?.(event);

    if (event.eventUrl) {
      return (
        <a
          key={event.id}
          className="td-calendar__event-item"
          href={event.eventUrl}
          onClick={handleClick}
        >
          {content}
        </a>
      );
    }

    return (
      <div key={event.id} className="td-calendar__event-item" onClick={handleClick}>
        {content}
      </div>
    );
  };

  const renderDay = (day: CalendarDay, index: number) => {
    const weekday = day.date.toLocaleDateString('en-US', { weekday: 'short' });
    const dateNum = day.date.getDate();
    const month = day.date.toLocaleDateString('en-US', { month: 'short' });
    const dayIsToday = isToday(day.date);

    return (
      <div key={index} className={clsx('td-calendar__day-row', dayIsToday && 'td-calendar__day-row--today')}>
        <div className="td-calendar__day-header">
          <div className="td-calendar__day-weekday">{weekday}</div>
          <div className="td-calendar__day-date">{dateNum}</div>
          <div className="td-calendar__day-month">{month}</div>
        </div>
        <div className="td-calendar__day-events">
          {day.events.length > 0 ? (
            day.events.map(renderEvent)
          ) : (
            <div className="td-calendar__no-events">{emptyMessage}</div>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className={clsx('td-calendar', variantClass, heightClass, className)}>
        {title && (
          <div className="td-calendar__header">
            <h2 className="td-calendar__title">{title}</h2>
          </div>
        )}

        <div className="td-calendar__body">
          {calendarDays.length > 0 ? (
            calendarDays.map(renderDay)
          ) : (
            <div className="td-calendar__empty-state">No upcoming events</div>
          )}
        </div>
      </div>
      <CalendarStyles />
    </>
  );
}

function CalendarStyles() {
  return (
    <style>{`
      /* Base styles */
      .td-calendar {
        border-radius: 0.875rem;
        overflow: hidden;
      }

      .td-calendar__header {
        padding: 1.5rem;
      }

      .td-calendar__title {
        font-size: 1.25rem;
        font-weight: 700;
        margin: 0;
      }

      .td-calendar__body {
        max-height: 600px;
        overflow-y: auto;
        scrollbar-width: thin;
      }

      .td-calendar--full-height .td-calendar__body {
        max-height: none;
        overflow-y: visible;
      }

      .td-calendar__day-row {
        display: flex;
      }

      .td-calendar__day-row:last-child {
        border-bottom: none;
      }

      .td-calendar__day-header {
        flex-shrink: 0;
        width: 80px;
        padding: 1rem;
        text-align: center;
        position: sticky;
        top: 0;
        align-self: flex-start;
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        z-index: 1;
      }

      .td-calendar__day-weekday {
        font-size: 0.75rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }

      .td-calendar__day-row--today .td-calendar__day-weekday {
        color: #E85A4F;
      }

      .td-calendar__day-date {
        font-size: 1.5rem;
        font-weight: 700;
        line-height: 1.2;
      }

      .td-calendar__day-month {
        font-size: 0.75rem;
      }

      .td-calendar__day-events {
        flex: 1;
        padding: 0.75rem 1rem;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }

      .td-calendar__event-item {
        display: flex;
        align-items: flex-start;
        gap: 0.75rem;
        padding: 0.75rem;
        border-radius: 0.5rem;
        transition: all 0.15s ease;
        cursor: pointer;
        text-decoration: none;
        color: inherit;
      }

      .td-calendar__event-time {
        flex-shrink: 0;
        font-size: 0.875rem;
        font-weight: 500;
        color: #E85A4F;
        min-width: 70px;
      }

      .td-calendar__event-content {
        flex: 1;
        min-width: 0;
      }

      .td-calendar__event-title {
        font-weight: 600;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .td-calendar__event-meta {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-top: 0.25rem;
        font-size: 0.75rem;
      }

      .td-calendar__online-badge {
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
        color: #22C55E;
      }

      .td-calendar__online-dot {
        width: 6px;
        height: 6px;
        background: currentColor;
        border-radius: 50%;
      }

      .td-calendar__no-events {
        padding: 1rem;
        font-size: 0.875rem;
        font-style: italic;
      }

      .td-calendar__empty-state {
        padding: 3rem;
        text-align: center;
      }

      /* ============================================
         DARK VARIANT (glass-dark style)
         ============================================ */
      .td-calendar--dark {
        background: rgba(28, 36, 56, 0.8);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        border: 1px solid rgba(255, 255, 255, 0.05);
        box-shadow:
          inset 0 1px 1px 0 rgba(255, 255, 255, 0.05),
          0 8px 24px -4px rgba(0, 0, 0, 0.15);
      }

      .td-calendar--dark .td-calendar__header {
        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      }

      .td-calendar--dark .td-calendar__title {
        color: white;
      }

      .td-calendar--dark .td-calendar__body {
        scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
      }

      .td-calendar--dark .td-calendar__day-row {
        border-bottom: 1px solid rgba(255, 255, 255, 0.03);
      }

      .td-calendar--dark .td-calendar__day-row--today {
        background: rgba(59, 130, 246, 0.1);
      }

      .td-calendar--dark .td-calendar__day-header {
        border-right: 1px solid rgba(255, 255, 255, 0.05);
        background: rgba(28, 36, 56, 0.95);
      }

      .td-calendar--dark .td-calendar__day-row--today .td-calendar__day-header {
        background: rgba(59, 130, 246, 0.15);
      }

      .td-calendar--dark .td-calendar__day-weekday {
        color: rgba(209, 213, 219, 0.9);
      }

      .td-calendar--dark .td-calendar__day-date {
        color: white;
      }

      .td-calendar--dark .td-calendar__day-month {
        color: rgba(209, 213, 219, 0.7);
      }

      .td-calendar--dark .td-calendar__event-item {
        background: rgba(255, 255, 255, 0.06);
      }

      .td-calendar--dark .td-calendar__event-item:hover {
        background: rgba(255, 255, 255, 0.1);
      }

      .td-calendar--dark .td-calendar__event-title {
        color: white;
      }

      .td-calendar--dark .td-calendar__event-meta {
        color: rgba(209, 213, 219, 0.85);
      }

      .td-calendar--dark .td-calendar__event-group {
        color: rgba(209, 213, 219, 0.7);
      }

      .td-calendar--dark .td-calendar__no-events {
        color: rgba(209, 213, 219, 0.6);
      }

      .td-calendar--dark .td-calendar__empty-state {
        color: rgba(209, 213, 219, 0.7);
      }

      /* ============================================
         LIGHT VARIANT
         ============================================ */
      .td-calendar--light {
        background: white;
        border: 1px solid #E5E7EB;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);
      }

      .td-calendar--light .td-calendar__header {
        border-bottom: 1px solid #E5E7EB;
      }

      .td-calendar--light .td-calendar__title {
        color: #111827;
      }

      .td-calendar--light .td-calendar__body {
        scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
      }

      .td-calendar--light .td-calendar__day-row {
        border-bottom: 1px solid #F3F4F6;
      }

      .td-calendar--light .td-calendar__day-row--today {
        background: rgba(59, 130, 246, 0.05);
      }

      .td-calendar--light .td-calendar__day-header {
        border-right: 1px solid #F3F4F6;
        background: #F9FAFB;
      }

      .td-calendar--light .td-calendar__day-row--today .td-calendar__day-header {
        background: rgba(59, 130, 246, 0.1);
      }

      .td-calendar--light .td-calendar__day-weekday {
        color: #6B7280;
      }

      .td-calendar--light .td-calendar__day-date {
        color: #111827;
      }

      .td-calendar--light .td-calendar__day-month {
        color: #9CA3AF;
      }

      .td-calendar--light .td-calendar__event-item {
        background: #F9FAFB;
      }

      .td-calendar--light .td-calendar__event-item:hover {
        background: #F3F4F6;
      }

      .td-calendar--light .td-calendar__event-title {
        color: #111827;
      }

      .td-calendar--light .td-calendar__event-meta {
        color: #6B7280;
      }

      .td-calendar--light .td-calendar__event-group {
        color: #9CA3AF;
      }

      .td-calendar--light .td-calendar__no-events {
        color: #9CA3AF;
      }

      .td-calendar--light .td-calendar__empty-state {
        color: #6B7280;
      }

      /* Light variant dark mode */
      @media (prefers-color-scheme: dark) {
        .td-calendar--light {
          background: #111827;
          border-color: #374151;
        }

        .td-calendar--light .td-calendar__header {
          border-bottom-color: #374151;
        }

        .td-calendar--light .td-calendar__title {
          color: #F9FAFB;
        }

        .td-calendar--light .td-calendar__day-row {
          border-bottom-color: #1F2937;
        }

        .td-calendar--light .td-calendar__day-row--today {
          background: rgba(59, 130, 246, 0.15);
        }

        .td-calendar--light .td-calendar__day-header {
          border-right-color: #1F2937;
          background: #1F2937;
        }

        .td-calendar--light .td-calendar__day-row--today .td-calendar__day-header {
          background: rgba(59, 130, 246, 0.2);
        }

        .td-calendar--light .td-calendar__day-weekday {
          color: #9CA3AF;
        }

        .td-calendar--light .td-calendar__day-date {
          color: #F9FAFB;
        }

        .td-calendar--light .td-calendar__day-month {
          color: #6B7280;
        }

        .td-calendar--light .td-calendar__event-item {
          background: #1F2937;
        }

        .td-calendar--light .td-calendar__event-item:hover {
          background: #374151;
        }

        .td-calendar--light .td-calendar__event-title {
          color: #F9FAFB;
        }

        .td-calendar--light .td-calendar__event-meta {
          color: #9CA3AF;
        }

        .td-calendar--light .td-calendar__event-group {
          color: #6B7280;
        }

        .td-calendar--light .td-calendar__no-events {
          color: #6B7280;
        }

        .td-calendar--light .td-calendar__empty-state {
          color: #9CA3AF;
        }
      }

      /* ============================================
         RESPONSIVE
         ============================================ */
      @media (max-width: 640px) {
        .td-calendar__day-header {
          width: 60px;
          padding: 0.75rem 0.5rem;
        }

        .td-calendar__day-date {
          font-size: 1.25rem;
        }

        .td-calendar__event-time {
          min-width: 50px;
          font-size: 0.75rem;
        }

        .td-calendar__event-item {
          flex-direction: column;
          gap: 0.25rem;
        }
      }
    `}</style>
  );
}
