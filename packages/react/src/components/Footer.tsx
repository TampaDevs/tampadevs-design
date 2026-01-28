import { ReactNode } from 'react';
import { clsx } from 'clsx';
import { Logo } from './Logo';
import { Icon } from './Icon';

export interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface FooterLinkGroup {
  title: string;
  links: FooterLink[];
}

export interface FooterSocialLink {
  name: string;
  href: string;
  icon: 'github' | 'twitter' | 'linkedin' | 'globe' | 'mail';
}

export interface FooterProps {
  description?: string;
  linkGroups?: FooterLinkGroup[];
  socials?: FooterSocialLink[];
  copyright?: string;
  logo?: ReactNode;
  className?: string;
}

export function Footer({
  description,
  linkGroups = [],
  socials = [],
  copyright,
  logo,
  className,
}: FooterProps) {
  const copyrightText = copyright || `© ${new Date().getFullYear()} Tampa Devs. All rights reserved.`;

  return (
    <>
      <footer className={clsx('td-footer', className)}>
        <div className="td-footer__container">
          <div className="td-footer__grid">
            <div className="td-footer__brand-section">
              <div className="td-footer__brand">
                {logo || <Logo variant="full" size="sm" textColor="#1C2438" />}
              </div>
              {description && <p className="td-footer__description">{description}</p>}
            </div>

            {linkGroups.map((group, i) => (
              <div key={i} className="td-footer__link-group">
                <h3>{group.title}</h3>
                <ul>
                  {group.links.map((link, j) => (
                    <li key={j}>
                      <a
                        href={link.href}
                        target={link.external ? '_blank' : undefined}
                        rel={link.external ? 'noopener noreferrer' : undefined}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="td-footer__bottom">
            <p className="td-footer__copyright">{copyrightText}</p>

            {socials.length > 0 && (
              <div className="td-footer__socials">
                {socials.map((social, i) => (
                  <a
                    key={i}
                    className="td-footer__social-link"
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="sr-only">{social.name}</span>
                    <Icon name={social.icon} size="sm" />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </footer>
      <FooterStyles />
    </>
  );
}

function FooterStyles() {
  return (
    <style>{`
      .td-footer {
        background-color: #F9FAFB;
        border-top: 1px solid #E5E7EB;
      }

      @media (prefers-color-scheme: dark) {
        .td-footer {
          background-color: #111827;
          border-top-color: #1F2937;
        }
      }

      .td-footer__container {
        max-width: 80rem;
        margin: 0 auto;
        padding: 3rem 1rem;
      }

      @media (min-width: 640px) {
        .td-footer__container {
          padding: 3rem 1.5rem;
        }
      }

      @media (min-width: 1024px) {
        .td-footer__container {
          padding: 3rem 2rem;
        }
      }

      .td-footer__grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 2rem;
      }

      @media (min-width: 768px) {
        .td-footer__grid {
          grid-template-columns: 2fr 1fr 1fr;
        }
      }

      .td-footer__brand-section {
        grid-column: span 1;
      }

      .td-footer__brand {
        display: inline-block;
      }

      .td-footer__description {
        margin-top: 0.5rem;
        font-size: 0.875rem;
        color: #4B5563;
        max-width: 28rem;
        line-height: 1.5;
      }

      @media (prefers-color-scheme: dark) {
        .td-footer__description {
          color: #9CA3AF;
        }
      }

      .td-footer__link-group h3 {
        font-size: 0.875rem;
        font-weight: 600;
        color: #111827;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        margin: 0 0 1rem 0;
      }

      @media (prefers-color-scheme: dark) {
        .td-footer__link-group h3 {
          color: white;
        }
      }

      .td-footer__link-group ul {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }

      .td-footer__link-group a {
        font-size: 0.875rem;
        color: #4B5563;
        text-decoration: none;
        transition: color 0.15s ease;
      }

      @media (prefers-color-scheme: dark) {
        .td-footer__link-group a {
          color: #9CA3AF;
        }
      }

      .td-footer__link-group a:hover {
        color: #1C2438;
      }

      @media (prefers-color-scheme: dark) {
        .td-footer__link-group a:hover {
          color: white;
        }
      }

      .td-footer__bottom {
        margin-top: 2rem;
        padding-top: 2rem;
        border-top: 1px solid #E5E7EB;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        align-items: center;
      }

      @media (min-width: 640px) {
        .td-footer__bottom {
          flex-direction: row;
          justify-content: space-between;
        }
      }

      @media (prefers-color-scheme: dark) {
        .td-footer__bottom {
          border-top-color: #1F2937;
        }
      }

      .td-footer__copyright {
        font-size: 0.875rem;
        color: #6B7280;
        margin: 0;
      }

      .td-footer__socials {
        display: flex;
        align-items: center;
        gap: 1rem;
      }

      .td-footer__social-link {
        color: #9CA3AF;
        transition: color 0.15s ease;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .td-footer__social-link:hover {
        color: #4B5563;
      }

      @media (prefers-color-scheme: dark) {
        .td-footer__social-link:hover {
          color: #D1D5DB;
        }
      }

      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
      }
    `}</style>
  );
}
