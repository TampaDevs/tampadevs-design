import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Footer } from '@tampadevs/react';

const sampleLinkGroups = [
  {
    title: 'Explore',
    links: [
      { label: 'Upcoming Events', href: '/events' },
      { label: 'Tech Groups', href: '/groups' },
      { label: 'Event Map', href: '/map' },
      { label: 'Calendar', href: '/calendar' },
    ],
  },
  {
    title: 'Extras',
    links: [
      { label: 'API', href: 'https://events.api.tampa.dev', external: true },
      { label: 'Add Your Group', href: 'https://github.com/tampadevs/events.api.tampa.dev/issues/new', external: true },
      { label: 'About Tampa Devs', href: 'https://tampadevs.com', external: true },
      { label: 'Fork This Website', href: 'https://github.com/tampadevs/events.api.tampa.dev', external: true },
    ],
  },
];

const sampleSocials = [
  { platform: 'github' as const, href: 'https://github.com/TampaDevs' },
  { platform: 'slack' as const, href: 'https://go.tampa.dev/slack' },
];

const meta: Meta<typeof Footer> = {
  title: 'Components/Footer',
  component: Footer,
  tags: ['autodocs'],
  argTypes: {
    description: { control: 'text' },
    copyright: { control: 'text' },
  },
  args: {
    description: 'Your hub for discovering tech meetups, developer events, and communities in Tampa Bay. Connect with local technologists and grow your network.',
    copyright: '',
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Footer>;

export const Default: Story = {
  render: (args) => (
    <Footer
      {...args}
      linkGroups={sampleLinkGroups}
      socials={sampleSocials}
    />
  ),
};

export const Simple: Story = {
  args: {
    description: 'A community of software developers in Tampa, Florida.',
  },
  render: (args) => (
    <Footer {...args} socials={sampleSocials} />
  ),
};

export const WithLinks: Story = {
  render: (args) => (
    <Footer {...args} linkGroups={sampleLinkGroups} />
  ),
};

export const CustomCopyright: Story = {
  args: {
    copyright: '2024 Tampa Devs Inc. Built with love in Tampa Bay.',
  },
  render: (args) => (
    <Footer
      {...args}
      linkGroups={sampleLinkGroups}
      socials={sampleSocials}
    />
  ),
};
