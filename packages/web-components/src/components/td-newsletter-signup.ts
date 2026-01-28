import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { tokens, reset } from '../styles/shared.js';

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

/**
 * Tampa Devs Newsletter Signup Component
 *
 * @element td-newsletter-signup
 *
 * @prop {string} title - Section title
 * @prop {string} description - Section description
 * @prop {string} endpoint - Form submission endpoint URL
 *
 * @fires submit - Fired when form is submitted
 * @fires success - Fired on successful subscription
 * @fires error - Fired on subscription error
 */
@customElement('td-newsletter-signup')
export class TdNewsletterSignup extends LitElement {
  static styles = [
    tokens,
    reset,
    css`
      :host {
        display: block;
      }

      .container {
        background: var(--td-color-coral);
        scroll-margin-top: 5rem;
      }

      .content {
        max-width: 56rem;
        margin: 0 auto;
        padding: 4rem 1rem;
      }

      @media (min-width: 640px) {
        .content {
          padding: 4rem 1.5rem;
        }
      }

      @media (min-width: 1024px) {
        .content {
          padding: 4rem 2rem;
        }
      }

      .title {
        font-size: 1.5rem;
        font-weight: 700;
        color: white;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        margin: 0;
      }

      @media (min-width: 768px) {
        .title {
          font-size: 1.875rem;
        }
      }

      .title-icon {
        width: 1.75rem;
        height: 1.75rem;
      }

      .description {
        margin-top: 0.75rem;
        color: rgba(255, 255, 255, 0.9);
        font-size: 1.125rem;
        line-height: 1.5;
      }

      .form {
        margin-top: 2rem;
      }

      .form-row {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
      }

      @media (min-width: 768px) {
        .form-row {
          flex-direction: row;
        }
      }

      .input {
        flex: 1;
        padding: 0.75rem 1rem;
        border-radius: var(--td-radius-lg);
        backdrop-filter: blur(4px);
        background: rgba(255, 255, 255, 0.15);
        border: 1px solid rgba(255, 255, 255, 0.25);
        color: white;
        font-size: 1rem;
        transition: all var(--td-transition-fast);
        box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05);
      }

      .input::placeholder {
        color: rgba(255, 255, 255, 0.5);
      }

      .input:focus {
        outline: none;
        border-color: rgba(255, 255, 255, 0.6);
        background: rgba(255, 255, 255, 0.2);
      }

      .submit-button {
        padding: 0.75rem 2rem;
        border-radius: var(--td-radius-lg);
        font-weight: 600;
        transition: all var(--td-transition-fast);
        white-space: nowrap;
        cursor: pointer;
        border: none;
        font-size: 1rem;
      }

      .submit-button.idle {
        background: white;
        color: #374151;
        box-shadow: var(--td-shadow-lg), 0 4px 6px rgba(0, 0, 0, 0.1);
      }

      .submit-button.idle:hover {
        background: #F9FAFB;
        transform: translateY(-2px);
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
      }

      .submit-button.submitting {
        background: #E5E7EB;
        color: #6B7280;
        cursor: wait;
        box-shadow: var(--td-shadow-md);
      }

      .submit-button.success {
        background: #DCFCE7;
        color: #166534;
        box-shadow: var(--td-shadow-lg), 0 4px 6px rgba(34, 197, 94, 0.2);
      }

      .submit-button.error {
        background: #374151;
        color: white;
        box-shadow: var(--td-shadow-lg);
      }

      .honeypot {
        display: none;
      }

      .footer-text {
        margin-top: 2rem;
        font-size: 0.875rem;
        color: rgba(255, 255, 255, 0.7);
      }

      .footer-text a {
        text-decoration: underline;
        color: white;
      }

      .footer-text a:hover {
        color: rgba(255, 255, 255, 0.9);
      }
    `,
  ];

  @property({ type: String }) title = 'Keep in touch';
  @property({ type: String }) description = 'Stay informed with local tech news, upcoming events, job opportunities, and more from Tampa Devs.';
  @property({ type: String }) endpoint = 'https://newsletter.api.tampa.dev/subscribe';

  @state() private _status: SubmitStatus = 'idle';

  private async _handleSubmit(e: Event) {
    e.preventDefault();
    this._status = 'submitting';

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    this.dispatchEvent(new CustomEvent('submit', { detail: { formData } }));

    try {
      const response = await fetch(this.endpoint, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        this._status = 'success';
        form.reset();
        this.dispatchEvent(new CustomEvent('success'));
        setTimeout(() => {
          this._status = 'idle';
        }, 2000);
      } else {
        throw new Error('Subscription failed');
      }
    } catch {
      this._status = 'error';
      this.dispatchEvent(new CustomEvent('error'));
      setTimeout(() => {
        this._status = 'idle';
      }, 2000);
    }
  }

  private _getButtonText(): string {
    const texts: Record<SubmitStatus, string> = {
      idle: 'Subscribe',
      submitting: 'Subscribing...',
      success: 'Subscribed',
      error: 'Something Broke',
    };
    return texts[this._status];
  }

  render() {
    return html`
      <section class="container" id="newsletter">
        <div class="content">
          <div>
            <h2 class="title">
              <svg
                class="title-icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              ${this.title}
            </h2>
            <p class="description">${this.description}</p>
          </div>

          <form
            class="form"
            @submit=${this._handleSubmit}
            id="newsletter-form"
            name="newsletter-form"
          >
            <div class="form-row">
              <input
                type="text"
                name="firstname"
                placeholder="First name"
                autocomplete="off"
                class="input"
              />
              <input
                type="text"
                name="lastname"
                placeholder="Last name"
                autocomplete="off"
                class="input"
              />
              <input
                type="email"
                name="email"
                placeholder="Email address"
                required
                autocomplete="off"
                class="input"
              />
              <button
                type="submit"
                ?disabled=${this._status === 'submitting'}
                class="submit-button ${this._status}"
              >
                ${this._getButtonText()}
              </button>
            </div>

            <!-- Honeypot fields to trick spam bots -->
            <div class="honeypot" aria-hidden="true">
              <input
                name="phone"
                id="newsletter-phone"
                value="(813) 555-0199"
                placeholder="Phone"
                autocomplete="off"
              />
              <input
                type="email"
                value=""
                name="verify_email"
                id="newsletter-verify-email"
                placeholder="Verify Email Address"
                autocomplete="off"
              />
            </div>
          </form>

          <p class="footer-text">
            Visit
            <a href="https://www.tampadevs.com/">our website</a>
            to learn more about Tampa Devs' charitable mission.
          </p>
        </div>
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'td-newsletter-signup': TdNewsletterSignup;
  }
}
