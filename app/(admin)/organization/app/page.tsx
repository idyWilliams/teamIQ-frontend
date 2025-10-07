"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import OrgAppCard from "@/components/org-app-card";

export default function OrganizationAppPage() {
  const [searchTerm, setSearchTerm] = React.useState("");

  const app = [
    {
      name: "Jira",
      logo: "/images/devicon_jira.svg",
      description: `Lorem ipsum dolor sit amet consectetur. Pulvinar amet at neque
            senectus. Ipsum mattis ac consequat felis lectus tortor. Cursus urna
            cursus lectus diam sit convallis dui nunc.`,
    },
    {
      name: "GitHub",
      logo: "/images/github.svg",
      description: `Lorem ipsum dolor sit amet consectetur. Pulvinar amet at neque
            senectus. Ipsum mattis ac consequat felis lectus tortor. Cursus urna
            cursus lectus diam sit convallis dui nunc.`,
    },
    {
      name: "ClickUp",
      logo: "/images/clickup.svg",
      description: `Lorem ipsum dolor sit amet consectetur. Pulvinar amet at neque
            senectus. Ipsum mattis ac consequat felis lectus tortor. Cursus urna
            cursus lectus diam sit convallis dui nunc.`,
    },
    {
      name: "GitLab",
      logo: "/images/gitlab.svg",
      description: `Lorem ipsum dolor sit amet consectetur. Pulvinar amet at neque
            senectus. Ipsum mattis ac consequat felis lectus tortor. Cursus urna
            cursus lectus diam sit convallis dui nunc.`,
    },
    {
      name: "Figma",
      logo: "/images/figma.svg",
      description: `Lorem ipsum dolor sit amet consectetur. Pulvinar amet at neque
            senectus. Ipsum mattis ac consequat felis lectus tortor. Cursus urna
            cursus lectus diam sit convallis dui nunc.`,
    },
    {
      name: "Slack",
      logo: "/images/slack.svg",
      description: `Lorem ipsum dolor sit amet consectetur. Pulvinar amet at neque
            senectus. Ipsum mattis ac consequat felis lectus tortor. Cursus urna
            cursus lectus diam sit convallis dui nunc.`,
    },
    {
      name: "Discord",
      logo: "/images/discord.svg",
      description: `Lorem ipsum dolor sit amet consectetur. Pulvinar amet at neque
            senectus. Ipsum mattis ac consequat felis lectus tortor. Cursus urna
            cursus lectus diam sit convallis dui nunc.`,
    },
    {
      name: "Azure Repos",
      logo: "/images/Azure.svg",
      description: `Lorem ipsum dolor sit amet consectetur. Pulvinar amet at neque
            senectus. Ipsum mattis ac consequat felis lectus tortor. Cursus urna
            cursus lectus diam sit convallis dui nunc.`,
    },
    {
      name: "Teams",
      logo: "/images/teams.svg",
      description: `Lorem ipsum dolor sit amet consectetur. Pulvinar amet at neque
            senectus. Ipsum mattis ac consequat felis lectus tortor. Cursus urna
            cursus lectus diam sit convallis dui nunc.`,
    },
  ];

  const filteredApps = app.filter((app) =>
    app.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full p-4">
      <h1>App</h1>
      <section className="my-4 flex items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Input
            id="search"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for an app"
            className="h-8 pl-7 w-full"
          />
          <Search className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50 select-none" />
        </div>
        <div>
          <Select>
            <SelectTrigger className="w-42">
              <SelectValue placeholder="All Apps" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="app1">App 1</SelectItem>
              <SelectItem value="app2">App 2</SelectItem>
              <SelectItem value="app3">App 3</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </section>
      <OrgAppCard apps={filteredApps} />
    </div>
  );
}
