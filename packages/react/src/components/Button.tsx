import { ReactNode, ButtonHTMLAttributes } from 'react';
import { clsx } from 'clsx';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  children?: ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  href,
  type = 'button',
  className,
  children,
  onClick,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    if (isDisabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    if (onClick) {
      onClick(e as React.MouseEvent<HTMLButtonElement>);
    }
  };

  const buttonClass = clsx(
    'td-button',
    `td-button--${variant}`,
    `td-button--${size}`,
    loading && 'td-button--loading',
    className
  );

  const content = (
    <>
      {loading && <span className="td-button__spinner" />}
      {children}
    </>
  );

  if (href && !isDisabled) {
    return (
      <>
        <a href={href} className={buttonClass} onClick={handleClick}>
          {content}
        </a>
        <ButtonStyles />
      </>
    );
  }

  return (
    <>
      <button
        type={type}
        className={buttonClass}
        disabled={isDisabled}
        onClick={handleClick}
        {...props}
      >
        {content}
      </button>
      <ButtonStyles />
    </>
  );
}

function ButtonStyles() {
  return (
    <style>{`
      .td-button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        font-weight: 600;
        border-radius: 0.5rem;
        transition: all 0.15s ease;
        white-space: nowrap;
        text-decoration: none;
        cursor: pointer;
        border: none;
        font-family: inherit;
      }

      .td-button:focus {
        outline: none;
        box-shadow: 0 0 0 2px #0F1729, 0 0 0 4px #E85A4F;
      }

      .td-button:disabled,
      .td-button--loading {
        opacity: 0.6;
        cursor: not-allowed;
      }

      /* Sizes */
      .td-button--sm {
        padding: 0.5rem 1rem;
        font-size: 0.875rem;
      }

      .td-button--md {
        padding: 0.75rem 1.5rem;
        font-size: 1rem;
      }

      .td-button--lg {
        padding: 1rem 2rem;
        font-size: 1.125rem;
      }

      /* Primary variant */
      .td-button--primary {
        background: #E85A4F;
        color: white;
        text-transform: uppercase;
        letter-spacing: 0.025em;
        box-shadow: 0 4px 6px -1px rgba(232, 90, 79, 0.25);
      }

      .td-button--primary:hover:not(:disabled):not(.td-button--loading) {
        background: #F07167;
        transform: translateY(-1px);
        box-shadow: 0 6px 10px -2px rgba(232, 90, 79, 0.3);
      }

      .td-button--primary:active:not(:disabled):not(.td-button--loading) {
        background: #C44D44;
        transform: translateY(0);
      }

      /* Secondary variant */
      .td-button--secondary {
        background: #1C2438;
        color: white;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      }

      .td-button--secondary:hover:not(:disabled):not(.td-button--loading) {
        background: #2B3447;
        transform: translateY(-1px);
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
      }

      .td-button--secondary:active:not(:disabled):not(.td-button--loading) {
        background: #1A2031;
        transform: translateY(0);
      }

      /* Ghost variant - uses currentColor for flexibility on any background */
      .td-button--ghost {
        background: transparent;
        color: currentColor;
        box-shadow: none;
        border: 1px solid currentColor;
        opacity: 0.8;
      }

      .td-button--ghost:hover:not(:disabled):not(.td-button--loading) {
        background: rgba(255, 255, 255, 0.1);
        opacity: 1;
      }

      .td-button--ghost:active:not(:disabled):not(.td-button--loading) {
        background: rgba(255, 255, 255, 0.15);
      }

      /* Danger variant */
      .td-button--danger {
        background: #DC2626;
        color: white;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 4px 6px -1px rgba(220, 38, 38, 0.25);
      }

      .td-button--danger:hover:not(:disabled):not(.td-button--loading) {
        background: #B91C1C;
        transform: translateY(-1px);
      }

      /* Loading spinner */
      .td-button__spinner {
        width: 1em;
        height: 1em;
        border: 2px solid currentColor;
        border-top-color: transparent;
        border-radius: 50%;
        animation: td-button-spin 0.75s linear infinite;
      }

      @keyframes td-button-spin {
        to {
          transform: rotate(360deg);
        }
      }
    `}</style>
  );
}
