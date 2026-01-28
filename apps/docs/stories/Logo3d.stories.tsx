import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Logo3d } from '@tampadevs/react';

const meta: Meta<typeof Logo3d> = {
  title: 'Components/Logo3d',
  component: Logo3d,
  tags: ['autodocs'],
  argTypes: {
    objUrl: { control: 'text' },
    mtlUrl: { control: 'text' },
    width: { control: 'number' },
    height: { control: 'number' },
    autoRotate: { control: 'boolean' },
    rotationSpeed: { control: { type: 'range', min: 0.001, max: 0.05, step: 0.001 } },
    backgroundColor: { control: 'color' },
    enableZoom: { control: 'boolean' },
    enablePan: { control: 'boolean' },
  },
  args: {
    objUrl: '/models/logo.obj',
    mtlUrl: '/models/logo.mtl',
    width: 400,
    height: 400,
    autoRotate: true,
    rotationSpeed: 0.01,
    backgroundColor: 'transparent',
    enableZoom: false,
    enablePan: true,
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
A 3D logo component using Three.js for rendering OBJ/MTL models.

## Requirements

- Three.js must be installed: \`pnpm add three\`
- OBJ and MTL files must be served from the same origin or have CORS enabled

## Usage

\`\`\`tsx
<Logo3d
  objUrl="/models/logo.obj"
  mtlUrl="/models/logo.mtl"
  width={400}
  height={400}
  autoRotate
/>
\`\`\`

## Features

- Auto-rotation with configurable speed
- Click-and-drag rotation (pan)
- Mouse wheel zoom (optional)
- Transparent background support
- Graceful fallback when Three.js is not available or model fails to load
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Logo3d>;

export const Default: Story = {};

export const LargeSize: Story = {
  args: {
    width: 600,
    height: 600,
  },
};

export const WithBackground: Story = {
  args: {
    backgroundColor: '#1C2438',
  },
  parameters: {
    docs: {
      description: {
        story: 'With a solid background color matching the Tampa Devs navy.',
      },
    },
  },
};

export const SlowRotation: Story = {
  args: {
    rotationSpeed: 0.005,
  },
  parameters: {
    docs: {
      description: {
        story: 'Slower rotation speed for a more subtle effect.',
      },
    },
  },
};

export const Interactive: Story = {
  args: {
    autoRotate: false,
    enableZoom: true,
    enablePan: true,
  },
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Logo3d {...args} />
      <p style={{ color: '#9CA3AF', fontSize: '0.75rem', textAlign: 'center' }}>
        Click and drag to rotate. Scroll to zoom.
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'With auto-rotation disabled, users can manually rotate and zoom the model.',
      },
    },
  },
};

export const Fallback: Story = {
  args: {
    objUrl: '',
    mtlUrl: '',
  },
  parameters: {
    docs: {
      description: {
        story: 'Without a model URL, the component displays a branded fallback. This is what users will see if the 3D model fails to load.',
      },
    },
  },
};

export const BannerStyle: Story = {
  args: {
    width: 800,
    height: 250,
    backgroundColor: '#1C2438',
  },
  parameters: {
    docs: {
      description: {
        story: 'Wide banner-style display for headers or hero sections.',
      },
    },
  },
};
