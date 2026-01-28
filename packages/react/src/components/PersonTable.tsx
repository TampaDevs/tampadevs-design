'use client';

import { useState, useEffect } from 'react';
import { clsx } from 'clsx';
import { Avatar } from './Avatar';
import { Icon } from './Icon';

export interface PersonTableMember {
  name: string;
  role: string;
  photo?: string;
  term?: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
  website?: string;
}

export interface PersonTableYear {
  year: string;
  label?: string;
  members: PersonTableMember[];
}

export interface PersonTableProps {
  title?: string;
  members?: PersonTableMember[];
  years?: PersonTableYear[];
  activeYear?: string;
  onYearChange?: (year: string) => void;
  showTerm?: boolean;
  showSocials?: boolean;
  compact?: boolean;
  className?: string;
}

export function PersonTable({
  title,
  members = [],
  years = [],
  activeYear: controlledActiveYear,
  onYearChange,
  showTerm = true,
  showSocials = true,
  compact = false,
  className,
}: PersonTableProps) {
  const isTabbedMode = years.length > 0;
  const [internalActiveYear, setInternalActiveYear] = useState(years[0]?.year || '');

  const activeYear = controlledActiveYear ?? internalActiveYear;

  useEffect(() => {
    if (isTabbedMode && !activeYear && years.length > 0) {
      setInternalActiveYear(years[0].year);
    }
  }, [isTabbedMode, activeYear, years]);

  const displayMembers = isTabbedMode
    ? years.find((y) => y.year === activeYear)?.members ?? []
    : members;

  const handleTabClick = (year: string) => {
    setInternalActiveYear(year);
    onYearChange?.(year);
  };

  const hasSocials = (member: PersonTableMember): boolean => {
    return !!(member.linkedin || member.github || member.twitter || member.website);
  };

  const showSocialsColumn = showSocials && displayMembers.some(hasSocials);

  const renderSocialLinks = (member: PersonTableMember) => {
    const links = [];

    if (member.linkedin) {
      links.push(
        <a key="linkedin" className="td-person-table__social-link" href={member.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn">
          <Icon name="linkedin" size="sm" />
        </a>
      );
    }

    if (member.github) {
      links.push(
        <a key="github" className="td-person-table__social-link" href={member.github} target="_blank" rel="noopener noreferrer" title="GitHub">
          <Icon name="github" size="sm" />
        </a>
      );
    }

    if (member.twitter) {
      links.push(
        <a key="twitter" className="td-person-table__social-link" href={member.twitter} target="_blank" rel="noopener noreferrer" title="Twitter">
          <Icon name="twitter" size="sm" />
        </a>
      );
    }

    if (member.website) {
      links.push(
        <a key="website" className="td-person-table__social-link" href={member.website} target="_blank" rel="noopener noreferrer" title="Website">
          <Icon name="globe" size="sm" />
        </a>
      );
    }

    return links;
  };

  const renderTabs = () => (
    <div className="td-person-table__tabs-wrapper">
      <div className="td-person-table__tabs-scroll">
        {years.map((yearData) => (
          <button
            key={yearData.year}
            className={clsx('td-person-table__tab', activeYear === yearData.year && 'td-person-table__tab--active')}
            onClick={() => handleTabClick(yearData.year)}
          >
            {yearData.label || yearData.year}
            <span className="td-person-table__tab-badge">{yearData.members.length}</span>
          </button>
        ))}
      </div>
    </div>
  );

  const hasHeader = title || isTabbedMode;

  return (
    <>
      <div className={clsx('td-person-table', compact && 'td-person-table--compact', className)}>
        {hasHeader && (
          isTabbedMode ? (
            <div className="td-person-table__header">
              {title && <h2 className="td-person-table__title">{title}</h2>}
              {renderTabs()}
            </div>
          ) : (
            <div className="td-person-table__title-only">
              <h2 className="td-person-table__title">{title}</h2>
            </div>
          )
        )}

        {displayMembers.length === 0 ? (
          <div className="td-person-table__empty">
            {isTabbedMode ? 'No members for this year' : 'No members to display'}
          </div>
        ) : (
          <div className="td-person-table__wrapper">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th className="td-person-table__hide-mobile">Role</th>
                  {showTerm && <th className="td-person-table__hide-sm">Term</th>}
                  {showSocialsColumn && <th>Links</th>}
                </tr>
              </thead>
              <tbody>
                {displayMembers.map((member, index) => (
                  <tr key={index}>
                    <td>
                      <div className="td-person-table__person-cell">
                        <Avatar src={member.photo} name={member.name} size="sm" />
                        <div className="td-person-table__person-info">
                          <span className="td-person-table__person-name">{member.name}</span>
                          <span className="td-person-table__person-role-mobile">{member.role}</span>
                        </div>
                      </div>
                    </td>
                    <td className="td-person-table__role-cell td-person-table__hide-mobile">{member.role}</td>
                    {showTerm && <td className="td-person-table__term-cell td-person-table__hide-sm">{member.term || '—'}</td>}
                    {showSocialsColumn && (
                      <td>
                        <div className="td-person-table__socials-cell">
                          {renderSocialLinks(member)}
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <PersonTableStyles />
    </>
  );
}

function PersonTableStyles() {
  return (
    <style>{`
      .td-person-table {
        background: rgba(28, 36, 56, 0.8);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        border: 1px solid rgba(255, 255, 255, 0.05);
        border-radius: 0.875rem;
        overflow: hidden;
        box-shadow:
          inset 0 1px 1px 0 rgba(255, 255, 255, 0.05),
          0 8px 24px -4px rgba(0, 0, 0, 0.15);
      }

      .td-person-table__header {
        display: flex;
        align-items: stretch;
        min-height: 56px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      }

      .td-person-table__title {
        display: flex;
        align-items: center;
        font-size: 1.25rem;
        font-weight: 700;
        color: white;
        margin: 0;
        padding: 0 1.5rem;
        flex-shrink: 0;
      }

      .td-person-table__title-only {
        padding: 1.5rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      }

      .td-person-table__title-only .td-person-table__title {
        padding: 0;
      }

      .td-person-table__tabs-wrapper {
        display: flex;
        align-items: stretch;
        margin-left: auto;
        flex-shrink: 0;
      }

      .td-person-table__tabs-scroll {
        display: flex;
        align-items: stretch;
        overflow-x: auto;
        scrollbar-width: none;
        scroll-behavior: smooth;
      }

      .td-person-table__tabs-scroll::-webkit-scrollbar {
        display: none;
      }

      .td-person-table__tab {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        padding: 0 1.25rem;
        font-size: 0.875rem;
        font-weight: 500;
        color: rgba(156, 163, 175, 0.8);
        background: transparent;
        border: none;
        border-left: 1px solid rgba(255, 255, 255, 0.05);
        cursor: pointer;
        white-space: nowrap;
        transition: all 0.15s ease;
        flex-shrink: 0;
        min-height: 100%;
      }

      .td-person-table__tab:hover {
        background: rgba(255, 255, 255, 0.03);
        color: rgba(255, 255, 255, 0.9);
      }

      .td-person-table__tab--active {
        background: rgba(255, 255, 255, 0.08);
        color: white;
        box-shadow: inset 0 -2px 0 #E85A4F;
      }

      .td-person-table__tab-badge {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 18px;
        height: 18px;
        padding: 0 0.375rem;
        border-radius: 9px;
        background: rgba(255, 255, 255, 0.1);
        font-size: 0.625rem;
        font-weight: 600;
      }

      .td-person-table__tab--active .td-person-table__tab-badge {
        background: rgba(232, 90, 79, 0.3);
        color: #E85A4F;
      }

      .td-person-table__wrapper {
        overflow-x: auto;
      }

      .td-person-table table {
        width: 100%;
        border-collapse: collapse;
      }

      .td-person-table th {
        text-align: left;
        font-size: 0.75rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: rgba(156, 163, 175, 0.8);
        padding: 1rem 1.5rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        background: rgba(0, 0, 0, 0.1);
      }

      .td-person-table td {
        padding: 1rem 1.5rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.03);
        vertical-align: middle;
      }

      .td-person-table--compact td {
        padding: 0.75rem 1.5rem;
      }

      .td-person-table tr:last-child td {
        border-bottom: none;
      }

      .td-person-table tbody tr:hover td {
        background: rgba(255, 255, 255, 0.02);
      }

      .td-person-table__person-cell {
        display: flex;
        align-items: center;
        gap: 1rem;
      }

      .td-person-table__person-info {
        display: flex;
        flex-direction: column;
        gap: 0.125rem;
      }

      .td-person-table__person-name {
        font-weight: 600;
        color: white;
      }

      .td-person-table__person-role-mobile {
        display: none;
        font-size: 0.75rem;
        color: #E85A4F;
      }

      .td-person-table__role-cell {
        color: #E85A4F;
        font-weight: 500;
      }

      .td-person-table__term-cell {
        color: rgba(209, 213, 219, 0.6);
        font-size: 0.875rem;
      }

      .td-person-table__socials-cell {
        display: flex;
        gap: 0.5rem;
      }

      .td-person-table__social-link {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 28px;
        height: 28px;
        border-radius: 0.375rem;
        background: rgba(255, 255, 255, 0.08);
        color: rgba(209, 213, 219, 0.6);
        transition: all 0.15s ease;
        text-decoration: none;
      }

      .td-person-table__social-link:hover {
        background: #E85A4F;
        color: white;
        transform: translateY(-1px);
      }

      .td-person-table__empty {
        padding: 3rem;
        text-align: center;
        color: rgba(156, 163, 175, 0.6);
      }

      @media (max-width: 768px) {
        .td-person-table__header {
          flex-wrap: wrap;
        }

        .td-person-table__title {
          padding: 1rem 1.5rem;
          width: 100%;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .td-person-table__hide-mobile {
          display: none;
        }

        .td-person-table__person-role-mobile {
          display: block;
        }

        .td-person-table th,
        .td-person-table td {
          padding: 0.75rem 1rem;
        }

        .td-person-table__tabs-wrapper {
          width: 100%;
          margin-left: 0;
        }

        .td-person-table__tab {
          padding: 0.75rem 1rem;
        }
      }

      @media (max-width: 480px) {
        .td-person-table__hide-sm {
          display: none;
        }
      }
    `}</style>
  );
}
