import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar } from '@tampadevs/react';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    src: { control: 'text' },
    alt: { control: 'text' },
    name: { control: 'text' },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
    },
    shape: {
      control: 'select',
      options: ['circle', 'square'],
    },
    ring: { control: 'boolean' },
    status: {
      control: 'select',
      options: ['online', 'offline', 'busy', 'away'],
    },
  },
  args: {
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    alt: 'Profile photo',
    name: 'John Doe',
    size: 'md',
    shape: 'circle',
    ring: false,
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
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
      <div style={{ textAlign: 'center' }}>
        <Avatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" name="John Doe" size="xs" />
        <div style={{ fontSize: '0.625rem', marginTop: '0.5rem', color: '#9CA3AF' }}>xs (24px)</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Avatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" name="John Doe" size="sm" />
        <div style={{ fontSize: '0.625rem', marginTop: '0.5rem', color: '#9CA3AF' }}>sm (32px)</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Avatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" name="John Doe" size="md" />
        <div style={{ fontSize: '0.625rem', marginTop: '0.5rem', color: '#9CA3AF' }}>md (48px)</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Avatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" name="John Doe" size="lg" />
        <div style={{ fontSize: '0.625rem', marginTop: '0.5rem', color: '#9CA3AF' }}>lg (64px)</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Avatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" name="John Doe" size="xl" />
        <div style={{ fontSize: '0.625rem', marginTop: '0.5rem', color: '#9CA3AF' }}>xl (96px)</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Avatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" name="John Doe" size="2xl" />
        <div style={{ fontSize: '0.625rem', marginTop: '0.5rem', color: '#9CA3AF' }}>2xl (128px)</div>
      </div>
    </div>
  ),
};

export const Fallback: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
      <Avatar name="John Doe" size="lg" />
      <Avatar name="Jane Smith" size="lg" />
      <Avatar name="Bob" size="lg" />
      <Avatar name="Alice Brown Johnson" size="lg" />
      <Avatar size="lg" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'When no image is provided or the image fails to load, the avatar shows initials from the name.',
      },
    },
  },
};

export const Shapes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
      <div style={{ textAlign: 'center' }}>
        <Avatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" name="John Doe" size="xl" shape="circle" />
        <div style={{ fontSize: '0.75rem', marginTop: '0.5rem', color: '#9CA3AF' }}>Circle</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Avatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" name="John Doe" size="xl" shape="square" />
        <div style={{ fontSize: '0.75rem', marginTop: '0.5rem', color: '#9CA3AF' }}>Square</div>
      </div>
    </div>
  ),
};

export const WithRing: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
      <Avatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" name="John Doe" size="xl" />
      <Avatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" name="John Doe" size="xl" ring />
    </div>
  ),
};

export const StatusIndicators: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
      <div style={{ textAlign: 'center' }}>
        <Avatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" name="John Doe" size="lg" status="online" />
        <div style={{ fontSize: '0.75rem', marginTop: '0.5rem', color: '#9CA3AF' }}>Online</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Avatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" name="John Doe" size="lg" status="away" />
        <div style={{ fontSize: '0.75rem', marginTop: '0.5rem', color: '#9CA3AF' }}>Away</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Avatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" name="John Doe" size="lg" status="busy" />
        <div style={{ fontSize: '0.75rem', marginTop: '0.5rem', color: '#9CA3AF' }}>Busy</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Avatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" name="John Doe" size="lg" status="offline" />
        <div style={{ fontSize: '0.75rem', marginTop: '0.5rem', color: '#9CA3AF' }}>Offline</div>
      </div>
    </div>
  ),
};

export const AvatarGroup: Story = {
  render: () => (
    <div style={{ display: 'flex' }}>
      <Avatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" name="John Doe" size="md" className="avatar-stack-1" />
      <Avatar src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face" name="Jane Smith" size="md" className="avatar-stack-2" />
      <Avatar src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" name="Bob Wilson" size="md" className="avatar-stack-3" />
      <Avatar name="+5" size="md" className="avatar-stack-4" />
      <style>{`
        .avatar-stack-1 { margin-right: -0.75rem; position: relative; z-index: 4; }
        .avatar-stack-2 { margin-right: -0.75rem; position: relative; z-index: 3; }
        .avatar-stack-3 { margin-right: -0.75rem; position: relative; z-index: 2; }
        .avatar-stack-4 { position: relative; z-index: 1; }
      `}</style>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Avatars can be stacked to create an avatar group, showing multiple people.',
      },
    },
  },
};
