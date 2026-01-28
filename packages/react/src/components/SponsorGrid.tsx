'use client';

import { ReactNode, useRef, useCallback } from 'react';
import { clsx } from 'clsx';

export type SponsorTier = 'platinum' | 'gold' | 'silver' | 'bronze' | 'community';

export interface Sponsor {
  name: string;
  logo: string;
  href?: string;
  tier?: SponsorTier;
}

export interface SponsorGridProps {
  title?: string;
  description?: string;
  sponsors: Sponsor[];
  showTierHeadings?: boolean;
  tier?: SponsorTier | '';
  /** Force all logos to display as white monochrome */
  monochrome?: boolean;
  children?: ReactNode;
  className?: string;
}

const TIER_ORDER: SponsorTier[] = ['platinum', 'gold', 'silver', 'bronze', 'community'];

const TIER_CONFIG: Record<SponsorTier, { label: string; accent: string }> = {
  platinum: { label: 'Platinum', accent: '#E5E7EB' },
  gold: { label: 'Gold', accent: '#FCD34D' },
  silver: { label: 'Silver', accent: '#9CA3AF' },
  bronze: { label: 'Bronze', accent: '#D97706' },
  community: { label: 'Community', accent: '#E85A4F' },
};

function SponsorCard({ sponsor, monochrome }: { sponsor: Sponsor; monochrome?: boolean }) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const tierClass = sponsor.tier || 'community';

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate rotation (max 8 degrees)
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    // Calculate shine position
    const shineX = (x / rect.width) * 100;
    const shineY = (y / rect.height) * 100;

    card.style.setProperty('--rotateX', `${rotateX}deg`);
    card.style.setProperty('--rotateY', `${rotateY}deg`);
    card.style.setProperty('--shineX', `${shineX}%`);
    card.style.setProperty('--shineY', `${shineY}%`);
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;

    card.style.setProperty('--rotateX', '0deg');
    card.style.setProperty('--rotateY', '0deg');
  }, []);

  return (
    <a
      ref={cardRef}
      href={sponsor.href || '#'}
      target="_blank"
      rel="noopener noreferrer"
      className={`td-sponsor-grid__card td-sponsor-grid__card--${tierClass}`}
      title={sponsor.name}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="td-sponsor-grid__card-inner">
        <div className="td-sponsor-grid__shine" />
        <div className="td-sponsor-grid__logo-bg">
          <img
            src={sponsor.logo}
            alt={sponsor.name}
            className={clsx('td-sponsor-grid__logo', monochrome && 'td-sponsor-grid__logo--mono')}
          />
        </div>
        <span className="td-sponsor-grid__name">{sponsor.name}</span>
      </div>
    </a>
  );
}

export function SponsorGrid({
  title,
  description,
  sponsors,
  showTierHeadings = false,
  tier = '',
  monochrome = false,
  children,
  className,
}: SponsorGridProps) {
  // Filter sponsors by tier if specified
  const filteredSponsors = tier
    ? sponsors.filter((s) => s.tier === tier)
    : sponsors;

  // Group sponsors by tier
  const sponsorsByTier = TIER_ORDER.reduce((acc, t) => {
    acc[t] = filteredSponsors.filter((s) => (s.tier || 'community') === t);
    return acc;
  }, {} as Record<SponsorTier, Sponsor[]>);

  const renderTierSection = (tierName: SponsorTier, tierSponsors: Sponsor[]) => {
    if (tierSponsors.length === 0) return null;

    const config = TIER_CONFIG[tierName];

    return (
      <div key={tierName} className="td-sponsor-grid__tier-section">
        {showTierHeadings && (
          <div className="td-sponsor-grid__tier-heading">
            <span
              className="td-sponsor-grid__tier-dot"
              style={{ background: config.accent }}
            />
            {config.label} Sponsors
          </div>
        )}
        <div className={`td-sponsor-grid__grid td-sponsor-grid__grid--${tierName}`}>
          {tierSponsors.map((sponsor) => (
            <SponsorCard key={sponsor.name} sponsor={sponsor} monochrome={monochrome} />
          ))}
        </div>
      </div>
    );
  };

  const hasMixedTiers = !tier && !showTierHeadings;

  return (
    <>
      <div className={clsx('td-sponsor-grid', className)}>
        {(title || description) && (
          <div className="td-sponsor-grid__header">
            {title && <h2 className="td-sponsor-grid__title">{title}</h2>}
            {description && <p className="td-sponsor-grid__description">{description}</p>}
          </div>
        )}

        <div className="td-sponsor-grid__body">
          {showTierHeadings ? (
            TIER_ORDER.map((t) => renderTierSection(t, sponsorsByTier[t]))
          ) : (
            <div className={`td-sponsor-grid__grid td-sponsor-grid__grid--${hasMixedTiers ? 'mixed' : tier || 'mixed'}`}>
              {filteredSponsors.map((sponsor) => (
                <SponsorCard key={sponsor.name} sponsor={sponsor} monochrome={monochrome} />
              ))}
            </div>
          )}
        </div>

        {children && (
          <div className="td-sponsor-grid__footer">
            {children}
          </div>
        )}
      </div>
      <SponsorGridStyles />
    </>
  );
}

function SponsorGridStyles() {
  return (
    <style>{`
      .td-sponsor-grid {
        background: rgba(28, 36, 56, 0.8);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        border: 1px solid rgba(255, 255, 255, 0.05);
        border-radius: 0.875rem;
        overflow: hidden;
        box-shadow:
          inset 0 1px 1px 0 rgba(255, 255, 255, 0.05),
          0 8px 24px -4px rgba(0, 0, 0, 0.15);
      }

      .td-sponsor-grid__header {
        text-align: center;
        padding: 2rem 1.5rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      }

      .td-sponsor-grid__title {
        font-size: 1.5rem;
        font-weight: 700;
        color: white;
        margin: 0;
        letter-spacing: -0.01em;
      }

      .td-sponsor-grid__description {
        font-size: 1rem;
        color: rgba(209, 213, 219, 0.8);
        margin: 0.75rem 0 0 0;
        line-height: 1.6;
        max-width: 500px;
        margin-left: auto;
        margin-right: auto;
      }

      .td-sponsor-grid__body {
        padding: 1.5rem;
      }

      .td-sponsor-grid__tier-section {
        margin-bottom: 2rem;
      }

      .td-sponsor-grid__tier-section:last-child {
        margin-bottom: 0;
      }

      .td-sponsor-grid__tier-heading {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.75rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        color: rgba(209, 213, 219, 0.6);
        margin-bottom: 1rem;
        padding-bottom: 0.75rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      }

      .td-sponsor-grid__tier-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
      }

      .td-sponsor-grid__grid {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        justify-content: center;
      }

      /* Card widths by tier */
      .td-sponsor-grid__grid--platinum .td-sponsor-grid__card {
        width: calc(50% - 0.5rem);
        max-width: 280px;
      }

      @media (max-width: 639px) {
        .td-sponsor-grid__grid--platinum .td-sponsor-grid__card {
          width: 100%;
          max-width: 280px;
        }
      }

      .td-sponsor-grid__grid--gold .td-sponsor-grid__card {
        width: calc(50% - 0.5rem);
        max-width: 200px;
      }

      @media (min-width: 768px) {
        .td-sponsor-grid__grid--gold .td-sponsor-grid__card {
          width: calc(33.333% - 0.667rem);
          max-width: 200px;
        }
      }

      .td-sponsor-grid__grid--silver .td-sponsor-grid__card,
      .td-sponsor-grid__grid--bronze .td-sponsor-grid__card,
      .td-sponsor-grid__grid--mixed .td-sponsor-grid__card,
      .td-sponsor-grid__grid--community .td-sponsor-grid__card {
        width: calc(50% - 0.5rem);
        max-width: 160px;
      }

      @media (min-width: 640px) {
        .td-sponsor-grid__grid--silver .td-sponsor-grid__card,
        .td-sponsor-grid__grid--bronze .td-sponsor-grid__card,
        .td-sponsor-grid__grid--mixed .td-sponsor-grid__card,
        .td-sponsor-grid__grid--community .td-sponsor-grid__card {
          width: calc(33.333% - 0.667rem);
          max-width: 160px;
        }
      }

      @media (min-width: 768px) {
        .td-sponsor-grid__grid--silver .td-sponsor-grid__card,
        .td-sponsor-grid__grid--bronze .td-sponsor-grid__card,
        .td-sponsor-grid__grid--mixed .td-sponsor-grid__card,
        .td-sponsor-grid__grid--community .td-sponsor-grid__card {
          width: calc(25% - 0.75rem);
          max-width: 160px;
        }
      }

      /* Card with Apple TV parallax effect */
      .td-sponsor-grid__card {
        --rotateX: 0deg;
        --rotateY: 0deg;
        --shineX: 50%;
        --shineY: 50%;

        display: block;
        perspective: 1000px;
        text-decoration: none;
      }

      .td-sponsor-grid__card-inner {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 0.75rem;
        padding: 1.5rem;
        min-height: 120px;
        background: linear-gradient(
          145deg,
          rgba(255, 255, 255, 0.08) 0%,
          rgba(255, 255, 255, 0.02) 100%
        );
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 0.75rem;
        transform-style: preserve-3d;
        transform: rotateX(var(--rotateX)) rotateY(var(--rotateY));
        transition: transform 0.1s ease-out, box-shadow 0.3s ease, border-color 0.3s ease;
        overflow: hidden;
      }

      .td-sponsor-grid__card:hover .td-sponsor-grid__card-inner {
        border-color: rgba(255, 255, 255, 0.15);
        box-shadow:
          0 20px 40px -10px rgba(0, 0, 0, 0.3),
          0 10px 20px -5px rgba(0, 0, 0, 0.2),
          inset 0 1px 2px rgba(255, 255, 255, 0.1);
      }

      /* Shine effect */
      .td-sponsor-grid__shine {
        position: absolute;
        inset: 0;
        background: radial-gradient(
          circle at var(--shineX) var(--shineY),
          rgba(255, 255, 255, 0.15) 0%,
          transparent 60%
        );
        opacity: 0;
        transition: opacity 0.3s ease;
        pointer-events: none;
      }

      .td-sponsor-grid__card:hover .td-sponsor-grid__shine {
        opacity: 1;
      }

      .td-sponsor-grid__logo-bg {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1rem;
        background: white;
        border-radius: 0.5rem;
        transform: translateZ(20px);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        width: 100%;
        max-width: 160px;
      }

      .td-sponsor-grid__card:hover .td-sponsor-grid__logo-bg {
        transform: translateZ(30px) scale(1.05);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
      }

      .td-sponsor-grid__logo {
        max-width: 100%;
        max-height: 50px;
        height: auto;
        display: block;
        object-fit: contain;
        transition: opacity 0.3s ease, filter 0.3s ease;
      }

      .td-sponsor-grid__logo--mono {
        filter: brightness(0) invert(1);
        opacity: 0.9;
      }

      .td-sponsor-grid__name {
        font-size: 0.75rem;
        font-weight: 500;
        color: rgba(209, 213, 219, 0.6);
        text-align: center;
        transform: translateZ(10px);
        transition: color 0.3s ease;
      }

      .td-sponsor-grid__card:hover .td-sponsor-grid__name {
        color: rgba(255, 255, 255, 0.8);
      }

      /* Tier-based card sizing */
      .td-sponsor-grid__card--platinum .td-sponsor-grid__card-inner {
        min-height: 180px;
        padding: 2rem;
        background: linear-gradient(
          145deg,
          rgba(255, 255, 255, 0.12) 0%,
          rgba(255, 255, 255, 0.04) 100%
        );
      }

      .td-sponsor-grid__card--platinum .td-sponsor-grid__logo {
        max-height: 100px;
        max-width: 85%;
      }

      .td-sponsor-grid__card--gold .td-sponsor-grid__card-inner {
        min-height: 150px;
        background: linear-gradient(
          145deg,
          rgba(252, 211, 77, 0.1) 0%,
          rgba(255, 255, 255, 0.03) 100%
        );
      }

      .td-sponsor-grid__card--gold .td-sponsor-grid__logo {
        max-height: 80px;
        max-width: 85%;
      }

      .td-sponsor-grid__card--silver .td-sponsor-grid__card-inner {
        min-height: 130px;
        background: linear-gradient(
          145deg,
          rgba(156, 163, 175, 0.08) 0%,
          rgba(255, 255, 255, 0.02) 100%
        );
      }

      .td-sponsor-grid__card--silver .td-sponsor-grid__logo {
        max-height: 70px;
      }

      .td-sponsor-grid__card--bronze .td-sponsor-grid__card-inner,
      .td-sponsor-grid__card--community .td-sponsor-grid__card-inner {
        min-height: 100px;
        padding: 1.25rem;
      }

      .td-sponsor-grid__card--bronze .td-sponsor-grid__logo,
      .td-sponsor-grid__card--community .td-sponsor-grid__logo {
        max-height: 50px;
      }

      .td-sponsor-grid__footer {
        padding: 1.5rem;
        display: flex;
        justify-content: center;
        gap: 1rem;
        flex-wrap: wrap;
        background: rgba(0, 0, 0, 0.2);
        border-top: 1px solid rgba(255, 255, 255, 0.05);
      }

      .td-sponsor-grid__footer:empty {
        display: none;
      }

      /* Reduced motion */
      @media (prefers-reduced-motion: reduce) {
        .td-sponsor-grid__card-inner {
          transform: none !important;
          transition: box-shadow 0.3s ease, border-color 0.3s ease;
        }

        .td-sponsor-grid__shine {
          display: none;
        }
      }
    `}</style>
  );
}
