import React from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function OrganizationAppPage() {
  return (
    <div className="w-full p-4">
      <h1>App</h1>
      <section className="my-4 flex items-center justify-between gap-4">
        <div className="relative">
          <Input
            id="search"
            placeholder="Search for an app"
            className="h-8 pl-7 w-80"
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
      <main className="grid gap-5 grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-stretch">
        <article className="rounded-2xl shadow-md hover:shadow-lg transition-shadow flex flex-col justify-between p-6 h-full">
          <div className="flex items-center gap-2 mb-3">
            <Image
              src="/images/devicon_jira.svg"
              alt="Jira logo"
              width={29}
              height={28}
            />
            <h3 className="font-semibold text-base">Jira</h3>
          </div>
          <p className="text-black-400 text-sm leading-relaxed">
            Lorem ipsum dolor sit amet consectetur. Pulvinar amet at neque
            senectus. Ipsum mattis ac consequat felis lectus tortor. Cursus urna
            cursus lectus diam sit convallis dui nunc.
          </p>
        </article>
        <article className="rounded-2xl shadow-md hover:shadow-lg transition-shadow flex flex-col justify-between p-6 h-full">
          <div className="flex items-center gap-2 mb-3">
            <Image
              src="/images/github.svg"
              alt="GitHub logo"
              width={29}
              height={28}
            />
            <h3 className="font-semibold text-base">GitHub</h3>
          </div>
          <p className="text-black-400 text-sm leading-relaxed">
            Lorem ipsum dolor sit amet consectetur. Pulvinar amet at neque
            senectus. Ipsum mattis ac consequat felis lectus tortor. Cursus urna
            cursus lectus diam sit convallis dui nunc.
          </p>
        </article>
        <article className="rounded-2xl shadow-md hover:shadow-lg transition-shadow flex flex-col justify-between p-6 h-full">
          <div className="flex items-center gap-2 mb-3">
            <Image
              src="/images/clickup.svg"
              alt="ClickUp logo"
              width={29}
              height={28}
            />
            <h3 className="font-semibold text-base">ClickUp</h3>
          </div>
          <p className="text-black-400 text-sm leading-relaxed">
            Lorem ipsum dolor sit amet consectetur. Pulvinar amet at neque
            senectus. Ipsum mattis ac consequat felis lectus tortor. Cursus urna
            cursus lectus diam sit convallis dui nunc.
          </p>
        </article>
        <article className="rounded-2xl shadow-md hover:shadow-lg transition-shadow flex flex-col justify-between p-6 h-full">
          <div className="flex items-center gap-2 mb-3">
            <Image
              src="/images/gitlab.svg"
              alt="GitLab logo"
              width={29}
              height={28}
            />
            <h3 className="font-semibold text-base">GitLab</h3>
          </div>
          <p className="text-black-400 text-sm leading-relaxed">
            Lorem ipsum dolor sit amet consectetur. Pulvinar amet at neque
            senectus. Ipsum mattis ac consequat felis lectus tortor. Cursus urna
            cursus lectus diam sit convallis dui nunc.
          </p>
        </article>
        <article className="rounded-2xl shadow-md hover:shadow-lg transition-shadow flex flex-col justify-between p-6 h-full">
          <div className="flex items-center gap-2 mb-3">
            <Image
              src="/images/Figma.svg"
              alt="Figma logo"
              width={29}
              height={28}
            />
            <h3 className="font-semibold text-base">Figma</h3>
          </div>
          <p className="text-black-400 text-sm leading-relaxed">
            Lorem ipsum dolor sit amet consectetur. Pulvinar amet at neque
            senectus. Ipsum mattis ac consequat felis lectus tortor. Cursus urna
            cursus lectus diam sit convallis dui nunc.
          </p>
        </article>
        <article className="rounded-2xl shadow-md hover:shadow-lg transition-shadow flex flex-col justify-between p-6 h-full">
          <div className="flex items-center gap-2 mb-3">
            <Image
              src="/images/Slack.svg"
              alt="Slack logo"
              width={29}
              height={28}
            />
            <h3 className="font-semibold text-base">Slack</h3>
          </div>
          <p className="text-black-400 text-sm leading-relaxed">
            Lorem ipsum dolor sit amet consectetur. Pulvinar amet at neque
            senectus. Ipsum mattis ac consequat felis lectus tortor. Cursus urna
            cursus lectus diam sit convallis dui nunc.
          </p>
        </article>
        <article className="rounded-2xl shadow-md hover:shadow-lg transition-shadow flex flex-col justify-between p-6 h-full">
          <div className="flex items-center gap-2 mb-3">
            <Image
              src="/images/discord.svg"
              alt="Discord logo"
              width={29}
              height={28}
            />
            <h3 className="font-semibold text-base">Discord</h3>
          </div>
          <p className="text-black-400 text-sm leading-relaxed">
            Lorem ipsum dolor sit amet consectetur. Pulvinar amet at neque
            senectus. Ipsum mattis ac consequat felis lectus tortor. Cursus urna
            cursus lectus diam sit convallis dui nunc.
          </p>
        </article>
        <article className="rounded-2xl shadow-md hover:shadow-lg transition-shadow flex flex-col justify-between p-6 h-full">
          <div className="flex items-center gap-2 mb-3">
            <Image
              src="/images/Azure.svg"
              alt="Azure logo"
              width={29}
              height={28}
            />
            <h3 className="font-semibold text-base">Azure Repos</h3>
          </div>
          <p className="text-black-400 text-sm leading-relaxed">
            Lorem ipsum dolor sit amet consectetur. Pulvinar amet at neque
            senectus. Ipsum mattis ac consequat felis lectus tortor. Cursus urna
            cursus lectus diam sit convallis dui nunc.
          </p>
        </article>
        <article className="rounded-2xl shadow-md hover:shadow-lg transition-shadow flex flex-col justify-between p-6 h-full">
          <div className="flex items-center gap-2 mb-3">
            <Image
              src="/images/teams.svg"
              alt="Teams logo"
              width={29}
              height={28}
            />
            <h3 className="font-semibold text-base">Microsoft Teams</h3>
          </div>
          <p className="text-black-400 text-sm leading-relaxed">
            Lorem ipsum dolor sit amet consectetur. Pulvinar amet at neque
            senectus. Ipsum mattis ac consequat felis lectus tortor. Cursus urna
            cursus lectus diam sit convallis dui nunc.
          </p>
        </article>
      </main>
    </div>
  );
}
