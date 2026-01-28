import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Calendar } from '@tampadevs/react';

// Sample events data
const sampleEvents = [
  {
    id: '1',
    title: 'Tampa Devs Monthly Meetup',
    dateTime: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(), // Tomorrow
    location: 'Embarc Collective',
    groupName: 'Tampa Devs',
    groupUrl: '/groups/tampadevs',
    eventUrl: '/events/1',
    isOnline: false,
  },
  {
    id: '2',
    title: 'React Tampa: Advanced Hooks Workshop',
    dateTime: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000).toISOString(),
    location: 'Tech Hub Tampa',
    groupName: 'React Tampa',
    groupUrl: '/groups/react-tampa',
    eventUrl: '/events/2',
    isOnline: false,
  },
  {
    id: '3',
    title: 'Python Tampa: Data Science Office Hours',
    dateTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    groupName: 'Python Tampa',
    eventUrl: '/events/3',
    isOnline: true,
  },
  {
    id: '4',
    title: 'AWS User Group: Cloud Architecture Deep Dive',
    dateTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    location: 'Amazon Tampa Office',
    groupName: 'AWS Tampa',
    eventUrl: '/events/4',
    isOnline: false,
  },
  {
    id: '5',
    title: 'Startup Coffee & Code',
    dateTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    location: 'Buddy Brew Coffee',
    groupName: 'Tampa Startup Community',
    eventUrl: '/events/5',
    isOnline: false,
  },
  {
    id: '6',
    title: 'DevOps Tampa: Kubernetes Workshop',
    dateTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    location: 'ReliaQuest HQ',
    groupName: 'DevOps Tampa',
    eventUrl: '/events/6',
    isOnline: false,
  },
  {
    id: '7',
    title: 'JavaScript Fundamentals Study Group',
    dateTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000).toISOString(),
    groupName: 'Code Newbies Tampa',
    eventUrl: '/events/7',
    isOnline: true,
  },
];

const meta: Meta<typeof Calendar> = {
  title: 'Components/Calendar',
  component: Calendar,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    days: { control: { type: 'number', min: 7, max: 90 } },
    hideEmpty: { control: 'boolean' },
    emptyMessage: { control: 'text' },
  },
  args: {
    title: 'Upcoming Events',
    days: 14,
    hideEmpty: false,
    emptyMessage: 'No events',
    events: sampleEvents,
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
type Story = StoryObj<typeof Calendar>;

export const Default: Story = {};

export const HideEmptyDays: Story = {
  args: {
    title: 'Events Only View',
    hideEmpty: true,
    days: 30,
  },
};

export const LongRange: Story = {
  args: {
    title: 'Next 30 Days',
    days: 30,
  },
};

export const NoTitle: Story = {
  args: {
    title: undefined,
    days: 14,
  },
};

export const Empty: Story = {
  args: {
    title: 'No Events Scheduled',
    events: [],
    days: 7,
  },
};

export const ManyEventsPerDay: Story = {
  render: () => {
    const today = new Date();
    const manyEvents = [
      { id: '1', title: 'Morning Standup', dateTime: new Date(today.setHours(9, 0)).toISOString(), groupName: 'Team Alpha', isOnline: true },
      { id: '2', title: 'Design Review', dateTime: new Date(today.setHours(10, 30)).toISOString(), location: 'Meeting Room A', groupName: 'Design Team', isOnline: false },
      { id: '3', title: 'Lunch & Learn: AI/ML', dateTime: new Date(today.setHours(12, 0)).toISOString(), location: 'Cafeteria', groupName: 'Tampa Devs', isOnline: false },
      { id: '4', title: 'Sprint Planning', dateTime: new Date(today.setHours(14, 0)).toISOString(), groupName: 'Team Alpha', isOnline: true },
      { id: '5', title: 'Code Review Session', dateTime: new Date(today.setHours(15, 30)).toISOString(), location: 'Dev Hub', groupName: 'Engineering', isOnline: false },
      { id: '6', title: 'Happy Hour Networking', dateTime: new Date(today.setHours(17, 0)).toISOString(), location: 'Rooftop Bar', groupName: 'Tampa Tech', isOnline: false },
    ];
    return (
      <Calendar
        title="Busy Day"
        events={manyEvents}
        days={1}
      />
    );
  },
};
