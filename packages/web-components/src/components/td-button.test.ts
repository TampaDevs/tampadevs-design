import { describe, it, expect, beforeEach } from 'vitest';
import './td-button.js';

describe('td-button', () => {
  let element: HTMLElement;

  beforeEach(async () => {
    element = document.createElement('td-button');
    document.body.appendChild(element);
    await element.updateComplete;
  });

  afterEach(() => {
    element.remove();
  });

  it('should render with default props', () => {
    expect(element).toBeDefined();
    expect(element.shadowRoot).toBeDefined();
  });

  it('should render slotted content', async () => {
    element.textContent = 'Click me';
    await element.updateComplete;

    const slot = element.shadowRoot?.querySelector('slot');
    expect(slot).toBeDefined();
  });

  it('should apply variant attribute', async () => {
    element.setAttribute('variant', 'secondary');
    await element.updateComplete;

    const button = element.shadowRoot?.querySelector('button');
    expect(button?.classList.contains('variant-secondary')).toBe(true);
  });

  it('should apply size attribute', async () => {
    element.setAttribute('size', 'lg');
    await element.updateComplete;

    const button = element.shadowRoot?.querySelector('button');
    expect(button?.classList.contains('size-lg')).toBe(true);
  });

  it('should handle disabled state', async () => {
    element.setAttribute('disabled', '');
    await element.updateComplete;

    const button = element.shadowRoot?.querySelector('button');
    expect(button?.hasAttribute('disabled')).toBe(true);
  });
});
