import { ReactNode } from 'react';
import { clsx } from 'clsx';

export type PromoSectionVariant = 'gradient' | 'glass' | 'solid';

export interface PromoSectionProps {
  backgroundImage?: string;
  tag?: string;
  title?: string;
  description?: string;
  ctaText?: string;
  ctaHref?: string;
  flipped?: boolean;
  logoSrc?: string;
  variant?: PromoSectionVariant;
  logo?: ReactNode;
  cta?: ReactNode;
  children?: ReactNode;
  className?: string;
  id?: string;
}

export function PromoSection({
  backgroundImage,
  tag,
  title,
  description,
  ctaText,
  ctaHref,
  flipped = false,
  logoSrc,
  variant = 'gradient',
  logo,
  cta,
  children,
  className,
  id,
}: PromoSectionProps) {
  const containerStyle: React.CSSProperties = backgroundImage
    ? { backgroundImage: `url(${backgroundImage})` }
    : { backgroundColor: '#1C2438' };

  return (
    <div
      id={id}
      className={clsx(
        'td-promo',
        `td-promo--${variant}`,
        flipped && 'td-promo--flipped',
        className
      )}
      style={containerStyle}
    >
      <div className="td-promo__content">
        {(logoSrc || logo) && (
          <div className="td-promo__logo">
            {logoSrc ? <img src={logoSrc} alt="" /> : logo}
          </div>
        )}

        {tag && <p className="td-promo__tag">{tag}</p>}
        {title && <h2 className="td-promo__title">{title}</h2>}
        {description && <p className="td-promo__description">{description}</p>}

        {ctaText && ctaHref ? (
          <a className="td-promo__cta" href={ctaHref}>
            {ctaText}
          </a>
        ) : (
          cta && <div className="td-promo__cta-slot">{cta}</div>
        )}

        {children}
      </div>

      <style>{`
        .td-promo {
          background-position: center center;
          background-size: cover;
          border-radius: 0.75rem;
          position: relative;
          width: 100%;
          min-height: 320px;
          overflow: hidden;
        }

        .td-promo--gradient .td-promo__content {
          background-image: linear-gradient(
            to right,
            rgba(28, 36, 56, 0.95) 0%,
            rgba(28, 36, 56, 0.7) 50%,
            transparent 100%
          );
        }

        .td-promo--gradient.td-promo--flipped .td-promo__content {
          background-image: linear-gradient(
            to left,
            rgba(28, 36, 56, 0.95) 0%,
            rgba(28, 36, 56, 0.7) 50%,
            transparent 100%
          );
        }

        .td-promo--glass::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to right,
            rgba(28, 36, 56, 0.85) 0%,
            rgba(28, 36, 56, 0.7) 30%,
            rgba(28, 36, 56, 0.3) 60%,
            transparent 100%
          );
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          mask-image: linear-gradient(
            to right,
            black 0%,
            black 40%,
            transparent 100%
          );
          -webkit-mask-image: linear-gradient(
            to right,
            black 0%,
            black 40%,
            transparent 100%
          );
          border-radius: 0.75rem;
          pointer-events: none;
        }

        .td-promo--glass.td-promo--flipped::before {
          background: linear-gradient(
            to left,
            rgba(28, 36, 56, 0.85) 0%,
            rgba(28, 36, 56, 0.7) 30%,
            rgba(28, 36, 56, 0.3) 60%,
            transparent 100%
          );
          mask-image: linear-gradient(
            to left,
            black 0%,
            black 40%,
            transparent 100%
          );
          -webkit-mask-image: linear-gradient(
            to left,
            black 0%,
            black 40%,
            transparent 100%
          );
        }

        .td-promo--glass .td-promo__content {
          background: transparent;
          position: relative;
          z-index: 1;
        }

        .td-promo--solid .td-promo__content {
          background: rgba(28, 36, 56, 0.9);
        }

        .td-promo__content {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          height: 100%;
          min-height: 320px;
          padding: 2rem;
          color: white;
          border-radius: 0.75rem;
          transition: all 0.2s ease;
        }

        @media (min-width: 640px) {
          .td-promo__content {
            padding: 3rem;
          }
        }

        @media (min-width: 768px) {
          .td-promo__content {
            padding: 4rem;
            max-width: 60%;
          }
        }

        .td-promo--flipped .td-promo__content {
          align-items: flex-end;
          text-align: right;
          margin-left: auto;
        }

        .td-promo__logo {
          max-width: 180px;
          margin-bottom: 1.5rem;
        }

        .td-promo__logo img {
          max-width: 180px;
          height: auto;
        }

        .td-promo__tag {
          text-transform: uppercase;
          font-weight: 600;
          font-size: 0.75rem;
          letter-spacing: 0.1em;
          margin: 0 0 0.5rem 0;
          color: #E85A4F;
        }

        .td-promo__title {
          color: white;
          margin: 0;
          font-size: 1.75rem;
          font-weight: 700;
          line-height: 1.2;
        }

        @media (min-width: 640px) {
          .td-promo__title {
            font-size: 2.25rem;
          }
        }

        .td-promo__description {
          color: rgba(255, 255, 255, 0.85);
          max-width: 500px;
          font-size: 1rem;
          line-height: 1.6;
          margin: 1rem 0 0 0;
        }

        @media (min-width: 640px) {
          .td-promo__description {
            font-size: 1.125rem;
          }
        }

        .td-promo__cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          color: white;
          background-color: #E85A4F;
          padding: 0.875rem 1.5rem;
          border-radius: 0.5rem;
          font-weight: 600;
          font-size: 0.875rem;
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 0.025em;
          margin-top: 1.5rem;
          transition: all 0.15s ease;
          box-shadow: 0 4px 6px -1px rgba(232, 90, 79, 0.25);
        }

        .td-promo__cta:hover {
          background-color: #F07167;
          transform: translateY(-1px);
          box-shadow: 0 6px 10px -2px rgba(232, 90, 79, 0.3);
        }

        .td-promo__cta-slot a,
        .td-promo__cta-slot button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          color: white;
          background-color: #E85A4F;
          padding: 0.875rem 1.5rem;
          border-radius: 0.5rem;
          font-weight: 600;
          font-size: 0.875rem;
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 0.025em;
          margin-top: 1.5rem;
          margin-right: 0.5rem;
          border: none;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .td-promo__cta-slot a:hover,
        .td-promo__cta-slot button:hover {
          background-color: #F07167;
        }
      `}</style>
    </div>
  );
}
