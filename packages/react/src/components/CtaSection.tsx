import { ReactNode } from 'react';
import { clsx } from 'clsx';
import { Button } from './Button';

export interface CtaSectionProps {
  title?: string;
  description?: string;
  primaryText?: string;
  primaryHref?: string;
  secondaryText?: string;
  secondaryHref?: string;
  children?: ReactNode;
  className?: string;
}

export function CtaSection({
  title,
  description,
  primaryText,
  primaryHref,
  secondaryText,
  secondaryHref,
  children,
  className,
}: CtaSectionProps) {
  return (
    <>
      <div className={clsx('td-cta-section', className)}>
        {title && <h2 className="td-cta-section__title">{title}</h2>}
        {description && <p className="td-cta-section__description">{description}</p>}

        {children}

        <div className="td-cta-section__actions">
          {primaryText && primaryHref && (
            <Button
              variant="primary"
              href={primaryHref}
              className="td-cta-section__btn td-cta-section__btn--primary"
            >
              {primaryText}
            </Button>
          )}

          {secondaryText && secondaryHref && (
            <a href={secondaryHref} className="td-cta-section__btn td-cta-section__btn--secondary">
              {secondaryText}
            </a>
          )}
        </div>
      </div>
      <CtaSectionStyles />
    </>
  );
}

function CtaSectionStyles() {
  return (
    <style>{`
      .td-cta-section {
        border-radius: 1rem;
        padding: 2rem;
        text-align: center;
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        background: rgba(28, 36, 56, 0.8);
        border: 1px solid rgba(255, 255, 255, 0.05);
        box-shadow:
          inset 0 1px 1px 0 rgba(255, 255, 255, 0.05),
          0 8px 24px -4px rgba(0, 0, 0, 0.15);
      }

      @media (min-width: 768px) {
        .td-cta-section {
          padding: 3rem;
        }
      }

      .td-cta-section__title {
        font-size: 1.5rem;
        font-weight: 700;
        color: white;
        margin: 0 0 1rem 0;
      }

      @media (min-width: 768px) {
        .td-cta-section__title {
          font-size: 1.875rem;
        }
      }

      .td-cta-section__description {
        color: rgba(209, 213, 219, 0.8);
        max-width: 42rem;
        margin: 0 auto 2rem;
        line-height: 1.6;
      }

      .td-cta-section__actions {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        gap: 1rem;
      }

      .td-cta-section__btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        min-width: 160px;
        height: 48px;
        padding: 0 1.5rem;
        border-radius: 0.5rem;
        font-weight: 600;
        font-size: 0.875rem;
        text-decoration: none;
        transition: all 0.15s ease;
        border: 1px solid transparent;
        box-sizing: border-box;
      }

      .td-cta-section__btn--primary {
        background-color: #E85A4F;
        color: white;
        border-color: transparent;
        text-transform: uppercase;
        letter-spacing: 0.025em;
        box-shadow: 0 4px 6px -1px rgba(232, 90, 79, 0.25);
      }

      .td-cta-section__btn--primary:hover {
        background-color: #F07167;
        transform: translateY(-1px);
        box-shadow: 0 6px 10px -2px rgba(232, 90, 79, 0.3);
      }

      .td-cta-section__btn--secondary {
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        background: rgba(255, 255, 255, 0.15);
        border-color: rgba(255, 255, 255, 0.2);
        color: white;
      }

      .td-cta-section__btn--secondary:hover {
        background: rgba(255, 255, 255, 0.25);
        transform: translateY(-2px);
      }
    `}</style>
  );
}
