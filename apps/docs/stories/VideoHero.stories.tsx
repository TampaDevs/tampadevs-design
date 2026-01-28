import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { VideoHero, Logo, Button } from '@tampadevs/react';

const meta: Meta<typeof VideoHero> = {
  title: 'Components/VideoHero',
  component: VideoHero,
  tags: ['autodocs'],
  argTypes: {
    videoWebm: { control: 'text' },
    videoMp4: { control: 'text' },
    poster: { control: 'text' },
    overlayColor: { control: 'color' },
    height: { control: { type: 'range', min: 40, max: 100, step: 5 } },
  },
  args: {
    videoWebm: '/videos/TD_output_720_30p.webm',
    videoMp4: '/videos/tampa-devs-header-v1-compress-35.mp4',
    poster: '',
    overlayColor: '',
    height: 80,
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof VideoHero>;

export const Default: Story = {
  render: (args) => (
    <VideoHero
      {...args}
      logo={<Logo variant="icon" size="xl" />}
      heading={<h1>Tampa Devs</h1>}
      subheading={<h2>The fastest-growing community for software developers in Tampa Bay</h2>}
      ctas={
        <>
          <Button variant="primary" href="#">Join Us</Button>
          <Button variant="secondary" href="#">Learn More</Button>
        </>
      }
    />
  ),
};

export const WithPoster: Story = {
  args: {
    videoWebm: '',
    videoMp4: '',
    poster: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1920&h=1080&fit=crop',
    height: 60,
  },
  render: (args) => (
    <VideoHero
      {...args}
      heading={<h1>Welcome to Our Community</h1>}
      subheading={<h2>Connect with developers across Tampa Bay</h2>}
      ctas={<Button variant="primary" href="#">Get Started</Button>}
    />
  ),
};

export const CustomOverlay: Story = {
  args: {
    poster: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=1920&h=1080&fit=crop',
    overlayColor: 'rgba(232, 90, 79, 0.7)',
    height: 70,
    videoWebm: '',
    videoMp4: '',
  },
  render: (args) => (
    <VideoHero
      {...args}
      heading={<h1>Tech Events</h1>}
      subheading={<h2>Discover upcoming meetups and workshops</h2>}
      ctas={<Button variant="primary" href="#">View Events</Button>}
    />
  ),
};

export const FullHeight: Story = {
  args: {
    height: 100,
  },
  render: (args) => (
    <VideoHero
      {...args}
      logo={<Logo variant="icon" size="2xl" />}
      heading={<h1>Tampa Devs</h1>}
      subheading={<h2>The fastest-growing community for software developers in Tampa Bay</h2>}
      ctas={
        <>
          <Button variant="primary" href="#">Join Us</Button>
          <Button variant="secondary" href="#">Learn More</Button>
        </>
      }
    />
  ),
};

export const WithVideo: Story = {
  name: 'With Video (MP4 + WebM)',
  args: {
    videoWebm: '/videos/TD_output_720_30p.webm',
    videoMp4: '/videos/tampa-devs-header-v1-compress-35.mp4',
    height: 70,
  },
  render: (args) => (
    <VideoHero
      {...args}
      logo={<Logo variant="icon" size="xl" />}
      heading={<h1>Tampa Devs</h1>}
      subheading={<h2>Join the community</h2>}
      ctas={<Button variant="primary" href="#">Join Us</Button>}
    />
  ),
};
