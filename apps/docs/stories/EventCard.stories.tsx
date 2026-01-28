import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { EventCard } from '@tampadevs/react';

const meta: Meta<typeof EventCard> = {
  title: 'Components/EventCard',
  component: EventCard,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'compact', 'featured'],
      description: 'Card layout variant',
    },
    title: { control: 'text' },
    date: { control: 'text' },
    time: { control: 'text' },
    location: { control: 'text' },
    groupName: { control: 'text' },
    groupUrl: { control: 'text' },
    eventUrl: { control: 'text' },
    imageUrl: { control: 'text' },
    rsvpCount: { control: 'number' },
    isOnline: { control: 'boolean' },
    description: { control: 'text' },
    relativeTime: { control: 'text' },
  },
  args: {
    variant: 'default',
    title: 'Tampa Bay React Developers Monthly Meetup',
    date: '2024-02-15T18:30:00',
    time: '6:30 PM',
    location: 'The Hub Tampa',
    groupName: 'Tampa Bay React Developers',
    groupUrl: '/groups/tampa-react',
    eventUrl: '/events/123',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop',
    rsvpCount: 42,
    isOnline: false,
    description: 'Join us for our monthly meetup where we discuss the latest in React development, share projects, and network with fellow developers.',
    relativeTime: 'Tomorrow',
  },
};

export default meta;
type Story = StoryObj<typeof EventCard>;

export const Default: Story = {
  args: {
    variant: 'default',
  },
  render: (args) => (
    <div style={{ maxWidth: 320 }}>
      <EventCard {...args} />
    </div>
  ),
};

export const Compact: Story = {
  args: {
    variant: 'compact',
  },
  render: (args) => (
    <div style={{ maxWidth: 500 }}>
      <EventCard {...args} />
    </div>
  ),
};

export const Featured: Story = {
  args: {
    variant: 'featured',
  },
  render: (args) => (
    <div style={{ maxWidth: 600 }}>
      <EventCard {...args} />
    </div>
  ),
};

export const OnlineEvent: Story = {
  args: {
    variant: 'default',
    isOnline: true,
    title: 'Virtual TypeScript Workshop',
    location: '',
  },
  render: (args) => (
    <div style={{ maxWidth: 320 }}>
      <EventCard {...args} />
    </div>
  ),
};

export const NoImage: Story = {
  args: {
    variant: 'default',
    imageUrl: '',
  },
  render: (args) => (
    <div style={{ maxWidth: 320 }}>
      <EventCard {...args} />
    </div>
  ),
};

export const CardGrid: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem', maxWidth: 900 }}>
      <EventCard
        title="React Tampa Monthly"
        date="2024-02-15T18:30:00"
        time="6:30 PM"
        location="The Hub Tampa"
        groupName="React Tampa"
        rsvpCount={42}
        imageUrl="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop"
      />
      <EventCard
        title="Python Data Science Workshop"
        date="2024-02-18T10:00:00"
        time="10:00 AM"
        location="USF Library"
        groupName="Tampa Python"
        rsvpCount={28}
        imageUrl="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=300&fit=crop"
      />
      <EventCard
        title="Cloud Native Tampa"
        date="2024-02-20T19:00:00"
        time="7:00 PM"
        groupName="Cloud Native Tampa"
        rsvpCount={35}
        isOnline
      />
    </div>
  ),
};

export const CompactList: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: 500 }}>
      <EventCard
        variant="compact"
        title="React Tampa Monthly"
        date="2024-02-15T18:30:00"
        time="6:30 PM"
        location="The Hub Tampa"
        groupName="React Tampa"
        rsvpCount={42}
      />
      <EventCard
        variant="compact"
        title="Python Data Science Workshop"
        date="2024-02-18T10:00:00"
        time="10:00 AM"
        location="USF Library"
        groupName="Tampa Python"
        rsvpCount={28}
      />
      <EventCard
        variant="compact"
        title="Virtual TypeScript Workshop"
        date="2024-02-20T19:00:00"
        time="7:00 PM"
        groupName="Cloud Native Tampa"
        rsvpCount={35}
        isOnline
      />
    </div>
  ),
};
