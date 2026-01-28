import { ReactNode } from 'react';
import { clsx } from 'clsx';
import { Button } from './Button';

export interface ImageTextProps {
  imageSrc?: string;
  imageAlt?: string;
  title?: string;
  description?: string;
  reversed?: boolean;
  imagePosition?: 'cover' | 'contain' | 'auto';
  ctaText?: string;
  ctaHref?: string;
  image?: ReactNode;
  children?: ReactNode;
  className?: string;
}

export function ImageText({
  imageSrc,
  imageAlt = '',
  title,
  description,
  reversed = false,
  imagePosition = 'cover',
  ctaText,
  ctaHref,
  image,
  children,
  className,
}: ImageTextProps) {
  return (
    <>
      <div className={clsx('td-image-text', reversed && 'td-image-text--reversed', className)}>
        <div
          className={clsx('td-image-text__image-wrapper', `td-image-text__image-wrapper--${imagePosition}`)}
        >
          {image || (imageSrc && <img src={imageSrc} alt={imageAlt} />)}
        </div>

        <div className="td-image-text__content">
          {children || (
            <>
              {title && <h2 className="td-image-text__title">{title}</h2>}
              {description && <p className="td-image-text__description">{description}</p>}
            </>
          )}

          {ctaText && ctaHref && (
            <Button variant="primary" href={ctaHref} className="td-image-text__cta">
              {ctaText}
            </Button>
          )}
        </div>
      </div>
      <ImageTextStyles />
    </>
  );
}

function ImageTextStyles() {
  return (
    <style>{`
      .td-image-text {
        display: grid;
        grid-template-columns: 1fr;
        gap: 2rem;
        align-items: center;
      }

      @media (min-width: 768px) {
        .td-image-text {
          grid-template-columns: 1fr 1fr;
        }

        .td-image-text--reversed {
          direction: rtl;
        }

        .td-image-text--reversed > * {
          direction: ltr;
        }
      }

      .td-image-text__image-wrapper {
        width: 100%;
        aspect-ratio: 16 / 10;
        border-radius: 0.5rem;
        overflow: hidden;
        background-color: #E5E7EB;
      }

      .td-image-text__image-wrapper img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .td-image-text__image-wrapper--contain img {
        object-fit: contain;
      }

      .td-image-text__image-wrapper--auto img {
        object-fit: none;
      }

      .td-image-text__content {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      .td-image-text__title {
        font-size: 2rem;
        font-weight: 700;
        color: #111827;
        margin: 0;
        line-height: 1.2;
      }

      .td-image-text__description {
        font-size: 1.125rem;
        color: #6B7280;
        margin: 0;
        line-height: 1.6;
      }

      .td-image-text__cta {
        margin-top: 0.5rem;
        width: fit-content;
      }
    `}</style>
  );
}
