import { css } from 'lit';

/**
 * Shared CSS tokens as Lit CSS
 * These mirror the CSS custom properties from @tampadevs/tokens
 */
export const tokens = css`
  :host {
    /* Colors - Primary (Navy) */
    --td-color-navy: #1C2438;
    --td-color-navy-light: #2B3447;
    --td-color-navy-dark: #1A2031;

    /* Colors - Accent (Coral) */
    --td-color-coral: #E85A4F;
    --td-color-coral-light: #F07167;
    --td-color-coral-dark: #C44D44;

    /* Colors - Supporting */
    --td-color-sand: #B6A991;
    --td-color-bronze: #8F7665;

    /* Colors - Semantic */
    --td-color-background: #FFFFFF;
    --td-color-surface: #FFFFFF;
    --td-color-text: #1C2438;
    --td-color-text-muted: #6B7280;
    --td-color-border: #E5E7EB;

    /* Typography */
    --td-font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;

    /* Border Radius */
    --td-radius-sm: 0.125rem;
    --td-radius-md: 0.375rem;
    --td-radius-lg: 0.5rem;
    --td-radius-xl: 0.75rem;
    --td-radius-2xl: 1rem;
    --td-radius-full: 9999px;

    /* Shadows */
    --td-shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    --td-shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    --td-shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);

    /* Transitions */
    --td-transition-fast: 150ms ease;
    --td-transition-normal: 300ms ease;

    font-family: var(--td-font-sans);
    box-sizing: border-box;
  }

  *, *::before, *::after {
    box-sizing: inherit;
  }
`;

/**
 * Reset styles for components
 */
export const reset = css`
  :host {
    display: block;
  }

  :host([hidden]) {
    display: none;
  }

  button {
    font-family: inherit;
    font-size: inherit;
    border: none;
    cursor: pointer;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  input {
    font-family: inherit;
    font-size: inherit;
  }
`;
