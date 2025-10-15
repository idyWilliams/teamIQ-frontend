// This page renders the Organization Apps catalog with a search and filter bar.
// It's a client component because it manages search/filter state.
'use client';
import React from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import OrgAppCard from '@/components/org-app-card';

// Mock data for apps and their integrations displayed on the page.
import app from '@/components/org-app-lists';



/**
 * OrganizationAppPage
 * Renders the Apps catalog: a search field, a dropdown filter, and a grid of app cards.
 * State: filters { searchApp, appName }
 * - searchApp filters by app name 
 * - appName selects a specific app or 'all'
 */
export default function OrganizationAppPage() {

  // Local UI state for search and select filter.
  const [filters, setFilters] = React.useState({
    searchApp: '',
    appName: 'all',
  });

  // Compute apps that match both the search query and the dropdown filter.
  const filteredApps = app.filter(app => {
    const matchesSearchCard = app.name
      .toLowerCase()
      .includes(filters.searchApp.toLowerCase());
    const matchesAppName =
      filters.appName === 'all' || app.name === filters.appName;
    return matchesSearchCard && matchesAppName;
  });

  // Update search text as the user types.
  const handleSearchCard = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({
      ...prev,
      // Note: keep the key name aligned with state (searchApp)
      searchApp: e.target.value,
    }));
  };

  // Update the selected app filter from the dropdown.
  const handleAppName = (appName: string) => {
    setFilters(prev => ({
      ...prev,
      appName,
    }));
  };

    {
      /* Container padding; outer scrolling is controlled by the (admin)/layout */
    }
  return (
    <div className="w-full p-4">
      <h1 className="font-bold">Apps</h1>
      <section className="my-4 flex items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Input
            id="search"
            type="text"
            value={filters.searchApp}
            onChange={handleSearchCard}
            placeholder="Search for an app"
            className="h-8 w-full pl-7"
          />
          <Search className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50 select-none" />
        </div>
        <div>
          {/* App name filter; 'all' shows every app */}
          <Select value={filters.appName} onValueChange={handleAppName}>
            <SelectTrigger className="w-42">
              <SelectValue placeholder="All Apps" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Apps</SelectItem>
              <SelectItem value="Jira">Jira</SelectItem>
              <SelectItem value="Slack">Slack</SelectItem>
              <SelectItem value="Discord">Discord</SelectItem>
              <SelectItem value="GitHub">GitHub</SelectItem>
              <SelectItem value="GitLab">GitLab</SelectItem>
              <SelectItem value="ClickUp">ClickUp</SelectItem>
              <SelectItem value="Figma">Figma</SelectItem>
              <SelectItem value="Azure Repos">Azure Repos</SelectItem>
              <SelectItem value="Teams">Teams</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </section>
      {/* Grid of app cards; clicking a card opens a dialog with details/tabs */}
      <OrgAppCard apps={filteredApps} />
    </div>  
  );  
}
