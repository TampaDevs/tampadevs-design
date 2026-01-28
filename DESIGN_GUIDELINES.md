# Tampa Devs Design System Guidelines

This document defines the visual language and design patterns for all Tampa Devs web properties. All components in this design system follow these guidelines.

## Color Palette

### Primary Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--td-color-navy` | `#1C2438` | Primary backgrounds, text |
| `--td-color-navy-light` | `#2B3447` | Elevated surfaces, cards |
| `--td-color-navy-dark` | `#0f172a` | Deep backgrounds |

### Accent Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--td-color-coral` | `#E85A4F` | Primary actions, brand accent |
| `--td-color-coral-light` | `#F07167` | Hover states |
| `--td-color-coral-dark` | `#C44D44` | Active states, gradients |

### Supporting Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--td-color-sand` | `#B6A991` | Secondary accents |
| `--td-color-bronze` | `#8F7665` | Tertiary accents |

### Semantic Colors

```css
--td-color-success: #10B981;
--td-color-warning: #F59E0B;
--td-color-error: #EF4444;
--td-color-info: #3B82F6;
```

### Text Colors

```css
/* On dark backgrounds */
--td-text-primary: #FFFFFF;
--td-text-secondary: rgba(209, 213, 219, 0.8);  /* ~D1D5DB at 80% */
--td-text-muted: rgba(156, 163, 175, 0.6);      /* ~9CA3AF at 60% */

/* On light backgrounds */
--td-text-dark: #1C2438;
--td-text-dark-secondary: #4B5563;
```

---

## Typography

### Font Family

```css
--td-font-sans: 'Inter', system-ui, -apple-system, sans-serif;
--td-font-mono: 'JetBrains Mono', 'Fira Code', monospace;
```

### Font Sizes

| Token | Size | Line Height | Usage |
|-------|------|-------------|-------|
| `--td-text-xs` | 0.75rem | 1rem | Labels, captions |
| `--td-text-sm` | 0.875rem | 1.25rem | Body small, buttons |
| `--td-text-base` | 1rem | 1.5rem | Body text |
| `--td-text-lg` | 1.125rem | 1.75rem | Lead paragraphs |
| `--td-text-xl` | 1.25rem | 1.75rem | Card titles |
| `--td-text-2xl` | 1.5rem | 2rem | Section headers |
| `--td-text-3xl` | 1.875rem | 2.25rem | Page headers |
| `--td-text-4xl` | 2.25rem | 2.5rem | Hero titles |
| `--td-text-5xl` | 3rem | 1.1 | Display text |

### Font Weights

```css
--td-font-normal: 400;
--td-font-medium: 500;
--td-font-semibold: 600;
--td-font-bold: 700;
```

---

## Glass Morphism

The signature visual style uses frosted glass effects with subtle borders and shadows.

### Glass Dark (Primary)

Use on dark backgrounds for cards, modals, and elevated surfaces.

```css
.glass-dark {
  background: rgba(28, 36, 56, 0.8);           /* Navy at 80% */
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow:
    inset 0 1px 1px 0 rgba(255, 255, 255, 0.05),
    0 8px 24px -4px rgba(0, 0, 0, 0.15);
}
```

### Glass Light

Use for overlays on images or lighter contexts.

```css
.glass-light {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
```

### Glass Subtle

Use for secondary elements like tags, badges.

```css
.glass-subtle {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

---

## Spacing

Use consistent spacing based on a 4px grid.

| Token | Value | Usage |
|-------|-------|-------|
| `--td-space-1` | 0.25rem (4px) | Tight spacing |
| `--td-space-2` | 0.5rem (8px) | Icon gaps |
| `--td-space-3` | 0.75rem (12px) | Button padding |
| `--td-space-4` | 1rem (16px) | Default gap |
| `--td-space-6` | 1.5rem (24px) | Card padding |
| `--td-space-8` | 2rem (32px) | Section spacing |
| `--td-space-12` | 3rem (48px) | Large sections |
| `--td-space-16` | 4rem (64px) | Hero spacing |

---

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--td-radius-sm` | 0.25rem | Small elements |
| `--td-radius-md` | 0.375rem | Buttons, inputs |
| `--td-radius-lg` | 0.5rem | Cards |
| `--td-radius-xl` | 0.75rem | Large cards |
| `--td-radius-2xl` | 1rem | Sections, modals |
| `--td-radius-full` | 9999px | Pills, avatars |

---

## Shadows

| Token | Value | Usage |
|-------|-------|-------|
| `--td-shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Subtle elevation |
| `--td-shadow-md` | `0 4px 6px -1px rgba(0,0,0,0.1)` | Cards |
| `--td-shadow-lg` | `0 10px 15px -3px rgba(0,0,0,0.1)` | Dropdowns |
| `--td-shadow-xl` | `0 20px 25px -5px rgba(0,0,0,0.1)` | Modals |

### Colored Shadows

For primary buttons and accented elements:

```css
box-shadow: 0 4px 6px rgba(232, 90, 79, 0.15);  /* Coral glow */
```

---

## Transitions

```css
--td-transition-fast: 150ms ease;
--td-transition-base: 200ms ease;
--td-transition-slow: 300ms ease;
```

### Hover Effects

Standard hover lift effect:

```css
.hoverable:hover {
  transform: translateY(-2px);
  box-shadow: var(--td-shadow-lg);
}
```

---

## Buttons

### Primary Button

```css
.btn-primary {
  background: linear-gradient(180deg, var(--td-color-coral) 0%, var(--td-color-coral-dark) 100%);
  color: white;
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  border-radius: var(--td-radius-lg);
  box-shadow: var(--td-shadow-md), 0 4px 6px rgba(232, 90, 79, 0.15);
}

.btn-primary:hover {
  background: linear-gradient(180deg, var(--td-color-coral-light) 0%, var(--td-color-coral) 100%);
  transform: translateY(-2px);
}
```

### Secondary Button (Glass)

```css
.btn-secondary {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  font-weight: 600;
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: translateY(-2px);
}
```

---

## Cards

### Standard Card

```css
.card {
  background: rgba(28, 36, 56, 0.8);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: var(--td-radius-xl);
  padding: 1.5rem;
  box-shadow:
    inset 0 1px 1px 0 rgba(255, 255, 255, 0.05),
    0 8px 24px -4px rgba(0, 0, 0, 0.15);
}
```

### Interactive Card

Add hover state for clickable cards:

```css
.card-interactive {
  transition: all var(--td-transition-base);
  cursor: pointer;
}

.card-interactive:hover {
  transform: translateY(-4px);
  box-shadow:
    inset 0 1px 1px 0 rgba(255, 255, 255, 0.08),
    0 16px 32px -8px rgba(0, 0, 0, 0.2);
  border-color: rgba(255, 255, 255, 0.1);
}
```

---

## Images

### Avatar Sizes

| Size | Dimensions | Usage |
|------|------------|-------|
| `xs` | 24px | Inline mentions |
| `sm` | 32px | Comments, lists |
| `md` | 48px | Cards, author bylines |
| `lg` | 64px | Profile headers |
| `xl` | 96px | Leadership cards |
| `2xl` | 128px | Hero profiles |

### Avatar Styles

```css
.avatar {
  border-radius: var(--td-radius-full);
  object-fit: cover;
  border: 2px solid rgba(255, 255, 255, 0.1);
}

.avatar-ring {
  box-shadow: 0 0 0 3px var(--td-color-coral);
}
```

---

## Icons

### Sizes

| Size | Dimensions | Usage |
|------|------------|-------|
| `xs` | 12px | Inline indicators |
| `sm` | 16px | Button icons |
| `md` | 20px | Default |
| `lg` | 24px | Standalone |
| `xl` | 32px | Feature icons |

### Icon Colors

- Default: `currentColor` (inherits text color)
- Accent: `var(--td-color-coral)`
- Muted: `rgba(156, 163, 175, 0.6)`

---

## Responsive Breakpoints

```css
--td-screen-sm: 640px;
--td-screen-md: 768px;
--td-screen-lg: 1024px;
--td-screen-xl: 1280px;
--td-screen-2xl: 1536px;
```

### Mobile-First Approach

Always design mobile-first, then add complexity for larger screens:

```css
/* Mobile default */
.container { padding: 1rem; }

/* Tablet and up */
@media (min-width: 768px) {
  .container { padding: 2rem; }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .container { padding: 3rem; }
}
```

---

## Accessibility

### Focus States

All interactive elements must have visible focus states:

```css
:focus-visible {
  outline: 2px solid var(--td-color-coral);
  outline-offset: 2px;
}
```

### Color Contrast

- Text on dark backgrounds: Minimum 4.5:1 contrast ratio
- Large text (18px+): Minimum 3:1 contrast ratio
- Interactive elements: Clearly distinguishable states

### Motion

Respect user preferences for reduced motion:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Component Patterns

### Section Layout

```html
<section class="section">
  <div class="section-header">
    <h2 class="section-title">Title</h2>
    <p class="section-description">Description text</p>
  </div>
  <div class="section-content">
    <!-- Content -->
  </div>
</section>
```

### Card Grid

```css
.card-grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}
```

### Flex Actions

```css
.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
}
```

---

## Brand Elements

### Logo Usage

- Primary logo: Full Tampa Devs wordmark
- Icon only: For favicons, small spaces
- Always maintain clear space equal to the height of the "T"

### Brand Text Pattern

```html
<span class="brand">
  <span class="brand-text">Tampa</span>
  <span class="brand-accent">.dev</span>
</span>
```

```css
.brand-text { color: white; font-weight: 700; }
.brand-accent { color: var(--td-color-coral); }
```

---

## Do's and Don'ts

### Do

- Use glass morphism for elevated surfaces
- Maintain consistent spacing using the scale
- Use coral sparingly for emphasis and CTAs
- Provide hover/focus states for all interactive elements
- Test on both light and dark backgrounds

### Don't

- Use pure black (#000) - prefer navy tones
- Overuse coral - it should draw attention
- Skip backdrop-filter on glass elements
- Use sharp corners - prefer rounded borders
- Forget mobile responsiveness
