import { mkdir, writeFile } from 'fs/promises';

// Token definitions inline for build
const colors = {
  navy: { DEFAULT: '#1C2438', light: '#2B3447', dark: '#1A2031' },
  coral: { DEFAULT: '#E85A4F', light: '#F07167', dark: '#C44D44' },
  sand: '#B6A991',
  bronze: '#8F7665',
  background: { DEFAULT: '#FFFFFF', dark: '#030712' },
  surface: { DEFAULT: '#FFFFFF', dark: '#111827' },
  text: { DEFAULT: '#1C2438', muted: '#6B7280', dark: '#F9FAFB', darkMuted: '#9CA3AF' },
  border: { DEFAULT: '#E5E7EB', dark: '#374151' },
  legacy: { orange: '#ee5c53', green: '#1aac9c', blue: '#4e5569' },
};

const typography = {
  fontFamily: { sans: '"Inter", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"' },
  fontSize: { xs: '0.75rem', sm: '0.875rem', base: '1rem', lg: '1.125rem', xl: '1.25rem', '2xl': '1.5rem', '3xl': '1.875rem', '4xl': '2.25rem', '5xl': '3rem', '6xl': '3.75rem' },
  fontWeight: { normal: '400', medium: '500', semibold: '600', bold: '700', extrabold: '800' },
  lineHeight: { none: '1', tight: '1.25', snug: '1.375', normal: '1.5', relaxed: '1.625', loose: '2' },
};

const borderRadius = { none: '0', sm: '0.125rem', DEFAULT: '0.25rem', md: '0.375rem', lg: '0.5rem', xl: '0.75rem', '2xl': '1rem', '3xl': '1.5rem', full: '9999px' };

const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  none: 'none',
};

const spacing = { px: '1px', 0: '0', 1: '0.25rem', 2: '0.5rem', 3: '0.75rem', 4: '1rem', 5: '1.25rem', 6: '1.5rem', 8: '2rem', 10: '2.5rem', 12: '3rem', 16: '4rem', 20: '5rem', 24: '6rem' };

async function buildTokens() {
  await mkdir('./dist', { recursive: true });

  // Generate CSS custom properties
  let css = `/**
 * Tampa Devs Design Tokens
 * Auto-generated - do not edit directly
 */

:root {
  /* Colors - Primary (Navy) */
  --td-color-navy: ${colors.navy.DEFAULT};
  --td-color-navy-light: ${colors.navy.light};
  --td-color-navy-dark: ${colors.navy.dark};

  /* Colors - Accent (Coral) */
  --td-color-coral: ${colors.coral.DEFAULT};
  --td-color-coral-light: ${colors.coral.light};
  --td-color-coral-dark: ${colors.coral.dark};

  /* Colors - Supporting */
  --td-color-sand: ${colors.sand};
  --td-color-bronze: ${colors.bronze};

  /* Colors - Semantic */
  --td-color-background: ${colors.background.DEFAULT};
  --td-color-surface: ${colors.surface.DEFAULT};
  --td-color-text: ${colors.text.DEFAULT};
  --td-color-text-muted: ${colors.text.muted};
  --td-color-border: ${colors.border.DEFAULT};

  /* Colors - Legacy (for backward compatibility) */
  --td-color-legacy-orange: ${colors.legacy.orange};
  --td-color-legacy-green: ${colors.legacy.green};
  --td-color-legacy-blue: ${colors.legacy.blue};

  /* Typography */
  --td-font-sans: ${typography.fontFamily.sans};
  --td-font-size-xs: ${typography.fontSize.xs};
  --td-font-size-sm: ${typography.fontSize.sm};
  --td-font-size-base: ${typography.fontSize.base};
  --td-font-size-lg: ${typography.fontSize.lg};
  --td-font-size-xl: ${typography.fontSize.xl};
  --td-font-size-2xl: ${typography.fontSize['2xl']};
  --td-font-size-3xl: ${typography.fontSize['3xl']};
  --td-font-size-4xl: ${typography.fontSize['4xl']};
  --td-font-size-5xl: ${typography.fontSize['5xl']};
  --td-font-size-6xl: ${typography.fontSize['6xl']};

  /* Font Weights */
  --td-font-weight-normal: ${typography.fontWeight.normal};
  --td-font-weight-medium: ${typography.fontWeight.medium};
  --td-font-weight-semibold: ${typography.fontWeight.semibold};
  --td-font-weight-bold: ${typography.fontWeight.bold};
  --td-font-weight-extrabold: ${typography.fontWeight.extrabold};

  /* Line Heights */
  --td-line-height-none: ${typography.lineHeight.none};
  --td-line-height-tight: ${typography.lineHeight.tight};
  --td-line-height-snug: ${typography.lineHeight.snug};
  --td-line-height-normal: ${typography.lineHeight.normal};
  --td-line-height-relaxed: ${typography.lineHeight.relaxed};
  --td-line-height-loose: ${typography.lineHeight.loose};

  /* Border Radius */
  --td-radius-none: ${borderRadius.none};
  --td-radius-sm: ${borderRadius.sm};
  --td-radius-default: ${borderRadius.DEFAULT};
  --td-radius-md: ${borderRadius.md};
  --td-radius-lg: ${borderRadius.lg};
  --td-radius-xl: ${borderRadius.xl};
  --td-radius-2xl: ${borderRadius['2xl']};
  --td-radius-3xl: ${borderRadius['3xl']};
  --td-radius-full: ${borderRadius.full};

  /* Shadows */
  --td-shadow-sm: ${shadows.sm};
  --td-shadow-default: ${shadows.DEFAULT};
  --td-shadow-md: ${shadows.md};
  --td-shadow-lg: ${shadows.lg};
  --td-shadow-xl: ${shadows.xl};
  --td-shadow-2xl: ${shadows['2xl']};
  --td-shadow-inner: ${shadows.inner};
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  :root {
    --td-color-background: ${colors.background.dark};
    --td-color-surface: ${colors.surface.dark};
    --td-color-text: ${colors.text.dark};
    --td-color-text-muted: ${colors.text.darkMuted};
    --td-color-border: ${colors.border.dark};
  }
}

/* Legacy theme class (for gradual migration) */
[data-theme="legacy"],
.td-theme-legacy {
  --td-color-navy: ${colors.legacy.blue};
  --td-color-coral: ${colors.legacy.orange};
  --td-color-sand: ${colors.legacy.green};
}
`;

  await writeFile('./dist/tokens.css', css);

  // Generate SCSS variables
  let scss = `//
// Tampa Devs Design Tokens
// Auto-generated - do not edit directly
//

// Colors - Primary (Navy)
$td-color-navy: ${colors.navy.DEFAULT};
$td-color-navy-light: ${colors.navy.light};
$td-color-navy-dark: ${colors.navy.dark};

// Colors - Accent (Coral)
$td-color-coral: ${colors.coral.DEFAULT};
$td-color-coral-light: ${colors.coral.light};
$td-color-coral-dark: ${colors.coral.dark};

// Colors - Supporting
$td-color-sand: ${colors.sand};
$td-color-bronze: ${colors.bronze};

// Colors - Semantic
$td-color-background: ${colors.background.DEFAULT};
$td-color-background-dark: ${colors.background.dark};
$td-color-surface: ${colors.surface.DEFAULT};
$td-color-surface-dark: ${colors.surface.dark};
$td-color-text: ${colors.text.DEFAULT};
$td-color-text-muted: ${colors.text.muted};
$td-color-text-dark: ${colors.text.dark};
$td-color-text-dark-muted: ${colors.text.darkMuted};
$td-color-border: ${colors.border.DEFAULT};
$td-color-border-dark: ${colors.border.dark};

// Colors - Legacy (for backward compatibility)
$td-color-legacy-orange: ${colors.legacy.orange};
$td-color-legacy-green: ${colors.legacy.green};
$td-color-legacy-blue: ${colors.legacy.blue};

// Typography
$td-font-sans: ${typography.fontFamily.sans};
$td-font-size-xs: ${typography.fontSize.xs};
$td-font-size-sm: ${typography.fontSize.sm};
$td-font-size-base: ${typography.fontSize.base};
$td-font-size-lg: ${typography.fontSize.lg};
$td-font-size-xl: ${typography.fontSize.xl};
$td-font-size-2xl: ${typography.fontSize['2xl']};
$td-font-size-3xl: ${typography.fontSize['3xl']};
$td-font-size-4xl: ${typography.fontSize['4xl']};
$td-font-size-5xl: ${typography.fontSize['5xl']};
$td-font-size-6xl: ${typography.fontSize['6xl']};

// Font Weights
$td-font-weight-normal: ${typography.fontWeight.normal};
$td-font-weight-medium: ${typography.fontWeight.medium};
$td-font-weight-semibold: ${typography.fontWeight.semibold};
$td-font-weight-bold: ${typography.fontWeight.bold};
$td-font-weight-extrabold: ${typography.fontWeight.extrabold};

// Line Heights
$td-line-height-none: ${typography.lineHeight.none};
$td-line-height-tight: ${typography.lineHeight.tight};
$td-line-height-snug: ${typography.lineHeight.snug};
$td-line-height-normal: ${typography.lineHeight.normal};
$td-line-height-relaxed: ${typography.lineHeight.relaxed};
$td-line-height-loose: ${typography.lineHeight.loose};

// Border Radius
$td-radius-none: ${borderRadius.none};
$td-radius-sm: ${borderRadius.sm};
$td-radius-default: ${borderRadius.DEFAULT};
$td-radius-md: ${borderRadius.md};
$td-radius-lg: ${borderRadius.lg};
$td-radius-xl: ${borderRadius.xl};
$td-radius-2xl: ${borderRadius['2xl']};
$td-radius-3xl: ${borderRadius['3xl']};
$td-radius-full: ${borderRadius.full};

// Color Maps (for programmatic access)
$td-colors: (
  'navy': $td-color-navy,
  'navy-light': $td-color-navy-light,
  'navy-dark': $td-color-navy-dark,
  'coral': $td-color-coral,
  'coral-light': $td-color-coral-light,
  'coral-dark': $td-color-coral-dark,
  'sand': $td-color-sand,
  'bronze': $td-color-bronze,
);

$td-font-sizes: (
  'xs': $td-font-size-xs,
  'sm': $td-font-size-sm,
  'base': $td-font-size-base,
  'lg': $td-font-size-lg,
  'xl': $td-font-size-xl,
  '2xl': $td-font-size-2xl,
  '3xl': $td-font-size-3xl,
  '4xl': $td-font-size-4xl,
  '5xl': $td-font-size-5xl,
  '6xl': $td-font-size-6xl,
);
`;

  await writeFile('./dist/_tokens.scss', scss);

  // Generate JSON
  const json = {
    colors,
    typography,
    spacing,
    borderRadius,
    shadows,
  };

  await writeFile('./dist/tokens.json', JSON.stringify(json, null, 2));

  console.log('✓ Built tokens.css');
  console.log('✓ Built _tokens.scss');
  console.log('✓ Built tokens.json');
}

buildTokens().catch(console.error);
