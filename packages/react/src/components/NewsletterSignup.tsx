'use client';

import { useState, FormEvent } from 'react';
import { clsx } from 'clsx';
import { Button } from './Button';

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

export interface NewsletterSignupProps {
  title?: string;
  description?: string;
  endpoint?: string;
  onSubmit?: (formData: FormData) => void;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  className?: string;
}

export function NewsletterSignup({
  title = 'Keep in touch',
  description = 'Stay informed with local tech news, upcoming events, job opportunities, and more from Tampa Devs.',
  endpoint = 'https://newsletter.api.tampa.dev/subscribe',
  onSubmit,
  onSuccess,
  onError,
  className,
}: NewsletterSignupProps) {
  const [status, setStatus] = useState<SubmitStatus>('idle');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');

    const form = e.currentTarget;
    const formData = new FormData(form);

    onSubmit?.(formData);

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setStatus('success');
        form.reset();
        onSuccess?.();
        setTimeout(() => setStatus('idle'), 2000);
      } else {
        throw new Error('Subscription failed');
      }
    } catch (err) {
      setStatus('error');
      onError?.(err instanceof Error ? err : new Error('Unknown error'));
      setTimeout(() => setStatus('idle'), 2000);
    }
  };

  const buttonText: Record<SubmitStatus, string> = {
    idle: 'Subscribe',
    submitting: 'Subscribing...',
    success: 'Subscribed',
    error: 'Something Broke',
  };

  return (
    <section className={clsx('td-newsletter', className)} id="newsletter">
      <div className="td-newsletter__content">
        <div>
          <h2 className="td-newsletter__title">
            <svg
              className="td-newsletter__icon"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            {title}
          </h2>
          <p className="td-newsletter__description">{description}</p>
        </div>

        <form className="td-newsletter__form" onSubmit={handleSubmit}>
          <div className="td-newsletter__form-row">
            <input
              type="text"
              name="firstname"
              placeholder="First name"
              autoComplete="off"
              className="td-newsletter__input"
            />
            <input
              type="text"
              name="lastname"
              placeholder="Last name"
              autoComplete="off"
              className="td-newsletter__input"
            />
            <input
              type="email"
              name="email"
              placeholder="Email address"
              required
              autoComplete="off"
              className="td-newsletter__input"
            />
            <Button
              type="submit"
              loading={status === 'submitting'}
              className={clsx('td-newsletter__submit', `td-newsletter__submit--${status}`)}
            >
              {buttonText[status]}
            </Button>
          </div>

          {/* Honeypot fields */}
          <div aria-hidden="true" style={{ display: 'none' }}>
            <input
              name="phone"
              defaultValue="(813) 555-0199"
              placeholder="Phone"
              autoComplete="off"
            />
            <input
              type="email"
              defaultValue=""
              name="verify_email"
              placeholder="Verify Email Address"
              autoComplete="off"
            />
          </div>
        </form>

        <p className="td-newsletter__footer">
          Visit{' '}
          <a href="https://www.tampadevs.com/">our website</a>{' '}
          to learn more about Tampa Devs&apos; charitable mission.
        </p>
      </div>

      <style>{`
        .td-newsletter {
          background: #E85A4F;
          scroll-margin-top: 5rem;
        }

        .td-newsletter__content {
          max-width: 56rem;
          margin: 0 auto;
          padding: 4rem 1rem;
        }

        @media (min-width: 640px) {
          .td-newsletter__content {
            padding: 4rem 1.5rem;
          }
        }

        @media (min-width: 1024px) {
          .td-newsletter__content {
            padding: 4rem 2rem;
          }
        }

        .td-newsletter__title {
          font-size: 1.5rem;
          font-weight: 700;
          color: white;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin: 0;
        }

        @media (min-width: 768px) {
          .td-newsletter__title {
            font-size: 1.875rem;
          }
        }

        .td-newsletter__icon {
          width: 1.75rem;
          height: 1.75rem;
        }

        .td-newsletter__description {
          margin-top: 0.75rem;
          color: rgba(255, 255, 255, 0.9);
          font-size: 1.125rem;
          line-height: 1.5;
        }

        .td-newsletter__form {
          margin-top: 2rem;
        }

        .td-newsletter__form-row {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        @media (min-width: 768px) {
          .td-newsletter__form-row {
            flex-direction: row;
          }
        }

        .td-newsletter__input {
          flex: 1;
          padding: 0.75rem 1rem;
          border-radius: 0.5rem;
          backdrop-filter: blur(4px);
          background: rgba(255, 255, 255, 0.15);
          border: 1px solid rgba(255, 255, 255, 0.25);
          color: white;
          font-size: 1rem;
          transition: all 0.15s ease;
          box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05);
        }

        .td-newsletter__input::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }

        .td-newsletter__input:focus {
          outline: none;
          border-color: rgba(255, 255, 255, 0.6);
          background: rgba(255, 255, 255, 0.2);
        }

        .td-newsletter__submit {
          padding: 0.75rem 2rem;
          border-radius: 0.5rem;
          font-weight: 600;
          transition: all 0.15s ease;
          white-space: nowrap;
          cursor: pointer;
          border: none;
          font-size: 1rem;
        }

        .td-newsletter__submit.td-newsletter__submit--idle {
          background: white !important;
          color: #374151 !important;
          box-shadow: none !important;
          text-transform: none;
        }

        .td-newsletter__submit.td-newsletter__submit--idle:hover {
          background: #1C2438 !important;
          color: white !important;
          transform: translateY(-1px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15) !important;
        }

        .td-newsletter__submit--submitting {
          background: #E5E7EB;
          color: #6B7280;
          cursor: wait;
        }

        .td-newsletter__submit--success {
          background: #DCFCE7;
          color: #166534;
        }

        .td-newsletter__submit--error {
          background: #374151;
          color: white;
        }

        .td-newsletter__footer {
          margin-top: 2rem;
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .td-newsletter__footer a {
          text-decoration: underline;
          color: white;
        }

        .td-newsletter__footer a:hover {
          color: rgba(255, 255, 255, 0.9);
        }
      `}</style>
    </section>
  );
}
