'use client';

import { useState, useEffect } from 'react';
import { clsx } from 'clsx';

export type OpenCollectiveMode = 'contributors' | 'backers' | 'sponsors' | 'all';

interface DisplayMember {
  id: string;
  name: string;
  image: string | null;
  profile: string;
  type: 'USER' | 'ORGANIZATION';
  totalContributed?: number;
  currency?: string;
}

interface Stats {
  balance: number;
  yearlyIncome: number;
  backersCount: number;
  currency: string;
}

// GraphQL API types
interface GraphQLContributor {
  id: string;
  roles: string[];
  isAdmin: boolean;
  isCore: boolean;
  isBacker: boolean;
  totalAmountContributed: {
    value: number;
    currency: string;
  };
  account: {
    id: string;
    name: string;
    slug: string;
    type: 'INDIVIDUAL' | 'ORGANIZATION' | 'COLLECTIVE';
    imageUrl: string | null;
  };
}

// GitHub API types
interface GitHubContributor {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
  type: 'User' | 'Bot';
}

interface GitHubOrgMember {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  type: 'User' | 'Bot';
}

// Cache helpers
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

function getFromCache<T>(key: string): T | null {
  if (typeof window === 'undefined') return null;
  try {
    const cached = localStorage.getItem(key);
    if (!cached) return null;
    const entry: CacheEntry<T> = JSON.parse(cached);
    if (Date.now() - entry.timestamp > CACHE_TTL) {
      localStorage.removeItem(key);
      return null;
    }
    return entry.data;
  } catch {
    return null;
  }
}

function setCache<T>(key: string, data: T): void {
  if (typeof window === 'undefined') return;
  try {
    const entry: CacheEntry<T> = { data, timestamp: Date.now() };
    localStorage.setItem(key, JSON.stringify(entry));
  } catch {
    // localStorage might be full or disabled
  }
}

export interface OpenCollectiveProps {
  collective?: string;
  mode?: OpenCollectiveMode;
  githubOrg?: string;
  githubRepo?: string;
  title?: string;
  description?: string;
  showButton?: boolean;
  showStats?: boolean;
  limit?: number;
  cacheTtl?: number;
  className?: string;
}

export function OpenCollective({
  collective = 'tampadevs',
  mode = 'backers',
  githubOrg,
  githubRepo,
  title,
  description,
  showButton = false,
  showStats = false,
  limit = 100,
  className,
}: OpenCollectiveProps) {
  const [members, setMembers] = useState<DisplayMember[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(false);

      const cacheKey = mode === 'contributors'
        ? (githubOrg ? `td-oc-gh-org-${githubOrg}-${limit}` : (githubRepo ? `td-oc-gh-repo-${githubRepo}-${limit}` : `td-oc-${collective}-${mode}-${limit}`))
        : `td-oc-${collective}-${mode}-${limit}-${showStats}`;

      // Check cache
      const cached = getFromCache<{ members: DisplayMember[]; stats: Stats | null }>(cacheKey);
      if (cached) {
        setMembers(cached.members);
        setStats(cached.stats);
        setLoading(false);
        return;
      }

      try {
        let fetchedMembers: DisplayMember[] = [];
        let fetchedStats: Stats | null = null;

        if (mode === 'contributors') {
          if (githubOrg) {
            // Fetch GitHub org members
            const response = await fetch(`https://api.github.com/orgs/${githubOrg}/members?per_page=${limit}`, {
              headers: { Accept: 'application/vnd.github.v3+json' },
            });
            if (!response.ok) throw new Error('Failed to fetch GitHub org members');
            const orgMembers: GitHubOrgMember[] = await response.json();
            const humans = orgMembers.filter(m => m.type !== 'Bot' && !m.login.endsWith('[bot]'));
            fetchedMembers = humans.map(m => ({
              id: String(m.id),
              name: m.login,
              image: m.avatar_url,
              profile: m.html_url,
              type: 'USER' as const,
            }));
          } else if (githubRepo) {
            // Fetch GitHub repo contributors
            const response = await fetch(`https://api.github.com/repos/${githubRepo}/contributors?per_page=${limit}`, {
              headers: { Accept: 'application/vnd.github.v3+json' },
            });
            if (!response.ok) throw new Error('Failed to fetch GitHub contributors');
            const contributors: GitHubContributor[] = await response.json();
            const humans = contributors.filter(c => c.type !== 'Bot' && !c.login.endsWith('[bot]'));
            fetchedMembers = humans.map(c => ({
              id: String(c.id),
              name: c.login,
              image: c.avatar_url,
              profile: c.html_url,
              type: 'USER' as const,
            }));
          } else {
            // Fallback to OpenCollective core contributors
            const result = await fetchOpenCollectiveData(collective, limit, showStats);
            fetchedMembers = filterContributors(result.contributors, 'contributors');
            fetchedStats = result.stats;
          }
        } else {
          // Fetch from OpenCollective GraphQL API
          const result = await fetchOpenCollectiveData(collective, limit, showStats);
          fetchedMembers = filterContributors(result.contributors, mode);
          fetchedStats = result.stats;
        }

        setMembers(fetchedMembers);
        setStats(fetchedStats);

        // Cache results
        setCache(cacheKey, { members: fetchedMembers, stats: fetchedStats });
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch OpenCollective data:', err);
        setError(true);
        setLoading(false);
      }
    }

    fetchData();
  }, [collective, mode, githubOrg, githubRepo, showStats, limit]);

  const formatCurrency = (amount: number, currency = 'USD', isCents = true) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(isCents ? amount / 100 : amount);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getDefaultTitle = () => {
    switch (mode) {
      case 'contributors': return 'Open Source Contributors';
      case 'backers': return 'Community Backers';
      case 'sponsors': return 'Sponsors';
      case 'all': return 'Our Supporters';
      default: return '';
    }
  };

  const displayTitle = title || getDefaultTitle();
  const contributeUrl = `https://opencollective.com/${collective}/contribute`;

  return (
    <>
      <div className={clsx('td-opencollective', className)}>
        <div className="td-opencollective__container">
          {(displayTitle || description) && (
            <div className="td-opencollective__header">
              {displayTitle && <h2 className="td-opencollective__title">{displayTitle}</h2>}
              {description && <p className="td-opencollective__description">{description}</p>}
            </div>
          )}

          <div className="td-opencollective__content">
            {loading ? (
              <div className="td-opencollective__loading">
                <div className="td-opencollective__spinner" />
              </div>
            ) : error ? (
              <div className="td-opencollective__error">Failed to load data. Please try again later.</div>
            ) : members.length === 0 ? (
              <div className="td-opencollective__empty">No {mode} found yet. Be the first!</div>
            ) : (
              <div className="td-opencollective__grid">
                {members.map((member) => {
                  const isOrg = member.type === 'ORGANIZATION';
                  const imageUrl = member.image?.replace('http://', 'https://');
                  const contributedText = member.totalContributed && member.totalContributed > 0
                    ? ` - ${formatCurrency(member.totalContributed, member.currency, false)} contributed`
                    : '';

                  return (
                    <a
                      key={member.id}
                      href={member.profile}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={clsx('td-opencollective__avatar', isOrg && 'td-opencollective__avatar--org')}
                      title={`${member.name}${contributedText}`}
                    >
                      {imageUrl ? (
                        <img src={imageUrl} alt={member.name} loading="lazy" />
                      ) : (
                        <div className="td-opencollective__placeholder">{getInitials(member.name)}</div>
                      )}
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {showStats && stats && (
            <div className="td-opencollective__stats">
              <div className="td-opencollective__stat">
                <div className="td-opencollective__stat-value">{stats.backersCount}</div>
                <div className="td-opencollective__stat-label">Backers</div>
              </div>
              <div className="td-opencollective__stat">
                <div className="td-opencollective__stat-value">{formatCurrency(stats.yearlyIncome, stats.currency)}</div>
                <div className="td-opencollective__stat-label">Yearly</div>
              </div>
              <div className="td-opencollective__stat">
                <div className="td-opencollective__stat-value">{formatCurrency(stats.balance, stats.currency)}</div>
                <div className="td-opencollective__stat-label">Balance</div>
              </div>
            </div>
          )}

          {showButton && (
            <div className="td-opencollective__button-wrapper">
              <a
                href={contributeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="td-opencollective__button"
              >
                <svg fill="currentColor" viewBox="0 0 24 24" width="20" height="20">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                Become a Supporter
              </a>
            </div>
          )}
        </div>
      </div>
      <OpenCollectiveStyles />
    </>
  );
}

async function fetchOpenCollectiveData(collective: string, limit: number, showStats: boolean) {
  const query = `
    query GetCollective($slug: String!, $limit: Int!) {
      account(slug: $slug) {
        ... on AccountWithContributions {
          contributors(limit: $limit) {
            totalCount
            nodes {
              id
              roles
              isAdmin
              isCore
              isBacker
              totalAmountContributed {
                value
                currency
              }
              account {
                id
                name
                slug
                type
                imageUrl
              }
            }
          }
        }
        stats {
          balance {
            value
            currency
          }
          yearlyBudget {
            value
          }
        }
      }
    }
  `;

  const response = await fetch('https://api.opencollective.com/graphql/v2', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query,
      variables: { slug: collective, limit },
    }),
  });

  if (!response.ok) throw new Error('Failed to fetch OpenCollective data');

  const result = await response.json();
  const contributors: GraphQLContributor[] = result.data?.account?.contributors?.nodes || [];

  let stats: Stats | null = null;
  if (showStats && result.data?.account?.stats) {
    const apiStats = result.data.account.stats;
    stats = {
      currency: apiStats.balance?.currency || 'USD',
      balance: (apiStats.balance?.value || 0) * 100,
      yearlyIncome: (apiStats.yearlyBudget?.value || 0) * 100,
      backersCount: result.data.account.contributors?.totalCount || 0,
    };
  }

  return { contributors, stats };
}

function filterContributors(contributors: GraphQLContributor[], mode: OpenCollectiveMode): DisplayMember[] {
  let filtered: GraphQLContributor[];

  switch (mode) {
    case 'contributors':
      filtered = contributors.filter(c => c.isCore || c.isAdmin);
      break;
    case 'backers':
      filtered = contributors.filter(c => c.isBacker && c.account.type === 'INDIVIDUAL');
      break;
    case 'sponsors':
      filtered = contributors.filter(c => c.isBacker && c.account.type === 'ORGANIZATION');
      break;
    case 'all':
    default:
      filtered = contributors;
      break;
  }

  return filtered.map(c => ({
    id: c.id,
    name: c.account.name,
    image: c.account.imageUrl,
    profile: `https://opencollective.com/${c.account.slug}`,
    type: c.account.type === 'ORGANIZATION' ? 'ORGANIZATION' : 'USER',
    totalContributed: c.totalAmountContributed?.value,
    currency: c.totalAmountContributed?.currency,
  }));
}

function OpenCollectiveStyles() {
  return (
    <style>{`
      .td-opencollective__container {
        background: rgba(28, 36, 56, 0.8);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        border: 1px solid rgba(255, 255, 255, 0.05);
        border-radius: 0.75rem;
        overflow: hidden;
        box-shadow:
          inset 0 1px 1px 0 rgba(255, 255, 255, 0.05),
          0 8px 24px -4px rgba(0, 0, 0, 0.15);
      }

      .td-opencollective__header {
        padding: 1.5rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      }

      .td-opencollective__title {
        font-size: 1.25rem;
        font-weight: 700;
        color: white;
        margin: 0;
      }

      .td-opencollective__description {
        margin: 0.5rem 0 0 0;
        font-size: 0.875rem;
        color: rgba(156, 163, 175, 0.8);
      }

      .td-opencollective__content {
        padding: 1.5rem;
      }

      .td-opencollective__grid {
        display: flex;
        flex-wrap: wrap;
        gap: 0.75rem;
        justify-content: center;
      }

      .td-opencollective__avatar {
        display: block;
        width: 48px;
        height: 48px;
        border-radius: 50%;
        overflow: hidden;
        background: rgba(255, 255, 255, 0.1);
        transition: all 150ms ease;
        text-decoration: none;
      }

      .td-opencollective__avatar:hover {
        transform: scale(1.15);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      }

      .td-opencollective__avatar img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .td-opencollective__avatar--org {
        width: 56px;
        height: 56px;
        border-radius: 0.5rem;
      }

      .td-opencollective__placeholder {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%);
        color: white;
        font-weight: 600;
        font-size: 1rem;
      }

      .td-opencollective__stats {
        display: flex;
        justify-content: center;
        gap: 2rem;
        padding: 1rem 1.5rem;
        background: rgba(0, 0, 0, 0.2);
        border-top: 1px solid rgba(255, 255, 255, 0.05);
      }

      .td-opencollective__stat {
        text-align: center;
      }

      .td-opencollective__stat-value {
        font-size: 1.5rem;
        font-weight: 700;
        color: white;
      }

      .td-opencollective__stat-label {
        font-size: 0.75rem;
        color: rgba(156, 163, 175, 0.8);
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }

      .td-opencollective__button-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 1.5rem;
        background: rgba(0, 0, 0, 0.1);
        border-top: 1px solid rgba(255, 255, 255, 0.05);
      }

      .td-opencollective__button {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.875rem 1.5rem;
        background-color: #E85A4F;
        color: white;
        border: none;
        border-radius: 0.5rem;
        font-weight: 600;
        font-size: 0.875rem;
        cursor: pointer;
        text-decoration: none;
        text-transform: uppercase;
        letter-spacing: 0.025em;
        transition: all 150ms ease;
        box-shadow: 0 4px 6px -1px rgba(232, 90, 79, 0.25);
      }

      .td-opencollective__button:hover {
        background-color: #F07167;
        transform: translateY(-1px);
        box-shadow: 0 6px 10px -2px rgba(232, 90, 79, 0.3);
      }

      .td-opencollective__loading {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 3rem;
        color: rgba(156, 163, 175, 0.6);
      }

      .td-opencollective__spinner {
        width: 32px;
        height: 32px;
        border: 3px solid rgba(255, 255, 255, 0.1);
        border-top-color: #E85A4F;
        border-radius: 50%;
        animation: td-oc-spin 1s linear infinite;
      }

      @keyframes td-oc-spin {
        to {
          transform: rotate(360deg);
        }
      }

      .td-opencollective__error,
      .td-opencollective__empty {
        padding: 2rem;
        text-align: center;
        color: rgba(156, 163, 175, 0.6);
      }

      .td-opencollective__empty {
        font-style: italic;
      }

      @media (max-width: 640px) {
        .td-opencollective__header {
          padding: 1rem;
        }

        .td-opencollective__content {
          padding: 1rem;
        }

        .td-opencollective__avatar {
          width: 40px;
          height: 40px;
        }

        .td-opencollective__avatar--org {
          width: 48px;
          height: 48px;
        }

        .td-opencollective__stats {
          gap: 1rem;
          flex-wrap: wrap;
        }

        .td-opencollective__stat-value {
          font-size: 1.25rem;
        }
      }
    `}</style>
  );
}
