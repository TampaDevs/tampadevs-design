import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { OpenCollective } from '@tampadevs/react';

const meta: Meta<typeof OpenCollective> = {
  title: 'Components/OpenCollective',
  component: OpenCollective,
  tags: ['autodocs'],
  argTypes: {
    collective: { control: 'text' },
    mode: {
      control: 'select',
      options: ['contributors', 'backers', 'sponsors', 'all'],
    },
    limit: { control: { type: 'number', min: 10, max: 200 } },
    showButton: { control: 'boolean' },
    showStats: { control: 'boolean' },
    title: { control: 'text' },
    description: { control: 'text' },
    githubRepo: { control: 'text' },
    githubOrg: { control: 'text' },
    cacheTtl: { control: { type: 'number', min: 0, max: 86400000 } },
  },
  args: {
    collective: 'tampadevs',
    mode: 'backers',
    limit: 100,
    showButton: false,
    showStats: false,
    title: '',
    description: '',
    githubRepo: '',
    githubOrg: '',
    cacheTtl: 3600000, // 1 hour
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
Display contributors, backers, or sponsors from OpenCollective using the JSON API.

## Features

- **Multiple Modes**: Contributors, backers, sponsors, or all supporters
- **Live Data**: Fetches real data from OpenCollective API
- **Stats Display**: Optionally show backers count, yearly income, and balance
- **Avatar Grid**: Displays member avatars with hover effects
- **Contribute Button**: Optional call-to-action button
- **Responsive**: Adapts to container width

## Modes

- **contributors**: GitHub contributors (use \`githubOrg\` for org members or \`githubRepo\` for repo contributors)
- **backers**: Individual financial supporters (from OpenCollective)
- **sponsors**: Organization/company supporters (from OpenCollective)
- **all**: All OpenCollective supporters combined

## Usage

\`\`\`tsx
{/* Financial backers from OpenCollective */}
<OpenCollective
  collective="tampadevs"
  mode="backers"
  title="Our Backers"
  showButton
  showStats
/>

{/* GitHub org members */}
<OpenCollective
  mode="contributors"
  githubOrg="TampaDevs"
  title="Contributors"
/>

{/* GitHub repo contributors */}
<OpenCollective
  mode="contributors"
  githubRepo="tampadevs/tampadevs"
  title="Website Contributors"
/>
\`\`\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof OpenCollective>;

export const Backers: Story = {
  render: (args) => (
    <div style={{ maxWidth: '900px' }}>
      <OpenCollective {...args} />
    </div>
  ),
};

export const BackersWithStats: Story = {
  args: {
    collective: 'tampadevs',
    mode: 'backers',
    title: 'Community Backers',
    description: 'These amazing people support Tampa Devs financially.',
    showButton: true,
    showStats: true,
  },
  render: (args) => (
    <div style={{ maxWidth: '900px' }}>
      <OpenCollective {...args} />
    </div>
  ),
};

export const Contributors: Story = {
  args: {
    collective: 'tampadevs',
    mode: 'contributors',
    title: 'Open Source Contributors',
    description: 'Thank you to everyone who has contributed to our open source projects!',
    showButton: true,
    githubOrg: 'TampaDevs',
  },
  render: (args) => (
    <div style={{ maxWidth: '900px' }}>
      <OpenCollective {...args} />
    </div>
  ),
};

export const RepoContributors: Story = {
  args: {
    mode: 'contributors',
    title: 'Website Contributors',
    description: 'Contributors to the Tampa Devs website.',
    githubRepo: 'tampadevs/tampadevs',
  },
  render: (args) => (
    <div style={{ maxWidth: '900px' }}>
      <OpenCollective {...args} />
    </div>
  ),
};

export const Sponsors: Story = {
  args: {
    collective: 'tampadevs',
    mode: 'sponsors',
    title: 'Our Sponsors',
    description: 'Organizations that support Tampa Devs.',
  },
  render: (args) => (
    <div style={{ maxWidth: '900px' }}>
      <OpenCollective {...args} />
    </div>
  ),
};

export const AllSupporters: Story = {
  args: {
    collective: 'tampadevs',
    mode: 'all',
    title: 'All Supporters',
    showStats: true,
  },
  render: (args) => (
    <div style={{ maxWidth: '900px' }}>
      <OpenCollective {...args} />
    </div>
  ),
};

export const NarrowContainer: Story = {
  args: {
    collective: 'tampadevs',
    mode: 'backers',
    title: 'Backers',
  },
  render: (args) => (
    <div style={{ maxWidth: '450px' }}>
      <OpenCollective {...args} />
    </div>
  ),
};

export const FullExample: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '900px' }}>
      <OpenCollective
        collective="tampadevs"
        mode="backers"
        title="Community Backers"
        description="These generous individuals help keep Tampa Devs running."
        showButton
        showStats
      />
      <OpenCollective
        collective="tampadevs"
        mode="sponsors"
        title="Organization Sponsors"
        description="Companies and organizations supporting Tampa Devs."
        showButton
      />
    </div>
  ),
};

export const OtherCollective: Story = {
  args: {
    collective: 'webpack',
    mode: 'backers',
    title: 'Webpack Backers',
    showStats: true,
    limit: 50,
  },
  render: (args) => (
    <div style={{ maxWidth: '900px' }}>
      <OpenCollective {...args} />
    </div>
  ),
};
