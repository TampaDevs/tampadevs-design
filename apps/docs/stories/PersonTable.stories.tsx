import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { PersonTable } from '@tampadevs/react';

const currentLeadership = [
  {
    name: 'Vincent Doria Jr.',
    role: 'Founder & President',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    term: '2019 - Present',
    linkedin: 'https://linkedin.com/in/vincentdoria',
    github: 'https://github.com/vdoria',
    twitter: 'https://twitter.com/vdoria',
    website: 'https://vincentdoria.com',
  },
  {
    name: 'Sarah Chen',
    role: 'VP of Engineering',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
    term: '2021 - Present',
    linkedin: 'https://linkedin.com/in/sarahchen',
    github: 'https://github.com/schen',
  },
  {
    name: 'Marcus Johnson',
    role: 'Community Director',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    term: '2022 - Present',
    linkedin: 'https://linkedin.com/in/marcusjohnson',
    twitter: 'https://twitter.com/mjohnson',
  },
  {
    name: 'Emily Rodriguez',
    role: 'Events Coordinator',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    term: '2023 - Present',
    linkedin: 'https://linkedin.com/in/emilyrod',
  },
];

const pastLeadership = [
  {
    name: 'Alex Thompson',
    role: 'VP of Engineering',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    term: '2019 - 2021',
    linkedin: 'https://linkedin.com/in/alexthompson',
  },
  {
    name: 'Jessica Park',
    role: 'Community Director',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
    term: '2020 - 2022',
    linkedin: 'https://linkedin.com/in/jessicapark',
    twitter: 'https://twitter.com/jpark',
  },
  {
    name: 'David Kim',
    role: 'Events Coordinator',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
    term: '2020 - 2023',
    github: 'https://github.com/dkim',
  },
  {
    name: 'Michelle Brown',
    role: 'Treasurer',
    term: '2019 - 2022',
    linkedin: 'https://linkedin.com/in/michellebrown',
  },
  {
    name: 'Robert Wilson',
    role: 'Secretary',
    term: '2019 - 2021',
  },
];

const leadershipYears = [
  {
    year: '2025',
    label: '2025 (Current)',
    members: [
      { name: 'Vincent Tang', role: 'President', term: '2025', linkedin: 'https://linkedin.com/in/vincenttang', github: 'https://github.com/vincentntang', twitter: 'https://twitter.com/vincentntang', website: 'https://vincentntang.com' },
      { name: 'Charlton Trezevant', role: 'Vice President', term: '2025', linkedin: 'https://linkedin.com/in/ctrezevant', github: 'https://github.com/ctrezevant' },
      { name: 'Sarah Chen', role: 'Secretary', term: '2025', linkedin: 'https://linkedin.com/in/sarahchen' },
      { name: 'Marcus Williams', role: 'Treasurer', term: '2025', github: 'https://github.com/marcusw' },
    ],
  },
  {
    year: '2024',
    members: [
      { name: 'Vincent Tang', role: 'President', term: '2024', linkedin: 'https://linkedin.com/in/vincenttang' },
      { name: 'Alex Rivera', role: 'Vice President', term: '2024' },
      { name: 'Jennifer Wu', role: 'Secretary', term: '2024' },
      { name: 'David Park', role: 'Treasurer', term: '2024' },
    ],
  },
  {
    year: '2023',
    members: [
      { name: 'Michael Torres', role: 'President', term: '2023', linkedin: 'https://linkedin.com/in/mtorres' },
      { name: 'Emily Johnson', role: 'Vice President', term: '2023' },
      { name: 'Chris Lee', role: 'Secretary', term: '2023' },
    ],
  },
  {
    year: '2022',
    members: [
      { name: 'Robert Garcia', role: 'President', term: '2022' },
      { name: 'Amanda Taylor', role: 'Vice President', term: '2022' },
    ],
  },
  {
    year: '2021',
    members: [
      { name: 'James Wilson', role: 'President', term: '2021' },
      { name: 'Michelle Brown', role: 'Vice President', term: '2021' },
    ],
  },
  {
    year: '2020',
    members: [
      { name: 'Daniel Martinez', role: 'Founder / President', term: '2020', linkedin: 'https://linkedin.com/in/dmartinez', website: 'https://dmartinez.dev' },
    ],
  },
];

const meta: Meta<typeof PersonTable> = {
  title: 'Components/PersonTable',
  component: PersonTable,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    showTerm: { control: 'boolean' },
    showSocials: { control: 'boolean' },
    compact: { control: 'boolean' },
  },
  args: {
    title: 'Leadership Team',
    showTerm: true,
    showSocials: true,
    compact: false,
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
type Story = StoryObj<typeof PersonTable>;

export const Default: Story = {
  args: {
    members: currentLeadership,
  },
};

export const PastLeadership: Story = {
  args: {
    title: 'Past Leadership',
    members: pastLeadership,
  },
};

export const Compact: Story = {
  args: {
    title: 'Team Members',
    compact: true,
    members: currentLeadership,
  },
};

export const WithoutTerm: Story = {
  args: {
    title: 'Current Team',
    showTerm: false,
    members: currentLeadership,
  },
};

export const WithoutSocials: Story = {
  args: {
    title: 'Team Roster',
    showSocials: false,
    members: currentLeadership,
  },
};

export const NoTitle: Story = {
  args: {
    title: undefined,
    members: currentLeadership.slice(0, 3),
  },
};

export const Empty: Story = {
  args: {
    title: 'Advisory Board',
    members: [],
  },
};

export const MinimalInfo: Story = {
  args: {
    title: 'Contributors',
    showTerm: false,
    showSocials: false,
    compact: true,
    members: [
      { name: 'Alice Developer', role: 'Core Contributor' },
      { name: 'Bob Engineer', role: 'Documentation' },
      { name: 'Carol Designer', role: 'UI/UX' },
      { name: 'Dan Ops', role: 'Infrastructure' },
    ],
  },
};

export const TabbedMode: Story = {
  name: 'Tabbed Mode',
  args: {
    title: 'Executive Board',
    years: leadershipYears,
  },
};

export const TabbedTwoYears: Story = {
  name: 'Tabbed - Two Years',
  args: {
    title: 'Leadership History',
    years: leadershipYears.slice(0, 2),
  },
};

export const TabbedManyYears: Story = {
  name: 'Tabbed - Many Years (Scrollable)',
  args: {
    title: 'Leadership Through the Years',
    years: leadershipYears,
  },
};

export const TabbedCompact: Story = {
  name: 'Tabbed - Compact',
  args: {
    title: 'Board History',
    compact: true,
    years: leadershipYears,
  },
};

export const TabbedStartOnYear: Story = {
  name: 'Tabbed - Start on Specific Year',
  args: {
    title: 'Leadership',
    activeYear: '2023',
    years: leadershipYears,
  },
};

export const TabbedNoTitle: Story = {
  name: 'Tabbed - No Title',
  args: {
    title: undefined,
    years: leadershipYears.slice(0, 3),
  },
};

export const FullPage: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <PersonTable
        title="Current Leadership"
        members={currentLeadership}
      />
      <PersonTable
        title="Past Leadership"
        members={pastLeadership}
      />
    </div>
  ),
};
