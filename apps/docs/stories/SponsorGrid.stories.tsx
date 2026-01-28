import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { SponsorGrid, Button } from '@tampadevs/react';

const sampleSponsors = [
  { name: 'Brooksource', logo: '/images/tampa-devs.svg', href: 'https://brooksource.com', tier: 'gold' as const },
  { name: 'xByte Technologies', logo: '/images/tampa-devs.svg', href: 'https://xbyte.com', tier: 'gold' as const },
  { name: 'Ace Host', logo: '/images/tampa-devs.svg', href: 'https://acehost.com', tier: 'silver' as const },
  { name: 'Packfiles', logo: '/images/tampa-devs.svg', href: 'https://packfiles.io', tier: 'silver' as const },
  { name: 'Fair Economy', logo: '/images/tampa-devs.svg', href: 'https://faireconomy.com', tier: 'silver' as const },
  { name: 'Donut', logo: '/images/tampa-devs.svg', href: 'https://donut.com', tier: 'bronze' as const },
  { name: 'redirect.pizza', logo: '/images/tampa-devs.svg', href: 'https://redirect.pizza', tier: 'bronze' as const },
];

const meta: Meta<typeof SponsorGrid> = {
  title: 'Components/SponsorGrid',
  component: SponsorGrid,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    showTierHeadings: { control: 'boolean' },
    monochrome: { control: 'boolean' },
    tier: {
      control: 'select',
      options: ['', 'platinum', 'gold', 'silver', 'bronze', 'community'],
    },
  },
  args: {
    title: 'Our Sponsors',
    description: 'Thank you to our amazing sponsors who make our community possible.',
    showTierHeadings: false,
    monochrome: false,
    sponsors: sampleSponsors,
  },
};

export default meta;
type Story = StoryObj<typeof SponsorGrid>;

export const Default: Story = {};

export const WithTierHeadings: Story = {
  args: {
    showTierHeadings: true,
  },
};

export const GoldOnly: Story = {
  args: {
    title: 'Gold Sponsors',
    tier: 'gold',
  },
};

export const SilverOnly: Story = {
  args: {
    title: 'Silver Sponsors',
    tier: 'silver',
  },
};

export const WithCTA: Story = {
  args: {
    title: 'Become a Sponsor',
    description: 'Support Tampa Devs and reach thousands of local developers.',
    sponsors: sampleSponsors.slice(0, 4),
  },
  render: (args) => (
    <SponsorGrid {...args}>
      <Button variant="primary" href="#">Sponsor Us</Button>
      <Button variant="secondary" href="#">Donate</Button>
    </SponsorGrid>
  ),
};

export const Monochrome: Story = {
  args: {
    title: 'Our Partners',
    description: 'Logos displayed in monochrome white for visual consistency.',
    monochrome: true,
  },
};
