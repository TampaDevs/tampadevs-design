'use client';

import { useRef, ReactNode } from 'react';
import { clsx } from 'clsx';

export interface CarouselProps {
  title?: string;
  scrollAmount?: number;
  hideControls?: boolean;
  gap?: string;
  children?: ReactNode;
  className?: string;
}

export function Carousel({
  title,
  scrollAmount = 400,
  hideControls = false,
  gap = '1.5rem',
  children,
  className,
}: CarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollTrack = (direction: 'left' | 'right') => {
    if (trackRef.current) {
      const amount = direction === 'left' ? -scrollAmount : scrollAmount;
      trackRef.current.scrollBy({
        left: amount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <div className={clsx('td-carousel', className)}>
        {title && <h2 className="td-carousel__title">{title}</h2>}

        <div className="td-carousel__wrapper">
          {!hideControls && (
            <button
              className="td-carousel__nav td-carousel__nav--left"
              onClick={() => scrollTrack('left')}
              aria-label="Scroll left"
            >
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          <div
            ref={trackRef}
            className="td-carousel__track"
            style={{ gap }}
          >
            {children}
          </div>

          {!hideControls && (
            <button
              className="td-carousel__nav td-carousel__nav--right"
              onClick={() => scrollTrack('right')}
              aria-label="Scroll right"
            >
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      </div>
      <CarouselStyles />
    </>
  );
}

function CarouselStyles() {
  return (
    <style>{`
      .td-carousel {
        position: relative;
      }

      .td-carousel__title {
        font-size: 1.5rem;
        font-weight: 700;
        color: #111827;
        margin-bottom: 1.5rem;
      }

      .td-carousel__wrapper {
        position: relative;
      }

      .td-carousel__wrapper:hover .td-carousel__nav {
        opacity: 1;
      }

      .td-carousel__track {
        display: flex;
        overflow-x: auto;
        padding-bottom: 1rem;
        scroll-snap-type: x mandatory;
        scrollbar-width: none;
        -ms-overflow-style: none;
      }

      .td-carousel__track::-webkit-scrollbar {
        display: none;
      }

      .td-carousel__track > * {
        flex-shrink: 0;
        scroll-snap-align: start;
      }

      .td-carousel__nav {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        z-index: 10;
        background: white;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        border-radius: 9999px;
        padding: 0.5rem;
        opacity: 0;
        transition: opacity 0.15s ease;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .td-carousel__nav:hover {
        background: #F3F4F6;
      }

      .td-carousel__nav--left {
        left: -1rem;
      }

      .td-carousel__nav--right {
        right: -1rem;
      }

      .td-carousel__nav svg {
        width: 1.5rem;
        height: 1.5rem;
        color: #6B7280;
      }

      @media (hover: none) {
        .td-carousel__nav {
          opacity: 1;
        }
      }
    `}</style>
  );
}
