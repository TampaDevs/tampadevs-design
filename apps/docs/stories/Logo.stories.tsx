import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Logo } from '@tampadevs/react';

const meta: Meta<typeof Logo> = {
  title: 'Brand/Logo',
  component: Logo,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['full', 'wordmark', 'icon'],
      description: 'Logo display variant',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Logo size preset',
    },
    monochrome: {
      control: 'boolean',
      description: 'Use single color (white) instead of brand colors',
    },
    href: {
      control: 'text',
      description: 'Optional link URL - wraps logo in anchor tag',
    },
    customText: {
      control: 'text',
      description: 'Custom wordmark text (default: "Tampa Devs")',
    },
    textColor: {
      control: 'color',
      description: 'Custom text color for the wordmark',
    },
  },
  args: {
    variant: 'full',
    size: 'md',
    monochrome: false,
    customText: 'Tampa Devs',
  },
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#1C2438' },
        { name: 'light', value: '#ffffff' },
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Logo>;

export const Full: Story = {
  name: 'Full Logo (Icon + Wordmark)',
  args: {
    variant: 'full',
    size: 'lg',
  },
};

export const Icon: Story = {
  name: 'Icon Only',
  args: {
    variant: 'icon',
    size: 'xl',
  },
};

export const Wordmark: Story = {
  name: 'Wordmark Only',
  args: {
    variant: 'wordmark',
    size: 'xl',
  },
};

export const AllSizes: Story = {
  name: 'Size Scale',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'flex-start' }}>
      {(['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const).map((size) => (
        <div key={size} style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <span style={{ color: '#9CA3AF', width: 50, fontSize: '0.75rem', fontFamily: 'monospace' }}>{size}</span>
          <Logo variant="full" size={size} />
        </div>
      ))}
    </div>
  ),
};

export const IconSizes: Story = {
  name: 'Icon Sizes',
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
      {(['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const).map((size) => (
        <Logo key={size} variant="icon" size={size} />
      ))}
    </div>
  ),
};

export const Monochrome: Story = {
  name: 'Monochrome (White)',
  args: {
    monochrome: true,
  },
  render: () => (
    <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap', alignItems: 'center' }}>
      <Logo variant="full" size="lg" monochrome />
      <Logo variant="icon" size="lg" monochrome />
      <Logo variant="wordmark" size="lg" monochrome />
    </div>
  ),
};

export const CustomTextColor: Story = {
  name: 'Custom Text Color',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <Logo variant="full" size="lg" textColor="#E85A4F" />
      <Logo variant="full" size="lg" textColor="#1aac9c" />
      <Logo variant="full" size="lg" textColor="#FFD700" />
    </div>
  ),
};

export const CustomText: Story = {
  name: 'Custom Wordmark Text',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <Logo variant="full" size="lg" customText="Tampa Devs" />
      <Logo variant="full" size="lg" customText="TampaDevs" />
      <Logo variant="full" size="lg" customText="TD" />
    </div>
  ),
};

export const AsLink: Story = {
  name: 'As Clickable Link',
  args: {
    href: 'https://tampa.dev',
    size: 'lg',
  },
  render: (args) => (
    <>
      <Logo variant="full" size={args.size} href={args.href} />
      <p style={{ color: '#9CA3AF', fontSize: '0.875rem', marginTop: '1rem' }}>
        Click the logo above - it's wrapped in an anchor tag
      </p>
    </>
  ),
};

export const OnLightBackground: Story = {
  name: 'On Light Background',
  render: () => (
    <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap', alignItems: 'center' }}>
      <Logo variant="full" size="lg" textColor="#1C2438" />
      <Logo variant="icon" size="lg" />
      <Logo variant="wordmark" size="lg" textColor="#1C2438" />
    </div>
  ),
  globals: {
    backgrounds: {
      value: 'light',
    },
  },
};
