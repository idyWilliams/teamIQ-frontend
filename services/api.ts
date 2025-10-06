// services/api.ts
const api = {
  auth: {
    registerOrg: "/auth/register/organization",
    loginIndividual: "/auth/login/individual",
    loginOrg: "/auth/login/organization",
    loginGoogle: "/auth/login/google",
    callbackGoogle: "/auth/callback/google",
  },

  users: {
    byId: (userId: number) => `/users/users/${userId}`,
  },

  organizations: {
    byId: (orgId: number) => `/organizations/organizations/${orgId}`,
    register: "/organizations/organizations/register",
  },

  projects: {
    list: "/projects/",
    create: "/projects/",
    byId: (id: number) => `/projects/${id}`,
  },

  tasks: {
    list: "/tasks/",
    create: "/tasks/",
  },

  dashboard: {
    home: "/dashboard/home",
    mentor: (internId: string) => `/dashboard/mentor/${internId}`,
    org: (orgId: string) => `/dashboard/org/${orgId}`,
  },

  integrations: {
    githubWebhook: "/integrations/github/webhook",
  },

  default: {
    root: "/", // base root endpoint
  },
};

export const {
  auth,
  users,
  organizations,
  projects,
  tasks,
  dashboard,
  integrations,
  default: defaultApi,
} = api;

export default api;
