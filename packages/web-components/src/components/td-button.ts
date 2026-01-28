import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tokens, reset } from '../styles/shared.js';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * Tampa Devs Button Component
 *
 * @element td-button
 *
 * @prop {ButtonVariant} variant - Visual style variant
 * @prop {ButtonSize} size - Button size
 * @prop {boolean} disabled - Disabled state
 * @prop {boolean} loading - Loading state
 * @prop {string} href - If provided, renders as an anchor
 * @prop {string} type - Button type (button, submit, reset)
 *
 * @slot - Button content
 *
 * @csspart button - The button element
 *
 * @fires click - Fired when button is clicked (unless disabled or loading)
 */
@customElement('td-button')
export class TdButton extends LitElement {
  static styles = [
    tokens,
    reset,
    css`
      :host {
        display: inline-block;
      }

      .button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        font-weight: 600;
        border-radius: var(--td-radius-lg);
        transition: all var(--td-transition-fast);
        white-space: nowrap;
        text-decoration: none;
        cursor: pointer;
      }

      .button:focus {
        outline: none;
        box-shadow: 0 0 0 2px var(--td-color-background), 0 0 0 4px var(--td-color-coral);
      }

      .button:disabled,
      .button.loading {
        opacity: 0.6;
        cursor: not-allowed;
      }

      /* Sizes */
      .size-sm {
        padding: 0.5rem 1rem;
        font-size: 0.875rem;
      }

      .size-md {
        padding: 0.75rem 1.5rem;
        font-size: 1rem;
      }

      .size-lg {
        padding: 1rem 2rem;
        font-size: 1.125rem;
      }

      /* Variants */
      .variant-primary {
        background: var(--td-color-coral);
        color: white;
        box-shadow: var(--td-shadow-md), 0 4px 6px -1px rgb(232 90 79 / 0.25);
      }

      .variant-primary:hover:not(:disabled):not(.loading) {
        background: var(--td-color-coral-light);
        transform: translateY(-1px);
        box-shadow: var(--td-shadow-lg), 0 6px 10px -1px rgb(232 90 79 / 0.3);
      }

      .variant-primary:active:not(:disabled):not(.loading) {
        background: var(--td-color-coral-dark);
        transform: translateY(0);
      }

      .variant-secondary {
        background: var(--td-color-navy);
        color: white;
        box-shadow: var(--td-shadow-md);
      }

      .variant-secondary:hover:not(:disabled):not(.loading) {
        background: var(--td-color-navy-light);
        transform: translateY(-1px);
        box-shadow: var(--td-shadow-lg);
      }

      .variant-secondary:active:not(:disabled):not(.loading) {
        background: var(--td-color-navy-dark);
        transform: translateY(0);
      }

      .variant-ghost {
        background: transparent;
        color: var(--td-color-navy);
        box-shadow: none;
      }

      .variant-ghost:hover:not(:disabled):not(.loading) {
        background: rgb(28 36 56 / 0.05);
      }

      .variant-ghost:active:not(:disabled):not(.loading) {
        background: rgb(28 36 56 / 0.1);
      }

      .variant-danger {
        background: #DC2626;
        color: white;
        box-shadow: var(--td-shadow-md), 0 4px 6px -1px rgb(220 38 38 / 0.25);
      }

      .variant-danger:hover:not(:disabled):not(.loading) {
        background: #B91C1C;
        transform: translateY(-1px);
      }

      /* Loading spinner */
      .spinner {
        width: 1em;
        height: 1em;
        border: 2px solid currentColor;
        border-top-color: transparent;
        border-radius: 50%;
        animation: spin 0.75s linear infinite;
      }

      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
    `,
  ];

  @property({ type: String }) variant: ButtonVariant = 'primary';
  @property({ type: String }) size: ButtonSize = 'md';
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) loading = false;
  @property({ type: String }) href = '';
  @property({ type: String }) type: 'button' | 'submit' | 'reset' = 'button';

  private _handleClick(e: Event) {
    if (this.disabled || this.loading) {
      e.preventDefault();
      e.stopPropagation();
    }
  }

  render() {
    const classes = `button variant-${this.variant} size-${this.size} ${this.loading ? 'loading' : ''}`;

    if (this.href && !this.disabled && !this.loading) {
      return html`
        <a
          class=${classes}
          href=${this.href}
          part="button"
          @click=${this._handleClick}
        >
          <slot></slot>
        </a>
      `;
    }

    return html`
      <button
        class=${classes}
        type=${this.type}
        ?disabled=${this.disabled || this.loading}
        part="button"
        @click=${this._handleClick}
      >
        ${this.loading ? html`<span class="spinner"></span>` : ''}
        <slot></slot>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'td-button': TdButton;
  }
}
