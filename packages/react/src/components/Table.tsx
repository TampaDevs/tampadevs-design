'use client';

import { useState, ReactNode, useEffect } from 'react';
import { clsx } from 'clsx';

export interface TableColumn {
  key: string;
  label: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
  hideOnMobile?: boolean;
  render?: (value: unknown, row: Record<string, unknown>) => ReactNode;
}

export interface TableTab {
  id: string;
  label: string;
  data: Record<string, unknown>[];
}

export interface TableProps {
  title?: string;
  columns: TableColumn[];
  data?: Record<string, unknown>[];
  tabs?: TableTab[];
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
  compact?: boolean;
  striped?: boolean;
  hoverable?: boolean;
  emptyMessage?: string;
  titleActions?: ReactNode;
  className?: string;
}

export function Table({
  title,
  columns,
  data = [],
  tabs = [],
  activeTab: controlledActiveTab,
  onTabChange,
  compact = false,
  striped = false,
  hoverable = true,
  emptyMessage = 'No data to display',
  titleActions,
  className,
}: TableProps) {
  const isTabbedMode = tabs.length > 0;
  const [internalActiveTab, setInternalActiveTab] = useState(tabs[0]?.id || '');

  const activeTab = controlledActiveTab ?? internalActiveTab;

  useEffect(() => {
    if (isTabbedMode && !activeTab && tabs.length > 0) {
      setInternalActiveTab(tabs[0].id);
    }
  }, [isTabbedMode, activeTab, tabs]);

  const displayData = isTabbedMode
    ? tabs.find((t) => t.id === activeTab)?.data ?? []
    : data;

  const handleTabClick = (tabId: string) => {
    setInternalActiveTab(tabId);
    onTabChange?.(tabId);
  };

  const renderCell = (row: Record<string, unknown>, column: TableColumn) => {
    const value = row[column.key];
    if (column.render) {
      return column.render(value, row);
    }
    return String(value ?? '—');
  };

  const renderTabs = () => (
    <div className="td-table__tabs-wrapper">
      <div className="td-table__tabs-scroll">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={clsx('td-table__tab', activeTab === tab.id && 'td-table__tab--active')}
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.label}
            <span className="td-table__tab-badge">{tab.data.length}</span>
          </button>
        ))}
      </div>
    </div>
  );

  const hasHeader = title || isTabbedMode || titleActions;

  return (
    <>
      <div className={clsx('td-table', compact && 'td-table--compact', className)}>
        {hasHeader && (
          <div className="td-table__header">
            {title && <h2 className="td-table__title">{title}</h2>}
            {isTabbedMode && renderTabs()}
            {titleActions && <div className="td-table__title-actions">{titleActions}</div>}
          </div>
        )}

        {displayData.length === 0 ? (
          <div className="td-table__empty">
            {isTabbedMode ? 'No data for this tab' : emptyMessage}
          </div>
        ) : (
          <div className="td-table__wrapper">
            <table>
              <thead>
                <tr>
                  {columns.map((col) => (
                    <th
                      key={col.key}
                      className={clsx(
                        col.align && `td-table__align-${col.align}`,
                        col.hideOnMobile && 'td-table__hide-mobile'
                      )}
                      style={col.width ? { width: col.width } : undefined}
                    >
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className={clsx(striped && 'td-table__striped', hoverable && 'td-table__hoverable')}>
                {displayData.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {columns.map((col) => (
                      <td
                        key={col.key}
                        className={clsx(
                          col.align && `td-table__align-${col.align}`,
                          col.hideOnMobile && 'td-table__hide-mobile'
                        )}
                      >
                        {renderCell(row, col)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <TableStyles />
    </>
  );
}

function TableStyles() {
  return (
    <style>{`
      .td-table {
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

      .td-table__header {
        display: flex;
        align-items: stretch;
        min-height: 56px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      }

      .td-table__title {
        display: flex;
        align-items: center;
        font-size: 1.25rem;
        font-weight: 700;
        color: white;
        margin: 0;
        padding: 0 1.5rem;
        flex-shrink: 0;
      }

      .td-table__title-actions {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0 1.5rem;
        margin-left: auto;
      }

      .td-table__tabs-wrapper {
        display: flex;
        align-items: stretch;
        margin-left: auto;
        flex-shrink: 0;
      }

      .td-table__tabs-scroll {
        display: flex;
        align-items: stretch;
        overflow-x: auto;
        scrollbar-width: none;
        -ms-overflow-style: none;
        scroll-behavior: smooth;
      }

      .td-table__tabs-scroll::-webkit-scrollbar {
        display: none;
      }

      .td-table__tab {
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

      .td-table__tab:hover {
        background: rgba(255, 255, 255, 0.03);
        color: rgba(255, 255, 255, 0.9);
      }

      .td-table__tab--active {
        background: rgba(255, 255, 255, 0.08);
        color: white;
        box-shadow: inset 0 -2px 0 #E85A4F;
      }

      .td-table__tab-badge {
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

      .td-table__tab--active .td-table__tab-badge {
        background: rgba(232, 90, 79, 0.3);
        color: #E85A4F;
      }

      .td-table__wrapper {
        overflow-x: auto;
      }

      .td-table table {
        width: 100%;
        border-collapse: collapse;
      }

      .td-table th,
      .td-table td {
        text-align: left;
        padding: 1rem 1.5rem;
        vertical-align: middle;
      }

      .td-table th {
        font-size: 0.75rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: rgba(156, 163, 175, 0.8);
        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        background: rgba(0, 0, 0, 0.1);
        white-space: nowrap;
      }

      .td-table td {
        border-bottom: 1px solid rgba(255, 255, 255, 0.03);
        color: rgba(255, 255, 255, 0.9);
      }

      .td-table--compact td {
        padding: 0.75rem 1.5rem;
      }

      .td-table tr:last-child td {
        border-bottom: none;
      }

      .td-table__hoverable tr:hover td {
        background: rgba(255, 255, 255, 0.02);
      }

      .td-table__striped tr:nth-child(even) td {
        background: rgba(0, 0, 0, 0.1);
      }

      .td-table__align-center {
        text-align: center;
      }

      .td-table__align-right {
        text-align: right;
      }

      .td-table__empty {
        padding: 3rem;
        text-align: center;
        color: rgba(156, 163, 175, 0.6);
      }

      @media (max-width: 768px) {
        .td-table__hide-mobile {
          display: none;
        }

        .td-table th,
        .td-table td {
          padding: 0.75rem 1rem;
        }

        .td-table__header {
          flex-wrap: wrap;
        }

        .td-table__title {
          padding: 1rem 1.5rem;
          width: 100%;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .td-table__tabs-wrapper {
          width: 100%;
          margin-left: 0;
        }

        .td-table__tab {
          padding: 0.75rem 1rem;
        }
      }
    `}</style>
  );
}
