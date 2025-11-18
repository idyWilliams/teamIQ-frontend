'use client';

import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import { useRouter } from 'next/navigation';

import { Apps } from '@/types/integrations';
import { useIntegrations } from '@/context/IntegrationContext';

interface AppDetailModalProps {
  app: Apps;
  onClose: () => void;
}

export function AppDetailModal({ app, onClose }: AppDetailModalProps) {
  const router = useRouter();
  const { addConnection, getConnectionsByApp } = useIntegrations();

  const [step, setStep] = useState<number>(1);
  const [agreed, setAgreed] = useState<boolean>(false);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [connectionSuccess, setConnectionSuccess] = useState<boolean>(false);

  // Check existing connections for this app
  const existingConnections = getConnectionsByApp(app.id);

  const renderLogo = (
    logo: string | StaticImageData,
    size: 'small' | 'large' = 'large'
  ) => {
    const dimensions =
      size === 'large' ? { width: 64, height: 64 } : { width: 48, height: 48 };
    const textSize = size === 'large' ? 'text-4xl' : 'text-2xl';

    if (typeof logo === 'string') {
      return <span className={textSize}>{logo}</span>;
    }

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

  const simulateOAuthFlow = async () => {
    if (!agreed) return;

    setIsConnecting(true);

    try {
      // Simulate OAuth redirect delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Simulate getting user info from OAuth provider
      const mockAccountInfo = {
        name: `demo_user_${Math.floor(Math.random() * 1000)}`,
        email: `user${Math.floor(Math.random() * 1000)}@example.com`,
        displayName: undefined, // User can customize later
      };

      // Add connection
      const newConnection = addConnection(app, mockAccountInfo);

      setConnectionSuccess(true);

      // Show success message briefly
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Close modal and redirect to integrations page
      onClose();
      router.push('/organization/settings?tab=integrated-apps');
    } catch (error) {
      console.error('Connection failed:', error);
      alert('Failed to connect. Please try again.');
    } finally {
      setIsConnecting(false);
    }
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
          <div className="flex min-h-[400px] flex-col items-center justify-center p-8">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <svg
                className="h-10 w-10 text-green-600"
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
            <h2 className="text-foreground mb-2 text-2xl font-semibold">
              Connected Successfully!
            </h2>
            <p className="text-muted-foreground text-center">
              {app.name} has been connected to your organization.
              <br />
              Redirecting to integrations...
            </p>
          </div>
        ) : step === 1 ? (
          <>
            {/* Step 1: App Details */}
            <div className="bg-card border-border sticky top-0 flex items-center justify-between border-b px-8 py-6">
              <div className="flex items-center gap-4">
                <div
                  className={`h-16 w-16 rounded-2xl  flex items-center justify-center shadow-lg`}
                >
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
              {/* Show existing connections if any */}
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
                        account{existingConnections.length > 1 ? 's' : ''}{' '}
                        connected. You can add another account if needed.
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
                <div className="grid grid-cols-2 gap-2">
                  {app.features.map((feature: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined, i: Key | null | undefined) => (
                    <div
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
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-foreground mb-3 text-lg font-semibold">
                  Required Permissions
                </h3>
                <div className="bg-muted space-y-2 rounded-xl p-4">
                  {app.permissions.map((permission: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined, i: Key | null | undefined) => (
                    <div
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
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-iq-50 border-iq-200 rounded-xl border p-4">
                <div className="flex gap-3">
                  <svg
                    className="text-iq-500 mt-0.5 h-5 w-5 flex-shrink-0"
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
                    <p className="text-iq-800 mb-1 font-medium">How it works</p>
                    <p className="text-iq-700">
                      TeamIQ will securely connect to {app.name} using OAuth
                      2.0. Your data is encrypted and never shared with third
                      parties. You can revoke access anytime from settings.
                    </p>
                  </div>
                </div>
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
          <>
            {/* Step 2: Review & Confirm */}
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
                <div
                  className={`h-12 w-12 rounded-xl  flex flex-shrink-0 items-center justify-center shadow-md`}
                >
                  {renderLogo(app.logo, 'small')}
                </div>
                <div className="flex-1">
                  <h3 className="text-foreground font-semibold">{app.name}</h3>
                  <p className="text-muted-foreground text-sm">
                    will be able to:
                  </p>
                  <ul className="mt-2 space-y-1">
                    {app.permissions.map((permission: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined, i: Key | null | undefined) => (
                      <li
                        key={i}
                        className="text-foreground flex items-center gap-2 text-sm"
                      >
                        <span className="bg-iq-500 h-1 w-1 rounded-full"></span>
                        {permission}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="space-y-3">
                <label className="group flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={e => setAgreed(e.target.checked)}
                    disabled={isConnecting}
                    className="border-border checked:bg-iq-500 checked:border-iq-500 focus:ring-iq-200 mt-1 h-5 w-5 rounded border-2 transition-all focus:ring-2 disabled:opacity-50"
                  />
                  <span className="text-muted-foreground group-hover:text-foreground text-sm transition-colors">
                    I agree to the{' '}
                    <a href="#" className="text-iq-500 hover:underline">
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="#" className="text-iq-500 hover:underline">
                      Privacy Policy
                    </a>{' '}
                    for this integration
                  </span>
                </label>
              </div>

              <div className="bg-iq-50 border-iq-200 text-iq-700 rounded-xl border p-4 text-sm">
                <p className="mb-1 font-medium">🔒 Your data is secure</p>
                <p>
                  All connections are encrypted and you can disconnect this app
                  at any time from your settings.
                </p>
              </div>
            </div>

            <div className="bg-card border-border sticky bottom-0 space-y-3 border-t px-8 py-6">
              <button
                onClick={simulateOAuthFlow}
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
                  `Connect ${app.name}`
                )}
              </button>
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
