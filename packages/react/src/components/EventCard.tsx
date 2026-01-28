import { clsx } from 'clsx';

export type EventCardVariant = 'default' | 'compact' | 'featured';

export interface EventCardProps {
  variant?: EventCardVariant;
  title: string;
  date: string;
  time?: string;
  location?: string;
  groupName?: string;
  groupUrl?: string;
  eventUrl?: string;
  imageUrl?: string;
  rsvpCount?: number;
  isOnline?: boolean;
  description?: string;
  relativeTime?: string;
  className?: string;
}

function getMonth(date: string): string {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('en-US', { month: 'short' });
}

function getDay(date: string): number {
  if (!date) return 0;
  return new Date(date).getDate();
}

export function EventCard({
  variant = 'default',
  title,
  date,
  time = '',
  location = '',
  groupName = '',
  groupUrl = '',
  eventUrl = '',
  imageUrl = '',
  rsvpCount = 0,
  isOnline = false,
  description = '',
  relativeTime = '',
  className,
}: EventCardProps) {
  const month = getMonth(date);
  const day = getDay(date);

  return (
    <>
      {variant === 'compact' && (
        <article className={clsx('td-event-card-compact', className)}>
          <div className="td-event-card-compact__date">
            <div className="td-event-card-compact__month">{month}</div>
            <div className="td-event-card-compact__day">{day}</div>
            <div className="td-event-card-compact__time">{time}</div>
          </div>
          <div className="td-event-card-compact__content">
            <a href={eventUrl || '#'}>
              <h3 className="td-event-card-compact__title">{title}</h3>
            </a>
            <div className="td-event-card-compact__group">
              {groupUrl ? <a href={groupUrl}>{groupName}</a> : groupName}
            </div>
            <div className="td-event-card-compact__meta">
              {isOnline ? (
                <span className="td-event-card__online-indicator">
                  <span className="td-event-card__online-dot" />
                  Online
                </span>
              ) : location ? (
                <span>{location}</span>
              ) : null}
              <span>·</span>
              <span>{rsvpCount} going</span>
            </div>
          </div>
        </article>
      )}

      {variant === 'featured' && (
        <article className={clsx('td-event-card-featured', className)}>
          {imageUrl && (
            <img className="td-event-card-featured__bg" src={imageUrl} alt="" />
          )}
          <div className="td-event-card-featured__overlay" />
          <div className="td-event-card-featured__content">
            <div className="td-event-card-featured__meta">
              <span className="td-event-card-featured__label">
                {relativeTime || 'Upcoming'}
              </span>
              <span>·</span>
              <span>{time}</span>
            </div>

            <h2 className="td-event-card-featured__title">
              <a href={eventUrl || '#'}>{title}</a>
            </h2>

            <div className="td-event-card-featured__group">
              {groupUrl ? <a href={groupUrl}>{groupName}</a> : groupName}
            </div>

            {description && (
              <p className="td-event-card-featured__description">{description}</p>
            )}

            <div className="td-event-card-featured__footer">
              {!isOnline && location && (
                <div className="td-event-card-featured__location">
                  <svg className="td-event-card__icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{location}</span>
                </div>
              )}
              <div className="td-event-card-featured__rsvp">
                <svg className="td-event-card__icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{rsvpCount} going</span>
              </div>
            </div>

            <a className="td-event-card-featured__cta" href={eventUrl || '#'}>
              View Event
              <svg className="td-event-card__icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </article>
      )}

      {variant === 'default' && (
        <article className={clsx('td-event-card-default', className)}>
          <div className="td-event-card-default__image-wrapper">
            {imageUrl ? (
              <img className="td-event-card-default__image" src={imageUrl} alt="" />
            ) : (
              <div className="td-event-card-default__placeholder">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            )}
            <div className="td-event-card-default__date-badge">
              <div className="td-event-card-default__badge-month">{month}</div>
              <div className="td-event-card-default__badge-day">{day}</div>
            </div>
            {isOnline && (
              <div className="td-event-card-default__online-badge">
                <span className="td-event-card-default__online-dot" />
                Online
              </div>
            )}
          </div>

          <div className="td-event-card-default__content">
            <div className="td-event-card-default__time">{time}</div>
            <a href={eventUrl || '#'}>
              <h3 className="td-event-card-default__title">{title}</h3>
            </a>
            <div className="td-event-card-default__group">
              {groupUrl ? <a href={groupUrl}>{groupName}</a> : groupName}
            </div>

            <div className="td-event-card-default__spacer" />

            <div className="td-event-card-default__footer">
              <div className="td-event-card-default__location">
                {!isOnline && location ? (
                  <>
                    <svg className="td-event-card__icon-sm" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    <span>{location}</span>
                  </>
                ) : (
                  <span style={{ color: '#16A34A' }}>Online Event</span>
                )}
              </div>
              <div className="td-event-card-default__rsvp">
                <svg className="td-event-card__icon-sm" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{rsvpCount}</span>
              </div>
            </div>
          </div>
        </article>
      )}

      <EventCardStyles />
    </>
  );
}

function EventCardStyles() {
  return (
    <style>{`
      /* ============================================
         COMPACT VARIANT
         ============================================ */
      .td-event-card-compact {
        display: flex;
        gap: 1rem;
        padding: 1rem;
        background: rgba(255, 255, 255, 0.8);
        border-radius: 0.75rem;
        border: 1px solid rgba(28, 36, 56, 0.1);
        transition: border-color 0.15s ease;
      }

      .td-event-card-compact:hover {
        border-color: rgba(28, 36, 56, 0.3);
      }

      .td-event-card-compact__date {
        flex-shrink: 0;
        width: 4rem;
        text-align: center;
      }

      .td-event-card-compact__month {
        font-size: 0.875rem;
        font-weight: 600;
        color: #1C2438;
      }

      .td-event-card-compact__day {
        font-size: 1.5rem;
        font-weight: 700;
        color: #111827;
      }

      .td-event-card-compact__time {
        font-size: 0.75rem;
        color: #6B7280;
      }

      .td-event-card-compact__content {
        flex: 1;
        min-width: 0;
      }

      .td-event-card-compact__title {
        font-weight: 600;
        color: #111827;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin: 0;
        transition: color 0.15s ease;
      }

      .td-event-card-compact__title:hover {
        color: #1C2438;
      }

      .td-event-card-compact__group {
        font-size: 0.875rem;
        color: #6B7280;
      }

      .td-event-card-compact__group a:hover {
        color: #1C2438;
      }

      .td-event-card-compact__meta {
        margin-top: 0.25rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.75rem;
        color: #6B7280;
      }

      .td-event-card__online-indicator {
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
      }

      .td-event-card__online-dot {
        width: 0.5rem;
        height: 0.5rem;
        background: #22C55E;
        border-radius: 50%;
      }

      /* ============================================
         FEATURED VARIANT
         ============================================ */
      .td-event-card-featured {
        position: relative;
        overflow: hidden;
        border-radius: 1rem;
        background: linear-gradient(135deg, #1C2438 0%, #1A2031 100%);
        color: white;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(28, 36, 56, 0.3);
      }

      .td-event-card-featured__bg {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        opacity: 0.3;
      }

      .td-event-card-featured__overlay {
        position: absolute;
        inset: 0;
        backdrop-filter: blur(2px);
        background: linear-gradient(135deg, rgba(28, 36, 56, 0.6) 0%, rgba(26, 32, 49, 0.8) 100%);
      }

      .td-event-card-featured__content {
        position: relative;
        padding: 1.5rem;
      }

      @media (min-width: 768px) {
        .td-event-card-featured__content {
          padding: 2rem;
        }
      }

      .td-event-card-featured__meta {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: #D1D5DB;
        font-size: 0.875rem;
        margin-bottom: 0.5rem;
      }

      .td-event-card-featured__label {
        text-transform: uppercase;
        letter-spacing: 0.05em;
        font-weight: 600;
      }

      .td-event-card-featured__title {
        font-size: 1.5rem;
        font-weight: 700;
        margin: 0 0 0.5rem 0;
      }

      @media (min-width: 768px) {
        .td-event-card-featured__title {
          font-size: 1.875rem;
        }
      }

      .td-event-card-featured__title a {
        color: inherit;
        text-decoration: none;
      }

      .td-event-card-featured__title a:hover {
        text-decoration: underline;
      }

      .td-event-card-featured__group {
        color: #D1D5DB;
      }

      .td-event-card-featured__group a {
        color: inherit;
        text-decoration: none;
      }

      .td-event-card-featured__group a:hover {
        color: white;
      }

      .td-event-card-featured__description {
        margin-top: 1rem;
        color: rgba(209, 213, 219, 0.8);
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      .td-event-card-featured__footer {
        margin-top: 1.5rem;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 1rem;
      }

      .td-event-card-featured__location,
      .td-event-card-featured__rsvp {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.875rem;
      }

      .td-event-card-featured__cta {
        margin-top: 1.5rem;
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        background-color: #E85A4F;
        color: white;
        padding: 0.875rem 1.5rem;
        border-radius: 0.5rem;
        font-weight: 600;
        font-size: 0.875rem;
        text-transform: uppercase;
        letter-spacing: 0.025em;
        transition: all 0.15s ease;
        box-shadow: 0 4px 6px -1px rgba(232, 90, 79, 0.25);
        text-decoration: none;
      }

      .td-event-card-featured__cta:hover {
        background-color: #F07167;
        transform: translateY(-1px);
        box-shadow: 0 6px 10px -2px rgba(232, 90, 79, 0.3);
      }

      /* ============================================
         DEFAULT VARIANT
         ============================================ */
      .td-event-card-default {
        height: 100%;
        display: flex;
        flex-direction: column;
        border-radius: 0.875rem;
        overflow: hidden;
        transition: all 0.2s ease;
        backdrop-filter: blur(4px);
        background: rgba(255, 255, 255, 0.8);
        border: 1px solid rgba(255, 255, 255, 0.2);
        box-shadow:
          0 4px 6px -1px rgba(0, 0, 0, 0.05),
          0 2px 4px -2px rgba(0, 0, 0, 0.03),
          inset 0 1px 0 0 rgba(255, 255, 255, 0.1);
      }

      .td-event-card-default:hover {
        background: rgba(255, 255, 255, 0.9);
        box-shadow:
          0 10px 15px -3px rgba(0, 0, 0, 0.08),
          0 4px 6px -4px rgba(0, 0, 0, 0.04),
          inset 0 1px 0 0 rgba(255, 255, 255, 0.15);
      }

      .td-event-card-default__image-wrapper {
        height: 10rem;
        flex-shrink: 0;
        background: #F3F4F6;
        position: relative;
        overflow: hidden;
      }

      .td-event-card-default__image {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .td-event-card-default__placeholder {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .td-event-card-default__placeholder svg {
        width: 3rem;
        height: 3rem;
        color: #D1D5DB;
      }

      .td-event-card-default__date-badge {
        position: absolute;
        top: 0.75rem;
        left: 0.75rem;
        backdrop-filter: blur(12px);
        background: rgba(255, 255, 255, 0.8);
        border-radius: 0.5rem;
        padding: 0.25rem 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.5);
      }

      .td-event-card-default__badge-month {
        font-size: 0.75rem;
        font-weight: 600;
        color: #1C2438;
      }

      .td-event-card-default__badge-day {
        font-size: 1.125rem;
        font-weight: 700;
        color: #111827;
        line-height: 1.2;
      }

      .td-event-card-default__online-badge {
        position: absolute;
        top: 0.75rem;
        right: 0.75rem;
        backdrop-filter: blur(12px);
        background: rgba(34, 197, 94, 0.9);
        color: white;
        font-size: 0.75rem;
        font-weight: 500;
        padding: 0.25rem 0.625rem;
        border-radius: 9999px;
        display: flex;
        align-items: center;
        gap: 0.375rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(34, 197, 94, 0.25);
        border: 1px solid rgba(74, 222, 128, 0.3);
      }

      .td-event-card-default__online-dot {
        width: 0.375rem;
        height: 0.375rem;
        background: white;
        border-radius: 50%;
        animation: td-event-card-pulse 2s infinite;
      }

      @keyframes td-event-card-pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }

      .td-event-card-default__content {
        flex: 1;
        padding: 1rem;
        display: flex;
        flex-direction: column;
      }

      .td-event-card-default__time {
        font-size: 0.875rem;
        color: #6B7280;
        margin-bottom: 0.25rem;
      }

      .td-event-card-default__title {
        font-weight: 600;
        color: #111827;
        transition: color 0.15s ease;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        min-height: 3rem;
        margin: 0;
      }

      .td-event-card-default__title:hover {
        color: #1C2438;
      }

      .td-event-card-default__group {
        font-size: 0.875rem;
        color: #6B7280;
        margin-top: 0.25rem;
      }

      .td-event-card-default__group a {
        color: inherit;
        text-decoration: none;
      }

      .td-event-card-default__group a:hover {
        color: #1C2438;
      }

      .td-event-card-default__spacer {
        flex: 1;
      }

      .td-event-card-default__footer {
        margin-top: 0.75rem;
        padding-top: 0.75rem;
        border-top: 1px solid #F3F4F6;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 0.75rem;
        color: #6B7280;
      }

      .td-event-card-default__location {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        overflow: hidden;
      }

      .td-event-card-default__location span {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .td-event-card-default__rsvp {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        flex-shrink: 0;
        margin-left: 0.5rem;
      }

      .td-event-card__icon {
        width: 1rem;
        height: 1rem;
      }

      .td-event-card__icon-sm {
        width: 0.875rem;
        height: 0.875rem;
        flex-shrink: 0;
      }

      .td-event-card-compact a,
      .td-event-card-default a {
        color: inherit;
        text-decoration: none;
      }
    `}</style>
  );
}
