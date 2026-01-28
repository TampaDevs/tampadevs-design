import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ImageText } from '@tampadevs/react';

const meta: Meta<typeof ImageText> = {
  title: 'Components/ImageText',
  component: ImageText,
  tags: ['autodocs'],
  argTypes: {
    imageSrc: { control: 'text' },
    imageAlt: { control: 'text' },
    title: { control: 'text' },
    description: { control: 'text' },
    ctaText: { control: 'text' },
    ctaHref: { control: 'text' },
    reversed: { control: 'boolean' },
    imagePosition: {
      control: 'select',
      options: ['cover', 'contain', 'auto'],
    },
  },
  args: {
    imageSrc: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=500&fit=crop',
    imageAlt: 'Tech meetup',
    title: 'Join Our Community',
    description: 'Connect with thousands of developers in Tampa Bay. Attend meetups, workshops, and networking events to grow your skills and career.',
    ctaText: 'Get Started',
    ctaHref: '#',
    reversed: false,
    imagePosition: 'cover',
  },
};

export default meta;
type Story = StoryObj<typeof ImageText>;

export const Default: Story = {};

export const Reversed: Story = {
  args: {
    reversed: true,
    imageSrc: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=500&fit=crop',
    title: 'Learn Together',
    description: 'Our workshops cover everything from web development to machine learning. Led by industry experts, these sessions are designed to help you level up.',
  },
};

export const NoCTA: Story = {
  args: {
    ctaText: '',
    ctaHref: '',
    title: 'About Tampa Devs',
    description: 'Tampa Devs is a nonprofit community organization dedicated to fostering the growth of the Tampa Bay tech ecosystem. We believe in making technology education accessible to everyone.',
  },
};

export const ContainImage: Story = {
  args: {
    imagePosition: 'contain',
    imageSrc: 'https://tampadevs.com/_assets/misc/logos/tampa-devs.svg',
    imageAlt: 'Tampa Devs logo',
    title: 'Our Brand',
    description: 'The Tampa Devs logo represents our community of developers working together to build a stronger tech ecosystem in Tampa Bay.',
  },
};

export const AlternatingLayout: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
      <ImageText
        imageSrc="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=500&fit=crop"
        title="Monthly Meetups"
        description="Join us every month for talks, demos, and networking with fellow developers."
        ctaText="View Events"
        ctaHref="#"
      />

      <ImageText
        imageSrc="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=500&fit=crop"
        title="Hands-on Workshops"
        description="Level up your skills with interactive workshops led by industry experts."
        ctaText="Browse Workshops"
        ctaHref="#"
        reversed
      />

      <ImageText
        imageSrc="https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&h=500&fit=crop"
        title="Career Opportunities"
        description="Connect with Tampa Bay's top tech companies and find your next opportunity."
        ctaText="View Jobs"
        ctaHref="#"
      />
    </div>
  ),
};
