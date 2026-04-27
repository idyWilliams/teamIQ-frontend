'use client';

import { useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import { useSaveApiKey } from '@/services/hooks/useIntegrations';
import { useRouter } from 'next/navigation';
import { Apps } from '@/types/integrations';
import { useIntegrations } from '@/context/IntegrationContext';

interface AppDetailModalProps {
  app: Apps;
  onClose: () => void;
  organizationId: string;
}

export function AppDetailModal({
  app,
  onClose,
  organizationId,
}: AppDetailModalProps) {
  const router = useRouter();
  const { getConnectionsByApp, fetchConnections } = useIntegrations();
  const { mutate: saveApiKey, isPending: isConnecting } = useSaveApiKey();
  const [step, setStep] = useState<number>(1);
  const [agreed, setAgreed] = useState<boolean>(false);
  const [connectionSuccess, setConnectionSuccess] = useState<boolean>(false);
  const [apiKey, setApiKey] = useState<string>('');
  const [apiKeyError, setApiKeyError] = useState<string | null>(null);

  const existingConnections = getConnectionsByApp(app.id);

  const renderLogo = (
    logo: string | StaticImageData,
    size: 'small' | 'large' = 'large'
  ) => {
    const dimensions =
      size === 'large' ? { width: 64, height: 64 } : { width: 48, height: 48 };
    const textSize = size === 'large' ? 'text-4xl' : 'text-2xl';
    if (typeof logo === 'string')
      return <span className={textSize}>{logo}</span>;
    return (
      <Image
        src={logo}
        alt="App logo"
        width={dimensions.width}
        height={dimensions.height}
        className="object-contain"
      />
    );
  };

  // --- Handler for OAuth flow
  const handleOAuthConnect = () => {
    // Use backend API URL for OAuth (not frontend URL)
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://teamiq-backend.onrender.com/api/v1';
    const oauthUrl = `${apiBaseUrl}/integrations/oauth/start?provider=${app.id}&orgId=${organizationId}`;

    window.location.href = oauthUrl;
  };

  // --- Handler for API Key flow
  const handleApiKeyConnect = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setApiKeyError(null);
    saveApiKey({
        apiKey,
        provider: app.id,
        orgId: organizationId,
    }, {
        onSuccess: () => {
            setConnectionSuccess(true);
            setTimeout(() => {
                onClose();
                fetchConnections();
                router.push('/organization/settings?tab=integrated-apps');
            }, 1200);
        },
        onError: (error: any) => {
            setApiKeyError(error.response?.data?.detail || 'Failed to connect.');
        }
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-card max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {connectionSuccess ? (
          // --- Success Screen ---
          <div className="animate-fade-in flex min-h-[400px] flex-col items-center justify-center p-8">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <svg
                className="h-12 w-12 animate-bounce text-green-600"
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
            <h2 className="text-foreground mb-2 text-2xl font-bold">
              Connected Successfully!
            </h2>
            <p className="text-muted-foreground text-center">
              {app.name} has been connected to your organization.
              <br />
              Redirecting to integrations...
            </p>
          </div>
        ) : step === 1 ? (
          // --- Step 1: App details ---
          <>
            <div className="bg-card border-border sticky top-0 flex items-center justify-between border-b px-8 py-6">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl shadow-lg">
                  {renderLogo(app.logo, 'large')}
                </div>
                <div>
                  <h2 className="text-foreground text-2xl font-semibold">
                    {app.name}
                  </h2>
                  <p className="text-muted-foreground text-sm">
                    {app.category}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <svg
                  className="h-6 w-6"
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
              </button>
            </div>
            <div className="space-y-6 px-8 py-6">
              {/* Existing Connections Notice */}
              {existingConnections.length > 0 && (
                <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
                  <div className="flex gap-3">
                    <svg
                      className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <div className="text-sm">
                      <p className="mb-1 font-medium text-blue-800">
                        Existing Connections
                      </p>
                      <p className="text-blue-700">
                        You already have {existingConnections.length} {app.name}{' '}
                        connection{existingConnections.length > 1 ? 's' : ''}{' '}
                        active.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              <div>
                <h3 className="text-foreground mb-2 text-lg font-semibold">
                  About this app
                </h3>
                <p className="text-muted-foreground">{app.description}</p>
              </div>
              <div>
                <h3 className="text-foreground mb-3 text-lg font-semibold">
                  Features
                </h3>
                <ul className="grid grid-cols-2 gap-2">
                  {app.features.map((feature, i) => (
                    <li
                      key={i}
                      className="text-muted-foreground flex items-center gap-2 text-sm"
                    >
                      <svg
                        className="text-iq-500 h-5 w-5"
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
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-foreground mb-3 text-lg font-semibold">
                  Required Permissions
                </h3>
                <ul className="bg-muted space-y-2 rounded-xl p-4">
                  {app.permissions.map((permission, i) => (
                    <li
                      key={i}
                      className="text-foreground flex items-center gap-2 text-sm"
                    >
                      <svg
                        className="text-iq-500 h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {permission}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="bg-card border-border sticky bottom-0 border-t px-8 py-6">
              <button
                onClick={() => setStep(2)}
                className="bg-iq-500 hover:bg-iq-600 w-full rounded-xl px-6 py-3 font-semibold text-white transition-all hover:shadow-lg"
              >
                Continue
              </button>
            </div>
          </>
        ) : (
          // --- Step 2: Review & Confirm ---
          <>
            <div className="bg-card border-border sticky top-0 border-b px-8 py-6">
              <div className="text-muted-foreground mb-6 flex items-center gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="hover:text-foreground transition-colors"
                  disabled={isConnecting}
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <span className="text-sm">Back</span>
              </div>
              <h2 className="text-foreground text-2xl font-semibold">
                Review & Confirm
              </h2>
              <p className="text-muted-foreground mt-2">
                Please review the permissions and terms before connecting
              </p>
            </div>
            <div className="space-y-6 px-8 py-6">
              <div className="bg-muted flex items-start gap-4 rounded-xl p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl shadow-md">
                  {renderLogo(app.logo, 'small')}
                </div>
                <div className="flex-1">
                  <h3 className="text-foreground font-semibold">{app.name}</h3>
                  <p className="text-muted-foreground text-sm">
                    will be able to:
                  </p>
                  <ul className="mt-2 space-y-1">
                    {app.permissions.map((permission, i) => (
                      <li
                        key={i}
                        className="text-foreground flex items-center gap-2 text-sm"
                      >
                        <span className="bg-iq-500 h-1 w-1 rounded-full" />
                        {permission}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <label className="group flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={e => setAgreed(e.target.checked)}
                  disabled={isConnecting}
                  className="border-border checked:bg-iq-500 checked:border-iq-500 focus:ring-iq-200 mt-1 h-5 w-5 rounded border-2 transition-all focus:ring-2 disabled:opacity-50"
                />
                <span className="text-muted-foreground group-hover:text-foreground text-sm transition-colors">
                  I agree to the Terms of Service and Privacy Policy for this
                  integration.
                </span>
              </label>
              {/* Error on api key */}
              {app.authType === 'apikey' && apiKeyError && (
                <div className="text-sm text-red-600">{apiKeyError}</div>
              )}
            </div>
            <div className="bg-card border-border sticky bottom-0 space-y-3 border-t px-8 py-6">
              {app.authType === 'oauth' ? (
                <button
                  onClick={handleOAuthConnect}
                  disabled={!agreed || isConnecting}
                  className={`w-full rounded-xl px-6 py-3 font-semibold transition-all ${
                    agreed && !isConnecting
                      ? 'bg-iq-500 hover:bg-iq-600 text-white hover:shadow-lg'
                      : 'bg-muted text-muted-foreground cursor-not-allowed'
                  }`}
                >
                  {isConnecting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        className="h-5 w-5 animate-spin"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Connecting...
                    </span>
                  ) : (
                    `Connect with ${app.name}`
                  )}
                </button>
              ) : (
                <form
                  onSubmit={handleApiKeyConnect}
                  className="flex flex-col gap-4"
                >
                  <input
                    type="text"
                    placeholder={app.id === 'trello' ? 'Format: your_api_key:your_token' : `Enter your ${app.name} API Key`}
                    value={apiKey}
                    onChange={e => setApiKey(e.target.value)}
                    required
                    disabled={isConnecting}
                    className="input"
                  />
                  {app.id === 'trello' && (
                    <p className="text-xs text-muted-foreground mt-1">
                      For Trello, please enter your API key and token separated by a colon (:).
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={!agreed || isConnecting || !apiKey}
                    className={`w-full rounded-xl px-6 py-3 font-semibold transition-all ${
                      apiKey && agreed && !isConnecting
                        ? 'bg-iq-500 hover:bg-iq-600 text-white hover:shadow-lg'
                        : 'bg-muted text-muted-foreground cursor-not-allowed'
                    }`}
                  >
                    {isConnecting ? 'Connecting...' : `Connect ${app.name}`}
                  </button>
                </form>
              )}
              <button
                onClick={onClose}
                disabled={isConnecting}
                className="text-muted-foreground hover:text-foreground w-full rounded-xl px-6 py-3 font-medium transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
