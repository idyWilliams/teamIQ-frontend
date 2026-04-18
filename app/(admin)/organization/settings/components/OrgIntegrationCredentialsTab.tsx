import { apps } from "@/components/apps/appCards";
import { useState } from "react";
import { CredentialsModal } from "./CredentialsModal";
import Image, { StaticImageData } from "next/image";
import { useAuthStore } from "@/store/useAuthStore";

export default function OrgIntegrationCredentialsTab() {
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const organizationId = useAuthStore(state => state.user?.id);

  const selectedApp = apps.find(app => app.id === selectedProvider);

    const renderLogo = (logo: string | StaticImageData, name: string) => {
      if (typeof logo === 'string') {
        // It's an emoji string
        return logo;
      }
      // It's a StaticImageData object
      return (
        <Image
          src={logo}
          alt={name}
          width={48}
          height={48}
          className="h-12 w-12 object-contain"
        />
      );
    };

  return (
    <div className="bg-background min-h-screen p-6">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-foreground mb-3 text-3xl font-bold">
            Enterprise Integration Credentials
          </h1>
          <p className="text-muted-foreground text-lg">
            Configure custom OAuth applications for your organization. Once set
            up, all team members will use these credentials when connecting
            their accounts.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="bg-card border-border rounded-2xl border p-6">
            <div className="mb-2 flex items-center gap-3">
              <div className="bg-iq-100 flex h-10 w-10 items-center justify-center rounded-xl">
                <svg
                  className="text-iq-600 h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-foreground font-semibold">Available Apps</h3>
            </div>
            <p className="text-foreground text-3xl font-bold">{apps.length}</p>
            <p className="text-muted-foreground mt-1 text-sm">
              Ready to configure
            </p>
          </div>

          <div className="bg-card border-border rounded-2xl border p-6">
            <div className="mb-2 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100">
                <svg
                  className="h-5 w-5 text-green-600"
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
              </div>
              <h3 className="text-foreground font-semibold">Configured</h3>
            </div>
            <p className="text-foreground text-3xl font-bold">0</p>
            <p className="text-muted-foreground mt-1 text-sm">
              OAuth apps set up
            </p>
          </div>

          <div className="bg-card border-border rounded-2xl border p-6">
            <div className="mb-2 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100">
                <svg
                  className="h-5 w-5 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <h3 className="text-foreground font-semibold">Team Members</h3>
            </div>
            <p className="text-foreground text-3xl font-bold">24</p>
            <p className="text-muted-foreground mt-1 text-sm">
              Will use these credentials
            </p>
          </div>
        </div>

        {/* Info Banner */}
        <div className="from-iq-500 to-iq-600 mb-8 rounded-2xl bg-gradient-to-r p-6 text-white">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-white/20">
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
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <div>
              <h3 className="mb-2 text-lg font-semibold">
                Enhanced Security & Control
              </h3>
              <p className="text-sm leading-relaxed text-white/90">
                By using your own OAuth credentials, you maintain full control
                over data access permissions and can monitor all integration
                activities through your own app dashboards. This ensures
                compliance with your organization&apos;s security policies.
              </p>
            </div>
          </div>
        </div>

        {/* Apps Grid */}
        <div>
          <h2 className="text-foreground mb-4 text-xl font-semibold">
            Select an Integration
          </h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {apps.map(app => (
              <button
                key={app.id}
                onClick={() => setSelectedProvider(app.id)}
                className="group bg-card border-border hover:border-iq-300 relative rounded-2xl border-2 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div
                  className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl text-4xl shadow-lg transition-transform group-hover:scale-110`}
                >
                  {renderLogo(app.logo, app.name)}
                </div>
                <h3 className="text-foreground mb-1 text-center font-semibold">
                  {app.name}
                </h3>
                <p className="text-muted-foreground line-clamp-2 text-center text-xs">
                  {app.description}
                </p>

                <div className="absolute top-4 right-4">
                  <div className="bg-muted flex h-6 w-6 items-center justify-center rounded-full opacity-0 transition-opacity group-hover:opacity-100">
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
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {selectedProvider && selectedApp && (
        <CredentialsModal
          provider={selectedProvider}
          providerName={selectedApp.name}
          providerColor={selectedApp.color}
          providerLogo={selectedApp.logo}
          organizationId={organizationId}
          onClose={() => setSelectedProvider(null)}
        />
      )}

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
