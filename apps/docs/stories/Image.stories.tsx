import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Image } from '@tampadevs/react';

const sampleImages = {
  landscape: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop',
  portrait: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&h=1200&fit=crop',
  square: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&h=800&fit=crop',
  tampa: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop',
};

const meta: Meta<typeof Image> = {
  title: 'Components/Image',
  component: Image,
  tags: ['autodocs'],
  argTypes: {
    src: { control: 'text' },
    alt: { control: 'text' },
    caption: { control: 'text' },
    credit: { control: 'text' },
    aspectRatio: { control: 'text' },
    fit: {
      control: 'select',
      options: ['cover', 'contain', 'fill', 'none'],
    },
    rounded: { control: 'boolean' },
    shadow: { control: 'boolean' },
    zoomable: { control: 'boolean' },
    width: { control: 'text' },
  },
  args: {
    src: sampleImages.landscape,
    alt: 'Sample image',
    caption: '',
    credit: '',
    aspectRatio: '16/9',
    fit: 'cover',
    rounded: false,
    shadow: false,
    zoomable: false,
    width: '100%',
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
type Story = StoryObj<typeof Image>;

export const Default: Story = {
  render: (args) => (
    <div style={{ maxWidth: 800 }}>
      <Image {...args} />
    </div>
  ),
};

export const WithCaption: Story = {
  args: {
    caption: "Tampa skyline at sunset, showcasing the vibrant tech community's home base.",
    credit: 'John Doe',
    rounded: true,
    shadow: true,
    src: sampleImages.tampa,
    alt: 'Tampa skyline',
    aspectRatio: '16/9',
  },
  render: (args) => (
    <div style={{ maxWidth: 800 }}>
      <Image {...args} />
    </div>
  ),
};

export const Zoomable: Story = {
  args: {
    zoomable: true,
    rounded: true,
    shadow: true,
    caption: 'Click to enlarge',
    src: sampleImages.landscape,
    alt: 'Zoomable image',
    aspectRatio: '16/9',
  },
  render: (args) => (
    <div style={{ maxWidth: 600 }}>
      <Image {...args} />
    </div>
  ),
};

export const SquareAspect: Story = {
  args: {
    aspectRatio: '1/1',
    rounded: true,
    shadow: true,
    src: sampleImages.square,
    alt: 'Square profile image',
  },
  render: (args) => (
    <div style={{ maxWidth: 400 }}>
      <Image {...args} />
    </div>
  ),
};

export const PortraitAspect: Story = {
  args: {
    aspectRatio: '3/4',
    width: '400px',
    rounded: true,
    shadow: true,
    src: sampleImages.portrait,
    alt: 'Portrait image',
  },
};

export const ContainFit: Story = {
  args: {
    fit: 'contain',
    aspectRatio: '16/9',
    rounded: true,
    src: sampleImages.portrait,
    alt: 'Contained image',
  },
  render: (args) => (
    <div style={{ maxWidth: 600 }}>
      <Image {...args} />
    </div>
  ),
};

export const NoRatio: Story = {
  render: () => (
    <div style={{ maxWidth: 600 }}>
      <Image
        src={sampleImages.landscape}
        alt="Natural size image"
        rounded
        shadow
      />
    </div>
  ),
};

export const ImageGrid: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', maxWidth: 900 }}>
      <Image src={sampleImages.landscape} alt="Image 1" aspectRatio="1/1" rounded />
      <Image src={sampleImages.portrait} alt="Image 2" aspectRatio="1/1" rounded />
      <Image src={sampleImages.tampa} alt="Image 3" aspectRatio="1/1" rounded />
      <Image src={sampleImages.square} alt="Image 4" aspectRatio="1/1" rounded />
      <Image src={sampleImages.landscape} alt="Image 5" aspectRatio="1/1" rounded />
      <Image src={sampleImages.portrait} alt="Image 6" aspectRatio="1/1" rounded />
    </div>
  ),
};

export const ErrorState: Story = {
  render: () => (
    <div style={{ maxWidth: 600 }}>
      <Image
        src="https://invalid-url-that-will-fail.com/image.jpg"
        alt="This image will fail to load"
        aspectRatio="16/9"
        rounded
      />
    </div>
  ),
};
