import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { tokens, reset } from '../styles/shared.js';

export type OpenCollectiveMode = 'contributors' | 'backers' | 'sponsors' | 'all';

// GraphQL API types
export interface GraphQLContributor {
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

// GitHub API contributor type
export interface GitHubContributor {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
  type: 'User' | 'Bot';
}

// GitHub API org member type
export interface GitHubOrgMember {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  type: 'User' | 'Bot';
}

// Unified member interface for rendering
export interface DisplayMember {
  id: string;
  name: string;
  image: string | null;
  profile: string;
  type: 'USER' | 'ORGANIZATION';
  totalContributed?: number;
  currency?: string;
}

export interface OpenCollectiveStats {
  slug: string;
  currency: string;
  balance: number;
  yearlyIncome: number;
  backersCount: number;
}

// Cache entry interface
interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

// Default cache TTL: 1 hour
const DEFAULT_CACHE_TTL = 60 * 60 * 1000;

/**
 * Tampa Devs OpenCollective Component
 * Display contributors, backers, or sponsors from OpenCollective GraphQL API
 * or GitHub contributors for code contributors
 *
 * @element td-opencollective
 *
 * @prop {string} collective - OpenCollective collective slug (e.g., "tampadevs")
 * @prop {OpenCollectiveMode} mode - Display mode (contributors, backers, sponsors, all)
 * @prop {number} limit - Maximum number of members to display (default: 100)
 * @prop {boolean} showButton - Show contribution button (default: false)
 * @prop {boolean} showStats - Show collective stats (default: false)
 * @prop {string} title - Optional title to display
 * @prop {string} description - Optional description text
 * @prop {string} githubRepo - GitHub repo for contributors mode (e.g., "tampadevs/tampadevs")
 * @prop {string} githubOrg - GitHub org for contributors mode - shows public members (e.g., "tampadevs")
 * @prop {number} cacheTtl - Cache TTL in milliseconds (default: 1 hour). Set to 0 to disable.
 *
 * @csspart container - The main container
 * @csspart header - The header section
 * @csspart content - The content area
 * @csspart stats - The stats section
 */
@customElement('td-opencollective')
export class TdOpenCollective extends LitElement {
  static styles = [
    tokens,
    reset,
    css`
      :host {
        display: block;
      }

      .container {
        background: rgba(28, 36, 56, 0.8);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        border: 1px solid rgba(255, 255, 255, 0.05);
        border-radius: var(--td-radius-xl);
        overflow: hidden;
        box-shadow:
          inset 0 1px 1px 0 rgba(255, 255, 255, 0.05),
          0 8px 24px -4px rgba(0, 0, 0, 0.15);
      }

      .header {
        padding: 1.5rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      }

      .title {
        font-size: 1.25rem;
        font-weight: 700;
        color: white;
        margin: 0;
      }

      .description {
        margin-top: 0.5rem;
        font-size: 0.875rem;
        color: rgba(156, 163, 175, 0.8);
      }

      .content {
        padding: 1.5rem;
      }

      /* Avatar grid */
      .avatar-grid {
        display: flex;
        flex-wrap: wrap;
        gap: 0.75rem;
        justify-content: center;
      }

      .avatar-link {
        display: block;
        width: 48px;
        height: 48px;
        border-radius: 50%;
        overflow: hidden;
        background: rgba(255, 255, 255, 0.1);
        transition: all var(--td-transition-fast);
        text-decoration: none;
      }

      .avatar-link:hover {
        transform: scale(1.15);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      }

      .avatar-link img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .avatar-placeholder {
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

      /* Organization avatars - slightly larger */
      .avatar-link.organization {
        width: 56px;
        height: 56px;
        border-radius: var(--td-radius-lg);
      }

      /* Stats section */
      .stats {
        display: flex;
        justify-content: center;
        gap: 2rem;
        padding: 1rem 1.5rem;
        background: rgba(0, 0, 0, 0.2);
        border-top: 1px solid rgba(255, 255, 255, 0.05);
      }

      .stat {
        text-align: center;
      }

      .stat-value {
        font-size: 1.5rem;
        font-weight: 700;
        color: white;
      }

      .stat-label {
        font-size: 0.75rem;
        color: rgba(156, 163, 175, 0.8);
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }

      /* Contribute button */
      .button-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 1.5rem;
        background: rgba(0, 0, 0, 0.1);
        border-top: 1px solid rgba(255, 255, 255, 0.05);
      }

      .contribute-button {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.75rem 1.5rem;
        background: linear-gradient(180deg, var(--td-color-coral) 0%, var(--td-color-coral-dark) 100%);
        color: white;
        border: none;
        border-radius: var(--td-radius-lg);
        font-weight: 600;
        font-size: 0.875rem;
        cursor: pointer;
        text-decoration: none;
        transition: all var(--td-transition-fast);
        box-shadow: var(--td-shadow-md), 0 4px 6px rgba(232, 90, 79, 0.15);
      }

      .contribute-button:hover {
        background: linear-gradient(180deg, var(--td-color-coral-light) 0%, var(--td-color-coral) 100%);
        transform: translateY(-2px);
        box-shadow: var(--td-shadow-lg), 0 6px 10px rgba(232, 90, 79, 0.2);
      }

      .contribute-button svg {
        width: 20px;
        height: 20px;
      }

      /* Loading state */
      .loading {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 3rem;
        color: rgba(156, 163, 175, 0.6);
      }

      .loading-spinner {
        width: 32px;
        height: 32px;
        border: 3px solid rgba(255, 255, 255, 0.1);
        border-top-color: var(--td-color-coral);
        border-radius: 50%;
        animation: spin 1s linear infinite;
      }

      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }

      /* Error state */
      .error {
        padding: 2rem;
        text-align: center;
        color: rgba(156, 163, 175, 0.6);
      }

      /* Empty state */
      .empty {
        padding: 2rem;
        text-align: center;
        color: rgba(156, 163, 175, 0.6);
        font-style: italic;
      }

      /* Responsive */
      @media (max-width: 640px) {
        .header {
          padding: 1rem;
        }

        .content {
          padding: 1rem;
        }

        .avatar-link {
          width: 40px;
          height: 40px;
        }

        .avatar-link.organization {
          width: 48px;
          height: 48px;
        }

        .stats {
          gap: 1rem;
          flex-wrap: wrap;
        }

        .stat-value {
          font-size: 1.25rem;
        }
      }
    `,
  ];

  @property({ type: String }) collective = 'tampadevs';
  @property({ type: String }) mode: OpenCollectiveMode = 'backers';
  @property({ type: Number }) limit = 100;
  @property({ type: Boolean }) showButton = false;
  @property({ type: Boolean }) showStats = false;
  @property({ type: String }) title = '';
  @property({ type: String }) description = '';
  /** GitHub repo for contributors mode (e.g., "tampadevs/tampadevs") */
  @property({ type: String }) githubRepo = '';
  /** GitHub org for contributors mode - shows org members (e.g., "tampadevs") */
  @property({ type: String }) githubOrg = '';
  /** Cache TTL in milliseconds (default: 1 hour). Set to 0 to disable caching. */
  @property({ type: Number }) cacheTtl = DEFAULT_CACHE_TTL;

  @state() private _loading = true;
  @state() private _error = false;
  @state() private _members: DisplayMember[] = [];
  @state() private _stats: OpenCollectiveStats | null = null;

  connectedCallback() {
    super.connectedCallback();
    this._fetchData();
  }

  updated(changedProperties: Map<string, unknown>) {
    if (
      changedProperties.has('collective') ||
      changedProperties.has('mode') ||
      changedProperties.has('limit') ||
      changedProperties.has('githubRepo') ||
      changedProperties.has('githubOrg')
    ) {
      this._fetchData();
    }
  }

  // Cache helpers
  private _getCacheKey(): string {
    if (this.mode === 'contributors') {
      if (this.githubOrg) return `td-oc-gh-org-${this.githubOrg}-${this.limit}`;
      if (this.githubRepo) return `td-oc-gh-repo-${this.githubRepo}-${this.limit}`;
    }
    return `td-oc-${this.collective}-${this.mode}-${this.limit}-${this.showStats}`;
  }

  private _getFromCache<T>(key: string): T | null {
    if (this.cacheTtl <= 0) return null;
    try {
      const cached = localStorage.getItem(key);
      if (!cached) return null;
      const entry: CacheEntry<T> = JSON.parse(cached);
      if (Date.now() - entry.timestamp > this.cacheTtl) {
        localStorage.removeItem(key);
        return null;
      }
      return entry.data;
    } catch {
      return null;
    }
  }

  private _setCache<T>(key: string, data: T): void {
    if (this.cacheTtl <= 0) return;
    try {
      const entry: CacheEntry<T> = { data, timestamp: Date.now() };
      localStorage.setItem(key, JSON.stringify(entry));
    } catch {
      // localStorage might be full or disabled
    }
  }

  private async _fetchData() {
    this._loading = true;
    this._error = false;

    const cacheKey = this._getCacheKey();

    // Check cache first
    interface CachedData {
      members: DisplayMember[];
      stats: OpenCollectiveStats | null;
    }
    const cached = this._getFromCache<CachedData>(cacheKey);
    if (cached) {
      this._members = cached.members;
      this._stats = cached.stats;
      this._loading = false;
      return;
    }

    try {
      if (this.mode === 'contributors') {
        if (this.githubOrg) {
          // Fetch GitHub org members
          await this._fetchGitHubOrgMembers();
        } else if (this.githubRepo) {
          // Fetch GitHub repo contributors
          await this._fetchGitHubContributors();
        } else {
          // Fallback to OpenCollective core contributors
          await this._fetchOpenCollectiveData();
        }
      } else {
        // Fetch from OpenCollective GraphQL API
        await this._fetchOpenCollectiveData();
      }

      // Cache the results
      this._setCache<CachedData>(cacheKey, {
        members: this._members,
        stats: this._stats,
      });

      this._loading = false;
    } catch (error) {
      console.error('Fetch error:', error);
      this._error = true;
      this._loading = false;
    }
  }

  private async _fetchGitHubContributors() {
    const url = `https://api.github.com/repos/${this.githubRepo}/contributors?per_page=${this.limit}`;
    const response = await fetch(url, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
      },
    });

    if (!response.ok) throw new Error('Failed to fetch GitHub contributors');

    const contributors: GitHubContributor[] = await response.json();
    // Filter out bots (type === 'Bot' or login ends with '[bot]')
    const humans = contributors.filter(
      (c) => c.type !== 'Bot' && !c.login.endsWith('[bot]')
    );
    this._members = humans.map((c) => ({
      id: String(c.id),
      name: c.login,
      image: c.avatar_url,
      profile: c.html_url,
      type: 'USER' as const,
    }));
  }

  private async _fetchGitHubOrgMembers() {
    const url = `https://api.github.com/orgs/${this.githubOrg}/members?per_page=${this.limit}`;
    const response = await fetch(url, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
      },
    });

    if (!response.ok) throw new Error('Failed to fetch GitHub org members');

    const members: GitHubOrgMember[] = await response.json();
    // Filter out bots (type === 'Bot' or login ends with '[bot]')
    const humans = members.filter(
      (m) => m.type !== 'Bot' && !m.login.endsWith('[bot]')
    );
    this._members = humans.map((m) => ({
      id: String(m.id),
      name: m.login,
      image: m.avatar_url,
      profile: m.html_url,
      type: 'USER' as const,
    }));
  }

  private async _fetchOpenCollectiveData() {
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
            totalAmountReceived {
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
        variables: { slug: this.collective, limit: this.limit },
      }),
    });

    if (!response.ok) throw new Error('Failed to fetch OpenCollective data');

    const result = await response.json();
    const contributors: GraphQLContributor[] =
      result.data?.account?.contributors?.nodes || [];

    // Filter and map based on mode
    this._members = this._filterContributors(contributors);

    // Set stats if needed
    if (this.showStats && result.data?.account?.stats) {
      const stats = result.data.account.stats;
      this._stats = {
        slug: this.collective,
        currency: stats.balance?.currency || 'USD',
        balance: (stats.balance?.value || 0) * 100, // Convert to cents
        yearlyIncome: (stats.yearlyBudget?.value || 0) * 100,
        backersCount: result.data.account.contributors?.totalCount || 0,
      };
    }
  }

  private _filterContributors(contributors: GraphQLContributor[]): DisplayMember[] {
    let filtered: GraphQLContributor[];

    switch (this.mode) {
      case 'contributors':
        // Core contributors (admins) - fallback when no githubRepo provided
        filtered = contributors.filter((c) => c.isCore || c.isAdmin);
        break;

      case 'backers':
        // Individual financial supporters
        filtered = contributors.filter(
          (c) => c.isBacker && c.account.type === 'INDIVIDUAL'
        );
        break;

      case 'sponsors':
        // Organization financial supporters
        filtered = contributors.filter(
          (c) => c.isBacker && c.account.type === 'ORGANIZATION'
        );
        break;

      case 'all':
      default:
        // All contributors
        filtered = contributors;
        break;
    }

    return filtered.map((c) => ({
      id: c.id,
      name: c.account.name,
      image: c.account.imageUrl,
      profile: `https://opencollective.com/${c.account.slug}`,
      type: c.account.type === 'ORGANIZATION' ? 'ORGANIZATION' : 'USER',
      totalContributed: c.totalAmountContributed?.value,
      currency: c.totalAmountContributed?.currency,
    }));
  }

  private _getContributeUrl(): string {
    return `https://opencollective.com/${this.collective}/contribute`;
  }

  private _getDefaultTitle(): string {
    switch (this.mode) {
      case 'contributors':
        return 'Open Source Contributors';
      case 'backers':
        return 'Community Backers';
      case 'sponsors':
        return 'Sponsors';
      case 'all':
        return 'Our Supporters';
      default:
        return '';
    }
  }

  private _formatCurrency(amount: number, currency = 'USD', isCents = true): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(isCents ? amount / 100 : amount);
  }

  private _getInitials(name: string): string {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  private _renderMember(member: DisplayMember) {
    const isOrg = member.type === 'ORGANIZATION';
    const imageUrl = member.image
      ? member.image.replace('http://', 'https://')
      : null;

    const contributedText =
      member.totalContributed && member.totalContributed > 0
        ? ` - ${this._formatCurrency(member.totalContributed, member.currency, false)} contributed`
        : '';

    return html`
      <a
        class="avatar-link ${isOrg ? 'organization' : ''}"
        href=${member.profile}
        target="_blank"
        rel="noopener noreferrer"
        title="${member.name}${contributedText}"
      >
        ${imageUrl
          ? html`<img src=${imageUrl} alt=${member.name} loading="lazy" />`
          : html`<div class="avatar-placeholder">${this._getInitials(member.name)}</div>`}
      </a>
    `;
  }

  private _renderStats() {
    if (!this._stats) return nothing;

    return html`
      <div class="stats" part="stats">
        <div class="stat">
          <div class="stat-value">${this._stats.backersCount}</div>
          <div class="stat-label">Backers</div>
        </div>
        <div class="stat">
          <div class="stat-value">${this._formatCurrency(this._stats.yearlyIncome, this._stats.currency)}</div>
          <div class="stat-label">Yearly</div>
        </div>
        <div class="stat">
          <div class="stat-value">${this._formatCurrency(this._stats.balance, this._stats.currency)}</div>
          <div class="stat-label">Balance</div>
        </div>
      </div>
    `;
  }

  private _renderContent() {
    if (this._loading) {
      return html`
        <div class="loading">
          <div class="loading-spinner"></div>
        </div>
      `;
    }

    if (this._error) {
      return html`
        <div class="error">Failed to load data. Please try again later.</div>
      `;
    }

    if (this._members.length === 0) {
      return html`
        <div class="empty">No ${this.mode} found yet. Be the first!</div>
      `;
    }

    return html`
      <div class="avatar-grid">
        ${this._members.map(member => this._renderMember(member))}
      </div>
    `;
  }

  render() {
    const displayTitle = this.title || this._getDefaultTitle();

    return html`
      <div class="container" part="container">
        ${displayTitle || this.description
          ? html`
              <div class="header" part="header">
                ${displayTitle ? html`<h2 class="title">${displayTitle}</h2>` : nothing}
                ${this.description
                  ? html`<p class="description">${this.description}</p>`
                  : nothing}
              </div>
            `
          : nothing}

        <div class="content" part="content">
          ${this._renderContent()}
        </div>

        ${this.showStats ? this._renderStats() : nothing}

        ${this.showButton
          ? html`
              <div class="button-wrapper">
                <a class="contribute-button" href=${this._getContributeUrl()} target="_blank" rel="noopener noreferrer">
                  <svg fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                  Become a Supporter
                </a>
              </div>
            `
          : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'td-opencollective': TdOpenCollective;
  }
}
