# Tampa Devs Design System

A design system for Tampa Devs web properties, featuring React components, design tokens, and a Tailwind CSS preset.

## Packages

| Package | Description |
|---------|-------------|
| `@tampadevs/tokens` | Design tokens (colors, typography, spacing) in CSS, SCSS, and JSON formats |
| `@tampadevs/react` | SSR-compatible React components |
| `@tampadevs/tailwind-preset` | Tailwind CSS v4 preset with Tampa Devs theme |

## Installation

```bash
# Install all packages
pnpm add @tampadevs/tokens @tampadevs/react @tampadevs/tailwind-preset

# Or install individually
pnpm add @tampadevs/tokens
pnpm add @tampadevs/react
pnpm add @tampadevs/tailwind-preset
```

## Usage

### Design Tokens

**CSS:**
```css
@import "@tampadevs/tokens/css";

.my-element {
  background: var(--td-color-navy);
  color: var(--td-color-coral);
}
```

**SCSS:**
```scss
@import "@tampadevs/tokens/scss";

.my-element {
  background: $td-color-navy;
  color: $td-color-coral;
}
```

### React Components

```tsx
import { Button, EventCard, NewsletterSignup } from '@tampadevs/react';

function App() {
  return (
    <div>
      <Button variant="primary">Click me</Button>

      <EventCard
        title="Tampa Bay Tech Meetup"
        date="2024-02-15T18:30:00"
        time="6:30 PM"
        location="The Hub"
        groupName="Tampa Devs"
        rsvpCount={42}
      />

      <NewsletterSignup
        title="Stay Connected"
        endpoint="https://api.tampa.dev/subscribe"
      />
    </div>
  );
}
```

### Tailwind CSS v4 Preset

```css
/* app.css */
@import "tailwindcss" source(".");
@import "@tampadevs/tailwind-preset/theme.css";
```

Then use the custom colors:
```html
<div class="bg-navy text-white">
  <button class="bg-coral hover:bg-coral-light">
    Get Started
  </button>
</div>
```

## Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `navy` | `#1C2438` | Primary backgrounds, text |
| `navy-light` | `#2B3447` | Hover states |
| `navy-dark` | `#1A2031` | Active states |
| `coral` | `#E85A4F` | CTAs, accents |
| `coral-light` | `#F07167` | Hover states |
| `coral-dark` | `#C44D44` | Active states |
| `sand` | `#B6A991` | Warm accents |
| `bronze` | `#8F7665` | Secondary warm |

## Components

### `<Button>`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'ghost' \| 'danger'` | `'primary'` | Visual style |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Button size |
| `disabled` | `boolean` | `false` | Disabled state |
| `loading` | `boolean` | `false` | Loading state |
| `href` | `string` | `''` | Renders as anchor if provided |

### `<EventCard>`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'compact' \| 'featured'` | `'default'` | Card layout |
| `title` | `string` | `''` | Event title |
| `date` | `string` | `''` | ISO date string |
| `time` | `string` | `''` | Formatted time |
| `location` | `string` | `''` | Venue name |
| `groupName` | `string` | `''` | Organizer name |
| `eventUrl` | `string` | `''` | Link to event |
| `imageUrl` | `string` | `''` | Event photo |
| `rsvpCount` | `number` | `0` | Attendee count |
| `isOnline` | `boolean` | `false` | Online event flag |

### `<NewsletterSignup>`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `'Keep in touch'` | Section title |
| `description` | `string` | `'...'` | Section description |
| `endpoint` | `string` | `'https://...'` | Form submission URL |

## Development

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run in watch mode
pnpm dev
```

## Storybook

Preview and interact with components in Storybook:

```bash
# Start Storybook dev server (http://localhost:6007)
pnpm storybook

# Build static Storybook site
pnpm build:storybook
```

Storybook includes interactive documentation for all components with:
- Live component previews
- Prop controls to test different configurations
- Usage examples and code snippets
- Dark/light background switching

## License

MIT
