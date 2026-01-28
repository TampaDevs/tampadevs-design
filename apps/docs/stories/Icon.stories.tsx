import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Icon } from '@tampadevs/react';

const allIcons = [
  // Navigation & UI
  'arrow-left', 'arrow-right', 'arrow-up', 'arrow-down',
  'chevron-left', 'chevron-right', 'chevron-up', 'chevron-down',
  'x', 'menu', 'more-horizontal', 'more-vertical',
  'external-link', 'link', 'search', 'filter', 'settings', 'home',
  // Actions
  'plus', 'minus', 'check', 'edit', 'trash', 'copy', 'share',
  'download', 'upload', 'refresh', 'save',
  // Communication
  'mail', 'send', 'bell', 'message-circle', 'message-square',
  // Media
  'image', 'video', 'play', 'pause', 'volume', 'volume-off',
  // Status
  'heart', 'heart-filled', 'star', 'star-filled',
  'bookmark', 'bookmark-filled', 'eye', 'eye-off', 'lock', 'unlock',
  // Info
  'info', 'help-circle', 'alert-circle', 'alert-triangle',
  'check-circle', 'x-circle',
  // Events & Calendar
  'calendar', 'clock', 'map-pin', 'users', 'user', 'user-plus',
  // Social
  'github', 'twitter', 'linkedin', 'slack', 'discord', 'meetup',
  'youtube', 'instagram', 'facebook', 'globe', 'rss',
  // Development
  'code', 'terminal', 'git-branch', 'git-commit', 'git-pull-request',
  'package', 'database', 'server', 'cloud', 'cpu',
  // Other
  'building', 'briefcase', 'coffee', 'gift', 'zap',
] as const;

const meta: Meta<typeof Icon> = {
  title: 'Brand/Icon',
  component: Icon,
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'select',
      options: allIcons,
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    label: { control: 'text' },
  },
  args: {
    name: 'star',
    size: 'md',
    label: '',
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
type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  render: (args) => (
    <Icon {...args} style={{ color: 'white' }} />
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', color: 'white' }}>
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <div key={size} style={{ textAlign: 'center' }}>
          <Icon name="star" size={size} />
          <div style={{ fontSize: '0.625rem', marginTop: '0.5rem', color: '#9CA3AF' }}>{size}</div>
        </div>
      ))}
    </div>
  ),
};

export const NavigationIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', color: 'white' }}>
      {['arrow-left', 'arrow-right', 'arrow-up', 'arrow-down', 'chevron-left', 'chevron-right', 'chevron-up', 'chevron-down', 'x', 'menu', 'more-horizontal', 'more-vertical', 'external-link', 'link', 'search', 'filter', 'settings', 'home'].map(
        (icon) => (
          <div key={icon} style={{ textAlign: 'center', width: 60 }}>
            <Icon name={icon as any} size="lg" />
            <div style={{ fontSize: '0.5rem', marginTop: '0.5rem', color: '#9CA3AF', wordBreak: 'break-all' }}>{icon}</div>
          </div>
        )
      )}
    </div>
  ),
};

export const ActionIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', color: 'white' }}>
      {['plus', 'minus', 'check', 'edit', 'trash', 'copy', 'share', 'download', 'upload', 'refresh', 'save'].map(
        (icon) => (
          <div key={icon} style={{ textAlign: 'center', width: 60 }}>
            <Icon name={icon as any} size="lg" />
            <div style={{ fontSize: '0.5rem', marginTop: '0.5rem', color: '#9CA3AF' }}>{icon}</div>
          </div>
        )
      )}
    </div>
  ),
};

export const SocialIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', color: 'white' }}>
      {['github', 'twitter', 'linkedin', 'slack', 'discord', 'meetup', 'youtube', 'instagram', 'facebook', 'globe', 'rss'].map(
        (icon) => (
          <div key={icon} style={{ textAlign: 'center', width: 60 }}>
            <Icon name={icon as any} size="lg" />
            <div style={{ fontSize: '0.5rem', marginTop: '0.5rem', color: '#9CA3AF' }}>{icon}</div>
          </div>
        )
      )}
    </div>
  ),
};

export const DevelopmentIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', color: 'white' }}>
      {['code', 'terminal', 'git-branch', 'git-commit', 'git-pull-request', 'package', 'database', 'server', 'cloud', 'cpu'].map(
        (icon) => (
          <div key={icon} style={{ textAlign: 'center', width: 60 }}>
            <Icon name={icon as any} size="lg" />
            <div style={{ fontSize: '0.5rem', marginTop: '0.5rem', color: '#9CA3AF', wordBreak: 'break-all' }}>{icon}</div>
          </div>
        )
      )}
    </div>
  ),
};

export const AllIcons: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', gap: '1rem', color: 'white' }}>
      {allIcons.map((icon) => (
        <div key={icon} style={{ textAlign: 'center', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: 8 }}>
          <Icon name={icon} size="lg" />
          <div style={{ fontSize: '0.5rem', marginTop: '0.5rem', color: '#9CA3AF', wordBreak: 'break-all' }}>{icon}</div>
        </div>
      ))}
    </div>
  ),
};

export const WithColor: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1.5rem' }}>
      <Icon name="heart-filled" size="xl" style={{ color: '#E85A4F' }} />
      <Icon name="check-circle" size="xl" style={{ color: '#10B981' }} />
      <Icon name="alert-triangle" size="xl" style={{ color: '#F59E0B' }} />
      <Icon name="x-circle" size="xl" style={{ color: '#EF4444' }} />
      <Icon name="info" size="xl" style={{ color: '#3B82F6' }} />
    </div>
  ),
};
