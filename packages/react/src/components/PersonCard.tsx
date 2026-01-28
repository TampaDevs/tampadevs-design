import { ReactNode } from 'react';
import { clsx } from 'clsx';
import { Avatar, AvatarSize } from './Avatar';
import { Icon } from './Icon';

export type PersonCardVariant = 'default' | 'compact' | 'featured' | 'author';

export interface SocialLink {
  platform: 'github' | 'twitter' | 'linkedin' | 'website' | 'email';
  url: string;
}

export interface PersonCardProps {
  name: string;
  role?: string;
  organization?: string;
  bio?: string;
  photo?: string;
  socials?: SocialLink[];
  variant?: PersonCardVariant;
  href?: string;
  children?: ReactNode;
  className?: string;
}

const avatarSizeMap: Record<PersonCardVariant, AvatarSize> = {
  compact: 'md',
  featured: '2xl',
  author: 'lg',
  default: 'xl',
};

const socialIconMap: Record<string, string> = {
  github: 'github',
  twitter: 'twitter',
  linkedin: 'linkedin',
  website: 'globe',
  email: 'mail',
};

export function PersonCard({
  name,
  role,
  organization,
  bio,
  photo,
  socials,
  variant = 'default',
  href,
  children,
  className,
}: PersonCardProps) {
  const avatarSize = avatarSizeMap[variant];

  const content = (
    <>
      <Avatar
        src={photo}
        name={name}
        size={avatarSize}
        ring={variant === 'featured'}
      />

      <div className="td-person-card__content">
        <h3 className="td-person-card__name">{name}</h3>
        {role && <p className="td-person-card__role">{role}</p>}
        {organization && <p className="td-person-card__org">{organization}</p>}
        {bio && <p className="td-person-card__bio">{bio}</p>}

        {socials && socials.length > 0 && (
          <div className="td-person-card__socials">
            {socials.map((social, i) => (
              <a
                key={i}
                className="td-person-card__social-link"
                href={social.platform === 'email' ? `mailto:${social.url}` : social.url}
                target={social.platform === 'email' ? '_self' : '_blank'}
                rel="noopener noreferrer"
                title={social.platform}
              >
                <Icon name={socialIconMap[social.platform] || 'link'} size="sm" />
              </a>
            ))}
          </div>
        )}

        {children}
      </div>
    </>
  );

  const cardClass = clsx(
    'td-person-card',
    `td-person-card--${variant}`,
    className
  );

  if (href) {
    return (
      <a href={href} className={cardClass}>
        {content}
        <PersonCardStyles />
      </a>
    );
  }

  return (
    <div className={cardClass}>
      {content}
      <PersonCardStyles />
    </div>
  );
}

function PersonCardStyles() {
  return (
    <style>{`
      .td-person-card {
        display: flex;
        background: rgba(28, 36, 56, 0.8);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        border: 1px solid rgba(255, 255, 255, 0.05);
        border-radius: 0.75rem;
        overflow: hidden;
        transition: all 0.2s ease;
        box-shadow:
          inset 0 1px 1px 0 rgba(255, 255, 255, 0.05),
          0 8px 24px -4px rgba(0, 0, 0, 0.15);
        text-decoration: none;
        color: inherit;
      }

      .td-person-card:hover {
        transform: translateY(-4px);
        box-shadow:
          inset 0 1px 1px 0 rgba(255, 255, 255, 0.08),
          0 16px 32px -8px rgba(0, 0, 0, 0.2);
        border-color: rgba(255, 255, 255, 0.1);
      }

      .td-person-card__content {
        flex: 1;
        min-width: 0;
      }

      .td-person-card__name {
        font-weight: 700;
        color: white;
        margin: 0;
      }

      .td-person-card__role {
        color: #E85A4F;
        font-weight: 500;
        margin: 0;
      }

      .td-person-card__org {
        color: rgba(209, 213, 219, 0.6);
        font-size: 0.875rem;
        margin: 0;
      }

      .td-person-card__bio {
        color: rgba(209, 213, 219, 0.8);
        margin: 0;
        line-height: 1.6;
      }

      .td-person-card__socials {
        display: flex;
        gap: 0.75rem;
      }

      .td-person-card__social-link {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        border-radius: 0.375rem;
        background: rgba(255, 255, 255, 0.1);
        color: rgba(209, 213, 219, 0.8);
        transition: all 0.15s ease;
        text-decoration: none;
      }

      .td-person-card__social-link:hover {
        background: #E85A4F;
        color: white;
        transform: translateY(-2px);
      }

      /* Default variant */
      .td-person-card--default {
        flex-direction: column;
        align-items: center;
        text-align: center;
        padding: 2rem;
        gap: 1rem;
      }

      .td-person-card--default .td-person-card__name {
        font-size: 1.25rem;
      }

      .td-person-card--default .td-person-card__role {
        font-size: 0.875rem;
        margin-top: 0.25rem;
      }

      .td-person-card--default .td-person-card__bio {
        font-size: 0.875rem;
        margin-top: 0.75rem;
      }

      .td-person-card--default .td-person-card__socials {
        margin-top: 1rem;
        justify-content: center;
      }

      /* Compact variant */
      .td-person-card--compact {
        flex-direction: row;
        align-items: center;
        padding: 1rem;
        gap: 1rem;
      }

      .td-person-card--compact .td-person-card__content {
        display: flex;
        flex-direction: column;
        gap: 0.125rem;
      }

      .td-person-card--compact .td-person-card__name {
        font-size: 1rem;
      }

      .td-person-card--compact .td-person-card__role {
        font-size: 0.75rem;
      }

      .td-person-card--compact .td-person-card__bio,
      .td-person-card--compact .td-person-card__socials {
        display: none;
      }

      /* Featured variant */
      .td-person-card--featured {
        flex-direction: column;
        padding: 2.5rem;
        gap: 1.5rem;
        align-items: center;
        text-align: center;
        background: linear-gradient(135deg, rgba(28, 36, 56, 0.9) 0%, rgba(43, 52, 71, 0.9) 100%);
      }

      .td-person-card--featured .td-person-card__name {
        font-size: 1.5rem;
      }

      .td-person-card--featured .td-person-card__role {
        font-size: 1rem;
        margin-top: 0.25rem;
      }

      .td-person-card--featured .td-person-card__bio {
        font-size: 1rem;
        margin-top: 1rem;
        max-width: 400px;
      }

      .td-person-card--featured .td-person-card__socials {
        margin-top: 1.5rem;
        justify-content: center;
      }

      /* Author variant */
      .td-person-card--author {
        flex-direction: row;
        align-items: flex-start;
        padding: 1.5rem;
        gap: 1rem;
        background: rgba(28, 36, 56, 0.8);
      }

      .td-person-card--author .td-person-card__content {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
      }

      .td-person-card--author .td-person-card__name {
        font-size: 1rem;
      }

      .td-person-card--author .td-person-card__role {
        font-size: 0.75rem;
        color: #E85A4F;
      }

      .td-person-card--author .td-person-card__bio {
        font-size: 0.875rem;
        margin-top: 0.5rem;
      }

      .td-person-card--author .td-person-card__socials {
        margin-top: 0.75rem;
      }

      .td-person-card--author .td-person-card__social-link {
        width: 28px;
        height: 28px;
      }
    `}</style>
  );
}
