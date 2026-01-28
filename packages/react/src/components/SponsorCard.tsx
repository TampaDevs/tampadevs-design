import { clsx } from 'clsx';

export type SponsorCardTier = 'platinum' | 'gold' | 'silver' | 'bronze' | 'community';

export interface SponsorCardProps {
  name: string;
  logo: string;
  href: string;
  tier?: SponsorCardTier;
  className?: string;
}

export function SponsorCard({
  name,
  logo,
  href,
  tier = 'community',
  className,
}: SponsorCardProps) {
  return (
    <>
      <a
        className={clsx('td-sponsor-card', `td-sponsor-card--${tier}`, className)}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={logo} alt={name} />
      </a>
      <SponsorCardStyles />
    </>
  );
}

function SponsorCardStyles() {
  return (
    <style>{`
      .td-sponsor-card {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2rem;
        background: #E5E7EB;
        transition: all 0.15s ease;
        height: 100%;
        min-height: 120px;
        text-decoration: none;
      }

      .td-sponsor-card:hover {
        background: #D1D5DB;
      }

      .td-sponsor-card:hover img {
        transform: scale(1.05);
      }

      .td-sponsor-card img {
        max-width: 80%;
        max-height: 80px;
        height: auto;
        display: block;
        object-fit: contain;
        transition: transform 0.15s ease;
      }

      .td-sponsor-card--platinum {
        min-height: 180px;
        padding: 2.5rem;
      }

      .td-sponsor-card--platinum img {
        max-height: 120px;
        max-width: 85%;
      }

      .td-sponsor-card--gold {
        min-height: 150px;
        padding: 2rem;
      }

      .td-sponsor-card--gold img {
        max-height: 100px;
        max-width: 85%;
      }

      .td-sponsor-card--silver {
        min-height: 120px;
      }

      .td-sponsor-card--silver img {
        max-height: 70px;
      }

      .td-sponsor-card--bronze,
      .td-sponsor-card--community {
        min-height: 100px;
        padding: 1.5rem;
      }

      .td-sponsor-card--bronze img,
      .td-sponsor-card--community img {
        max-height: 50px;
      }
    `}</style>
  );
}
