import Image, { StaticImageData } from 'next/image';
import jiraLogo from '@/public/images/jira.png';
import githubLogo from '@/public/images/github.svg';
import slackLogo from '@/public/images/Slack.svg';
import figmaLogo from '@/public/images/Figma.svg';
import gitlabLogo from '@/public/images/gitlab.svg';
import clickupLogo from '@/public/images/clickup.svg';
import discordLogo from '@/public/images/discord.svg';
import teamsLogo from '@/public/images/teams.svg';
import { Apps } from '@/types/integrations';

export function AppCard({
  app,
  onConnect,
  isConnected = false,
}: {
  app: Apps;
  onConnect: (app: Apps) => void;
  isConnected?: boolean;
}) {
  const renderLogo = (logo: string | StaticImageData, name: string) => {
    if (typeof logo === 'string') {
      return <span className="text-2xl">{logo}</span>;
    }

    return (
      <Image
        src={logo}
        alt={name}
        width={40}
        height={40}
        className="h-10 w-10 object-contain"
      />
    );
  };

  return (
    <div
      className="group bg-card border-border hover:border-iq-300 relative cursor-pointer rounded-2xl border p-6 transition-all duration-300 hover:shadow-xl"
      onClick={() => onConnect(app)}
    >
      {/* Connection Badge */}
      {isConnected && (
        <div className="absolute top-4 right-4 flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
          <svg
            className="h-3 w-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          Connected
        </div>
      )}

      <div className="mb-4 flex items-start justify-between">
        <div
          className={`h-14 w-14 rounded-2xl  mb-4 flex items-center justify-center shadow-lg`}
        >
          {renderLogo(app.logo, app.name)}
        </div>
        <span className="text-iq-500 bg-iq-50 rounded-full px-3 py-1 text-xs font-medium">
          {app.pricing}
        </span>
      </div>

      <h3 className="text-foreground mb-1 text-lg font-semibold">{app.name}</h3>
      <p className="text-muted-foreground mb-3 text-xs">{app.category}</p>
      <p className="text-muted-foreground mb-4 line-clamp-2 text-sm">
        {app.description}
      </p>

      <button className="bg-iq-500 hover:bg-iq-600 w-full rounded-xl px-4 py-2.5 font-medium text-white transition-colors group-hover:shadow-md">
        {isConnected ? 'Add Another Account' : 'Connect'}
      </button>
    </div>
  );
}

export const apps = [
  {
    id: 'jira',
    name: 'Jira',
    category: 'Project Management',
    description:
      'Track issues, manage sprints, and sync project data seamlessly with your TeamIQ workspace.',
    logo: jiraLogo,
    color: 'from-blue-500 to-blue-600',
    features: [
      'Issue tracking',
      'Sprint management',
      'Team boards',
      'Advanced reporting',
    ],
    permissions: ['Read project data', 'Sync issues', 'Access team members'],
    pricing: 'Free',
    authType: 'oauth', // ADD THIS LINE
  },
  {
    id: 'github',
    name: 'GitHub',
    category: 'Development',
    description:
      'Connect repositories, track commits, and pull requests to measure development velocity.',
    logo: githubLogo,
    color: 'from-gray-700 to-gray-900',
    features: [
      'Repository sync',
      'Commit tracking',
      'PR analytics',
      'Code review insights',
    ],
    permissions: [
      'Read repositories',
      'Access commit history',
      'View pull requests',
    ],
    pricing: 'Free',
    authType: 'oauth', // ADD THIS LINE
  },
  {
    id: 'slack',
    name: 'Slack',
    category: 'Communication',
    description:
      'Integrate team conversations and measure communication patterns across channels.',
    logo: slackLogo,
    color: 'from-purple-500 to-pink-600',
    features: [
      'Message sync',
      'Channel analytics',
      'Mention tracking',
      'Response time metrics',
    ],
    permissions: ['Read messages', 'Access channels', 'View user activity'],
    pricing: 'Free',
    authType: 'oauth', // ADD THIS LINE
  },
  {
    id: 'figma',
    name: 'Figma',
    category: 'Design',
    description:
      'Sync design files, track iterations, and measure design collaboration efficiency.',
    logo: figmaLogo,
    color: 'from-red-500 to-purple-600',
    features: [
      'File sync',
      'Version tracking',
      'Comment analytics',
      'Collaboration metrics',
    ],
    permissions: ['Read files', 'Access comments', 'View team activity'],
    pricing: 'Free',
    authType: 'oauth',
  },
  {
    id: 'gitlab',
    name: 'GitLab',
    category: 'Development',
    description:
      'Connect your GitLab projects and analyze development workflows end-to-end.',
    logo: gitlabLogo,
    color: 'from-orange-500 to-red-600',
    features: [
      'Project sync',
      'Pipeline analytics',
      'Merge request tracking',
      'CI/CD insights',
    ],
    permissions: ['Read projects', 'Access pipelines', 'View merge requests'],
    pricing: 'Free',
    authType: 'oauth',
  },
  {
    id: 'clickup',
    name: 'ClickUp',
    category: 'Project Management',
    description:
      'Sync tasks, track time, and analyze team productivity with comprehensive metrics.',
    logo: clickupLogo,
    color: 'from-pink-500 to-purple-600',
    features: [
      'Task sync',
      'Time tracking',
      'Goal monitoring',
      'Workflow analytics',
    ],
    permissions: ['Read tasks', 'Access time logs', 'View team data'],
    pricing: 'Free',
    authType: 'apikey', // Only API key!
  },
  {
    id: 'notion',
    name: 'Notion',
    category: 'Documentation',
    description:
      'Connect your workspace and measure documentation quality and team knowledge sharing.',
    logo: '📝',
    color: 'from-gray-800 to-black',
    features: [
      'Page sync',
      'Edit tracking',
      'Collaboration metrics',
      'Knowledge base analytics',
    ],
    permissions: ['Read pages', 'Access databases', 'View activity'],
    pricing: 'Free',
    authType: 'oauth',
  },
  {
    id: 'asana',
    name: 'Asana',
    category: 'Project Management',
    description:
      'Link your projects and gain insights into task completion rates and team efficiency.',
    logo: '🔵',
    color: 'from-red-400 to-pink-500',
    features: [
      'Project sync',
      'Task analytics',
      'Timeline tracking',
      'Team performance',
    ],
    permissions: ['Read projects', 'Access tasks', 'View team data'],
    pricing: 'Free',
    authType: 'oauth',
  },
  {
    id: 'teams',
    name: 'Microsoft Teams',
    category: 'Communication',
    description:
      'Integrate meetings, chats, and calls to analyze communication effectiveness.',
    logo: teamsLogo,
    color: 'from-blue-600 to-purple-600',
    features: [
      'Meeting analytics',
      'Chat sync',
      'Call tracking',
      'Collaboration insights',
    ],
    permissions: ['Read messages', 'Access meetings', 'View call data'],
    pricing: 'Free',
    authType: 'oauth',
  },
  {
    id: 'discord',
    name: 'Discord',
    category: 'Communication',
    description:
      'Connect your server and track community engagement and team interactions.',
    logo: discordLogo,
    color: 'from-indigo-500 to-purple-600',
    features: [
      'Server sync',
      'Message analytics',
      'Voice tracking',
      'Engagement metrics',
    ],
    permissions: ['Read messages', 'Access channels', 'View members'],
    pricing: 'Free',
    authType: 'oauth',
  },
  {
    id: 'trello',
    name: 'Trello',
    category: 'Project Management',
    description:
      'Sync boards and cards to visualize workflow efficiency and team progress.',
    logo: '📋',
    color: 'from-blue-400 to-blue-600',
    features: [
      'Board sync',
      'Card tracking',
      'List analytics',
      'Team velocity',
    ],
    permissions: ['Read boards', 'Access cards', 'View activity'],
    pricing: 'Free',
    authType: 'apikey', // Trello's main integration is with API key/token
  },
  {
    id: 'linear',
    name: 'Linear',
    category: 'Project Management',
    description:
      'Connect issues and cycles to measure sprint velocity and team performance.',
    logo: '⚡',
    color: 'from-purple-600 to-blue-600',
    features: [
      'Issue sync',
      'Cycle tracking',
      'Project analytics',
      'Velocity metrics',
    ],
    permissions: ['Read issues', 'Access projects', 'View cycles'],
    pricing: 'Free',
    authType: 'apikey', // Linear is API key based
  },
];


export const categories = [
  'All',
  'Project Management',
  'Development',
  'Communication',
  'Design',
  'Documentation',
];
