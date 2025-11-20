import { StaticImageData } from 'next/image';

export interface Apps {
  id: string;
  name: string;
  category: string;
  description: string;
  logo: string | StaticImageData;
  color: string;
  features: string[];
  permissions: string[];
  pricing: string;
  authType: 'oauth' | 'apikey';
}

// export interface Connection {
//   id: string;
//   appId: string;
//   appName: string;
//   logo: string | StaticImageData;
//   color: string;
//   providerAccountName: string;
//   providerAccountEmail: string;
//   displayName: string;
//   isActive: boolean;
//   connectedAt: string;
//   lastSyncedAt: string;
//   organizationId: string;
// }

// export interface IntegrationContextType {
//   connections: Connection[];
//   addConnection: (
//     app: Apps,
//     accountInfo: { name: string; email: string; displayName?: string }
//   ) => Connection;
//   removeConnection: (connectionId: string) => void;
//   updateConnection: (
//     connectionId: string,
//     updates: Partial<Connection>
//   ) => void;
//   getConnectionsByApp: (appId: string) => Connection[];
//   syncConnection: (connectionId: string) => Promise<void>;
//   isAppConnected: (appId: string) => boolean;
//   loading: boolean;
// }
export interface Connection {
  id: string;
  provider: string; // should match app.id
  appName: string;
  logo: string | StaticImageData;
  displayName: string;
  providerAccountName: string;
  providerAccountEmail: string;
  isActive: boolean;
  lastSyncedAt: string;
}

export interface IntegrationContextType {
  connections: Connection[];
  removeConnection: (id: string) => Promise<void>;
  syncConnection: (id: string) => Promise<void>;
  getConnectionsByApp: (appId: string) => Connection[];
  isAppConnected: (appId: string) => boolean;
  fetchConnections: () => Promise<void>;
  loading: boolean;
}
