import { useState } from 'react';
import Image, { StaticImageData } from 'next/image';

interface Apps {
  id: string;
  name: string;
  category: string;
  description: string;
  logo: string | StaticImageData;
  color: string;
  features: string[];
  permissions: string[];
  pricing: string;
}

interface AppDetailModalProps {
  app: Apps;
  onClose: () => void;
  onInstall: (app: Apps) => void;
}

export function AppDetailModal({
  app,
  onClose,
  onInstall,
}: AppDetailModalProps) {
  const [step, setStep] = useState<number>(1);
  const [agreed, setAgreed] = useState<boolean>(false);

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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-card max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {step === 1 && (
          <>
            {/* Header */}
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

            {/* Content */}
            <div className="space-y-6 px-8 py-6">
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
                  {app.features.map((feature, i) => (
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
                  {app.permissions.map((permission, i) => (
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

            {/* Footer */}
            <div className="bg-card border-border sticky bottom-0 border-t px-8 py-6">
              <button
                onClick={() => setStep(2)}
                className="bg-iq-500 hover:bg-iq-600 w-full rounded-xl px-6 py-3 font-semibold text-white transition-all hover:shadow-lg"
              >
                Continue
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            {/* Header */}
            <div className="bg-card border-border sticky top-0 border-b px-8 py-6">
              <div className="text-muted-foreground mb-6 flex items-center gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="hover:text-foreground transition-colors"
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

            {/* Content */}
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
                    {app.permissions.map((permission, i) => (
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
                    className="border-border checked:bg-iq-500 checked:border-iq-500 focus:ring-iq-200 mt-1 h-5 w-5 rounded border-2 transition-all focus:ring-2"
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

            {/* Footer */}
            <div className="bg-card border-border sticky bottom-0 space-y-3 border-t px-8 py-6">
              <button
                onClick={() => {
                  if (agreed) {
                    onInstall(app);
                    onClose();
                  }
                }}
                disabled={!agreed}
                className={`w-full rounded-xl px-6 py-3 font-semibold transition-all ${
                  agreed
                    ? 'bg-iq-500 hover:bg-iq-600 text-white hover:shadow-lg'
                    : 'bg-muted text-muted-foreground cursor-not-allowed'
                }`}
              >
                Connect {app.name}
              </button>
              <button
                onClick={onClose}
                className="text-muted-foreground hover:text-foreground w-full rounded-xl px-6 py-3 font-medium transition-colors"
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
