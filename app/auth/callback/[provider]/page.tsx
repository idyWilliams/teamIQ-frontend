'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams, useParams } from 'next/navigation';
import Image, { StaticImageData } from 'next/image';
import jiraLogo from '@/public/images/jira.png';
import githubLogo from '@/public/images/github.svg';
import slackLogo from '@/public/images/Slack.svg';
import figmaLogo from '@/public/images/Figma.svg';
import gitlabLogo from '@/public/images/gitlab.svg';
import clickupLogo from '@/public/images/clickup.svg';
import discordLogo from '@/public/images/discord.svg';
import teamsLogo from '@/public/images/teams.svg';

const PROVIDER_CONFIG: Record<string, { name: string; icon: StaticImageData | string;  }> = {
  github: { name: 'GitHub', icon: githubLogo, },
  slack: { name: 'Slack', icon: slackLogo,  },
  jira: { name: 'Jira', icon: jiraLogo,  },
  gitlab: { name: 'GitLab', icon: gitlabLogo,},
  notion: { name: 'Notion', icon: '📝', },
  figma: { name: 'Figma', icon: figmaLogo,},
  asana: { name: 'Asana', icon: '✓' },
  discord: { name: 'Discord', icon: discordLogo},
  teams: { name: 'Microsoft Teams', icon: teamsLogo},
  clickup: { name: 'ClickUp', icon: clickupLogo},
};

type CallbackState = 'success' | 'error';

export default function OAuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();
  const [state, setState] = useState<CallbackState>('success');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const provider = params.provider as string;
  const config = PROVIDER_CONFIG[provider] || {
    name: provider?.charAt(0).toUpperCase() + provider?.slice(1),
    icon: '🔗',
  };

  useEffect(() => {
    const success = searchParams.get('success');
    const error = searchParams.get('error');

    console.log('Callback params:', { success, error, provider });

    if (error === 'true') {
      setState('error');
      setErrorMessage(
        `Failed to connect ${config.name}. This could be due to:\n` +
        `• Invalid credentials\n` +
        `• Redirect URI mismatch\n` +
        `• Network issues\n\n` +
        `Please check your configuration and try again.`
      );
      setTimeout(() => {
        router.push('/organization/settings?tab=integrated-apps');
      }, 5000);
    } else if (success === 'true') {
      setState('success');
      setTimeout(() => {
        router.push('/organization/settings?tab=integrated-apps');
      }, 2000);
    } else {

      setState('error');
      setErrorMessage('Invalid callback state.');
      setTimeout(() => {
        router.push('/organization/settings?tab=integrated-apps');
      }, 3000);
    }
  }, [searchParams, router, config.name, provider]);

  const renderIcon = () => {
    if (typeof config.icon === 'string') {
      return <span className="text-4xl">{config.icon}</span>;
    }
    return (
      <Image
        src={config.icon}
        alt={config.name}
        width={40}
        height={40}
        className="h-10 w-10 object-contain"
      />
    );
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full shadow-lg">
            {renderIcon()}
          </div>

          {state === 'success' && (
            <div className="animate-fade-in">
              <div className="mb-6 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                  <svg
                    className="h-10 w-10 text-green-600 dark:text-green-400 animate-scale-in"
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
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Successfully Connected!
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {config.name} has been integrated with your organization.
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-4">
                Redirecting to integrations...
              </p>
            </div>
          )}

          {state === 'error' && (
            <div className="animate-fade-in">
              <div className="mb-6 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
                  <svg
                    className="h-10 w-10 text-red-600 dark:text-red-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Connection Failed
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4 whitespace-pre-line">
                {errorMessage}
              </p>
              <button
                onClick={() => router.push('/organization/settings?tab=integrated-apps')}
                className="mt-4 rounded-xl bg-blue-600 hover:bg-blue-700 px-6 py-2 text-white font-medium transition-colors"
              >
                Return to Integrations
              </button>
            </div>
          )}
        </div>

        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
          Having trouble? Contact support for assistance.
        </p>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scale-in {
          from {
            transform: scale(0);
          }
          to {
            transform: scale(1);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }

        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}