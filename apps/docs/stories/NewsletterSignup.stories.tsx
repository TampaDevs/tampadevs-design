import type { Meta, StoryObj } from '@storybook/react-vite';
import { NewsletterSignup } from '@tampadevs/react';

const meta: Meta<typeof NewsletterSignup> = {
  title: 'Components/NewsletterSignup',
  component: NewsletterSignup,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    endpoint: { control: 'text' },
  },
  args: {
    title: 'Keep in touch',
    description: 'Stay informed with local tech news, upcoming events, job opportunities, and more from Tampa Devs.',
    endpoint: 'https://newsletter.api.tampa.dev/subscribe',
  },
};

export default meta;
type Story = StoryObj<typeof NewsletterSignup>;

export const Default: Story = {};

export const CustomTitle: Story = {
  args: {
    title: 'Join Our Community',
    description: 'Get weekly updates about tech events in the Tampa Bay area.',
  },
};
