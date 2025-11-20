
'use client';
import Image, { StaticImageData } from "next/image";
import { useEffect, useState } from "react";
import { useGetProviderCredentials, useSaveProviderCredentials } from "@/services/hooks/useIntegrations";

export function CredentialsModal({
  provider,
  providerName,
  providerColor,
  providerLogo,
  organizationId,
  onClose,
}: {
  provider: string;
  providerName: string;
  providerColor: string;
  providerLogo: string | StaticImageData;
  organizationId: string;
  onClose: () => void;
}) {
  const [clientId, setClientId] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [redirectUri, setRedirectUri] = useState('');
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showSecret, setShowSecret] = useState(false);

  const { data: credentials, isLoading: loading } = useGetProviderCredentials(organizationId, provider);
  const { mutate: saveCredentials, isPending: saving } = useSaveProviderCredentials();

  useEffect(() => {
    if (credentials) {
      setClientId(credentials.client_id || '');
      setClientSecret(credentials.client_secret || '');
      setRedirectUri(
        credentials.redirect_uri ||
          `https://app.teamiq.com/auth/callback/${provider}`
      );
    }
  }, [credentials, provider]);


  const renderLogo = (logo: string | StaticImageData) => {
    if (typeof logo === 'string') {
      return logo;
    }
    return (
      <Image
        src={logo}
        alt={providerName}
        width={48}
        height={48}
        className="h-12 w-12 object-contain"
      />
    );
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    saveCredentials({
      organization_id: organizationId,
      provider,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
    }, {
      onSuccess: () => {
        setSuccessMsg(
          'Credentials saved successfully! Your team can now connect.'
        );
        setTimeout(() => onClose(), 2000);
      },
      onError: () => {
        setErrorMsg('Failed to save credentials. Please try again.');
      }
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div
      className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm duration-200"
      onClick={onClose}
    >
      <div
        className="bg-card animate-in slide-in-from-bottom-4 max-h-[90vh] w-full max-w-2xl overflow-hidden rounded-3xl shadow-2xl duration-300"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="from-iq-500 to-iq-600 relative bg-gradient-to-br px-8 py-8">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-white/80 transition-colors hover:text-white"
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

          <div className="flex items-center gap-4">
            <div
              className={`h-16 w-16 rounded-2xl  flex items-center justify-center text-4xl shadow-xl`}
            >
              {renderLogo(providerLogo)}
            </div>
            <div>
              <h2 className="mb-1 text-2xl font-bold text-white">
                {providerName} OAuth Setup
              </h2>
              <p className="text-sm text-white/80">
                Configure enterprise credentials for your organization
              </p>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="border-iq-200 border-t-iq-500 h-12 w-12 animate-spin rounded-full border-4"></div>
          </div>
        ) : (
          <div className="max-h-[calc(90vh-180px)] overflow-y-auto">
            <div className="space-y-6 px-8 py-6">
              {/* Info Banner */}
              <div className="bg-iq-50 border-iq-200 rounded-xl border p-4">
                <div className="flex gap-3">
                  <svg
                    className="text-iq-600 mt-0.5 h-5 w-5 flex-shrink-0"
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
                    <p className="text-iq-900 mb-1 font-semibold">
                      Enterprise Integration
                    </p>
                    <p className="text-iq-700">
                      Set up your own OAuth application to maintain full control
                      over your data. All team members will use these
                      credentials when connecting.
                    </p>
                  </div>
                </div>
              </div>

              {/* Redirect URI */}
              <div>
                <label className="text-foreground mb-2 block text-sm font-semibold">
                  Redirect URI
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={redirectUri}
                    readOnly
                    className="bg-muted border-border w-full rounded-xl border px-4 py-3 font-mono text-sm focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => copyToClipboard(redirectUri)}
                    className="hover:bg-background absolute top-1/2 right-3 -translate-y-1/2 rounded-lg p-2 transition-colors"
                    title="Copy to clipboard"
                  >
                    <svg
                      className="text-muted-foreground h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  </button>
                </div>
                <p className="text-muted-foreground mt-2 text-xs">
                  Use this URL when creating your OAuth app in {providerName}
                </p>
              </div>

              {/* Client ID */}
              <div>
                <label className="text-foreground mb-2 block text-sm font-semibold">
                  Client ID
                  <span className="ml-1 text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={clientId}
                  onChange={e => setClientId(e.target.value)}
                  required
                  placeholder="Enter your OAuth Client ID"
                  className="bg-background border-border focus:ring-iq-500 w-full rounded-xl border px-4 py-3 transition-all focus:border-transparent focus:ring-2 focus:outline-none"
                />
              </div>

              {/* Client Secret */}
              <div>
                <label className="text-foreground mb-2 block text-sm font-semibold">
                  Client Secret
                  <span className="ml-1 text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showSecret ? 'text' : 'password'}
                    value={clientSecret}
                    onChange={e => setClientSecret(e.target.value)}
                    required
                    placeholder="Enter your OAuth Client Secret"
                    className="bg-background border-border focus:ring-iq-500 w-full rounded-xl border px-4 py-3 pr-12 transition-all focus:border-transparent focus:ring-2 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowSecret(!showSecret)}
                    className="hover:bg-muted absolute top-1/2 right-3 -translate-y-1/2 rounded-lg p-2 transition-colors"
                  >
                    {showSecret ? (
                      <svg
                        className="text-muted-foreground h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="text-muted-foreground h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
                <p className="text-muted-foreground mt-2 text-xs">
                  Your secret is encrypted and stored securely
                </p>
              </div>

              {/* Setup Guide Link */}
              <div className="bg-muted border-border rounded-xl border p-4">
                <div className="flex items-start gap-3">
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
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                  <div className="text-sm">
                    <p className="text-foreground mb-1 font-medium">
                      Need help?
                    </p>
                    <a
                      href={`https://docs.teamiq.com/integrations/${provider}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-iq-500 hover:text-iq-600 inline-flex items-center gap-1 hover:underline"
                    >
                      View setup guide for {providerName}
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* Success/Error Messages */}
              {successMsg && (
                <div className="animate-in slide-in-from-top-2 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4">
                  <svg
                    className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600"
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
                  <p className="text-sm font-medium text-green-800">
                    {successMsg}
                  </p>
                </div>
              )}

              {errorMsg && (
                <div className="animate-in slide-in-from-top-2 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
                  <svg
                    className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="text-sm font-medium text-red-800">{errorMsg}</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="bg-card border-border sticky bottom-0 flex gap-3 border-t px-8 py-6">
              <button
                type="button"
                onClick={onClose}
                className="bg-muted text-foreground hover:bg-muted/80 flex-1 rounded-xl px-6 py-3 font-semibold transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving || !clientId || !clientSecret}
                onClick={handleSave}
                className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-6 py-3 font-semibold transition-all ${
                  saving || !clientId || !clientSecret
                    ? 'bg-muted text-muted-foreground cursor-not-allowed'
                    : 'bg-iq-500 hover:bg-iq-600 text-white hover:shadow-lg'
                }`}
              >
                {saving ? (
                  <>
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white"></div>
                    Saving...
                  </>
                ) : (
                  <>
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
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Save Credentials
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
