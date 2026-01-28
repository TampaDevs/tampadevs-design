# Contributing to Tampa Devs Design System

This guide covers how to contribute to the design system, including development setup, component creation patterns, and testing.

## Quick Start

```bash
# Clone the repo
git clone https://github.com/TampaDevs/tampadevs-design-system.git
cd tampadevs-design-system

# Install dependencies
pnpm install

# Build all packages
pnpm build

# Start Storybook dev server
pnpm storybook
```

## Repository Structure

```
tampadevs-design-system/
├── packages/
│   ├── tokens/           # @tampadevs/tokens - Design tokens (CSS, SCSS, JSON)
│   ├── react/            # @tampadevs/react - React components
│   └── tailwind-preset/  # @tampadevs/tailwind-preset - Tailwind v4 preset
├── apps/
│   └── docs/             # Storybook documentation site
├── .github/workflows/    # CI/CD pipelines
├── DESIGN_GUIDELINES.md  # Visual language reference
└── CLAUDE.md             # AI agent documentation
```

## Package Development

### Design Tokens (`packages/tokens`)

Tokens are defined in `src/tokens/` and built with Style Dictionary.

```bash
cd packages/tokens
pnpm build         # Generate CSS, SCSS, JSON outputs
```

**Adding a new token:**

1. Add the value in `src/tokens/*.ts`
2. Run `pnpm build` to regenerate outputs
3. Update `DESIGN_GUIDELINES.md` if it's a user-facing token

### React Components (`packages/react`)

Components are built with React and are SSR-compatible.

```bash
cd packages/react
pnpm dev           # Watch mode build
pnpm build         # Production build
pnpm test          # Run Vitest tests
pnpm test:watch    # Watch mode tests
```

### Tailwind Preset (`packages/tailwind-preset`)

```bash
cd packages/tailwind-preset
pnpm build         # Build the preset
```

## Creating a New Component

### 1. Create the Component File

Create `packages/react/src/components/<Name>.tsx`:

```tsx
'use client';

import { useState } from 'react';
import clsx from 'clsx';

export interface ExampleProps {
  /** Component title */
  title?: string;
  /** Visual variant */
  variant?: 'default' | 'compact';
  /** Additional CSS class */
  className?: string;
  /** Child content */
  children?: React.ReactNode;
}

export function Example({
  title = '',
  variant = 'default',
  className,
  children,
}: ExampleProps) {
  return (
    <>
      <div className={clsx('td-example', `td-example--${variant}`, className)}>
        {title && <h3 className="td-example__title">{title}</h3>}
        <div className="td-example__content">{children}</div>
      </div>
      <style>{styles}</style>
    </>
  );
}

const styles = `
  .td-example {
    background: rgba(28, 36, 56, 0.8);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 0.75rem;
    padding: 1.5rem;
  }

  .td-example__title {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }
`;
```

### 2. Export the Component

Add to `packages/react/src/index.ts`:

```typescript
export { Example } from './components/Example';
export type { ExampleProps } from './components/Example';
```

### 3. Create a Storybook Story

Create `apps/docs/stories/Example.stories.tsx`:

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Example } from '@tampadevs/react';

const meta: Meta<typeof Example> = {
  title: 'Components/Example',
  component: Example,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    variant: { control: 'select', options: ['default', 'compact'] },
  },
  args: {
    title: 'Example Component',
    variant: 'default',
  },
};

export default meta;
type Story = StoryObj<typeof Example>;

export const Default: Story = {
  args: {
    children: <p>Slot content goes here</p>,
  },
};

export const Compact: Story = {
  args: {
    title: 'Compact Example',
    variant: 'compact',
  },
};
```

### 4. Write Tests

Create `packages/react/src/components/Example.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Example } from './Example';

describe('Example', () => {
  it('renders with default props', () => {
    render(<Example>Test content</Example>);
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('renders title when provided', () => {
    render(<Example title="Test Title">Content</Example>);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('applies variant class', () => {
    const { container } = render(<Example variant="compact">Content</Example>);
    expect(container.querySelector('.td-example--compact')).toBeInTheDocument();
  });
});
```

## Component Guidelines

### Naming Convention

- Use PascalCase for component names: `EventCard`, `NewsletterSignup`
- Use camelCase for props: `groupName`, `rsvpCount`
- CSS classes use BEM-style: `.td-component__element--modifier`

### Styling Rules

1. **Use design tokens** - Reference `DESIGN_GUIDELINES.md` for colors, spacing, typography
2. **Glass morphism** - Primary visual style with `backdrop-filter: blur(12px)`
3. **Responsive** - Mobile-first, use breakpoints from tokens
4. **Accessible** - Visible focus states, proper ARIA attributes, keyboard navigation
5. **SSR compatible** - Use inline `<style>` tags for styles

### Property Conventions

| Pattern | Example | Notes |
|---------|---------|-------|
| Boolean flags | `isOnline`, `isLoading` | Use `is` prefix |
| URLs | `imageUrl`, `eventUrl` | Use `Url` suffix |
| Handlers | `onClick`, `onSubmit` | Use `on` prefix |
| Variants | `variant="compact"` | Union types for modes |

## Testing

### Running Tests

```bash
# Run all tests
pnpm test

# Watch mode
pnpm test:watch

# Run tests for specific package
cd packages/react && pnpm test
```

### Test Structure

Tests use Vitest with React Testing Library. Each component should test:

- Renders without errors
- Props are applied correctly
- Events fire correctly
- Accessibility (focus, keyboard nav)
- Edge cases (empty data, loading states)

## CI/CD

### Pull Requests

The CI workflow runs on every PR:

1. `pnpm install --frozen-lockfile`
2. `pnpm build` - Build all packages
3. `pnpm test` - Run test suites
4. `pnpm build:storybook` - Verify Storybook builds

### Publishing

Packages publish to GitHub Packages on release:

1. Create a GitHub release with tag (e.g., `v1.0.0`)
2. CI builds and publishes all packages with that version
3. Storybook deploys to Cloudflare Pages

### Manual Publish

```bash
# Dry run
gh workflow run publish.yml -f dry_run=true

# Actual publish (uses CalVer: 0.YYYYMMDD.HHMM)
gh workflow run publish.yml
```

## Code Style

- TypeScript strict mode
- React functional components with hooks
- CSS custom properties for theming
- No external CSS frameworks in components

## Getting Help

- Review existing components in `packages/react/src/components/`
- Check `DESIGN_GUIDELINES.md` for visual patterns
- Run Storybook to see live examples
- For AI agents, see `CLAUDE.md` for detailed context
