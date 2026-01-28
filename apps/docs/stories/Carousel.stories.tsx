import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Carousel, EventCard } from '@tampadevs/react';

const meta: Meta<typeof Carousel> = {
  title: 'Components/Carousel',
  component: Carousel,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    scrollAmount: { control: { type: 'range', min: 100, max: 600, step: 50 } },
    hideControls: { control: 'boolean' },
    gap: { control: 'text' },
  },
  args: {
    title: 'Upcoming Events',
    scrollAmount: 400,
    hideControls: false,
    gap: '1.5rem',
  },
};

export default meta;
type Story = StoryObj<typeof Carousel>;

export const Default: Story = {
  render: (args) => (
    <Carousel {...args}>
      {Array(6).fill(null).map((_, i) => (
        <EventCard
          key={i}
          className="carousel-event-card"
          title={`Event ${i + 1}: Tech Meetup`}
          date={`2024-02-${15 + i}T18:30:00`}
          time="6:30 PM"
          location="The Hub Tampa"
          groupName="Tampa Devs"
          rsvpCount={20 + i * 5}
          imageUrl="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop"
        />
      ))}
      <style>{`.carousel-event-card { width: 320px; }`}</style>
    </Carousel>
  ),
};

export const WithoutTitle: Story = {
  args: {
    title: '',
  },
  render: (args) => (
    <Carousel {...args}>
      {Array(5).fill(null).map((_, i) => (
        <div
          key={i}
          style={{
            width: 280,
            height: 200,
            background: 'linear-gradient(135deg, #1C2438, #2B3447)',
            borderRadius: 12,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
          }}
        >
          Card {i + 1}
        </div>
      ))}
    </Carousel>
  ),
};

export const HiddenControls: Story = {
  args: {
    hideControls: true,
  },
  render: (args) => (
    <Carousel {...args}>
      {Array(5).fill(null).map((_, i) => (
        <div
          key={i}
          style={{
            width: 250,
            height: 180,
            background: 'linear-gradient(135deg, #E85A4F, #F07167)',
            borderRadius: 12,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
          }}
        >
          Slide {i + 1}
        </div>
      ))}
    </Carousel>
  ),
};

export const WideGap: Story = {
  args: {
    title: 'Featured Groups',
    gap: '2.5rem',
  },
  render: (args) => (
    <Carousel {...args}>
      {Array(6).fill(null).map((_, i) => (
        <div
          key={i}
          style={{
            width: 200,
            height: 150,
            background: '#F9FAFB',
            border: '1px solid #E5E7EB',
            borderRadius: 12,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 600,
            color: '#1C2438',
          }}
        >
          Group {i + 1}
        </div>
      ))}
    </Carousel>
  ),
};
