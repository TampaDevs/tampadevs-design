import type { Meta, StoryObj } from '@storybook/react-vite';
import { CtaSection } from '@tampadevs/react';

const meta: Meta<typeof CtaSection> = {
  title: 'Components/CtaSection',
  component: CtaSection,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    primaryText: { control: 'text' },
    primaryHref: { control: 'text' },
    secondaryText: { control: 'text' },
    secondaryHref: { control: 'text' },
  },
  args: {
    title: 'Never Miss an Event',
    description: 'Subscribe to our calendar and get notified about upcoming Tampa Bay tech events. Join thousands of developers staying connected.',
    primaryText: 'Add to Calendar',
    primaryHref: '/calendar',
    secondaryText: 'Join Slack',
    secondaryHref: 'https://go.tampa.dev/slack',
  },
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#0f172a' },
        { name: 'light', value: '#ffffff' },
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof CtaSection>;

export const Default: Story = {};

export const SingleButton: Story = {
  args: {
    title: 'Ready to Get Started?',
    description: 'Join Tampa Devs today and connect with the local tech community.',
    primaryText: 'Join Now',
    primaryHref: '/join',
    secondaryText: '',
    secondaryHref: '',
  },
};

export const Newsletter: Story = {
  args: {
    title: 'Join Our Newsletter',
    description: 'Weekly updates on tech events, job opportunities, and community news from Tampa Bay.',
    primaryText: 'Subscribe',
    primaryHref: '#newsletter',
    secondaryText: 'View Archive',
    secondaryHref: '/newsletter/archive',
  },
};
