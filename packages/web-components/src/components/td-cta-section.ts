import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tokens, reset } from '../styles/shared.js';

/**
 * Tampa Devs CTA Section Component
 * Call-to-action section with glass-dark styling and centered content
 *
 * @element td-cta-section
 *
 * @prop {string} title - Section title
 * @prop {string} description - Section description
 * @prop {string} primaryText - Primary button text
 * @prop {string} primaryHref - Primary button link
 * @prop {string} primaryIcon - Primary button icon (SVG string)
 * @prop {string} secondaryText - Secondary button text
 * @prop {string} secondaryHref - Secondary button link
 * @prop {string} secondaryIcon - Secondary button icon (SVG string)
 *
 * @slot - Custom content
 * @slot actions - Custom action buttons
 *
 * @csspart container - The main container
 * @csspart title - The title element
 * @csspart description - The description element
 * @csspart actions - The actions wrapper
 * @csspart primary-button - The primary button
 * @csspart secondary-button - The secondary button
 */
@customElement('td-cta-section')
export class TdCtaSection extends LitElement {
  static styles = [
    tokens,
    reset,
    css`
      :host {
        display: block;
        width: 100%;
      }

      .cta-section {
        border-radius: var(--td-radius-2xl);
        padding: 2rem;
        text-align: center;
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        background: rgba(28, 36, 56, 0.8);
        border: 1px solid rgba(255, 255, 255, 0.05);
        box-shadow:
          inset 0 1px 1px 0 rgba(255, 255, 255, 0.05),
          0 8px 24px -4px rgba(0, 0, 0, 0.15);
      }

      @media (min-width: 768px) {
        .cta-section {
          padding: 3rem;
        }
      }

      .title {
        font-size: 1.5rem;
        font-weight: 700;
        color: white;
        margin: 0 0 1rem 0;
      }

      @media (min-width: 768px) {
        .title {
          font-size: 1.875rem;
        }
      }

      .description {
        color: rgba(209, 213, 219, 0.8);
        max-width: 42rem;
        margin: 0 auto 2rem;
        line-height: 1.6;
      }

      .actions {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        gap: 1rem;
      }

      .btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        min-width: 160px;
        height: 48px;
        padding: 0 1.5rem;
        border-radius: var(--td-radius-lg);
        font-weight: 600;
        font-size: 0.875rem;
        text-decoration: none;
        transition: all var(--td-transition-fast);
        border: 1px solid transparent;
        box-sizing: border-box;
      }

      .btn svg {
        width: 1.25rem;
        height: 1.25rem;
      }

      .btn-primary {
        background: linear-gradient(180deg, var(--td-color-coral) 0%, var(--td-color-coral-dark) 100%);
        color: white;
        border-color: var(--td-color-coral);
        box-shadow: var(--td-shadow-md), 0 4px 6px rgba(232, 90, 79, 0.15);
      }

      .btn-primary:hover {
        background: linear-gradient(180deg, var(--td-color-coral-light) 0%, var(--td-color-coral) 100%);
        transform: translateY(-2px);
        box-shadow: var(--td-shadow-lg), 0 6px 10px rgba(232, 90, 79, 0.2);
      }

      .btn-secondary {
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        background: rgba(255, 255, 255, 0.15);
        border-color: rgba(255, 255, 255, 0.2);
        color: white;
      }

      .btn-secondary:hover {
        background: rgba(255, 255, 255, 0.25);
        transform: translateY(-2px);
      }

      /* Slotted action buttons */
      ::slotted([slot="actions"]) {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        min-width: 160px;
        height: 48px;
        padding: 0 1.5rem;
        border-radius: var(--td-radius-lg);
        font-weight: 600;
        font-size: 0.875rem;
        text-decoration: none;
        transition: all var(--td-transition-fast);
        border: 1px solid transparent;
        box-sizing: border-box;
        cursor: pointer;
        background: rgba(255, 255, 255, 0.15);
        color: white;
      }

      ::slotted([slot="actions"]:hover) {
        background: rgba(255, 255, 255, 0.25);
        transform: translateY(-2px);
      }

      ::slotted([slot="actions"].primary) {
        background: linear-gradient(180deg, var(--td-color-coral) 0%, var(--td-color-coral-dark) 100%);
        border-color: var(--td-color-coral);
        color: white;
        box-shadow: var(--td-shadow-md), 0 4px 6px rgba(232, 90, 79, 0.15);
      }

      ::slotted([slot="actions"].primary:hover) {
        background: linear-gradient(180deg, var(--td-color-coral-light) 0%, var(--td-color-coral) 100%);
      }

      ::slotted([slot="actions"].secondary) {
        background: rgba(255, 255, 255, 0.15);
        border-color: rgba(255, 255, 255, 0.2);
        color: white;
      }
    `,
  ];

  @property({ type: String }) title = '';
  @property({ type: String }) description = '';
  @property({ type: String }) primaryText = '';
  @property({ type: String }) primaryHref = '';
  @property({ type: String }) primaryIcon = '';
  @property({ type: String }) secondaryText = '';
  @property({ type: String }) secondaryHref = '';
  @property({ type: String }) secondaryIcon = '';

  render() {
    return html`
      <div class="cta-section" part="container">
        ${this.title
          ? html`<h2 class="title" part="title">${this.title}</h2>`
          : nothing}

        ${this.description
          ? html`<p class="description" part="description">${this.description}</p>`
          : nothing}

        <slot></slot>

        <div class="actions" part="actions">
          ${this.primaryText && this.primaryHref
            ? html`
                <a class="btn btn-primary" href=${this.primaryHref} part="primary-button">
                  ${this.primaryIcon ? html`<span .innerHTML=${this.primaryIcon}></span>` : nothing}
                  ${this.primaryText}
                </a>
              `
            : nothing}

          ${this.secondaryText && this.secondaryHref
            ? html`
                <a class="btn btn-secondary" href=${this.secondaryHref} part="secondary-button">
                  ${this.secondaryIcon ? html`<span .innerHTML=${this.secondaryIcon}></span>` : nothing}
                  ${this.secondaryText}
                </a>
              `
            : nothing}

          <slot name="actions"></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'td-cta-section': TdCtaSection;
  }
}
