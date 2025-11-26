import { profile } from 'console';

// services/api.ts
const api = {
  auth: {
    registerOrg: '/auth/register/organization',
    loginIndividual: '/auth/login/individual',
    login: '/auth/login',
    registerIndividual: (invitation_code: string) =>
      `/auth/register/user?invitation_code=${invitation_code}`,
    loginOrg: '/auth/login/organization',
    loginGoogle: '/auth/login/google',
    callbackGoogle: '/auth/callback/google',
    passwordReset: '/auth/password-reset',
    confirmPasswordReset: '/auth/password-reset/confirm',
  },

  users: {
    byId: (userId: number) => `/users/${userId}`,
    organizationUsers: '/users/organization/users',
    getProjects: '/users/me/projects',
  },

  organizations: {
    byId: (org_id: number) => `/organizations/${org_id}`,
    signup: '/organizations/signup',
    onboardingComplete: '/organizations/onboarding-complete',
    profile: '/organizations/me/profile',
  },

  userInvitation: {
    register: '/invitations/',
    getInvitedUsers: '/invitations',
    resendInvitation: '/invitations',
    revokeInvitation: '/invitations',
  },

  projects: {
    list: '/projects/',
    create: '/projects/',
    byId: (id: number) => `/projects/${id}`,
  },

  tasks: {
    list: '/tasks/',
    create: '/tasks/',
  },

  dashboard: {
    home: '/dashboard/home',
    mentor: (internId: string) => `/dashboard/mentor/${internId}`,
    org: (orgId: string) => `/dashboard/org/${orgId}`,
  },

  integrations: {
    githubWebhook: '/integrations/github/webhook',
    'provider-credentials': (organizationId: string, provider: string) =>
      `integrations/provider-credentials?orgId=${organizationId}&provider=${provider}`,
    list: '/integrations/',
    byId: (id: string) => `/integrations/${id}`,
    sync: (id: string) => `/integrations/${id}/sync`,
    saveApiKey: '/integrations/save-apikey',
    providerCredentials: '/integrations/provider-credentials',
    externalAccounts: (connectionId: number | undefined) =>
      `/integrations/${connectionId}/users`,
    // externalAccounts: (provider: string, email: string) =>
    //   `/integrations/external-accounts?provider=${provider}&email=${email}`,
    resources: (connectionId: string, provider: string) =>
      `/integrations/${connectionId}/resources?provider=${provider}`,
      // `/integrations/resources?connection_id=${id}&provider=${provider}`,
  },

  default: {
    root: '/',
  },
};

export const {
  auth,
  users,
  organizations,
  userInvitation,
  projects,
  tasks,
  dashboard,
  integrations,
  default: defaultApi,
} = api;
