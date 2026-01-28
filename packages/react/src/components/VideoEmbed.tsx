'use client';

import { useState } from 'react';
import { clsx } from 'clsx';

export type VideoProvider = 'youtube' | 'vimeo' | 'custom';

export interface VideoEmbedProps {
  src?: string;
  videoId?: string;
  provider?: VideoProvider;
  title?: string;
  thumbnail?: string;
  aspectRatio?: string;
  autoplay?: boolean;
  lazyLoad?: boolean;
  className?: string;
}

function getEmbedUrl(
  src: string,
  videoId: string,
  provider: VideoProvider,
  autoplay: boolean,
  isLoaded: boolean
): string {
  if (src) return src;

  if (videoId) {
    switch (provider) {
      case 'youtube': {
        const params = new URLSearchParams({
          autoplay: autoplay || isLoaded ? '1' : '0',
          rel: '0',
          modestbranding: '1',
        });
        return `https://www.youtube.com/embed/${videoId}?${params}`;
      }
      case 'vimeo': {
        const params = new URLSearchParams({
          autoplay: autoplay || isLoaded ? '1' : '0',
        });
        return `https://player.vimeo.com/video/${videoId}?${params}`;
      }
      default:
        return '';
    }
  }

  return '';
}

function getThumbnailUrl(thumbnail: string, videoId: string, provider: VideoProvider): string {
  if (thumbnail) return thumbnail;
  if (videoId && provider === 'youtube') {
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  }
  return '';
}

function getAspectPadding(aspectRatio: string): string {
  const [width, height] = aspectRatio.split('/').map(Number);
  if (width && height) {
    return `${(height / width) * 100}%`;
  }
  return '56.25%';
}

export function VideoEmbed({
  src = '',
  videoId = '',
  provider = 'youtube',
  title = 'Video',
  thumbnail = '',
  aspectRatio = '16/9',
  autoplay = false,
  lazyLoad = true,
  className,
}: VideoEmbedProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const embedUrl = getEmbedUrl(src, videoId, provider, autoplay, isLoaded);
  const thumbnailUrl = getThumbnailUrl(thumbnail, videoId, provider);
  const showThumbnail = lazyLoad && !isLoaded && thumbnailUrl;

  const handlePlayClick = () => {
    setIsLoading(true);
    setIsLoaded(true);
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handlePlayClick();
    }
  };

  return (
    <>
      <div className={clsx('td-video-embed', className)}>
        <div
          className="td-video-embed__aspect"
          style={{ paddingBottom: getAspectPadding(aspectRatio) }}
        >
          {(isLoaded || !lazyLoad) && (
            <>
              <iframe
                className="td-video-embed__iframe"
                src={embedUrl}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                onLoad={handleIframeLoad}
              />
              {isLoading && (
                <div className="td-video-embed__loading">
                  <div className="td-video-embed__spinner" />
                </div>
              )}
            </>
          )}

          {showThumbnail && (
            <div
              className="td-video-embed__thumbnail"
              onClick={handlePlayClick}
              onKeyDown={handleKeyDown}
              role="button"
              tabIndex={0}
              aria-label={`Play video: ${title}`}
            >
              <img
                className="td-video-embed__thumbnail-img"
                src={thumbnailUrl}
                alt=""
                loading="lazy"
              />
              <div className="td-video-embed__gradient" />
              <div className="td-video-embed__play-btn">
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              {title && <div className="td-video-embed__title">{title}</div>}
            </div>
          )}
        </div>
      </div>
      <VideoEmbedStyles />
    </>
  );
}

function VideoEmbedStyles() {
  return (
    <style>{`
      .td-video-embed {
        position: relative;
        width: 100%;
        background: #000;
        border-radius: 0.875rem;
        overflow: hidden;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
      }

      .td-video-embed__aspect {
        position: relative;
        width: 100%;
      }

      .td-video-embed__iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border: none;
      }

      .td-video-embed__thumbnail {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        background: #000;
      }

      .td-video-embed__thumbnail-img {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.2s ease;
      }

      .td-video-embed__thumbnail:hover .td-video-embed__thumbnail-img {
        transform: scale(1.05);
      }

      .td-video-embed__gradient {
        position: absolute;
        inset: 0;
        background: linear-gradient(
          to bottom,
          rgba(0, 0, 0, 0.1) 0%,
          rgba(0, 0, 0, 0.3) 50%,
          rgba(0, 0, 0, 0.5) 100%
        );
      }

      .td-video-embed__play-btn {
        position: relative;
        z-index: 1;
        width: 80px;
        height: 80px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(
          135deg,
          rgba(255, 255, 255, 0.2) 0%,
          rgba(255, 255, 255, 0.08) 50%,
          rgba(255, 255, 255, 0.05) 100%
        );
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        border-radius: 50%;
        border: 1.5px solid rgba(255, 255, 255, 0.25);
        transition: all 0.15s ease;
        box-shadow:
          0 8px 32px rgba(0, 0, 0, 0.2),
          0 4px 12px rgba(0, 0, 0, 0.1),
          inset 0 1px 2px rgba(255, 255, 255, 0.2),
          inset 0 -2px 6px rgba(0, 0, 0, 0.1);
      }

      .td-video-embed__thumbnail:hover .td-video-embed__play-btn {
        transform: scale(1.1);
        border-color: rgba(255, 255, 255, 0.4);
        background: linear-gradient(
          135deg,
          rgba(255, 255, 255, 0.3) 0%,
          rgba(255, 255, 255, 0.12) 50%,
          rgba(255, 255, 255, 0.08) 100%
        );
      }

      .td-video-embed__play-btn svg {
        position: relative;
        z-index: 1;
        width: 32px;
        height: 32px;
        color: white;
        margin-left: 4px;
        filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.4));
      }

      .td-video-embed__title {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 1.5rem;
        color: white;
        font-weight: 600;
        font-size: 1.125rem;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
        z-index: 1;
      }

      .td-video-embed__loading {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(28, 36, 56, 0.9);
      }

      .td-video-embed__spinner {
        width: 48px;
        height: 48px;
        border: 3px solid rgba(255, 255, 255, 0.1);
        border-top-color: #E85A4F;
        border-radius: 50%;
        animation: td-video-embed-spin 1s linear infinite;
      }

      @keyframes td-video-embed-spin {
        to {
          transform: rotate(360deg);
        }
      }

      @media (max-width: 640px) {
        .td-video-embed__play-btn {
          width: 60px;
          height: 60px;
        }

        .td-video-embed__play-btn svg {
          width: 24px;
          height: 24px;
          margin-left: 3px;
        }

        .td-video-embed__title {
          font-size: 1rem;
          padding: 1rem;
        }
      }
    `}</style>
  );
}
