'use client';

import { useState, useEffect } from 'react';
import { clsx } from 'clsx';

export type ImageFit = 'cover' | 'contain' | 'fill' | 'none';

export interface ImageProps {
  src: string;
  alt: string;
  caption?: string;
  credit?: string;
  aspectRatio?: string;
  fit?: ImageFit;
  rounded?: boolean;
  shadow?: boolean;
  zoomable?: boolean;
  width?: string;
  lazy?: boolean;
  className?: string;
}

function getAspectPadding(aspectRatio: string): string | null {
  if (!aspectRatio) return null;
  const [width, height] = aspectRatio.split('/').map(Number);
  if (width && height) {
    return `${(height / width) * 100}%`;
  }
  return null;
}

export function Image({
  src,
  alt,
  caption,
  credit,
  aspectRatio = '',
  fit = 'cover',
  rounded = false,
  shadow = false,
  zoomable = false,
  width = '100%',
  lazy = true,
  className,
}: ImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const aspectPadding = getAspectPadding(aspectRatio);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxOpen(false);
        document.body.style.overflow = '';
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
    setHasError(false);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  const openLightbox = () => {
    if (zoomable && !hasError) {
      setLightboxOpen(true);
      document.body.style.overflow = 'hidden';
    }
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
  };

  return (
    <>
      <figure
        className={clsx('td-image', className)}
        style={{ maxWidth: width, '--image-fit': fit } as React.CSSProperties}
      >
        <div
          className={clsx(
            'td-image__wrapper',
            rounded && 'td-image__wrapper--rounded',
            shadow && 'td-image__wrapper--shadow',
            zoomable && 'td-image__wrapper--zoomable'
          )}
          onClick={openLightbox}
          role={zoomable ? 'button' : undefined}
          tabIndex={zoomable ? 0 : undefined}
          aria-label={zoomable ? 'Click to enlarge image' : undefined}
        >
          <div
            className={clsx('td-image__aspect', aspectPadding && 'td-image__aspect--ratio')}
            style={aspectPadding ? { paddingBottom: aspectPadding } : undefined}
          >
            <div className={clsx('td-image__skeleton', isLoaded && 'td-image__skeleton--hidden')} />

            {hasError ? (
              <div className="td-image__error">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span>Failed to load image</span>
              </div>
            ) : (
              <img
                className={clsx('td-image__img', isLoaded ? 'td-image__img--loaded' : 'td-image__img--loading')}
                src={src}
                alt={alt}
                loading={lazy ? 'lazy' : 'eager'}
                onLoad={handleLoad}
                onError={handleError}
              />
            )}
          </div>
        </div>

        {(caption || credit) && (
          <figcaption className="td-image__caption">
            {caption && <div className="td-image__caption-text">{caption}</div>}
            {credit && <div className="td-image__credit">Photo: {credit}</div>}
          </figcaption>
        )}
      </figure>

      {zoomable && (
        <div
          className={clsx('td-image__lightbox', lightboxOpen && 'td-image__lightbox--open')}
          onClick={closeLightbox}
        >
          <button
            className="td-image__lightbox-close"
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <img src={src} alt={alt} onClick={(e) => e.stopPropagation()} />
          {(caption || credit) && (
            <div className="td-image__lightbox-caption">
              {caption && <div className="td-image__caption-text">{caption}</div>}
              {credit && <div className="td-image__credit">Photo: {credit}</div>}
            </div>
          )}
        </div>
      )}

      <ImageStyles />
    </>
  );
}

function ImageStyles() {
  return (
    <style>{`
      .td-image {
        position: relative;
      }

      .td-image__wrapper {
        position: relative;
        overflow: hidden;
        background: rgba(28, 36, 56, 0.1);
      }

      .td-image__wrapper--rounded {
        border-radius: 0.875rem;
      }

      .td-image__wrapper--shadow {
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
      }

      .td-image__wrapper--zoomable {
        cursor: zoom-in;
      }

      .td-image__wrapper--zoomable:hover img {
        transform: scale(1.02);
      }

      .td-image__aspect {
        position: relative;
        width: 100%;
      }

      .td-image__aspect--ratio img {
        position: absolute;
        inset: 0;
      }

      .td-image__img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: var(--image-fit, cover);
        transition: opacity 0.2s ease, transform 0.2s ease;
      }

      .td-image__img--loading {
        opacity: 0;
      }

      .td-image__img--loaded {
        opacity: 1;
      }

      .td-image__skeleton {
        position: absolute;
        inset: 0;
        background: linear-gradient(
          90deg,
          rgba(255, 255, 255, 0.05) 25%,
          rgba(255, 255, 255, 0.1) 50%,
          rgba(255, 255, 255, 0.05) 75%
        );
        background-size: 200% 100%;
        animation: td-image-shimmer 1.5s infinite;
      }

      .td-image__skeleton--hidden {
        display: none;
      }

      @keyframes td-image-shimmer {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }

      .td-image__error {
        position: absolute;
        inset: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        color: rgba(156, 163, 175, 0.6);
        background: rgba(28, 36, 56, 0.3);
      }

      .td-image__error svg {
        width: 48px;
        height: 48px;
        opacity: 0.5;
      }

      .td-image__error span {
        font-size: 0.875rem;
      }

      .td-image__caption {
        padding: 0.75rem 0;
      }

      .td-image__caption-text {
        font-size: 0.875rem;
        color: rgba(156, 163, 175, 0.8);
        line-height: 1.5;
      }

      .td-image__credit {
        font-size: 0.75rem;
        color: rgba(156, 163, 175, 0.6);
        margin-top: 0.25rem;
      }

      .td-image__lightbox {
        position: fixed;
        inset: 0;
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(0, 0, 0, 0.9);
        backdrop-filter: blur(8px);
        opacity: 0;
        visibility: hidden;
        transition: all 0.2s ease;
        cursor: zoom-out;
      }

      .td-image__lightbox--open {
        opacity: 1;
        visibility: visible;
      }

      .td-image__lightbox img {
        max-width: 90vw;
        max-height: 90vh;
        object-fit: contain;
        border-radius: 0.5rem;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
      }

      .td-image__lightbox-close {
        position: absolute;
        top: 1rem;
        right: 1rem;
        width: 48px;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(255, 255, 255, 0.1);
        border: none;
        border-radius: 50%;
        color: white;
        cursor: pointer;
        transition: all 0.15s ease;
      }

      .td-image__lightbox-close:hover {
        background: rgba(255, 255, 255, 0.2);
      }

      .td-image__lightbox-close svg {
        width: 24px;
        height: 24px;
      }

      .td-image__lightbox-caption {
        position: absolute;
        bottom: 2rem;
        left: 50%;
        transform: translateX(-50%);
        text-align: center;
        color: white;
        max-width: 80vw;
      }

      .td-image__lightbox-caption .td-image__caption-text {
        color: white;
        font-size: 1rem;
      }

      .td-image__lightbox-caption .td-image__credit {
        color: rgba(255, 255, 255, 0.7);
      }
    `}</style>
  );
}
