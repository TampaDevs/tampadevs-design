import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Header } from '@tampadevs/react';

const sampleLinks = [
  { label: 'Events', href: '/events' },
  { label: 'Groups', href: '/groups' },
  { label: 'Map', href: '/map' },
  { label: 'Calendar', href: '/calendar' },
];

const sampleActions = [
  { label: 'Jobs', href: 'https://talent.tampa.dev', external: true },
  { label: 'Favorites', href: '/favorites' },
  { label: 'Subscribe', href: '/#newsletter' },
];

const meta: Meta<typeof Header> = {
  title: 'Components/Header',
  component: Header,
  tags: ['autodocs'],
  argTypes: {
    homeHref: { control: 'text' },
    sticky: { control: 'boolean' },
  },
  args: {
    homeHref: '/',
    sticky: true,
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {
  render: (args) => (
    <>
      <Header {...args} links={sampleLinks} actions={sampleActions} />
      <div style={{ padding: '2rem' }}>
        <p>Scroll down to see the sticky header behavior.</p>
        {Array(20).fill(null).map((_, i) => (
          <p key={i} style={{ margin: '1rem 0' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        ))}
      </div>
    </>
  ),
};

export const LinksOnly: Story = {
  render: (args) => (
    <Header {...args} links={sampleLinks} />
  ),
};

export const NonSticky: Story = {
  args: {
    sticky: false,
  },
  render: (args) => (
    <>
      <Header {...args} links={sampleLinks} />
      <div style={{ padding: '2rem' }}>
        <p>This header is not sticky and will scroll with the content.</p>
      </div>
    </>
  ),
};
