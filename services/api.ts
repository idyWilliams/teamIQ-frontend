import { profile } from "console";

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
  },

  organizations: {
    byId: (org_id: number) => `/organizations/${org_id}`,
    signup: '/organizations/signup',
    onboardingComplete: '/organizations/onboarding-complete',
    profile: '/organizations/me/profile',
  },

  userInvitation: {
    register: '/invitations/',
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
  },

  default: {
    root: '/', // base root endpoint
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
