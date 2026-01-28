'use client';

import { clsx } from 'clsx';

export interface MarqueeLogo {
  src: string;
  alt: string;
  href?: string;
}

export interface LogoMarqueeProps {
  logos: MarqueeLogo[];
  title?: string;
  speed?: number;
  direction?: 'left' | 'right';
  logoHeight?: string;
  gap?: string;
  pauseOnHover?: boolean;
  color?: boolean;
  className?: string;
}

export function LogoMarquee({
  logos,
  title,
  speed = 40,
  direction = 'left',
  logoHeight = '50px',
  gap = '3rem',
  pauseOnHover = true,
  color = false,
  className,
}: LogoMarqueeProps) {
  // Duplicate logos for seamless loop
  const allLogos = [...logos, ...logos];

  const renderLogo = (logo: MarqueeLogo, index: number) => {
    const img = (
      <img
        src={logo.src}
        alt={logo.alt}
        className="td-logo-marquee__logo"
        style={{ height: logoHeight }}
      />
    );

    if (logo.href) {
      return (
        <a
          key={`${logo.src}-${index}`}
          href={logo.href}
          target="_blank"
          rel="noopener noreferrer"
          className="td-logo-marquee__item"
        >
          {img}
        </a>
      );
    }

    return (
      <div key={`${logo.src}-${index}`} className="td-logo-marquee__item">
        {img}
      </div>
    );
  };

  return (
    <div
      className={clsx(
        'td-logo-marquee',
        pauseOnHover && 'td-logo-marquee--pause-on-hover',
        color && 'td-logo-marquee--color',
        direction === 'right' && 'td-logo-marquee--reverse',
        className
      )}
      style={{
        '--marquee-speed': `${speed}s`,
        '--marquee-gap': gap,
      } as React.CSSProperties}
    >
      {title && <h3 className="td-logo-marquee__title">{title}</h3>}
      <div className="td-logo-marquee__track">
        {allLogos.map(renderLogo)}
      </div>

      <style>{`
        .td-logo-marquee {
          overflow: hidden;
        }

        .td-logo-marquee__title {
          font-size: 0.875rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: rgba(255, 255, 255, 0.6);
          text-align: center;
          margin: 0 0 1.5rem 0;
        }

        .td-logo-marquee__track {
          display: flex;
          gap: var(--marquee-gap, 3rem);
          animation: td-marquee var(--marquee-speed, 40s) linear infinite;
          width: fit-content;
          mask-image: linear-gradient(
            to right,
            transparent,
            black 10%,
            black 90%,
            transparent
          );
          -webkit-mask-image: linear-gradient(
            to right,
            transparent,
            black 10%,
            black 90%,
            transparent
          );
        }

        .td-logo-marquee--reverse .td-logo-marquee__track {
          animation-name: td-marquee-reverse;
        }

        .td-logo-marquee--pause-on-hover:hover .td-logo-marquee__track {
          animation-play-state: paused;
        }

        @keyframes td-marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        @keyframes td-marquee-reverse {
          from {
            transform: translateX(-50%);
          }
          to {
            transform: translateX(0);
          }
        }

        .td-logo-marquee__item {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .td-logo-marquee__logo {
          width: auto;
          object-fit: contain;
          filter: grayscale(100%) brightness(2);
          opacity: 0.7;
          transition: all 0.2s ease;
        }

        .td-logo-marquee--color .td-logo-marquee__logo {
          filter: none;
          opacity: 1;
        }

        .td-logo-marquee__item:hover .td-logo-marquee__logo {
          filter: grayscale(0%) brightness(1);
          opacity: 1;
        }
      `}</style>
    </div>
  );
}
