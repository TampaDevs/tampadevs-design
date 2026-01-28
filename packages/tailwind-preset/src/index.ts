/**
 * Tampa Devs Tailwind CSS v4 Preset
 *
 * Usage in your app's CSS:
 *
 * @import "tailwindcss" source(".");
 * @import "@tampadevs/tailwind-preset/theme.css";
 *
 * Or copy the @theme block directly into your app.css
 */

export const colors = {
  // Primary - Navy
  navy: {
    DEFAULT: '#1C2438',
    light: '#2B3447',
    dark: '#1A2031',
  },
  // Accent - Coral
  coral: {
    DEFAULT: '#E85A4F',
    light: '#F07167',
    dark: '#C44D44',
  },
  // Supporting
  sand: '#B6A991',
  bronze: '#8F7665',
  // Legacy aliases
  'td-blue': '#1C2438',
  'td-blue-light': '#2B3447',
  'td-blue-dark': '#1A2031',
};

export const fontFamily = {
  sans: '"Inter", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
};

/**
 * Tailwind v4 @theme configuration as a string
 * Can be imported and used in CSS files
 */
export const themeConfig = `
@theme {
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";

  /* Tampa Devs color palette - inspired by Tampa Bay sunset over water */

  /* Deep ocean navy - sophisticated, trustworthy (text & backgrounds) */
  --color-navy: #1C2438;
  --color-navy-light: #2B3447;
  --color-navy-dark: #1A2031;

  /* Sunset coral/red - energetic accent for buttons & interactive elements */
  --color-coral: #E85A4F;
  --color-coral-light: #F07167;
  --color-coral-dark: #C44D44;

  /* Supporting warm tones (for text/accents that need warmth but not red) */
  --color-sand: #B6A991;
  --color-bronze: #8F7665;

  /* Legacy aliases for compatibility */
  --color-td-blue: #1C2438;
  --color-td-blue-light: #2B3447;
  --color-td-blue-dark: #1A2031;
}
`;
