import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { LogoMarquee } from '@tampadevs/react';

// Sample sponsor logos (using CDN-hosted brand logos)
const sampleLogos = [
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg', alt: 'AWS', href: 'https://aws.amazon.com' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg', alt: 'Azure', href: 'https://azure.microsoft.com' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg', alt: 'Google Cloud', href: 'https://cloud.google.com' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', alt: 'GitHub', href: 'https://github.com' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg', alt: 'GitLab', href: 'https://gitlab.com' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/slack/slack-original.svg', alt: 'Slack', href: 'https://slack.com' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', alt: 'Docker', href: 'https://docker.com' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg', alt: 'Kubernetes', href: 'https://kubernetes.io' },
];

const communityLogos = [
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', alt: 'React', href: 'https://reactjs.org' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg', alt: 'Vue.js', href: 'https://vuejs.org' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg', alt: 'Angular', href: 'https://angular.io' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', alt: 'Node.js', href: 'https://nodejs.org' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', alt: 'TypeScript', href: 'https://typescriptlang.org' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', alt: 'Python', href: 'https://python.org' },
];

const meta: Meta<typeof LogoMarquee> = {
  title: 'Components/LogoMarquee',
  component: LogoMarquee,
  tags: ['autodocs'],
  argTypes: {
    speed: { control: { type: 'number', min: 5, max: 60 } },
    direction: {
      control: 'select',
      options: ['left', 'right'],
    },
    pauseOnHover: { control: 'boolean' },
    logoHeight: { control: 'text' },
    gap: { control: 'text' },
    title: { control: 'text' },
    color: { control: 'boolean' },
  },
  args: {
    speed: 30,
    direction: 'left',
    pauseOnHover: true,
    logoHeight: '60px',
    gap: '3rem',
    title: '',
    color: false,
    logos: sampleLogos,
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
An infinite scrolling logo carousel for sponsor logos, partner logos, etc.

## Features

- **Infinite Scroll**: Seamless looping animation
- **Direction Control**: Scroll left or right
- **Pause on Hover**: Animation pauses when hovering
- **Grayscale Mode**: Logos start grayscale, color on hover
- **Color Mode**: Keep logos in full color
- **Clickable Logos**: Optional links for each logo
- **Responsive**: Adjusts logo size on mobile

## Usage

\`\`\`tsx
<LogoMarquee
  logos={logoArray}
  speed={25}
  title="Our Sponsors"
  pauseOnHover
/>
\`\`\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof LogoMarquee>;

export const Default: Story = {};

export const WithTitle: Story = {
  args: {
    title: 'Our Amazing Sponsors',
  },
};

export const ColorLogos: Story = {
  args: {
    color: true,
    title: 'Technology Partners',
    logos: communityLogos,
  },
};

export const ReverseDirection: Story = {
  args: {
    direction: 'right',
    title: 'Scrolling Right',
  },
};

export const FastSpeed: Story = {
  args: {
    speed: 15,
    title: 'Fast Scroll',
  },
};

export const SlowSpeed: Story = {
  args: {
    speed: 60,
    title: 'Slow & Steady',
  },
};

export const LargeLogos: Story = {
  args: {
    logoHeight: '100px',
    gap: '4rem',
    title: 'Large Logos',
  },
};

export const SmallLogos: Story = {
  args: {
    logoHeight: '40px',
    gap: '2rem',
    title: 'Compact View',
  },
};

export const DoubleMarquee: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <LogoMarquee
        logos={sampleLogos}
        direction="left"
        speed={30}
      />
      <LogoMarquee
        logos={communityLogos}
        direction="right"
        speed={25}
        color
      />
    </div>
  ),
};
