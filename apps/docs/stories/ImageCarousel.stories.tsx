import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ImageCarousel } from '@tampadevs/react';

const eventImages = [
  {
    src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=800&fit=crop',
    alt: 'Tech conference crowd',
    title: 'Tampa Devs Annual Conference 2024',
    caption: 'Over 500 developers gathered for our biggest event yet.',
  },
  {
    src: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=1200&h=800&fit=crop',
    alt: 'Workshop session',
    title: 'React Workshop',
    caption: 'Hands-on learning with industry experts.',
  },
  {
    src: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=1200&h=800&fit=crop',
    alt: 'Networking event',
    title: 'Monthly Networking Mixer',
    caption: 'Building connections in the Tampa Bay tech community.',
  },
  {
    src: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1200&h=800&fit=crop',
    alt: 'Panel discussion',
    title: 'Women in Tech Panel',
    caption: 'Inspiring stories from local tech leaders.',
  },
  {
    src: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&h=800&fit=crop',
    alt: 'Hackathon participants',
    title: 'Summer Hackathon',
    caption: '48 hours of coding, innovation, and fun.',
  },
];

const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop', alt: 'Modern office' },
  { src: 'https://images.unsplash.com/photo-1497215842964-222b430dc094?w=1200&h=800&fit=crop', alt: 'Workspace' },
  { src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=800&fit=crop', alt: 'Team collaboration' },
  { src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&h=800&fit=crop', alt: 'Tech meetup' },
];

const meta: Meta<typeof ImageCarousel> = {
  title: 'Components/ImageCarousel',
  component: ImageCarousel,
  tags: ['autodocs'],
  argTypes: {
    autoplay: { control: 'boolean' },
    interval: { control: { type: 'number', min: 1000, max: 10000, step: 500 } },
    showDots: { control: 'boolean' },
    showArrows: { control: 'boolean' },
    showCaptions: { control: 'boolean' },
    loop: { control: 'boolean' },
    aspectRatio: { control: 'text' },
    minimal: { control: 'boolean' },
  },
  args: {
    autoplay: true,
    interval: 4000,
    showDots: true,
    showArrows: true,
    showCaptions: true,
    loop: true,
    aspectRatio: '16/9',
    minimal: false,
    images: eventImages,
  },
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#0f172a' },
        { name: 'light', value: '#ffffff' },
      ],
    },
    docs: {
      description: {
        component: `
An auto-playing image carousel/gallery with navigation controls.

## Features

- **Auto-play**: Automatically cycles through images
- **Progress Bar**: Visual indicator of slide timing
- **Navigation Dots**: Click to jump to specific slide
- **Arrow Controls**: Previous/next navigation
- **Captions**: Title and description overlay
- **Loop**: Infinite cycling option
- **Pause on Hover**: Autoplay pauses when hovering
- **Minimal Mode**: Hide all controls for clean display

## Usage

\`\`\`tsx
<ImageCarousel
  images={imageArray}
  autoplay
  interval={4000}
  showDots
  showArrows
  showCaptions
/>
\`\`\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ImageCarousel>;

export const Default: Story = {
  render: (args) => (
    <div style={{ maxWidth: '900px' }}>
      <ImageCarousel {...args} />
    </div>
  ),
};

export const NoCaptions: Story = {
  args: {
    showCaptions: false,
    images: galleryImages,
  },
  render: (args) => (
    <div style={{ maxWidth: '900px' }}>
      <ImageCarousel {...args} />
    </div>
  ),
};

export const MinimalMode: Story = {
  args: {
    minimal: true,
  },
  render: (args) => (
    <div style={{ maxWidth: '900px' }}>
      <ImageCarousel {...args} />
    </div>
  ),
};

export const ManualOnly: Story = {
  args: {
    autoplay: false,
  },
  render: (args) => (
    <div style={{ maxWidth: '900px' }}>
      <ImageCarousel {...args} />
    </div>
  ),
};

export const FastAutoplay: Story = {
  args: {
    interval: 2000,
    showCaptions: false,
    images: galleryImages,
  },
  render: (args) => (
    <div style={{ maxWidth: '900px' }}>
      <ImageCarousel {...args} />
    </div>
  ),
};

export const SquareAspect: Story = {
  args: {
    aspectRatio: '1/1',
    showCaptions: false,
    images: galleryImages,
  },
  render: (args) => (
    <div style={{ maxWidth: '600px' }}>
      <ImageCarousel {...args} />
    </div>
  ),
};

export const WideAspect: Story = {
  args: {
    aspectRatio: '21/9',
  },
  render: (args) => (
    <div style={{ maxWidth: '1000px' }}>
      <ImageCarousel {...args} />
    </div>
  ),
};

export const NoLoop: Story = {
  args: {
    loop: false,
    autoplay: false,
  },
  render: (args) => (
    <div style={{ maxWidth: '900px' }}>
      <ImageCarousel {...args} />
    </div>
  ),
};

export const PastEventGallery: Story = {
  render: () => (
    <div style={{ maxWidth: '900px' }}>
      <h2 style={{ color: 'white', marginBottom: '1rem' }}>Past Event Gallery</h2>
      <ImageCarousel
        images={eventImages}
        autoplay
        interval={4000}
        showCaptions
      />
    </div>
  ),
};
