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

const app = [
  {
    name: 'Jira',
    logo: '/images/devicon_jira.svg',
    description: `Lorem ipsum dolor sit amet consectetur. Pulvinar amet at neque
            senectus. Ipsum mattis ac consequat felis lectus tortor. Cursus urna
            cursus lectus diam sit convallis dui nunc.`,
    integrations: [
      {
        title: 'Isentry Website',
        logo: '/images/devicon_jira.svg',
        description: `Lorem ipsum dolor sit amet consectetur. Pulvinar amet at neque
              senectus. Ipsum mattis ac consequat felis lectus tortor. Cursus urna cursus lectus diam sit convallis dui nunc.`,
      },
    ],
  },
  {
    name: 'GitHub',
    logo: '/images/github.svg',
    description: `Lorem ipsum dolor sit amet consectetur. Pulvinar amet at neque
            senectus. Ipsum mattis ac consequat felis lectus tortor. Cursus urna
            cursus lectus diam sit convallis dui nunc.`,
    integrations: [
      {
        title: 'GitHub Actions',
        logo: '/images/github.svg',
        description: `Lorem ipsum dolor sit amet consectetur. Pulvinar amet at neque
              senectus. Ipsum mattis ac consequat felis lectus tortor. Cursus urna cursus lectus diam sit convallis dui nunc.`,
      },
    ],
  },
  {
    name: 'ClickUp',
    logo: '/images/clickup.svg',
    description: `Lorem ipsum dolor sit amet consectetur. Pulvinar amet at neque
            senectus. Ipsum mattis ac consequat felis lectus tortor. Cursus urna
            cursus lectus diam sit convallis dui nunc.`,
    integrations: [
      {
        title: 'ClickUp API',
        logo: '/images/clickup.svg',
        description: `Lorem ipsum dolor sit amet consectetur. Pulvinar amet at neque
              senectus. Ipsum mattis ac consequat felis lectus tortor. Cursus urna cursus lectus diam sit convallis dui nunc.`,
      },
    ],
  },
  {
    name: 'GitLab',
    logo: '/images/gitlab.svg',
    description: `Lorem ipsum dolor sit amet consectetur. Pulvinar amet at neque
            senectus. Ipsum mattis ac consequat felis lectus tortor. Cursus urna
            cursus lectus diam sit convallis dui nunc.`,
    integrations: [
      {
        title: 'GitLab CI/CD',
        logo: '/images/gitlab.svg',
        description: `Lorem ipsum dolor sit amet consectetur. Pulvinar amet at neque
              senectus. Ipsum mattis ac consequat felis lectus tortor. Cursus urna cursus lectus diam sit convallis dui nunc.`,
      },
    ],
  },
  {
    name: 'Figma',
    logo: '/images/figma.svg',
    description: `Lorem ipsum dolor sit amet consectetur. Pulvinar amet at neque
            senectus. Ipsum mattis ac consequat felis lectus tortor. Cursus urna
            cursus lectus diam sit convallis dui nunc.`,
    integrations: [
      {
        title: 'Figma API',
        logo: '/images/figma.svg',
        description: `Lorem ipsum dolor sit amet consectetur. Pulvinar amet at neque
              senectus. Ipsum mattis ac consequat felis lectus tortor. Cursus urna cursus lectus diam sit convallis dui nunc.`,
      },
    ],
  },
  {
    name: 'Slack',
    logo: '/images/slack.svg',
    description: `Lorem ipsum dolor sit amet consectetur. Pulvinar amet at neque
            senectus. Ipsum mattis ac consequat felis lectus tortor. Cursus urna
            cursus lectus diam sit convallis dui nunc.`,
    integrations: [
      {
        title: 'Slack API',
        logo: '/images/slack.svg',
        description: `Lorem ipsum dolor sit amet consectetur. Pulvinar amet at neque
              senectus. Ipsum mattis ac consequat felis lectus tortor. Cursus urna cursus lectus diam sit convallis dui nunc.`,
      },
    ],
  },
  {
    name: 'Discord',
    logo: '/images/discord.svg',
    description: `Lorem ipsum dolor sit amet consectetur. Pulvinar amet at neque
            senectus. Ipsum mattis ac consequat felis lectus tortor. Cursus urna
            cursus lectus diam sit convallis dui nunc.`,
    integrations: [
      {
        title: 'Discord Bots',
        logo: '/images/discord.svg',
        description: `Lorem ipsum dolor sit amet consectetur. Pulvinar amet at neque
              senectus. Ipsum mattis ac consequat felis lectus tortor. Cursus urna cursus lectus diam sit convallis dui nunc.`,
      },
    ],
  },
  {
    name: 'Azure Repos',
    logo: '/images/Azure.svg',
    description: `Lorem ipsum dolor sit amet consectetur. Pulvinar amet at neque
            senectus. Ipsum mattis ac consequat felis lectus tortor. Cursus urna
            cursus lectus diam sit convallis dui nunc.`,
    integrations: [
      {
        title: 'Azure DevOps',
        logo: '/images/Azure.svg',
        description: `Lorem ipsum dolor sit amet consectetur. Pulvinar amet at neque
              senectus. Ipsum mattis ac consequat felis lectus tortor. Cursus urna cursus lectus diam sit convallis dui nunc.`,
      },
    ],
  },
  {
    name: 'Teams',
    logo: '/images/teams.svg',
    description: `Lorem ipsum dolor sit amet consectetur. Pulvinar amet at neque
            senectus. Ipsum mattis ac consequat felis lectus tortor. Cursus urna
            cursus lectus diam sit convallis dui nunc.`,
    integrations: [
      {
        title: 'Microsoft Teams',
        logo: '/images/teams.svg',
        description: `Lorem ipsum dolor sit amet consectetur. Pulvinar amet at neque
              senectus. Ipsum mattis ac consequat felis lectus tortor. Cursus urna cursus lectus diam sit convallis dui nunc.`,
      },
    ],
  },
];

export default function OrganizationAppPage() {

  const [filters, setFilters] = React.useState({
    searchApp: '',
    appName: 'all',
  });

  const filteredApps = app.filter(app => {
    const matchesSearchCard = app.name
      .toLowerCase()
      .includes(filters.searchApp.toLowerCase());
    const matchesAppName =
      filters.appName === 'all' || app.name === filters.appName;
    return matchesSearchCard && matchesAppName;
  });

  const handleSearchCard = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({
      ...prev,
      searchTerm: e.target.value,
    }));
  };

  const handleAppName = (appName: string) => {
    setFilters(prev => ({
      ...prev,
      appName,
    }));
  };

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
      <OrgAppCard apps={filteredApps} />
    </div>
  );
}
