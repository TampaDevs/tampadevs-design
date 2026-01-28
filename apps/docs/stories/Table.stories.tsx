import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Table } from '@tampadevs/react';

const sampleColumns = [
  { key: 'name', label: 'Name' },
  { key: 'role', label: 'Role' },
  { key: 'department', label: 'Department', hideOnMobile: true },
  { key: 'status', label: 'Status', align: 'center' as const },
];

const sampleData = [
  { name: 'John Smith', role: 'Developer', department: 'Engineering', status: 'Active' },
  { name: 'Jane Doe', role: 'Designer', department: 'Product', status: 'Active' },
  { name: 'Bob Johnson', role: 'Manager', department: 'Engineering', status: 'Active' },
  { name: 'Alice Williams', role: 'Developer', department: 'Engineering', status: 'Inactive' },
  { name: 'Charlie Brown', role: 'Analyst', department: 'Data', status: 'Active' },
];

// Tabbed mode data
const quarterlyData = [
  {
    id: 'q1-2025',
    label: 'Q1 2025',
    data: [
      { metric: 'New Members', value: '234', change: '+18%' },
      { metric: 'Events Hosted', value: '12', change: '+33%' },
      { metric: 'Workshop Attendance', value: '456', change: '+25%' },
      { metric: 'Sponsor Revenue', value: '$15,000', change: '+10%' },
    ],
  },
  {
    id: 'q4-2024',
    label: 'Q4 2024',
    data: [
      { metric: 'New Members', value: '198', change: '+12%' },
      { metric: 'Events Hosted', value: '9', change: '+0%' },
      { metric: 'Workshop Attendance', value: '365', change: '+15%' },
      { metric: 'Sponsor Revenue', value: '$13,500', change: '+8%' },
    ],
  },
  {
    id: 'q3-2024',
    label: 'Q3 2024',
    data: [
      { metric: 'New Members', value: '176', change: '+8%' },
      { metric: 'Events Hosted', value: '9', change: '-10%' },
      { metric: 'Workshop Attendance', value: '317', change: '+5%' },
      { metric: 'Sponsor Revenue', value: '$12,500', change: '+4%' },
    ],
  },
  {
    id: 'q2-2024',
    label: 'Q2 2024',
    data: [
      { metric: 'New Members', value: '163', change: '+5%' },
      { metric: 'Events Hosted', value: '10', change: '+11%' },
      { metric: 'Workshop Attendance', value: '302', change: '+10%' },
      { metric: 'Sponsor Revenue', value: '$12,000', change: '+20%' },
    ],
  },
  {
    id: 'q1-2024',
    label: 'Q1 2024',
    data: [
      { metric: 'New Members', value: '155', change: '+15%' },
      { metric: 'Events Hosted', value: '9', change: '+12%' },
      { metric: 'Workshop Attendance', value: '275', change: '+22%' },
      { metric: 'Sponsor Revenue', value: '$10,000', change: '+25%' },
    ],
  },
];

const regionData = [
  {
    id: 'tampa',
    label: 'Tampa',
    data: [
      { event: 'Monthly Meetup', date: 'Feb 15', attendees: '45' },
      { event: 'Code & Coffee', date: 'Feb 22', attendees: '20' },
      { event: 'Workshop: React', date: 'Mar 1', attendees: '35' },
    ],
  },
  {
    id: 'st-pete',
    label: 'St. Pete',
    data: [
      { event: 'Beach Hackathon', date: 'Feb 20', attendees: '60' },
      { event: 'Frontend Friday', date: 'Mar 5', attendees: '25' },
    ],
  },
  {
    id: 'clearwater',
    label: 'Clearwater',
    data: [
      { event: 'Tech Talk Tuesday', date: 'Feb 18', attendees: '30' },
    ],
  },
];

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    compact: { control: 'boolean' },
    striped: { control: 'boolean' },
    hoverable: { control: 'boolean' },
  },
  args: {
    title: 'Team Members',
    compact: false,
    striped: false,
    hoverable: true,
    columns: sampleColumns,
    data: sampleData,
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
A versatile data table component with glass morphism styling.

## Features

- **Simple Mode**: Pass \`columns\` and \`data\` for a standard table
- **Tabbed Mode**: Pass \`tabs\` array to display multiple data sets with tab navigation
- **Compact Mode**: Reduced row height for denser layouts
- **Striped Rows**: Alternating row backgrounds
- **Responsive**: Columns can be hidden on mobile

## Tabbed Mode

Use the \`tabs\` prop to enable tabbed navigation between different data sets:

\`\`\`tsx
<Table
  title="Quarterly Reports"
  columns={columns}
  tabs={[
    { id: 'q1', label: 'Q1 2025', data: [...] },
    { id: 'q2', label: 'Q2 2025', data: [...] },
  ]}
/>
\`\`\`

Tabs appear next to the title as full-height rectangular blocks, similar to browser tabs.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Table>;

// ========== SIMPLE MODE STORIES ==========

export const Default: Story = {};

export const Compact: Story = {
  args: {
    compact: true,
  },
};

export const Striped: Story = {
  args: {
    striped: true,
  },
};

export const WithTitleActions: Story = {
  args: {
    titleActions: (
      <button style={{ padding: '0.5rem 1rem', background: 'var(--td-color-coral)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
        Add Member
      </button>
    ),
  },
};

export const EmptyState: Story = {
  args: {
    title: 'Empty Table',
    data: [],
    emptyContent: (
      <div style={{ color: 'rgba(156, 163, 175, 0.8)' }}>
        <p>No team members found.</p>
        <button style={{ marginTop: '1rem', padding: '0.5rem 1rem', background: 'var(--td-color-coral)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
          Add First Member
        </button>
      </div>
    ),
  },
};

// ========== TABBED MODE STORIES ==========

export const TabbedMode: Story = {
  name: 'Tabbed Mode',
  args: {
    title: 'Quarterly Metrics',
    columns: [
      { key: 'metric', label: 'Metric' },
      { key: 'value', label: 'Value', align: 'right' as const },
      { key: 'change', label: 'Change', align: 'right' as const },
    ],
    tabs: quarterlyData,
    data: undefined,
  },
  parameters: {
    docs: {
      description: {
        story: 'Tabs appear next to the title as full-height blocks. Each tab contains its own data set.',
      },
    },
  },
};

export const TabbedRegions: Story = {
  name: 'Tabbed - Regions',
  args: {
    title: 'Events by Region',
    columns: [
      { key: 'event', label: 'Event' },
      { key: 'date', label: 'Date' },
      { key: 'attendees', label: 'Attendees', align: 'right' as const },
    ],
    tabs: regionData,
    data: undefined,
  },
  parameters: {
    docs: {
      description: {
        story: 'Tabs can represent any categorization - regions, categories, time periods, etc.',
      },
    },
  },
};

export const TabbedManyTabs: Story = {
  name: 'Tabbed - Many Tabs (Scrollable)',
  args: {
    title: 'Historical Data',
    columns: [
      { key: 'metric', label: 'Metric' },
      { key: 'value', label: 'Value', align: 'right' as const },
      { key: 'change', label: 'Change', align: 'right' as const },
    ],
    tabs: quarterlyData,
    data: undefined,
  },
  parameters: {
    docs: {
      description: {
        story: 'When there are more than 4 tabs, scroll arrows appear for horizontal navigation.',
      },
    },
  },
};

export const TabbedNoTitle: Story = {
  name: 'Tabbed - No Title',
  args: {
    title: undefined,
    columns: [
      { key: 'event', label: 'Event' },
      { key: 'date', label: 'Date' },
      { key: 'attendees', label: 'Attendees', align: 'right' as const },
    ],
    tabs: regionData,
    data: undefined,
  },
  parameters: {
    docs: {
      description: {
        story: 'Tabs can appear without a title, taking up the full header width.',
      },
    },
  },
};

export const TabbedCompact: Story = {
  name: 'Tabbed - Compact',
  args: {
    title: 'Metrics Overview',
    compact: true,
    columns: [
      { key: 'metric', label: 'Metric' },
      { key: 'value', label: 'Value', align: 'right' as const },
      { key: 'change', label: 'Change', align: 'right' as const },
    ],
    tabs: quarterlyData.slice(0, 3),
    data: undefined,
  },
};

// ========== EXAMPLE USE CASES ==========

export const EventsTable: Story = {
  name: 'Events Example',
  args: {
    title: 'Upcoming Events',
    columns: [
      { key: 'name', label: 'Event' },
      { key: 'date', label: 'Date' },
      { key: 'location', label: 'Location', hideOnMobile: true },
      { key: 'attendees', label: 'Attendees', align: 'right' as const },
    ],
    data: [
      { name: 'Monthly Meetup', date: 'Feb 15, 2025', location: 'Tech Hub Tampa', attendees: '45' },
      { name: 'Code & Coffee', date: 'Feb 22, 2025', location: 'Buddy Brew', attendees: '20' },
      { name: 'Workshop: React', date: 'Mar 1, 2025', location: 'Online', attendees: '100' },
      { name: 'Annual Conference', date: 'Mar 15, 2025', location: 'Tampa Convention', attendees: '500' },
    ],
  },
};

export const SponsorsTable: Story = {
  name: 'Sponsors Example',
  args: {
    title: 'Sponsor Directory',
    striped: true,
    columns: [
      { key: 'company', label: 'Company' },
      { key: 'tier', label: 'Tier' },
      { key: 'since', label: 'Member Since', hideOnMobile: true },
      { key: 'contact', label: 'Contact', hideOnMobile: true },
    ],
    data: [
      { company: 'Brooksource', tier: 'Gold', since: '2022', contact: 'sponsor@brooksource.com' },
      { company: 'xByte Technologies', tier: 'Gold', since: '2023', contact: 'hello@xbyte.com' },
      { company: 'Ace Host', tier: 'Silver', since: '2024', contact: 'partners@acehost.com' },
      { company: 'Packfiles', tier: 'Silver', since: '2024', contact: 'info@packfiles.io' },
    ],
  },
};
