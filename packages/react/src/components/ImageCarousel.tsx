'use client';

import { useState, useEffect, useCallback } from 'react';
import { clsx } from 'clsx';
import { Icon } from './Icon';

export interface CarouselImage {
  src: string;
  alt: string;
  title?: string;
}

export interface ImageCarouselProps {
  images: CarouselImage[];
  autoplay?: boolean;
  interval?: number;
  showDots?: boolean;
  showArrows?: boolean;
  showCaptions?: boolean;
  loop?: boolean;
  aspectRatio?: string;
  className?: string;
}

export function ImageCarousel({
  images,
  autoplay = false,
  interval = 5000,
  showDots = true,
  showArrows = true,
  showCaptions = false,
  loop = true,
  aspectRatio = '16/9',
  className,
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => {
      if (prev >= images.length - 1) {
        return loop ? 0 : prev;
      }
      return prev + 1;
    });
  }, [images.length, loop]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => {
      if (prev <= 0) {
        return loop ? images.length - 1 : prev;
      }
      return prev - 1;
    });
  }, [images.length, loop]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!autoplay || isPaused || images.length <= 1) return;

    const timer = setInterval(goToNext, interval);
    return () => clearInterval(timer);
  }, [autoplay, isPaused, interval, goToNext, images.length]);

  if (images.length === 0) return null;

  const currentImage = images[currentIndex];

  return (
    <div
      className={clsx('td-carousel', className)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      style={{ '--aspect-ratio': aspectRatio } as React.CSSProperties}
    >
      <div className="td-carousel__viewport">
        <div
          className="td-carousel__track"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div key={index} className="td-carousel__slide">
              <img
                src={image.src}
                alt={image.alt}
                className="td-carousel__image"
                loading={index === 0 ? 'eager' : 'lazy'}
              />
            </div>
          ))}
        </div>

        {showCaptions && currentImage.title && (
          <div className="td-carousel__caption">{currentImage.title}</div>
        )}
      </div>

      {showArrows && images.length > 1 && (
        <>
          <button
            className="td-carousel__arrow td-carousel__arrow--prev"
            onClick={goToPrev}
            aria-label="Previous slide"
            disabled={!loop && currentIndex === 0}
          >
            <Icon name="chevron-left" size="lg" />
          </button>
          <button
            className="td-carousel__arrow td-carousel__arrow--next"
            onClick={goToNext}
            aria-label="Next slide"
            disabled={!loop && currentIndex === images.length - 1}
          >
            <Icon name="chevron-right" size="lg" />
          </button>
        </>
      )}

      {showDots && images.length > 1 && (
        <div className="td-carousel__dots">
          {images.map((_, index) => (
            <button
              key={index}
              className={clsx(
                'td-carousel__dot',
                index === currentIndex && 'td-carousel__dot--active'
              )}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      <style>{`
        .td-carousel {
          position: relative;
          width: 100%;
        }

        .td-carousel__viewport {
          position: relative;
          width: 100%;
          aspect-ratio: var(--aspect-ratio, 16/9);
          overflow: hidden;
          border-radius: 0.75rem;
          background: rgba(28, 36, 56, 0.5);
        }

        .td-carousel__track {
          display: flex;
          height: 100%;
          transition: transform 0.5s ease;
        }

        .td-carousel__slide {
          flex: 0 0 100%;
          width: 100%;
          height: 100%;
        }

        .td-carousel__image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .td-carousel__caption {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 1rem 1.5rem;
          background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
          color: white;
          font-size: 0.875rem;
        }

        .td-carousel__arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(28, 36, 56, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          color: white;
          cursor: pointer;
          transition: all 0.2s ease;
          z-index: 1;
        }

        .td-carousel__arrow:hover:not(:disabled) {
          background: rgba(28, 36, 56, 0.95);
          border-color: rgba(255, 255, 255, 0.2);
        }

        .td-carousel__arrow:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .td-carousel__arrow--prev {
          left: 1rem;
        }

        .td-carousel__arrow--next {
          right: 1rem;
        }

        .td-carousel__dots {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
          margin-top: 1rem;
        }

        .td-carousel__dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
          padding: 0;
        }

        .td-carousel__dot:hover {
          background: rgba(255, 255, 255, 0.5);
        }

        .td-carousel__dot--active {
          background: #E85A4F;
          transform: scale(1.25);
        }
      `}</style>
    </div>
  );
}
