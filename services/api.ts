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
    refresh: '/auth/refresh',
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
    teamMembers: '/organizations/members',
  },

  userInvitation: {
    register: '/invitations/',
    getInvitedUsers: '/invitations',
    resendInvitation: '/invitations',
    revokeInvitation: '/invitations',
  },

  userNotification: {
    getNotification: '/notifications/',
    markAsRead: (id: number) => `/notification/${id}/read`,
  },

  projects: {
    list: '/projects/',
    create: '/projects/create',
    byId: (project_id: string | number) => `/projects/${project_id}`,
    comprehensive: (project_id: string | number) => `/projects/${project_id}/comprehensive-data`,
    myData: (project_id: string | number) => `/projects/${project_id}/my-data`,
    webhookInstructions: (project_id: string | number) => `/projects/${project_id}/webhook-setup-instructions`,
    integrated: (project_id: string | number) => `/projects/${project_id}/integrated-data`,
    projectUsers: (project_id: number) => `/projects/${project_id}/users`,
    deleteProject: (project_id: number) => `/projects/${project_id}`,
  },

  tasks: {
    list: '/tasks/',
    create: '/tasks/',
  },

  dashboard: {
    home: '/dashboard/home',
    organization: '/dashboard/organization',
    user: '/dashboard/user',
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
    externalAccounts: (
      connectionId: number | undefined,
      resourceId?: string
    ) =>
      resourceId
        ? `/integrations/${connectionId}/users?resource_id=${encodeURIComponent(resourceId)}`
        : `/integrations/${connectionId}/users`,
    // externalAccounts: (provider: string, email: string) =>
    //   `/integrations/external-accounts?provider=${provider}&email=${email}`,
    resources: (connectionId: string, provider: string) =>
      `/integrations/${connectionId}/resources?provider=${provider}`,
  },

  userMappings: {
    map: '/user-mappings/map',
    unmap: '/user-mappings/unmap',
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
  userNotification,
  projects,
  tasks,
  dashboard,
  integrations,
  userMappings,
  default: defaultApi,
} = api;
