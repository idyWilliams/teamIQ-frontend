'use client';

import { CreatedProject } from '@/services/hooks/useProjectGet';
import ProgresWithDate from './progres-with-date';
import IconList from './ui/icon-list';
import LinkedDocs from './linked-docs';
import AiSummary from './ai-summary';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from './ui/button';
import { usePathname, useParams, useRouter } from 'next/navigation';
import { Loader, AlertCircle } from 'lucide-react';
import Image from 'next/image';

interface ProjectOverviewProps {
  project: CreatedProject;
}

// Icon mapping for tools
const iconMap: Record<string, string> = {
  // Communication tools
  slack: '/images/slack.png',
  discord: '/images/discord.png',
  teams: '/images/teams.png',
  // Version control
  github: '/images/github.png',
  gitlab: '/images/gitlab.png',
  bitbucket: '/images/bitbucket.png',
  // Project management
  jira: '/images/jira.png',
  asana: '/images/asana.png',
  trello: '/images/trello.png',
  clickup: '/images/clickup.png',
  // Design tools
  figma: '/images/figma.png',
  sketch: '/images/sketch.png',
  // Tech stacks
  nodejs: '/images/nodejs.png',
  react: '/images/react.png',
  python: '/images/python.png',
  javascript: '/images/javascript.png',
  typescript: '/images/typescript.png',
  html: '/images/html.png',
  css: '/images/css.png',
  java: '/images/java.png',
  csharp: '/images/csharp.png',
  php: '/images/php.png',
  ruby: '/images/ruby.png',
  go: '/images/go.png',
  rust: '/images/rust.png',
  swift: '/images/swift.png',
  kotlin: '/images/kotlin.png',
};

const ProjectOverview = ({ project }: ProjectOverviewProps) => {
  const isMobile = useIsMobile();
  const pathname = usePathname();
  const router = useRouter();
  // const params = useParams();

 

  // Format date range
  const formatDateRange = () => {
    const startDate = new Date(project.start_date).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
    const endDate = new Date(project.end_date).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
    return `${startDate} - ${endDate}`;
  };

  // Get integrated apps
  const getIntegratedApps = () => {
    if ((project as any).integrated_apps) {
      return (project as any).integrated_apps.map((app: any) => ({
        imgSrc: app.logo_url || iconMap[app.name.toLowerCase()] || '/images/default-app.png',
        stack: app.name,
        isActive: app.is_active,
      }));
    }

    const apps = [];
    if (project.pm_tool) {
      apps.push({
        imgSrc:
          iconMap[project.pm_tool.toLowerCase()] || '/images/default-app.png',
        stack: project.pm_tool,
        isActive: true,
      });
    }
    if (project.vc_tool) {
      apps.push({
        imgSrc:
          iconMap[project.vc_tool.toLowerCase()] || '/images/default-app.png',
        stack: project.vc_tool,
        isActive: true,
      });
    }
    if (project.comm_tool) {
      apps.push({
        imgSrc:
          iconMap[project.comm_tool.toLowerCase()] || '/images/default-app.png',
        stack: project.comm_tool,
        isActive: true,
      });
    }
    return apps;
  };

  // Get tech stacks
  const getTechStacks = () => {
    return (project.stacks || []).map(stack => ({
      imgSrc: iconMap[stack.toLowerCase()] || '/images/default-stack.png',
      stack: stack,
    }));
  };

  const integratedApps = getIntegratedApps();
  const techStacks = getTechStacks();

  // Placeholder for linked documents (you may need to fetch this from another endpoint)
  const linkedDocs: string[] = [];

  return (
    <div className="flex h-screen gap-8">
      {/* Left hand side containing Descriptions and documents*/}
      <div className="flex w-full flex-col gap-[32px] overflow-scroll [scrollbar-width:none] md:w-[793px] lg:w-[70%] [&::-webkit-scrollbar]:hidden">
        {isMobile && (
          <div>
            <AiSummary />
          </div>
        )}

        <div>
          <div className="mb-2 flex items-center justify-between">
            {' '}
            <h2 className="mb-3 text-[14px] font-bold lg:text-[16px]">
              Description
            </h2>
            {pathname.includes('/organization') && (
              <Button
                onClick={() => router.push('/organization/projects/create')}
                className="bg-blue-500 px-6 py-4 text-[14px] text-[#FFFFFA] hover:bg-[#086bcee0]"
              >
                Edit Project
              </Button>
            )}
          </div>
          <p className="text-[13px] leading-relaxed lg:text-[14px]">
            {project.description || 'No description provided for this project.'}
          </p>
        </div>
        <div>
          <h2 className="mb-3 text-[14px] font-bold lg:text-[16px]">
            Project Timeline
          </h2>
          <ProgresWithDate
            date={formatDateRange()}
            percentageProgress={(project as any).completion_percentage ?? project.pct_complete}
          />
        </div>

        {techStacks.length > 0 && (
          <div>
            <h2 className="mb-3 text-[14px] font-bold lg:text-[16px]">
              Required Stacks
            </h2>
            <IconList data={techStacks} />
          </div>
        )}
        {integratedApps.length > 0 && (
          <div>
            <h2 className="mb-3 text-[14px] font-bold lg:text-[16px]">
              Integrated Apps
            </h2>
            <div className="flex flex-wrap gap-4">
              {integratedApps.map((app: any, idx) => (
                <div key={idx} className={`flex items-center gap-2 p-3 rounded-xl border border-gray-100 bg-gray-50/50 ${!app.isActive ? 'grayscale opacity-50' : ''}`}>
                  <Image src={app.imgSrc} alt={app.stack} width={24} height={24} className="object-contain" />
                  <span className="text-sm font-medium text-gray-700">{app.stack}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {linkedDocs.length > 0 && (
          <div>
            <h2 className="mb-3 text-[14px] font-bold lg:text-[16px]">
              Linked Documents
            </h2>
            <LinkedDocs data={linkedDocs} />
          </div>
        )}
      </div>
      {/* Right hand side containing Ai summary */}
      {!isMobile && (
        <div className="flex w-full flex-col gap-[13px] rounded-xl p-6 shadow-[-1px_2px_30px_0px_#0000000D] md:w-[382px] lg:w-[30%]">
          <div className="flex items-center">
            <span className="icon-[fluent--sparkle-48-filled] size-5"></span>
            <h2 className="text-[18px] font-bold">AI summary</h2>
          </div>

          <AiSummary />
        </div>
      )}
    </div>
  );
};

export default ProjectOverview;
