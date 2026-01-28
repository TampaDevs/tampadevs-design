import { css } from 'lit';

/**
 * Shared tab styles for browser/VS Code style tabs
 * Used by td-table and td-person-table components
 */
export const tabStyles = css`
  /* Tabs container - floats right, doesn't crowd title */
  .tabs-wrapper {
    display: flex;
    align-items: stretch;
    margin-left: auto;
    flex-shrink: 0;
  }

  .tabs-scroll-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    background: transparent;
    border: none;
    border-left: 1px solid rgba(255, 255, 255, 0.05);
    color: rgba(156, 163, 175, 0.6);
    cursor: pointer;
    transition: all var(--td-transition-fast);
    flex-shrink: 0;
  }

  .tabs-scroll-btn:first-of-type {
    border-left: none;
    border-right: 1px solid rgba(255, 255, 255, 0.05);
  }

  .tabs-scroll-btn:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.05);
    color: white;
  }

  .tabs-scroll-btn:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  .tabs-scroll {
    display: flex;
    align-items: stretch;
    overflow-x: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
    scroll-behavior: smooth;
  }

  .tabs-scroll::-webkit-scrollbar {
    display: none;
  }

  /* Individual tab - full height rectangular block (browser/VS Code style) */
  .tab {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0 1.25rem;
    background: transparent;
    border: none;
    border-left: 1px solid rgba(255, 255, 255, 0.05);
    color: rgba(156, 163, 175, 0.8);
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: all var(--td-transition-fast);
    white-space: nowrap;
    flex-shrink: 0;
    min-height: 100%;
  }

  .tab:first-child {
    border-left: 1px solid rgba(255, 255, 255, 0.05);
  }

  .tab:hover {
    background: rgba(255, 255, 255, 0.03);
    color: rgba(255, 255, 255, 0.9);
  }

  .tab.active {
    background: rgba(255, 255, 255, 0.08);
    color: white;
    box-shadow: inset 0 -2px 0 var(--td-color-coral, #e85a4f);
  }

  .tab .badge {
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

  .tab.active .badge {
    background: rgba(232, 90, 79, 0.3);
    color: var(--td-color-coral, #e85a4f);
  }

  /* Responsive tabs */
  @media (max-width: 768px) {
    .tabs-wrapper {
      width: 100%;
      margin-left: 0;
    }

    .tab {
      padding: 0.75rem 1rem;
    }
  }
`;
