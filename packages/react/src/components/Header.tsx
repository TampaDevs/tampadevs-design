'use client';

import { useState, ReactNode } from 'react';
import { clsx } from 'clsx';
import { Logo } from './Logo';

export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
  icon?: ReactNode;
}

export interface HeaderProps {
  links?: NavLink[];
  actions?: NavLink[];
  homeHref?: string;
  sticky?: boolean;
  logo?: ReactNode;
  className?: string;
}

export function Header({
  links = [],
  actions = [],
  homeHref = '/',
  sticky = true,
  logo,
  className,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const renderLink = (link: NavLink, closeMobile = false) => {
    const handleClick = closeMobile ? () => setMobileMenuOpen(false) : undefined;

    return (
      <a
        key={link.href + link.label}
        className="td-header__link"
        href={link.href}
        target={link.external ? '_blank' : undefined}
        rel={link.external ? 'noopener noreferrer' : undefined}
        onClick={handleClick}
      >
        {link.icon}
        {link.label}
      </a>
    );
  };

  return (
    <>
      <header className={clsx('td-header', sticky && 'td-header--sticky', className)}>
        <nav className="td-header__nav">
          <div className="td-header__inner">
            <div className="td-header__left">
              <a className="td-header__brand" href={homeHref}>
                {logo || <Logo variant="full" size="sm" textColor="#1C2438" />}
              </a>

              <div className="td-header__desktop-links">
                {links.map(link => renderLink(link))}
              </div>
            </div>

            <div className="td-header__right">
              <div className="td-header__actions">
                {actions.map(link => renderLink(link))}
              </div>

              <button
                className="td-header__hamburger"
                onClick={toggleMobileMenu}
                aria-label="Toggle menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? (
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className={clsx('td-header__mobile-menu', mobileMenuOpen && 'td-header__mobile-menu--open')}>
            <div className="td-header__mobile-inner">
              {links.map(link => renderLink(link, true))}
              {actions.map(link => renderLink(link, true))}
            </div>
          </div>
        </nav>
      </header>
      <HeaderStyles />
    </>
  );
}

function HeaderStyles() {
  return (
    <style>{`
      .td-header {
        background: rgba(255, 255, 255, 0.7);
        backdrop-filter: blur(24px);
        -webkit-backdrop-filter: blur(24px);
        border-bottom: 1px solid rgba(229, 231, 235, 0.5);
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05);
      }

      .td-header--sticky {
        position: sticky;
        top: 0;
        z-index: 50;
      }

      @media (prefers-color-scheme: dark) {
        .td-header {
          background: rgba(3, 7, 18, 0.7);
          border-bottom-color: rgba(31, 41, 55, 0.5);
        }
      }

      .td-header__nav {
        max-width: 80rem;
        margin: 0 auto;
        padding: 0 1rem;
      }

      @media (min-width: 640px) {
        .td-header__nav {
          padding: 0 1.5rem;
        }
      }

      @media (min-width: 1024px) {
        .td-header__nav {
          padding: 0 2rem;
        }
      }

      .td-header__inner {
        display: flex;
        justify-content: space-between;
        height: 4rem;
      }

      .td-header__left {
        display: flex;
        align-items: center;
        gap: 2rem;
      }

      .td-header__brand {
        display: flex;
        align-items: center;
        text-decoration: none;
      }

      .td-header__desktop-links {
        display: none;
        align-items: center;
        gap: 0.25rem;
      }

      @media (min-width: 768px) {
        .td-header__desktop-links {
          display: flex;
        }
      }

      .td-header__link {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 0.75rem;
        border-radius: 0.5rem;
        font-size: 0.875rem;
        font-weight: 500;
        color: #4B5563;
        text-decoration: none;
        transition: background-color 0.15s ease, color 0.15s ease;
      }

      @media (prefers-color-scheme: dark) {
        .td-header__link {
          color: #9CA3AF;
        }
      }

      .td-header__link:hover {
        background-color: rgba(243, 244, 246, 1);
      }

      @media (prefers-color-scheme: dark) {
        .td-header__link:hover {
          background-color: rgba(31, 41, 55, 1);
        }
      }

      .td-header__link svg {
        width: 1.25rem;
        height: 1.25rem;
      }

      .td-header__right {
        display: flex;
        align-items: center;
        gap: 1rem;
      }

      .td-header__actions {
        display: none;
        align-items: center;
        gap: 0.25rem;
      }

      @media (min-width: 768px) {
        .td-header__actions {
          display: flex;
        }
      }

      .td-header__hamburger {
        display: flex;
        padding: 0.5rem;
        border-radius: 0.5rem;
        color: #4B5563;
        background: none;
        border: none;
        cursor: pointer;
      }

      @media (prefers-color-scheme: dark) {
        .td-header__hamburger {
          color: #9CA3AF;
        }
      }

      .td-header__hamburger:hover {
        background-color: rgba(243, 244, 246, 1);
      }

      @media (prefers-color-scheme: dark) {
        .td-header__hamburger:hover {
          background-color: rgba(31, 41, 55, 1);
        }
      }

      @media (min-width: 768px) {
        .td-header__hamburger {
          display: none;
        }
      }

      .td-header__hamburger svg {
        width: 1.5rem;
        height: 1.5rem;
      }

      .td-header__mobile-menu {
        display: none;
        padding: 1rem 0;
        border-top: 1px solid rgba(229, 231, 235, 1);
      }

      @media (prefers-color-scheme: dark) {
        .td-header__mobile-menu {
          border-top-color: rgba(31, 41, 55, 1);
        }
      }

      .td-header__mobile-menu--open {
        display: block;
      }

      @media (min-width: 768px) {
        .td-header__mobile-menu {
          display: none !important;
        }
      }

      .td-header__mobile-inner {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
      }
    `}</style>
  );
}
