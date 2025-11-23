// services/hooks/useIntegrations.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../axios';
import { integrations } from '../api';
import { Connection } from '@/types/integrations';

const INTEGRATIONS_QUERY_KEY = 'integrations';
const PROVIDER_CREDENTIALS_QUERY_KEY = 'provider-credentials';

// Hook to get all integrations for an organization
export const useGetIntegrations = (organizationId: string) => {
  return useQuery<Connection[], Error>({
    queryKey: [INTEGRATIONS_QUERY_KEY, organizationId],
    queryFn: async () => {
      const response = await axiosInstance.get(integrations.list, {
        params: { org_id: organizationId },
      });
      return response.data;
    },
    enabled: !!organizationId,
  });
};

// Hook to get provider credentials
export const useGetProviderCredentials = (organizationId: string, provider: string) => {
    return useQuery({
        queryKey: [PROVIDER_CREDENTIALS_QUERY_KEY, organizationId, provider],
        queryFn: async () => {
            const response = await axiosInstance.get(integrations['provider-credentials'](organizationId, provider));
            return response.data;
        },
        enabled: !!organizationId && !!provider,
    });
}

// Hook to delete an integration
export const useDeleteIntegration = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: async (integrationId: string) => {
      await axiosInstance.delete(integrations.byId(integrationId));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [INTEGRATIONS_QUERY_KEY] });
    },
  });
};

// Hook to sync an integration
export const useSyncIntegration = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: async (integrationId: string) => {
      await axiosInstance.post(integrations.sync(integrationId));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [INTEGRATIONS_QUERY_KEY] });
    },
  });
};

// Hook to save API key
export const useSaveApiKey = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, { apiKey: string; provider: string; organizationId: string }>({
    mutationFn: async (data) => {
      await axiosInstance.post(integrations.saveApiKey, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [INTEGRATIONS_QUERY_KEY] });
    },
  });
}

// Hook to save provider credentials
export const useSaveProviderCredentials = () => {
    const queryClient = useQueryClient();
    return useMutation<void, Error, { organization_id: string; provider: string; client_id: string; client_secret: string; redirect_uri: string; }>({
        mutationFn: async (data) => {
            await axiosInstance.post(integrations.providerCredentials, data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [PROVIDER_CREDENTIALS_QUERY_KEY] });
        },
    });
}

// Hook to get external accounts for mapping
export const useGetExternalAccounts = (provider: string, email: string) => {
  return useQuery({
    queryKey: ['external-accounts', provider, email],
    queryFn: async () => {
      const response = await axiosInstance.get(
        integrations.externalAccounts(provider, email)
      );
      return response.data;
    },
    enabled: !!provider && !!email,
  });
};

// Hook to get integration resources
export const useGetIntegrationResources = (
  connectionId: string | null,
  provider: string
) => {
  return useQuery({
    queryKey: ['integration-resources', connectionId, provider],
    queryFn: async () => {
      if (!connectionId) return [];
      const response = await axiosInstance.get(
        integrations.resources(connectionId, provider)
      );
      return response.data;
    },
    enabled: !!connectionId && !!provider,
  });
};
