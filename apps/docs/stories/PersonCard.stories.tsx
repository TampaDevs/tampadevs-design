import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { PersonCard } from '@tampadevs/react';

const sampleSocials = [
  { platform: 'github' as const, url: 'https://github.com/johndoe' },
  { platform: 'linkedin' as const, url: 'https://linkedin.com/in/johndoe' },
  { platform: 'twitter' as const, url: 'https://twitter.com/johndoe' },
  { platform: 'website' as const, url: 'https://johndoe.dev' },
];

const meta: Meta<typeof PersonCard> = {
  title: 'Components/PersonCard',
  component: PersonCard,
  tags: ['autodocs'],
  argTypes: {
    name: { control: 'text' },
    role: { control: 'text' },
    organization: { control: 'text' },
    bio: { control: 'text' },
    photo: { control: 'text' },
    variant: {
      control: 'select',
      options: ['default', 'compact', 'featured', 'author'],
    },
    href: { control: 'text' },
  },
  args: {
    name: 'Vincent Doria Jr.',
    role: 'Founder & President',
    organization: 'Tampa Devs',
    bio: "Building Tampa Bay's largest developer community. Passionate about connecting technologists and growing the local tech ecosystem.",
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
    variant: 'default',
    href: '',
    socials: sampleSocials,
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
type Story = StoryObj<typeof PersonCard>;

export const Default: Story = {
  render: (args) => (
    <div style={{ maxWidth: 320 }}>
      <PersonCard {...args} />
    </div>
  ),
};

export const Compact: Story = {
  args: {
    variant: 'compact',
  },
  render: (args) => (
    <div style={{ maxWidth: 400 }}>
      <PersonCard {...args} />
    </div>
  ),
};

export const Featured: Story = {
  args: {
    variant: 'featured',
  },
  render: (args) => (
    <div style={{ maxWidth: 500 }}>
      <PersonCard {...args} />
    </div>
  ),
};

export const Author: Story = {
  args: {
    variant: 'author',
    role: 'Author',
    bio: 'Writing about web development, community building, and the Tampa tech scene.',
    socials: [
      { platform: 'twitter' as const, url: 'https://twitter.com/johndoe' },
      { platform: 'website' as const, url: 'https://johndoe.dev' },
    ],
  },
  render: (args) => (
    <div style={{ maxWidth: 400 }}>
      <PersonCard {...args} />
    </div>
  ),
};

export const WithoutPhoto: Story = {
  render: () => (
    <div style={{ maxWidth: 320 }}>
      <PersonCard
        name="Jane Smith"
        role="Lead Developer"
        organization="Tech Corp"
        bio="Senior engineer focused on distributed systems and cloud architecture."
        variant="default"
        socials={[
          { platform: 'github', url: 'https://github.com/janesmith' },
          { platform: 'linkedin', url: 'https://linkedin.com/in/janesmith' },
        ]}
      />
    </div>
  ),
};

export const AsLink: Story = {
  args: {
    href: '/team/vincent-doria',
  },
  render: (args) => (
    <div style={{ maxWidth: 320 }}>
      <PersonCard {...args} />
    </div>
  ),
};

export const LeadershipGrid: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
      <PersonCard
        name="Vincent Doria Jr."
        role="Founder & President"
        photo="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face"
        bio="Building Tampa Bay's largest developer community."
        socials={[
          { platform: 'github', url: '#' },
          { platform: 'linkedin', url: '#' },
          { platform: 'twitter', url: '#' },
        ]}
      />
      <PersonCard
        name="Sarah Chen"
        role="VP of Engineering"
        photo="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&crop=face"
        bio="Leading technical initiatives and mentorship programs."
        socials={[
          { platform: 'github', url: '#' },
          { platform: 'linkedin', url: '#' },
        ]}
      />
      <PersonCard
        name="Marcus Johnson"
        role="Community Director"
        photo="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face"
        bio="Organizing events and fostering community connections."
        socials={[
          { platform: 'linkedin', url: '#' },
          { platform: 'twitter', url: '#' },
        ]}
      />
      <PersonCard
        name="Emily Rodriguez"
        role="Events Coordinator"
        photo="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face"
        bio="Curating memorable tech events across Tampa Bay."
        socials={[
          { platform: 'linkedin', url: '#' },
        ]}
      />
    </div>
  ),
};

export const AuthorByline: Story = {
  render: () => (
    <div style={{ maxWidth: 600 }}>
      <article style={{ background: 'rgba(28, 36, 56, 0.6)', borderRadius: 12, padding: '2rem' }}>
        <h1 style={{ color: 'white', margin: '0 0 1rem' }}>Building Scalable Web Applications with Tampa Devs</h1>
        <p style={{ color: 'rgba(209, 213, 219, 0.8)', marginBottom: '1.5rem' }}>
          A deep dive into the architecture patterns we use to build robust,
          maintainable web applications for the Tampa tech community...
        </p>
        <PersonCard
          name="Vincent Doria Jr."
          role="Posted on January 15, 2024"
          photo="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face"
          variant="author"
          socials={[
            { platform: 'twitter', url: '#' },
          ]}
        />
      </article>
    </div>
  ),
};
