import type { Meta, StoryObj } from '@storybook/react-vite';
import { PromoSection } from '@tampadevs/react';

const meta: Meta<typeof PromoSection> = {
  title: 'Components/PromoSection',
  component: PromoSection,
  tags: ['autodocs'],
  argTypes: {
    backgroundImage: { control: 'text' },
    tag: { control: 'text' },
    title: { control: 'text' },
    description: { control: 'text' },
    ctaText: { control: 'text' },
    ctaHref: { control: 'text' },
    flipped: { control: 'boolean' },
    variant: {
      control: 'select',
      options: ['gradient', 'glass', 'solid'],
    },
  },
  args: {
    backgroundImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=600&fit=crop',
    tag: 'Featured',
    title: 'Join Tampa Devs',
    description: 'Connect with thousands of software developers in Tampa Bay. Free workshops, networking events, and career opportunities.',
    ctaText: 'Learn More',
    ctaHref: '#',
    flipped: false,
    variant: 'gradient',
  },
};

export default meta;
type Story = StoryObj<typeof PromoSection>;

export const Gradient: Story = {
  args: {
    variant: 'gradient',
  },
};

export const Glass: Story = {
  args: {
    variant: 'glass',
    backgroundImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=600&fit=crop',
  },
};

export const Solid: Story = {
  args: {
    variant: 'solid',
    backgroundImage: '',
  },
};

export const Flipped: Story = {
  args: {
    flipped: true,
  },
};

export const WithLogo: Story = {
  args: {
    backgroundImage: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=1200&h=600&fit=crop',
    tag: 'Partner',
    title: 'Tampa Bay React',
    description: 'Monthly meetups, workshops, and networking for React developers.',
    ctaText: 'Join Group',
    ctaHref: '#',
    variant: 'gradient',
    logoSrc: 'https://tampadevs.com/_assets/misc/logos/tampa-devs.svg',
  },
};
