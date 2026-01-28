import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { VideoEmbed } from '@tampadevs/react';

const meta: Meta<typeof VideoEmbed> = {
  title: 'Components/VideoEmbed',
  component: VideoEmbed,
  tags: ['autodocs'],
  argTypes: {
    videoId: { control: 'text' },
    provider: {
      control: 'select',
      options: ['youtube', 'vimeo'],
    },
    title: { control: 'text' },
    aspectRatio: { control: 'text' },
    autoplay: { control: 'boolean' },
    lazyLoad: { control: 'boolean' },
  },
  args: {
    videoId: 'dQw4w9WgXcQ',
    provider: 'youtube',
    title: 'Sample Video',
    aspectRatio: '16/9',
    autoplay: false,
    lazyLoad: true,
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
type Story = StoryObj<typeof VideoEmbed>;

export const YouTube: Story = {
  render: (args) => (
    <div style={{ maxWidth: 800 }}>
      <VideoEmbed {...args} />
    </div>
  ),
};

export const YouTubeNoLazyLoad: Story = {
  args: {
    lazyLoad: false,
    videoId: 'dQw4w9WgXcQ',
    provider: 'youtube',
    title: 'Immediate Load Video',
  },
  render: (args) => (
    <div style={{ maxWidth: 800 }}>
      <VideoEmbed {...args} />
    </div>
  ),
};

export const CustomThumbnail: Story = {
  args: {
    videoId: 'dQw4w9WgXcQ',
    provider: 'youtube',
    title: 'Custom Thumbnail Video',
    thumbnail: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1280&h=720&fit=crop',
  },
  render: (args) => (
    <div style={{ maxWidth: 800 }}>
      <VideoEmbed {...args} />
    </div>
  ),
};

export const SquareAspectRatio: Story = {
  args: {
    aspectRatio: '1/1',
    videoId: 'dQw4w9WgXcQ',
    provider: 'youtube',
    title: 'Square Video',
  },
  render: (args) => (
    <div style={{ maxWidth: 500 }}>
      <VideoEmbed {...args} />
    </div>
  ),
};

export const WideAspectRatio: Story = {
  args: {
    aspectRatio: '21/9',
    videoId: 'dQw4w9WgXcQ',
    provider: 'youtube',
    title: 'Cinematic Video',
  },
  render: (args) => (
    <div style={{ maxWidth: 900 }}>
      <VideoEmbed {...args} />
    </div>
  ),
};

export const MultipleVideos: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
      <VideoEmbed
        videoId="dQw4w9WgXcQ"
        provider="youtube"
        title="Video 1"
      />
      <VideoEmbed
        videoId="jNQXAC9IVRw"
        provider="youtube"
        title="Video 2"
      />
      <VideoEmbed
        videoId="9bZkp7q19f0"
        provider="youtube"
        title="Video 3"
      />
    </div>
  ),
};
