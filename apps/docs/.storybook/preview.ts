import type { Preview } from '@storybook/react-vite';
import '@tampadevs/tokens/css';
import './storybook.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      options: {
        dark: { name: 'dark', value: '#0f172a' },
        navy: { name: 'navy', value: '#1C2438' },
        light: { name: 'light', value: '#ffffff' },
      }
    },
  },

  initialGlobals: {
    backgrounds: {
      value: 'dark'
    }
  }
};

export default preview;
