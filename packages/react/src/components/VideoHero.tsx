import { ReactNode } from 'react';
import { clsx } from 'clsx';

export interface VideoHeroProps {
  videoWebm?: string;
  videoMp4?: string;
  poster?: string;
  overlayColor?: string;
  height?: number;
  logo?: ReactNode;
  heading?: ReactNode;
  subheading?: ReactNode;
  ctas?: ReactNode;
  children?: ReactNode;
  className?: string;
}

export function VideoHero({
  videoWebm,
  videoMp4,
  poster,
  overlayColor,
  height = 80,
  logo,
  heading,
  subheading,
  ctas,
  children,
  className,
}: VideoHeroProps) {
  const heroStyle = {
    '--hero-height': `${height}vh`,
    '--hero-height-desktop': `${Math.min(height, 66.66)}vh`,
    '--overlay-color': overlayColor || 'rgba(28, 36, 56, 0.6)',
  } as React.CSSProperties;

  return (
    <div className={clsx('td-video-hero', className)} style={heroStyle}>
      <div className="td-video-hero__container">
        <video
          className="td-video-hero__video"
          autoPlay
          muted
          playsInline
          loop
          poster={poster}
        >
          {videoWebm && <source type="video/webm" src={videoWebm} />}
          {videoMp4 && <source type="video/mp4" src={videoMp4} />}
        </video>

        <div className="td-video-hero__overlay">
          <div className="td-video-hero__content">
            {logo && <div className="td-video-hero__logo">{logo}</div>}

            <div className="td-video-hero__heading-group">
              {heading}
              {subheading}
            </div>

            {ctas && <div className="td-video-hero__ctas">{ctas}</div>}

            {children}
          </div>
        </div>
      </div>

      <style>{`
        .td-video-hero {
          display: block;
          position: relative;
          width: 100%;
          overflow: hidden;
        }

        .td-video-hero__container {
          position: relative;
          width: 100%;
          min-height: var(--hero-height, 80vh);
          border-radius: 0.375rem;
          overflow: hidden;
        }

        @media (min-width: 800px) and (orientation: landscape) {
          .td-video-hero__container {
            min-height: var(--hero-height-desktop, 66.66vh);
          }
        }

        .td-video-hero__video {
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .td-video-hero__overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: var(--overlay-color, rgba(28, 36, 56, 0.6));
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 4rem 2rem 5rem;
          color: white;
          box-sizing: border-box;
        }

        .td-video-hero__content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          max-width: 800px;
        }

        .td-video-hero__logo {
          margin-bottom: 1rem;
        }

        .td-video-hero__logo img {
          max-width: 120px;
          height: auto;
        }

        @media (min-width: 768px) {
          .td-video-hero__logo img {
            max-width: 145px;
          }
        }

        .td-video-hero__heading-group {
          margin-bottom: 1rem;
        }

        .td-video-hero__heading-group h1 {
          font-size: 2rem;
          font-weight: 700;
          margin: 0;
          color: white;
        }

        .td-video-hero__heading-group h2 {
          font-size: 1.25rem;
          font-weight: 400;
          margin: 0.5rem 0 0 0;
          color: rgba(255, 255, 255, 0.9);
        }

        @media (min-width: 768px) {
          .td-video-hero__heading-group h1 {
            font-size: 3rem;
          }
          .td-video-hero__heading-group h2 {
            font-size: 1.5rem;
          }
        }

        .td-video-hero__ctas {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 1rem;
          margin-top: 1.5rem;
        }

        .td-video-hero__ctas a,
        .td-video-hero__ctas button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          min-width: 180px;
          padding: 0.75rem 1.5rem;
          border-radius: 0.5rem;
          font-size: 1.125rem;
          font-weight: 600;
          text-transform: uppercase;
          text-decoration: none;
          color: white;
          background: rgba(232, 90, 79, 0.4);
          border: 1px solid #E85A4F;
          transition: background-color 0.3s ease;
          cursor: pointer;
        }

        .td-video-hero__ctas a:hover,
        .td-video-hero__ctas button:hover {
          background: #E85A4F;
        }
      `}</style>
    </div>
  );
}
