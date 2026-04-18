import { StaticImageData } from 'next/image';
import jiraLogo from '@/public/images/jira.png';
import githubLogo from '@/public/images/github.svg';
import slackLogo from '@/public/images/Slack.svg';
import figmaLogo from '@/public/images/Figma.svg';
import gitlabLogo from '@/public/images/gitlab.svg';
import clickupLogo from '@/public/images/clickup.svg';
import discordLogo from '@/public/images/discord.svg';
import teamsLogo from '@/public/images/teams.svg';

export interface ProviderConfig {
  name: string;
  logo: string | StaticImageData;
  color: string;
  category: string;
}

export const PROVIDER_CONFIG: Record<string, ProviderConfig> = {
  jira: {
    name: 'Jira',
    logo: jiraLogo,
    color: 'from-blue-500 to-blue-600',
    category: 'Project Management',
  },
  github: {
    name: 'GitHub',
    logo: githubLogo,
    color: 'from-gray-700 to-gray-900',
    category: 'Development',
  },
  slack: {
    name: 'Slack',
    logo: slackLogo,
    color: 'from-purple-500 to-pink-600',
    category: 'Communication',
  },
  figma: {
    name: 'Figma',
    logo: figmaLogo,
    color: 'from-red-500 to-purple-600',
    category: 'Design',
  },
  gitlab: {
    name: 'GitLab',
    logo: gitlabLogo,
    color: 'from-orange-500 to-red-600',
    category: 'Development',
  },
  clickup: {
    name: 'ClickUp',
    logo: clickupLogo,
    color: 'from-pink-500 to-purple-600',
    category: 'Project Management',
  },
  notion: {
    name: 'Notion',
    logo: '📝',
    color: 'from-gray-800 to-black',
    category: 'Documentation',
  },
  asana: {
    name: 'Asana',
    logo: '🔵',
    color: 'from-red-400 to-pink-500',
    category: 'Project Management',
  },
  teams: {
    name: 'Microsoft Teams',
    logo: teamsLogo,
    color: 'from-blue-600 to-purple-600',
    category: 'Communication',
  },
  discord: {
    name: 'Discord',
    logo: discordLogo,
    color: 'from-indigo-500 to-purple-600',
    category: 'Communication',
  },
  trello: {
    name: 'Trello',
    logo: '📋',
    color: 'from-blue-400 to-blue-600',
    category: 'Project Management',
  },
  linear: {
    name: 'Linear',
    logo: '⚡',
    color: 'from-purple-600 to-blue-600',
    category: 'Project Management',
  },
};

/**
 * Get provider configuration by provider ID
 */
export function getProviderConfig(provider: string): ProviderConfig {
  return PROVIDER_CONFIG[provider.toLowerCase()] || {
    name: provider.charAt(0).toUpperCase() + provider.slice(1),
    logo: '🔗',
    color: 'from-gray-500 to-gray-600',
    category: 'Unknown',
  };
}
