'use client';
import { IntegrationProvider } from '@/context/IntegrationContext';
import { useAuthStore } from '@/store/useAuthStore';
import TeamIQMarketplace from '../components/TeamIQMarketplace';

export default function MarketplacePage() {
  const organizationId = useAuthStore(state => state.user?.id);

  return (
    <IntegrationProvider organizationId={organizationId}>
      <TeamIQMarketplace />
    </IntegrationProvider>
  );
}
